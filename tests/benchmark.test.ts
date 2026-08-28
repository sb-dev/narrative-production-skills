import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  caseFingerprint,
  discoverCases,
  extractPrompt,
  loadManifest,
  scoreResultFile,
  scoreResultObject,
  validateBenchmark,
  type BenchmarkCase,
  type CaseEntry,
} from "../tools/run-benchmark.js";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

async function fixture(name: string): Promise<unknown> {
  const raw = await readFile(resolve(repositoryRoot, "benchmarks", "fixtures", `${name}.json`), "utf8");
  return JSON.parse(raw) as unknown;
}

async function caseEntry(id: string): Promise<CaseEntry> {
  const entries = await discoverCases(repositoryRoot);
  const entry = entries.find((item) => item.case.id === id);
  if (!entry) throw new Error(`Missing benchmark case ${id}`);
  return entry;
}

/** A synthetic result in which every scored axis / dimension is satisfied for this case. */
function allPassResult(benchmarkCase: BenchmarkCase, repeatCount: number): unknown {
  const repeats = Array.from({ length: repeatCount }, (_unused, index) => {
    if (benchmarkCase.suite === "diagnostic") {
      const ground = benchmarkCase.groundTruth ?? {};
      const scopes = ground.smallestSufficientScope ?? [];
      return {
        repeat: index + 1,
        diagnosis: {
          defectClasses: benchmarkCase.cleanControl === true ? [] : [...(ground.defectClasses ?? [])],
          evidence: ["synthetic artifact-specific evidence"],
          owningArtifacts: [...(ground.owningArtifacts ?? [])],
          revisionScope: scopes[0] ?? "none",
          preserveViolations: [],
          boundaryViolations: [],
          unrelatedFindings: [],
        },
      };
    }
    const dimensions = Object.fromEntries((benchmarkCase.requiredDimensions ?? []).map((id) => [id, 2]));
    return { repeat: index + 1, dimensions, hardGateFailures: [] };
  });
  return { caseId: benchmarkCase.id, caseFingerprint: "AUTO", repeats };
}

test("benchmark definition covers all current examples and packs", async () => {
  const result = await validateBenchmark(repositoryRoot);
  assert.deepEqual(result.errors, []);
  assert.equal(result.caseCount, 42);
  assert.equal(result.suiteCounts.diagnostic, 10);
  assert.equal(result.suiteCounts.production, 15);
  assert.equal(result.suiteCounts.packs, 12);
  assert.equal(result.suiteCounts["pack-authoring"], 5);
});

test("manifest is loaded rather than re-declared by the runner", async () => {
  const manifest = await loadManifest(repositoryRoot);
  assert.deepEqual(
    manifest.suites.map((suite) => suite.id).sort(),
    ["diagnostic", "pack-authoring", "packs", "production"],
  );
  for (const suite of manifest.suites) assert.ok(suite.defaultRepeats >= 1);
  assert.ok(manifest.rubrics["diagnostic"]);
});

test("every case declares repeats, inheriting the manifest suite default when absent", async () => {
  const entries = await discoverCases(repositoryRoot);
  const manifest = await loadManifest(repositoryRoot);
  const bySuite = new Map(manifest.suites.map((suite) => [suite.id, suite.defaultRepeats]));
  for (const entry of entries) {
    assert.ok(entry.case.defaultRepeats >= 1, `${entry.case.id} has no repeat count`);
    assert.equal(entry.case.defaultRepeats, bySuite.get(entry.case.suite));
  }
});

// The diagnostic branch shipped with a guaranteed TypeError because no test ever scored a
// diagnostic case. This scores every case in the suite definition, so the whole scoring path is
// exercised by construction as cases are added.
test("every benchmark case can be scored", async () => {
  const entries = await discoverCases(repositoryRoot);
  assert.equal(entries.length, 42);
  for (const entry of entries) {
    const summary = scoreResultObject(entry.case, allPassResult(entry.case, entry.case.defaultRepeats));
    assert.equal(summary.status, "PASS", `${entry.case.id} did not pass its own ground truth`);
    assert.equal(summary.underRepeated, false);
    assert.equal(summary.expectedRepeats, entry.case.defaultRepeats);
  }
});

test("semantic scorer distinguishes ready from failed outputs", async () => {
  const entry = await caseEntry("prod-level-1-tomorrows-receipt");
  assert.equal(scoreResultObject(entry.case, await fixture("semantic-pass")).status, "PASS");
  assert.equal(scoreResultObject(entry.case, await fixture("semantic-fail")).status, "FAIL");
});

test("diagnostic scorer distinguishes a correct diagnosis from a misrouted one", async () => {
  const entry = await caseEntry("diag-preserve-approved-ending");

  const passing = scoreResultObject(entry.case, await fixture("diagnostic-pass"));
  assert.equal(passing.status, "PASS");
  assert.equal(passing.passedRepeats, 3);
  assert.deepEqual(passing.axisRates, {
    detection: 1,
    evidence: 1,
    routing: 1,
    scope: 1,
    preservation: 1,
    boundary: 1,
    precision: 1,
  });

  const failing = scoreResultObject(entry.case, await fixture("diagnostic-fail"));
  assert.equal(failing.status, "FAIL");
  assert.equal(failing.passedRepeats, 0);
  // Naming only the downstream draft is not routing to the root cause, and a scope outside the
  // ground-truth set is not the smallest sufficient correction.
  assert.equal(failing.axisRates?.["routing"], 1 / 3);
  assert.equal(failing.axisRates?.["scope"], 1 / 3);
  assert.equal(failing.axisRates?.["preservation"], 2 / 3);
});

test("diagnostic scorer inverts detection for a clean control", async () => {
  const entry = await caseEntry("diag-clean-control");
  const passing = scoreResultObject(entry.case, await fixture("diagnostic-clean-control-pass"));
  assert.equal(passing.status, "PASS");
  assert.equal(passing.axisRates?.["detection"], 1);

  // Inventing defects on a clean control is a detection failure, not a detection success.
  const failing = scoreResultObject(entry.case, await fixture("diagnostic-clean-control-fail"));
  assert.equal(failing.status, "FAIL");
  assert.equal(failing.axisRates?.["detection"], 0);
});

test("precision is reported separately and does not affect strict pass", async () => {
  const entry = await caseEntry("diag-preserve-approved-ending");
  const summary = scoreResultObject(entry.case, await fixture("diagnostic-precision-flag"));
  assert.equal(summary.status, "PASS");
  assert.equal(summary.axisRates?.["precision"], 0.5);
});

test("a result with fewer repeats than the case requires is flagged", async () => {
  const entry = await caseEntry("diag-preserve-approved-ending");
  const summary = scoreResultObject(entry.case, allPassResult(entry.case, 1));
  // Still PASS by the pass/flake semantics, but never mistakable for a baseline.
  assert.equal(summary.status, "PASS");
  assert.equal(summary.totalRepeats, 1);
  assert.equal(summary.expectedRepeats, 3);
  assert.equal(summary.underRepeated, true);
});

test("scoreResultFile enforces the case fingerprint", async () => {
  const entry = await caseEntry("diag-preserve-approved-ending");
  const directory = await mkdtemp(join(tmpdir(), "benchmark-fingerprint-"));
  const base = allPassResult(entry.case, entry.case.defaultRepeats) as Record<string, unknown>;

  const fresh = join(directory, "fresh.json");
  const fingerprint = await caseFingerprint(repositoryRoot, entry);
  await writeFile(fresh, JSON.stringify({ ...base, caseFingerprint: fingerprint }), "utf8");
  assert.equal((await scoreResultFile(repositoryRoot, fresh)).status, "PASS");

  const stale = join(directory, "stale.json");
  await writeFile(stale, JSON.stringify({ ...base, caseFingerprint: "0".repeat(64) }), "utf8");
  await assert.rejects(() => scoreResultFile(repositoryRoot, stale), /STALE RESULT/);

  const missing = join(directory, "missing.json");
  const { caseFingerprint: _omitted, ...withoutFingerprint } = base;
  await writeFile(missing, JSON.stringify(withoutFingerprint), "utf8");
  await assert.rejects(() => scoreResultFile(repositoryRoot, missing), /missing caseFingerprint/);
});

test("extractPrompt reads the fenced prompt block that gates every promptSource case", () => {
  assert.equal(extractPrompt("# Title\n\n## Prompt\n\n```text\nWrite a story.\n```\n"), "Write a story.");
  assert.equal(extractPrompt("## Prompt\n```markdown\nWrite a scene.\n```"), "Write a scene.");
  assert.equal(extractPrompt("## Prompt\n\n```\nWrite a beat.\n```"), "Write a beat.");
  assert.equal(extractPrompt("## Prompt\n\n```text\nline one\n\nline two\n```"), "line one\n\nline two");
  assert.throws(() => extractPrompt("# Title\n\nNo prompt block here.\n"), /fenced ## Prompt block/);
  assert.throws(() => extractPrompt("## Prompt\n\n```text\n\n```"), /fenced ## Prompt block/);
});

test("every promptSource resolves through the current README", async () => {
  const entries = await discoverCases(repositoryRoot);
  const sourced = entries.filter((entry) => entry.case.promptSource);
  assert.equal(sourced.length, 27);
  for (const entry of sourced) {
    const fingerprint = await caseFingerprint(repositoryRoot, entry);
    assert.match(fingerprint, /^[0-9a-f]{64}$/);
  }
});
