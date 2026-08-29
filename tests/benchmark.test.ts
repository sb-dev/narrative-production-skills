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
  // Repeat 1 names an artifact outside the ground-truth set, repeat 2 gives a scope outside it,
  // repeat 3 misses the defect entirely and violates the preserve set.
  assert.equal(failing.axisRates?.["routing"], 2 / 3);
  assert.equal(failing.axisRates?.["scope"], 1 / 3);
  assert.equal(failing.axisRates?.["preservation"], 2 / 3);
});

// owningArtifacts is a set, not a root-cause-first list: several cases deliberately name both the
// artifact that must not change and the one the correction belongs to.
test("routing accepts any listed owning artifact, and rejects one that is not listed", async () => {
  const entry = await caseEntry("diag-world-rule-violation");
  const ground = entry.case.groundTruth ?? {};
  const withOwners = (owningArtifacts: readonly string[]): unknown => ({
    caseId: entry.case.id,
    repeats: [
      {
        repeat: 1,
        diagnosis: {
          defectClasses: [...(ground.defectClasses ?? [])],
          evidence: ["synthetic"],
          owningArtifacts,
          revisionScope: (ground.smallestSufficientScope ?? [])[0] ?? "none",
          preserveViolations: [],
          boundaryViolations: [],
          unrelatedFindings: [],
        },
      },
    ],
  });

  assert.deepEqual(ground.owningArtifacts, ["world_bible", "beat_sheet"]);
  // The correction belongs in the beat sheet; the world bible is the rule being violated and is in
  // this case's preserve set. Both are legitimate routings and neither may be scored as a failure.
  assert.equal(scoreResultObject(entry.case, withOwners(["beat_sheet"])).status, "PASS");
  assert.equal(scoreResultObject(entry.case, withOwners(["world_bible"])).status, "PASS");
  assert.equal(scoreResultObject(entry.case, withOwners(["BEAT_SHEET"])).status, "PASS");
  assert.equal(scoreResultObject(entry.case, withOwners(["story_concept"])).status, "FAIL");
  assert.equal(scoreResultObject(entry.case, withOwners([])).status, "FAIL");
});

test("a malformed hardGateFailures value throws rather than scoring as no failures", async () => {
  const entry = await caseEntry("prod-level-1-tomorrows-receipt");
  const dimensions = Object.fromEntries((entry.case.requiredDimensions ?? []).map((id) => [id, 3]));
  const withFailures = (hardGateFailures: unknown): unknown => ({
    caseId: entry.case.id,
    repeats: [{ repeat: 1, dimensions, hardGateFailures }],
  });

  assert.equal(scoreResultObject(entry.case, withFailures([])).status, "PASS");
  assert.equal(scoreResultObject(entry.case, withFailures(["continuity"])).status, "FAIL");
  // A hand-authored result that writes the field as a bare string must not publish a false green.
  for (const malformed of ["continuity", { continuity: true }, [1], null]) {
    assert.throws(() => scoreResultObject(entry.case, withFailures(malformed)), /hardGateFailures/);
  }
});

// The same idiom that let `hardGateFailures` publish a false green survived six times in the
// diagnostic scorer. `preserveViolations` and `boundaryViolations` are the dangerous direction:
// a malformed value read as "nothing to report", passing the axis on every diagnostic case.
test("a malformed diagnosis field throws rather than scoring its axis as a pass", async () => {
  const entry = await caseEntry("diag-preserve-approved-ending");
  const ground = entry.case.groundTruth ?? {};
  const wellFormed = {
    defectClasses: [...(ground.defectClasses ?? [])],
    evidence: ["synthetic"],
    owningArtifacts: [...(ground.owningArtifacts ?? [])],
    revisionScope: (ground.smallestSufficientScope ?? [])[0] ?? "none",
    preserveViolations: [] as unknown,
    boundaryViolations: [] as unknown,
    unrelatedFindings: [] as unknown,
  };
  const withDiagnosis = (overrides: Record<string, unknown>): unknown => ({
    caseId: entry.case.id,
    repeats: [{ repeat: 1, diagnosis: { ...wellFormed, ...overrides } }],
  });

  assert.equal(scoreResultObject(entry.case, withDiagnosis({})).status, "PASS");
  // The measurement this protects: a real preserve-set violation must score FAIL, and the
  // bare-string typo of the same finding must not quietly score PASS instead.
  assert.equal(
    scoreResultObject(entry.case, withDiagnosis({ preserveViolations: ["the approved ending was rewritten"] })).status,
    "FAIL",
  );
  assert.throws(
    () => scoreResultObject(entry.case, withDiagnosis({ preserveViolations: "the approved ending was rewritten" })),
    /preserveViolations/,
  );

  const listFields = [
    "defectClasses",
    "evidence",
    "owningArtifacts",
    "preserveViolations",
    "boundaryViolations",
    "unrelatedFindings",
  ] as const;
  for (const field of listFields) {
    for (const malformed of ["a string", { flagged: true }, [1], null, 3]) {
      assert.throws(() => scoreResultObject(entry.case, withDiagnosis({ [field]: malformed })), new RegExp(field));
    }
    // Absent is not permissive either: an omitted field is an unchecked one, not an empty one.
    const { [field]: _omitted, ...withoutField } = wellFormed;
    assert.throws(
      () => scoreResultObject(entry.case, { caseId: entry.case.id, repeats: [{ repeat: 1, diagnosis: withoutField }] }),
      new RegExp(`missing ${field}`),
    );
  }

  for (const malformed of [["beat-7"], null, 7, undefined]) {
    assert.throws(() => scoreResultObject(entry.case, withDiagnosis({ revisionScope: malformed })), /revisionScope/);
  }
  assert.throws(() => scoreResultObject(entry.case, { caseId: entry.case.id, repeats: [{ repeat: 1 }] }), /diagnosis/);
});

// The third ground-truth axis with the same "absent is not permissive" hole as owningArtifacts and
// smallestSufficientScope: detection is `every` over the expected classes, and `every` over an
// empty list is true, so the case can never fail detection.
test("a defect case that declares no defectClasses is refused rather than scored", async () => {
  const entry = await caseEntry("diag-preserve-approved-ending");
  const ground = entry.case.groundTruth ?? {};
  const foundNothing: unknown = {
    caseId: "synthetic-vacuous-detection",
    repeats: [
      {
        repeat: 1,
        diagnosis: {
          defectClasses: [],
          evidence: ["synthetic"],
          owningArtifacts: [...(ground.owningArtifacts ?? [])],
          revisionScope: (ground.smallestSufficientScope ?? [])[0] ?? "none",
          preserveViolations: [],
          boundaryViolations: [],
          unrelatedFindings: [],
        },
      },
    ],
  };
  const vacuous: BenchmarkCase = {
    ...entry.case,
    id: "synthetic-vacuous-detection",
    groundTruth: { ...ground, defectClasses: [] },
  };
  assert.throws(() => scoreResultObject(vacuous, foundNothing), /defectClasses/);

  // A clean control legitimately expects none, and still scores: finding nothing is the pass.
  const control: BenchmarkCase = { ...vacuous, cleanControl: true };
  assert.equal(scoreResultObject(control, foundNothing).status, "PASS");
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
