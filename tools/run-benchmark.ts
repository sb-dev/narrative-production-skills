import { createHash } from "node:crypto";
import { readFile, readdir, stat } from "node:fs/promises";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const suites = ["diagnostic", "production", "packs", "pack-authoring"] as const;
type SuiteId = (typeof suites)[number];

type JsonObject = Record<string, unknown>;

export interface BenchmarkCase {
  readonly id: string;
  readonly suite: SuiteId;
  readonly capability: string;
  readonly skills: readonly string[];
  readonly rubric: string;
  readonly prompt?: string;
  readonly promptSource?: string;
  readonly requiredDimensions?: readonly string[];
  readonly hardGates?: readonly string[];
  readonly defaultRepeats?: number;
  readonly cleanControl?: boolean;
  readonly groundTruth?: {
    readonly defectClasses?: readonly string[];
    readonly owningArtifacts?: readonly string[];
    readonly smallestSufficientScope?: string;
    readonly preserve?: readonly string[];
    readonly forbiddenChanges?: readonly string[];
  };
}

export interface BenchmarkValidation {
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
  readonly caseCount: number;
  readonly suiteCounts: Readonly<Record<SuiteId, number>>;
}

export interface ScoreSummary {
  readonly caseId: string;
  readonly status: "PASS" | "FLAKY" | "FAIL";
  readonly passedRepeats: number;
  readonly totalRepeats: number;
  readonly passRate: number;
  readonly dimensionMedians?: Readonly<Record<string, number>>;
  readonly axisRates?: Readonly<Record<string, number>>;
}

async function isFile(path: string): Promise<boolean> {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function isDirectory(path: string): Promise<boolean> {
  try {
    return (await stat(path)).isDirectory();
  } catch {
    return false;
  }
}

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asStringArray(value: unknown): string[] | null {
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : null;
}

function parseCase(value: unknown, source: string): BenchmarkCase {
  if (!isObject(value)) throw new Error(`${source}: case must be an object`);
  const id = value["id"];
  const suite = value["suite"];
  const capability = value["capability"];
  const skills = asStringArray(value["skills"]);
  const rubric = value["rubric"];
  if (typeof id !== "string" || !id) throw new Error(`${source}: missing id`);
  if (typeof suite !== "string" || !suites.includes(suite as SuiteId)) throw new Error(`${source}: invalid suite`);
  if (typeof capability !== "string" || !capability) throw new Error(`${source}: missing capability`);
  if (!skills || skills.length === 0) throw new Error(`${source}: skills must be a non-empty string array`);
  if (typeof rubric !== "string" || !rubric) throw new Error(`${source}: missing rubric`);

  const prompt = typeof value["prompt"] === "string" ? value["prompt"] : undefined;
  const promptSource = typeof value["promptSource"] === "string" ? value["promptSource"] : undefined;
  if ((prompt ? 1 : 0) + (promptSource ? 1 : 0) !== 1) {
    throw new Error(`${source}: define exactly one of prompt or promptSource`);
  }

  const result: BenchmarkCase = {
    id,
    suite: suite as SuiteId,
    capability,
    skills,
    rubric,
    ...(prompt ? { prompt } : {}),
    ...(promptSource ? { promptSource } : {}),
  };
  const requiredDimensions = asStringArray(value["requiredDimensions"]);
  const hardGates = asStringArray(value["hardGates"]);
  if (requiredDimensions) Object.assign(result, { requiredDimensions });
  if (hardGates) Object.assign(result, { hardGates });
  if (typeof value["defaultRepeats"] === "number") Object.assign(result, { defaultRepeats: value["defaultRepeats"] });
  if (typeof value["cleanControl"] === "boolean") Object.assign(result, { cleanControl: value["cleanControl"] });
  if (isObject(value["groundTruth"])) Object.assign(result, { groundTruth: value["groundTruth"] });
  return result;
}

async function walkJson(directory: string): Promise<string[]> {
  const output: string[] = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) output.push(...(await walkJson(path)));
    else if (entry.isFile() && entry.name.endsWith(".json")) output.push(path);
  }
  return output.sort();
}

export async function discoverCases(repositoryRoot: string): Promise<Array<{ case: BenchmarkCase; path: string; raw: string }>> {
  const root = resolve(repositoryRoot);
  const casesRoot = join(root, "benchmarks", "cases");
  const result: Array<{ case: BenchmarkCase; path: string; raw: string }> = [];
  for (const path of await walkJson(casesRoot)) {
    const raw = await readFile(path, "utf8");
    const parsed: unknown = JSON.parse(raw);
    result.push({ case: parseCase(parsed, relative(root, path)), path, raw });
  }
  return result;
}

export function extractPrompt(markdown: string): string {
  const match = /(?:^|\n)## Prompt\s*\n+```(?:text|markdown)?\s*\n([\s\S]*?)\n```/i.exec(markdown);
  if (!match?.[1]?.trim()) throw new Error("README does not contain a fenced ## Prompt block");
  return match[1].trim();
}

export async function resolvePrompt(repositoryRoot: string, benchmarkCase: BenchmarkCase): Promise<string> {
  if (benchmarkCase.prompt) return benchmarkCase.prompt.trim();
  if (!benchmarkCase.promptSource) throw new Error(`${benchmarkCase.id}: no prompt source`);
  const sourcePath = resolve(repositoryRoot, benchmarkCase.promptSource);
  const markdown = await readFile(sourcePath, "utf8");
  return extractPrompt(markdown);
}

async function loadRubricRaw(repositoryRoot: string, benchmarkCase: BenchmarkCase): Promise<string> {
  const path = resolve(repositoryRoot, "benchmarks", "rubrics", `${benchmarkCase.rubric}.json`);
  return readFile(path, "utf8");
}

export async function caseFingerprint(repositoryRoot: string, entry: { case: BenchmarkCase; raw: string }): Promise<string> {
  const prompt = await resolvePrompt(repositoryRoot, entry.case);
  const rubricRaw = await loadRubricRaw(repositoryRoot, entry.case);
  return createHash("sha256").update(entry.raw).update("\0").update(prompt).update("\0").update(rubricRaw).digest("hex");
}

async function listDirectories(path: string): Promise<string[]> {
  if (!(await isDirectory(path))) return [];
  return (await readdir(path, { withFileTypes: true })).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
}

export async function validateBenchmark(repositoryRoot: string): Promise<BenchmarkValidation> {
  const root = resolve(repositoryRoot);
  const errors: string[] = [];
  const warnings: string[] = [];
  const counts: Record<SuiteId, number> = { diagnostic: 0, production: 0, packs: 0, "pack-authoring": 0 };
  let entries: Awaited<ReturnType<typeof discoverCases>> = [];
  try {
    entries = await discoverCases(root);
  } catch (error) {
    return { errors: [String(error)], warnings, caseCount: 0, suiteCounts: counts };
  }

  const ids = new Set<string>();
  const promptSources = new Set<string>();
  for (const entry of entries) {
    const c = entry.case;
    counts[c.suite] += 1;
    if (ids.has(c.id)) errors.push(`Duplicate benchmark case id: ${c.id}`);
    ids.add(c.id);

    const rubricPath = join(root, "benchmarks", "rubrics", `${c.rubric}.json`);
    if (!(await isFile(rubricPath))) errors.push(`${c.id}: missing rubric ${c.rubric}`);

    if (c.promptSource) {
      promptSources.add(c.promptSource);
      const path = resolve(root, c.promptSource);
      if (!(await isFile(path))) errors.push(`${c.id}: missing promptSource ${c.promptSource}`);
      else {
        try {
          extractPrompt(await readFile(path, "utf8"));
        } catch (error) {
          errors.push(`${c.id}: ${String(error)}`);
        }
      }
    }

    if (c.suite === "diagnostic") {
      if (!c.groundTruth) errors.push(`${c.id}: diagnostic case missing groundTruth`);
      if (!c.hardGates || c.hardGates.length === 0) errors.push(`${c.id}: diagnostic case missing hardGates`);
    } else {
      if (!c.requiredDimensions || c.requiredDimensions.length === 0) errors.push(`${c.id}: semantic case missing requiredDimensions`);
      if (!c.hardGates || c.hardGates.length === 0) errors.push(`${c.id}: semantic case missing hardGates`);
    }
  }

  const coreExampleDirs = (await listDirectories(join(root, "examples"))).filter((name) => /^level-[1-5]-/.test(name));
  const coreLevels = new Set(coreExampleDirs.map((name) => name.slice(0, "level-N".length)));
  for (const level of [...coreLevels].sort()) {
    const covered = coreExampleDirs.some(
      (directory) => directory.startsWith(`${level}-`) && promptSources.has(`examples/${directory}/README.md`),
    );
    if (!covered) errors.push(`Core example level is not benchmarked: ${level}`);
  }

  const extensionPackDirs = await listDirectories(join(root, "examples", "extension-packs"));
  for (const directory of extensionPackDirs) {
    const source = `examples/extension-packs/${directory}/README.md`;
    if (!promptSources.has(source)) errors.push(`Extension-pack showcase is not benchmarked: ${source}`);
  }

  if (counts.diagnostic < 2) errors.push("Diagnostic suite must contain a defect and a clean control");
  if (!entries.some((entry) => entry.case.suite === "diagnostic" && entry.case.cleanControl === true)) errors.push("Diagnostic suite has no clean control");
  if (counts.production !== coreLevels.size) warnings.push(`Production benchmark cases (${counts.production}) differ from core example level count (${coreLevels.size})`);
  if (counts.packs !== extensionPackDirs.length) errors.push(`Pack benchmark cases (${counts.packs}) differ from extension-pack example count (${extensionPackDirs.length})`);

  return { errors, warnings, caseCount: entries.length, suiteCounts: counts };
}

function median(values: readonly number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length === 0) throw new Error("Cannot calculate median of empty list");
  if (sorted.length % 2 === 1) return sorted[middle] ?? 0;
  return ((sorted[middle - 1] ?? 0) + (sorted[middle] ?? 0)) / 2;
}

function statusFromPasses(passed: number, total: number): "PASS" | "FLAKY" | "FAIL" {
  if (passed === total) return "PASS";
  if (passed === 0) return "FAIL";
  return "FLAKY";
}

function stringSet(value: unknown): Set<string> {
  return new Set(asStringArray(value) ?? []);
}

function hasIntersection(a: readonly string[], b: Set<string>): boolean {
  return a.some((item) => b.has(item));
}

export function scoreResultObject(benchmarkCase: BenchmarkCase, result: unknown): ScoreSummary {
  if (!isObject(result)) throw new Error("Result must be an object");
  if (result["caseId"] !== benchmarkCase.id) throw new Error(`Result caseId does not match ${benchmarkCase.id}`);
  const repeats = result["repeats"];
  if (!Array.isArray(repeats) || repeats.length === 0) throw new Error("Result must contain repeats");

  if (benchmarkCase.suite === "diagnostic") {
    const ground = benchmarkCase.groundTruth ?? {};
    const axes = ["detection", "evidence", "routing", "scope", "preservation", "boundary"] as const;
    const axisPasses: Record<string, number> = Object.fromEntries(axes.map((axis) => [axis, 0]));
    let strictPasses = 0;
    for (const rawRepeat of repeats) {
      if (!isObject(rawRepeat) || !isObject(rawRepeat["diagnosis"])) throw new Error("Diagnostic repeat must contain diagnosis");
      const diagnosis = rawRepeat["diagnosis"];
      const foundDefects = stringSet(diagnosis["defectClasses"]);
      const expectedDefects = ground.defectClasses ?? [];
      const detection = benchmarkCase.cleanControl === true ? foundDefects.size === 0 : expectedDefects.every((item) => foundDefects.has(item));
      const evidence = (asStringArray(diagnosis["evidence"]) ?? []).length > 0;
      const owners = stringSet(diagnosis["owningArtifacts"]);
      const expectedOwners = ground.owningArtifacts ?? [];
      const routing = expectedOwners.length === 0 || expectedOwners.includes("none") ? owners.size === 0 || owners.has("none") : hasIntersection(expectedOwners, owners);
      const expectedScope = ground.smallestSufficientScope ?? "";
      const actualScope = typeof diagnosis["revisionScope"] === "string" ? diagnosis["revisionScope"] : "";
      const scope = expectedScope === "none" ? actualScope === "none" || actualScope === "" : actualScope.trim().toLowerCase() === expectedScope.trim().toLowerCase();
      const preservation = (asStringArray(diagnosis["preserveViolations"]) ?? []).length === 0;
      const boundary = (asStringArray(diagnosis["boundaryViolations"]) ?? []).length === 0;
      const row = { detection, evidence, routing, scope, preservation, boundary };
      for (const axis of axes) if (row[axis]) axisPasses[axis] = (axisPasses[axis] ?? 0) + 1;
      if (axes.every((axis) => row[axis])) strictPasses += 1;
    }
    return {
      caseId: benchmarkCase.id,
      status: statusFromPasses(strictPasses, repeats.length),
      passedRepeats: strictPasses,
      totalRepeats: repeats.length,
      passRate: strictPasses / repeats.length,
      axisRates: Object.fromEntries(axes.map((axis) => [axis, (axisPasses[axis] ?? 0) / repeats.length])),
    };
  }

  const required = benchmarkCase.requiredDimensions ?? [];
  const hard = new Set(benchmarkCase.hardGates ?? []);
  const values: Record<string, number[]> = Object.fromEntries(required.map((id) => [id, []]));
  let strictPasses = 0;
  for (const rawRepeat of repeats) {
    if (!isObject(rawRepeat) || !isObject(rawRepeat["dimensions"])) throw new Error("Semantic repeat must contain dimensions");
    const dimensions = rawRepeat["dimensions"];
    let ready = true;
    for (const id of required) {
      const value = dimensions[id];
      if (typeof value !== "number" || value < 0 || value > 3) throw new Error(`Invalid score for ${id}`);
      values[id]?.push(value);
      if (value < 2) ready = false;
      if (hard.has(id) && value < 2) ready = false;
    }
    const hardGateFailures = asStringArray(rawRepeat["hardGateFailures"]) ?? [];
    if (hardGateFailures.length > 0) ready = false;
    if (ready) strictPasses += 1;
  }
  return {
    caseId: benchmarkCase.id,
    status: statusFromPasses(strictPasses, repeats.length),
    passedRepeats: strictPasses,
    totalRepeats: repeats.length,
    passRate: strictPasses / repeats.length,
    dimensionMedians: Object.fromEntries(required.map((id) => [id, median(values[id] ?? [])])),
  };
}

export async function scoreResultFile(repositoryRoot: string, resultPath: string): Promise<ScoreSummary> {
  const root = resolve(repositoryRoot);
  const resultRaw = await readFile(resolve(resultPath), "utf8");
  const result: unknown = JSON.parse(resultRaw);
  if (!isObject(result) || typeof result["caseId"] !== "string") throw new Error("Result missing caseId");
  const entries = await discoverCases(root);
  const entry = entries.find((item) => item.case.id === result["caseId"]);
  if (!entry) throw new Error(`Unknown benchmark case: ${String(result["caseId"])}`);
  const expectedFingerprint = await caseFingerprint(root, entry);
  const suppliedFingerprint = result["caseFingerprint"];
  if (suppliedFingerprint !== undefined && suppliedFingerprint !== "AUTO" && suppliedFingerprint !== expectedFingerprint) {
    throw new Error(`STALE RESULT: case fingerprint changed for ${entry.case.id}`);
  }
  return scoreResultObject(entry.case, result);
}

function diagnosticResponseSchema(): string {
  return `Return the benchmark response as JSON with this shape:\n{\n  "defectClasses": ["..."],\n  "evidence": ["artifact-specific evidence"],\n  "owningArtifacts": ["artifact_type"],\n  "revisionScope": "exact scope from the case when possible",\n  "preserveViolations": [],\n  "boundaryViolations": [],\n  "unrelatedFindings": []\n}`;
}

function semanticResponseSchema(benchmarkCase: BenchmarkCase): string {
  return `After producing the requested artifact, have an independent reviewer return 0-3 scores for these dimensions:\n${(benchmarkCase.requiredDimensions ?? []).map((id) => `- ${id}`).join("\n")}\n\n0 = fail, 1 = material weakness, 2 = acceptable production quality, 3 = strong execution. Record any hard-gate failures separately.`;
}

async function main(): Promise<void> {
  const currentFile = fileURLToPath(import.meta.url);
  const repositoryRoot = resolve(dirname(currentFile), "..", "..");
  const args = process.argv.slice(2);
  const entries = await discoverCases(repositoryRoot);

  if (args.includes("--list")) {
    for (const entry of entries) console.log(`${entry.case.id}\t${entry.case.suite}\t${entry.case.capability}`);
    return;
  }

  const caseIndex = args.indexOf("--case");
  if (caseIndex >= 0) {
    const id = args[caseIndex + 1];
    if (!id) throw new Error("--case requires an id");
    const entry = entries.find((item) => item.case.id === id);
    if (!entry) throw new Error(`Unknown benchmark case: ${id}`);
    const prompt = await resolvePrompt(repositoryRoot, entry.case);
    const fingerprint = await caseFingerprint(repositoryRoot, entry);
    console.log(`# ${entry.case.id}`);
    console.log(`suite: ${entry.case.suite}`);
    console.log(`fingerprint: ${fingerprint}`);
    console.log("\n## Generation / diagnosis prompt\n");
    console.log(prompt);
    console.log("\n## Measurement contract\n");
    console.log(entry.case.suite === "diagnostic" ? diagnosticResponseSchema() : semanticResponseSchema(entry.case));
    return;
  }

  const scoreIndex = Math.max(args.indexOf("--score"), args.indexOf("--rescore"));
  if (scoreIndex >= 0) {
    const path = args[scoreIndex + 1];
    if (!path) throw new Error("--score/--rescore requires a result JSON path");
    console.log(JSON.stringify(await scoreResultFile(repositoryRoot, path), null, 2));
    return;
  }

  const validation = await validateBenchmark(repositoryRoot);
  console.log(`Benchmark cases: ${validation.caseCount}`);
  for (const suite of suites) console.log(`${suite}: ${validation.suiteCounts[suite]}`);
  for (const warning of validation.warnings) console.warn(`WARN: ${warning}`);
  if (validation.errors.length > 0) {
    for (const error of validation.errors) console.error(`ERROR: ${error}`);
    process.exitCode = 1;
    return;
  }
  console.log("Benchmark definition is valid.");
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
