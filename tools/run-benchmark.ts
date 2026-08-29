import { createHash } from "node:crypto";
import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const suites = ["diagnostic", "production", "packs", "pack-authoring"] as const;
type SuiteId = (typeof suites)[number];

/**
 * The six axes that gate a strict diagnostic pass (docs/04 section 9.2), and the full set that is
 * reported. `precision` is measured and reported in `axisRates` but deliberately excluded from
 * strict pass, because a reviewer may surface a second genuine defect the fixture did not seed
 * (docs/04 section 9.1).
 */
const diagnosticStrictAxes = ["detection", "evidence", "routing", "scope", "preservation", "boundary"] as const;
const diagnosticReportedAxes = [...diagnosticStrictAxes, "precision"] as const;
type DiagnosticAxis = (typeof diagnosticReportedAxes)[number];

type JsonObject = Record<string, unknown>;

export interface BenchmarkCase {
  readonly id: string;
  readonly suite: SuiteId;
  readonly capability: string;
  readonly skills: readonly string[];
  readonly rubric: string;
  /** Always populated: from the case file when present, otherwise the manifest suite default. */
  readonly defaultRepeats: number;
  readonly prompt?: string;
  readonly promptSource?: string;
  readonly requiredDimensions?: readonly string[];
  readonly hardGates?: readonly string[];
  readonly cleanControl?: boolean;
  readonly groundTruth?: BenchmarkGroundTruth;
}

export interface BenchmarkGroundTruth {
  readonly defectClasses?: readonly string[];
  readonly owningArtifacts?: readonly string[];
  readonly smallestSufficientScope?: readonly string[];
  readonly preserve?: readonly string[];
  readonly forbiddenChanges?: readonly string[];
}

/**
 * One recorded diagnosis, after parsing. Every field is required and typed: `scoreDiagnostic` reads
 * an empty list as "nothing to report", so a malformed or absent field would score its axis as a
 * pass. See `parseDiagnosis`.
 */
export interface RecordedDiagnosis {
  readonly defectClasses: readonly string[];
  readonly evidence: readonly string[];
  readonly owningArtifacts: readonly string[];
  readonly revisionScope: string;
  readonly preserveViolations: readonly string[];
  readonly boundaryViolations: readonly string[];
  readonly unrelatedFindings: readonly string[];
}

export interface BenchmarkManifest {
  readonly version: number;
  readonly suites: readonly {
    readonly id: SuiteId;
    readonly caseDirectory: string;
    readonly defaultRepeats: number;
  }[];
  readonly rubrics: Readonly<Record<string, string>>;
}

/** A rubric reduced to what the runner enforces: which dimension ids exist, and which are hard. */
export interface RubricDefinition {
  readonly id: string;
  readonly dimensionIds: readonly string[];
  readonly hardIds: readonly string[];
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
  readonly expectedRepeats: number;
  /** True when fewer repeats were recorded than the case requires; a baseline needs the full count. */
  readonly underRepeated: boolean;
  readonly passRate: number;
  readonly dimensionMedians?: Readonly<Record<string, number>>;
  readonly axisRates?: Readonly<Record<string, number>>;
}

export interface CaseEntry {
  readonly case: BenchmarkCase;
  readonly path: string;
  readonly raw: string;
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

function normalise(value: string): string {
  return value.trim().toLowerCase();
}

function sameSet(a: readonly string[], b: readonly string[]): boolean {
  const left = new Set(a);
  const right = new Set(b);
  return left.size === right.size && [...left].every((item) => right.has(item));
}

// -- Manifest -----------------------------------------------------------------------------------

export async function loadManifest(repositoryRoot: string): Promise<BenchmarkManifest> {
  const source = "benchmarks/manifest.json";
  const path = resolve(repositoryRoot, source);
  const value: unknown = JSON.parse(await readFile(path, "utf8"));
  if (!isObject(value)) throw new Error(`${source}: manifest must be an object`);

  const version = value["version"];
  if (typeof version !== "number") throw new Error(`${source}: version must be a number`);

  const rawSuites = value["suites"];
  if (!Array.isArray(rawSuites) || rawSuites.length === 0) {
    throw new Error(`${source}: suites must be a non-empty array`);
  }
  const parsedSuites = rawSuites.map((entry, index) => {
    if (!isObject(entry)) throw new Error(`${source}: suites[${index}] must be an object`);
    const id = entry["id"];
    const caseDirectory = entry["caseDirectory"];
    const defaultRepeats = entry["defaultRepeats"];
    if (typeof id !== "string" || !suites.includes(id as SuiteId)) {
      throw new Error(`${source}: suites[${index}].id is not a known suite: ${String(id)}`);
    }
    if (typeof caseDirectory !== "string" || !caseDirectory) {
      throw new Error(`${source}: suites[${index}].caseDirectory must be a non-empty string`);
    }
    if (typeof defaultRepeats !== "number" || !Number.isInteger(defaultRepeats) || defaultRepeats < 1) {
      throw new Error(`${source}: suites[${index}].defaultRepeats must be a positive integer`);
    }
    return { id: id as SuiteId, caseDirectory, defaultRepeats };
  });

  const rawRubrics = value["rubrics"];
  if (!isObject(rawRubrics)) throw new Error(`${source}: rubrics must be an object`);
  const rubrics: Record<string, string> = {};
  for (const [rubricId, rubricPath] of Object.entries(rawRubrics)) {
    if (typeof rubricPath !== "string" || !rubricPath) {
      throw new Error(`${source}: rubrics.${rubricId} must be a non-empty string`);
    }
    rubrics[rubricId] = rubricPath;
  }

  return { version, suites: parsedSuites, rubrics };
}

// -- Cases --------------------------------------------------------------------------------------

/**
 * Validates every field of `groundTruth`. The declared type is only true if the parser enforces it:
 * a bare object cast is how `smallestSufficientScope` came to be declared `string` while every case
 * file wrote an array, crashing the whole diagnostic suite.
 */
function parseGroundTruth(value: unknown, source: string): BenchmarkGroundTruth {
  if (!isObject(value)) throw new Error(`${source}: groundTruth must be an object`);
  const fields = ["defectClasses", "owningArtifacts", "smallestSufficientScope", "preserve", "forbiddenChanges"] as const;
  const known = new Set<string>(fields);
  for (const key of Object.keys(value)) {
    if (!known.has(key)) throw new Error(`${source}: unknown groundTruth field ${key}`);
  }
  const parsed: Record<string, readonly string[]> = {};
  for (const field of fields) {
    if (value[field] === undefined) continue;
    const items = asStringArray(value[field]);
    if (!items) throw new Error(`${source}: groundTruth.${field} must be an array of strings`);
    parsed[field] = items;
  }
  return parsed as BenchmarkGroundTruth;
}

function parseCase(value: unknown, source: string, suiteRepeats: ReadonlyMap<SuiteId, number>): BenchmarkCase {
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

  const suiteId = suite as SuiteId;
  const prompt = typeof value["prompt"] === "string" ? value["prompt"] : undefined;
  const promptSource = typeof value["promptSource"] === "string" ? value["promptSource"] : undefined;
  if ((prompt ? 1 : 0) + (promptSource ? 1 : 0) !== 1) {
    throw new Error(`${source}: define exactly one of prompt or promptSource`);
  }

  const requiredDimensions = value["requiredDimensions"] === undefined ? undefined : asStringArray(value["requiredDimensions"]);
  if (value["requiredDimensions"] !== undefined && !requiredDimensions) {
    throw new Error(`${source}: requiredDimensions must be an array of strings`);
  }
  const hardGates = value["hardGates"] === undefined ? undefined : asStringArray(value["hardGates"]);
  if (value["hardGates"] !== undefined && !hardGates) {
    throw new Error(`${source}: hardGates must be an array of strings`);
  }

  const rawRepeats = value["defaultRepeats"];
  if (rawRepeats !== undefined && (typeof rawRepeats !== "number" || !Number.isInteger(rawRepeats) || rawRepeats < 1)) {
    throw new Error(`${source}: defaultRepeats must be a positive integer`);
  }
  const defaultRepeats = rawRepeats ?? suiteRepeats.get(suiteId);
  if (defaultRepeats === undefined) throw new Error(`${source}: no defaultRepeats for suite ${suiteId}`);

  const rawCleanControl = value["cleanControl"];
  if (rawCleanControl !== undefined && typeof rawCleanControl !== "boolean") {
    throw new Error(`${source}: cleanControl must be a boolean`);
  }

  const groundTruth = value["groundTruth"] === undefined ? undefined : parseGroundTruth(value["groundTruth"], source);

  return {
    id,
    suite: suiteId,
    capability,
    skills,
    rubric,
    defaultRepeats,
    ...(prompt ? { prompt } : {}),
    ...(promptSource ? { promptSource } : {}),
    ...(requiredDimensions ? { requiredDimensions } : {}),
    ...(hardGates ? { hardGates } : {}),
    ...(rawCleanControl !== undefined ? { cleanControl: rawCleanControl } : {}),
    ...(groundTruth ? { groundTruth } : {}),
  };
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

export async function discoverCases(repositoryRoot: string): Promise<CaseEntry[]> {
  const root = resolve(repositoryRoot);
  const manifest = await loadManifest(root);
  const suiteRepeats = new Map(manifest.suites.map((suite) => [suite.id, suite.defaultRepeats]));
  const casesRoot = join(root, "benchmarks", "cases");
  const result: CaseEntry[] = [];
  for (const path of await walkJson(casesRoot)) {
    const raw = await readFile(path, "utf8");
    const parsed: unknown = JSON.parse(raw);
    result.push({ case: parseCase(parsed, relative(root, path), suiteRepeats), path, raw });
  }
  return result;
}

// -- Prompts and rubrics ------------------------------------------------------------------------

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

function rubricPath(repositoryRoot: string, manifest: BenchmarkManifest, rubricId: string): string {
  const declared = manifest.rubrics[rubricId];
  if (!declared) throw new Error(`benchmarks/manifest.json: no rubric registered for ${rubricId}`);
  return resolve(repositoryRoot, declared);
}

export function parseRubric(value: unknown, source: string): RubricDefinition {
  if (!isObject(value)) throw new Error(`${source}: rubric must be an object`);
  const id = value["id"];
  if (typeof id !== "string" || !id) throw new Error(`${source}: rubric missing id`);

  const axes = value["axes"];
  if (Array.isArray(axes)) {
    const dimensionIds = axes.map((axis, index) => {
      if (!isObject(axis) || typeof axis["id"] !== "string") throw new Error(`${source}: axes[${index}] missing id`);
      return axis["id"];
    });
    const strict = asStringArray(value["strict"]);
    if (!strict || strict.length === 0) throw new Error(`${source}: rubric with axes must declare a non-empty strict array`);
    return { id, dimensionIds, hardIds: strict };
  }

  const dimensions = value["dimensions"];
  if (!Array.isArray(dimensions) || dimensions.length === 0) {
    throw new Error(`${source}: rubric must declare axes or dimensions`);
  }
  const dimensionIds: string[] = [];
  const hardIds: string[] = [];
  dimensions.forEach((dimension, index) => {
    if (!isObject(dimension) || typeof dimension["id"] !== "string") {
      throw new Error(`${source}: dimensions[${index}] missing id`);
    }
    dimensionIds.push(dimension["id"]);
    if (dimension["kind"] === "hard") hardIds.push(dimension["id"]);
  });
  return { id, dimensionIds, hardIds };
}

async function loadRubric(
  repositoryRoot: string,
  manifest: BenchmarkManifest,
  rubricId: string,
): Promise<{ definition: RubricDefinition; raw: string }> {
  const path = rubricPath(repositoryRoot, manifest, rubricId);
  const raw = await readFile(path, "utf8");
  return { definition: parseRubric(JSON.parse(raw), relative(repositoryRoot, path)), raw };
}

export async function caseFingerprint(repositoryRoot: string, entry: { case: BenchmarkCase; raw: string }): Promise<string> {
  const root = resolve(repositoryRoot);
  const manifest = await loadManifest(root);
  const prompt = await resolvePrompt(root, entry.case);
  const { raw: rubricRaw } = await loadRubric(root, manifest, entry.case.rubric);
  return createHash("sha256")
    .update(entry.raw)
    .update("\0")
    .update(prompt)
    .update("\0")
    .update(rubricRaw)
    .digest("hex");
}

// -- Validation ---------------------------------------------------------------------------------

async function listDirectories(path: string): Promise<string[]> {
  if (!(await isDirectory(path))) return [];
  const entries = await readdir(path, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

export async function validateBenchmark(repositoryRoot: string): Promise<BenchmarkValidation> {
  const root = resolve(repositoryRoot);
  const errors: string[] = [];
  const warnings: string[] = [];
  const counts: Record<SuiteId, number> = { diagnostic: 0, production: 0, packs: 0, "pack-authoring": 0 };

  let manifest: BenchmarkManifest;
  let entries: CaseEntry[];
  try {
    manifest = await loadManifest(root);
    entries = await discoverCases(root);
  } catch (error) {
    return { errors: [String(error)], warnings, caseCount: 0, suiteCounts: counts };
  }

  // The manifest is the declared shape of the benchmark; the compiled suite union is what the
  // runner can actually score. If they drift, one of them is lying about what CI measures.
  if (!sameSet(manifest.suites.map((suite) => suite.id), [...suites])) {
    errors.push(`Manifest suites do not match the runner's suites: ${manifest.suites.map((suite) => suite.id).join(", ")}`);
  }
  const caseDirectories = new Map(manifest.suites.map((suite) => [suite.id, suite.caseDirectory]));

  // Cached including failures, so one broken rubric reports once rather than once per case.
  const rubricCache = new Map<string, RubricDefinition | null>();
  async function rubricFor(rubricId: string): Promise<RubricDefinition | null> {
    const cached = rubricCache.get(rubricId);
    if (cached !== undefined) return cached;
    try {
      const { definition } = await loadRubric(root, manifest, rubricId);
      rubricCache.set(rubricId, definition);
      return definition;
    } catch (error) {
      rubricCache.set(rubricId, null);
      errors.push(`rubric ${rubricId}: ${String(error)}`);
      return null;
    }
  }

  const ids = new Set<string>();
  const promptSources = new Set<string>();
  for (const entry of entries) {
    const c = entry.case;
    counts[c.suite] += 1;
    if (ids.has(c.id)) errors.push(`Duplicate benchmark case id: ${c.id}`);
    ids.add(c.id);

    const expectedDirectory = caseDirectories.get(c.suite);
    const actualDirectory = dirname(relative(root, entry.path));
    if (expectedDirectory && actualDirectory !== expectedDirectory) {
      errors.push(`${c.id}: lives in ${actualDirectory} but suite ${c.suite} is declared as ${expectedDirectory}`);
    }

    const rubric = await rubricFor(c.rubric);

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

    const hardGates = c.hardGates ?? [];
    if (hardGates.length === 0) errors.push(`${c.id}: case missing hardGates`);

    if (c.suite === "diagnostic") {
      if (!c.groundTruth) errors.push(`${c.id}: diagnostic case missing groundTruth`);
      else {
        // Absent is not permissive: scoreDiagnostic reads a missing owner or scope as "expect
        // nothing", which inverts routing and scope so that refusing to answer passes. Both are
        // required; a case that legitimately expects no correction says so with ["none"].
        for (const field of ["owningArtifacts", "smallestSufficientScope"] as const) {
          if ((c.groundTruth[field] ?? []).length === 0) {
            errors.push(
              `${c.id}: diagnostic groundTruth.${field} must be non-empty (use ["none"] when nothing should change)`,
            );
          }
        }
        // `defectClasses` is the third axis with the same hole: detection is
        // `expectedDefects.every(...)`, which is vacuously true over an empty list, so a defect case
        // that omits it scores detection as a pass on every repeat — including one that found
        // nothing. A clean control is the inverse: it must declare none.
        const declaredDefects = c.groundTruth.defectClasses ?? [];
        if (c.cleanControl === true) {
          if (declaredDefects.length > 0) {
            errors.push(`${c.id}: clean control must not declare groundTruth.defectClasses`);
          }
        } else if (declaredDefects.length === 0) {
          errors.push(`${c.id}: diagnostic groundTruth.defectClasses must be non-empty for a defect case`);
        }
      }
      if (rubric && hardGates.length > 0 && !sameSet(hardGates, rubric.hardIds)) {
        errors.push(`${c.id}: hardGates must equal the ${c.rubric} rubric's strict axes (${rubric.hardIds.join(", ")})`);
      }
    } else {
      const required = c.requiredDimensions ?? [];
      if (required.length === 0) errors.push(`${c.id}: semantic case missing requiredDimensions`);
      if (rubric) {
        const known = new Set(rubric.dimensionIds);
        for (const dimension of required) {
          if (!known.has(dimension)) errors.push(`${c.id}: requiredDimensions contains unknown dimension ${dimension}`);
        }
        const expectedHard = rubric.hardIds.filter((dimension) => required.includes(dimension));
        if (required.length > 0 && !sameSet(hardGates, expectedHard)) {
          errors.push(
            `${c.id}: hardGates must equal the ${c.rubric} rubric's hard dimensions present in requiredDimensions (${expectedHard.join(", ")})`,
          );
        }
      }
    }
  }

  // The scorer computes these axes by hand, so the rubric must not silently declare others.
  const diagnosticRubric = await rubricFor("diagnostic");
  if (diagnosticRubric) {
    if (!sameSet(diagnosticRubric.dimensionIds, [...diagnosticReportedAxes])) {
      errors.push(`diagnostic rubric axes must match the scored axes (${diagnosticReportedAxes.join(", ")})`);
    }
    if (!sameSet(diagnosticRubric.hardIds, [...diagnosticStrictAxes])) {
      errors.push(`diagnostic rubric strict axes must match the strict-pass axes (${diagnosticStrictAxes.join(", ")})`);
    }
  }

  const coreExampleDirs = (await listDirectories(join(root, "examples"))).filter((name) => /^level-[1-5]-/.test(name));
  for (const directory of coreExampleDirs) {
    const source = `examples/${directory}/README.md`;
    if (!promptSources.has(source)) errors.push(`Core example is not benchmarked: ${source}`);
  }

  const extensionPackDirs = await listDirectories(join(root, "examples", "extension-packs"));
  for (const directory of extensionPackDirs) {
    const source = `examples/extension-packs/${directory}/README.md`;
    if (!promptSources.has(source)) errors.push(`Extension-pack showcase is not benchmarked: ${source}`);
  }

  if (counts.diagnostic < 2) errors.push("Diagnostic suite must contain a defect and a clean control");
  if (!entries.some((entry) => entry.case.suite === "diagnostic" && entry.case.cleanControl === true)) {
    errors.push("Diagnostic suite has no clean control");
  }
  if (counts.production !== coreExampleDirs.length) {
    errors.push(`Production benchmark cases (${counts.production}) differ from core example count (${coreExampleDirs.length})`);
  }
  if (counts.packs !== extensionPackDirs.length) {
    errors.push(`Pack benchmark cases (${counts.packs}) differ from extension-pack example count (${extensionPackDirs.length})`);
  }

  return { errors, warnings, caseCount: entries.length, suiteCounts: counts };
}

// -- Scoring ------------------------------------------------------------------------------------

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

/** Identifier comparisons are normalised, so casing and stray whitespace are not scored as errors. */
function normalisedSet(values: readonly string[]): Set<string> {
  return new Set(values.map(normalise));
}

const diagnosisListFields = [
  "defectClasses",
  "evidence",
  "owningArtifacts",
  "preserveViolations",
  "boundaryViolations",
  "unrelatedFindings",
] as const;

/**
 * Every field of a recorded diagnosis must be present and correctly typed. `asStringArray(x) ?? []`
 * turns a type error into "nothing to report", and for `preserveViolations`, `boundaryViolations`
 * and `unrelatedFindings` that reads as a pass on every diagnostic case — so the bare-string typo
 * that was rejected for `hardGateFailures` published a false green here instead. Absent is not
 * permissive either: an omitted field is indistinguishable from an unchecked one, and the response
 * schema asks for all seven. Report nothing found as `[]`, and no correction as `"none"`.
 */
function parseDiagnosis(value: unknown, context: string): RecordedDiagnosis {
  if (!isObject(value)) throw new Error(`${context}: diagnosis must be an object`);
  const list = (name: (typeof diagnosisListFields)[number]): readonly string[] => {
    const raw = value[name];
    if (raw === undefined) throw new Error(`${context}: diagnosis is missing ${name} (report none as [])`);
    const items = asStringArray(raw);
    if (!items) throw new Error(`${context}: diagnosis.${name} must be an array of strings`);
    return items;
  };
  const revisionScope = value["revisionScope"];
  if (typeof revisionScope !== "string") {
    throw new Error(`${context}: diagnosis.revisionScope must be a string (use "none" when nothing should change)`);
  }
  return {
    defectClasses: list("defectClasses"),
    evidence: list("evidence"),
    owningArtifacts: list("owningArtifacts"),
    revisionScope,
    preserveViolations: list("preserveViolations"),
    boundaryViolations: list("boundaryViolations"),
    unrelatedFindings: list("unrelatedFindings"),
  };
}

function scoreDiagnostic(benchmarkCase: BenchmarkCase, repeats: readonly unknown[]): ScoreSummary {
  const ground = benchmarkCase.groundTruth ?? {};
  const axisPasses: Record<string, number> = Object.fromEntries(diagnosticReportedAxes.map((axis) => [axis, 0]));
  let strictPasses = 0;

  const expectedDefects = (ground.defectClasses ?? []).map(normalise);
  // `every` over an empty list is true, so a defect case with no expected defect classes cannot
  // fail detection. validateBenchmark rejects such a case; refuse to score one here too rather than
  // report a pass that measured nothing.
  if (benchmarkCase.cleanControl !== true && expectedDefects.length === 0) {
    throw new Error(`${benchmarkCase.id}: defect case declares no groundTruth.defectClasses, so detection cannot fail`);
  }

  repeats.forEach((rawRepeat, index) => {
    if (!isObject(rawRepeat)) throw new Error(`${benchmarkCase.id} repeat ${index + 1}: repeat must be an object`);
    const diagnosis = parseDiagnosis(rawRepeat["diagnosis"], `${benchmarkCase.id} repeat ${index + 1}`);

    const foundDefects = normalisedSet(diagnosis.defectClasses);
    const detection =
      benchmarkCase.cleanControl === true
        ? foundDefects.size === 0
        : expectedDefects.every((item) => foundDefects.has(item));

    const evidence = diagnosis.evidence.length > 0;

    // `owningArtifacts` is the SET of artifacts a correct routing may name for this defect; it is
    // not ordered root-cause-first. In several cases the authoritative artifact — the one in the
    // preserve set, which must not change — is listed alongside the one the correction belongs to
    // (world_bible before beat_sheet, continuity_record before narrative_draft), so requiring a
    // particular entry would fail the correct answer. See benchmarks/README.md.
    const owners = normalisedSet(diagnosis.owningArtifacts);
    const expectedOwners = (ground.owningArtifacts ?? []).map(normalise);
    const routing =
      expectedOwners.length === 0 || expectedOwners.includes("none")
        ? owners.size === 0 || owners.has("none")
        : expectedOwners.some((owner) => owners.has(owner));

    const expectedScopes = (ground.smallestSufficientScope ?? []).map(normalise);
    const actualScope = normalise(diagnosis.revisionScope);
    const scope =
      expectedScopes.length === 0 || expectedScopes.includes("none")
        ? actualScope === "none" || actualScope === ""
        : expectedScopes.includes(actualScope);

    const preservation = diagnosis.preserveViolations.length === 0;
    const boundary = diagnosis.boundaryViolations.length === 0;
    const precision = diagnosis.unrelatedFindings.length === 0;

    const row: Record<DiagnosticAxis, boolean> = {
      detection,
      evidence,
      routing,
      scope,
      preservation,
      boundary,
      precision,
    };
    for (const axis of diagnosticReportedAxes) if (row[axis]) axisPasses[axis] = (axisPasses[axis] ?? 0) + 1;
    if (diagnosticStrictAxes.every((axis) => row[axis])) strictPasses += 1;
  });

  return {
    caseId: benchmarkCase.id,
    status: statusFromPasses(strictPasses, repeats.length),
    passedRepeats: strictPasses,
    totalRepeats: repeats.length,
    expectedRepeats: benchmarkCase.defaultRepeats,
    underRepeated: repeats.length < benchmarkCase.defaultRepeats,
    passRate: strictPasses / repeats.length,
    axisRates: Object.fromEntries(
      diagnosticReportedAxes.map((axis) => [axis, (axisPasses[axis] ?? 0) / repeats.length]),
    ),
  };
}

function scoreSemantic(benchmarkCase: BenchmarkCase, repeats: readonly unknown[]): ScoreSummary {
  const required = benchmarkCase.requiredDimensions ?? [];
  const values: Record<string, number[]> = Object.fromEntries(required.map((id) => [id, []]));
  let strictPasses = 0;

  for (const rawRepeat of repeats) {
    if (!isObject(rawRepeat) || !isObject(rawRepeat["dimensions"])) {
      throw new Error("Semantic repeat must contain dimensions");
    }
    const dimensions = rawRepeat["dimensions"];
    // docs/04 section 10.4: ready = no hard-gate failure AND every required dimension >= 2.
    // Hard gates are therefore not a second threshold on the same score; they arrive separately
    // as `hardGateFailures`, and validateBenchmark keeps `hardGates` aligned with the rubric.
    let ready = true;
    for (const id of required) {
      const value = dimensions[id];
      if (typeof value !== "number" || value < 0 || value > 3) throw new Error(`Invalid score for ${id}`);
      values[id]?.push(value);
      if (value < 2) ready = false;
    }
    // A malformed value must throw rather than read as "no gate failed": scoring a hard-gate
    // failure as PASS is the one shape of bad input that publishes a false green.
    const rawFailures = rawRepeat["hardGateFailures"];
    const hardGateFailures = rawFailures === undefined ? [] : asStringArray(rawFailures);
    if (!hardGateFailures) throw new Error("hardGateFailures must be an array of strings");
    if (hardGateFailures.length > 0) ready = false;
    if (ready) strictPasses += 1;
  }

  return {
    caseId: benchmarkCase.id,
    status: statusFromPasses(strictPasses, repeats.length),
    passedRepeats: strictPasses,
    totalRepeats: repeats.length,
    expectedRepeats: benchmarkCase.defaultRepeats,
    underRepeated: repeats.length < benchmarkCase.defaultRepeats,
    passRate: strictPasses / repeats.length,
    dimensionMedians: Object.fromEntries(required.map((id) => [id, median(values[id] ?? [])])),
  };
}

export function scoreResultObject(benchmarkCase: BenchmarkCase, result: unknown): ScoreSummary {
  if (!isObject(result)) throw new Error("Result must be an object");
  if (result["caseId"] !== benchmarkCase.id) throw new Error(`Result caseId does not match ${benchmarkCase.id}`);
  const repeats = result["repeats"];
  if (!Array.isArray(repeats) || repeats.length === 0) throw new Error("Result must contain repeats");
  return benchmarkCase.suite === "diagnostic"
    ? scoreDiagnostic(benchmarkCase, repeats)
    : scoreSemantic(benchmarkCase, repeats);
}

export async function scoreResultFile(repositoryRoot: string, resultPath: string): Promise<ScoreSummary> {
  const root = resolve(repositoryRoot);
  const resultRaw = await readFile(resolve(resultPath), "utf8");
  const result: unknown = JSON.parse(resultRaw);
  if (!isObject(result) || typeof result["caseId"] !== "string") throw new Error("Result missing caseId");
  const entries = await discoverCases(root);
  const entry = entries.find((item) => item.case.id === result["caseId"]);
  if (!entry) throw new Error(`Unknown benchmark case: ${String(result["caseId"])}`);

  // docs/04 section 13.1 lists the case fingerprint as required evidence. Treating an absent
  // fingerprint as "nothing to check" is what let an old result file skip staleness detection.
  const suppliedFingerprint = result["caseFingerprint"];
  if (suppliedFingerprint === undefined) {
    throw new Error(`Result missing caseFingerprint for ${entry.case.id} (use "AUTO" only for deliberate local iteration)`);
  }
  if (suppliedFingerprint === "AUTO") {
    console.warn(`WARN: ${entry.case.id}: caseFingerprint is AUTO, so staleness was not checked`);
  } else {
    const expectedFingerprint = await caseFingerprint(root, entry);
    if (suppliedFingerprint !== expectedFingerprint) {
      throw new Error(`STALE RESULT: case fingerprint changed for ${entry.case.id}`);
    }
  }

  const summary = scoreResultObject(entry.case, result);
  if (summary.underRepeated) {
    console.warn(
      `WARN: ${entry.case.id}: ${summary.totalRepeats} repeat(s) recorded but ${summary.expectedRepeats} are required; this is not a baseline`,
    );
  }
  return summary;
}

// -- CLI ----------------------------------------------------------------------------------------

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

  const scoreIndex = Math.max(args.indexOf("--score"), args.indexOf("--rescore"));
  if (scoreIndex >= 0) {
    const path = args[scoreIndex + 1];
    if (!path) throw new Error("--score/--rescore requires a result JSON path");
    console.log(JSON.stringify(await scoreResultFile(repositoryRoot, path), null, 2));
    return;
  }

  if (args.includes("--list")) {
    for (const entry of await discoverCases(repositoryRoot)) {
      console.log(`${entry.case.id}\t${entry.case.suite}\t${entry.case.capability}`);
    }
    return;
  }

  const caseIndex = args.indexOf("--case");
  if (caseIndex >= 0) {
    const id = args[caseIndex + 1];
    if (!id) throw new Error("--case requires an id");
    const entry = (await discoverCases(repositoryRoot)).find((item) => item.case.id === id);
    if (!entry) throw new Error(`Unknown benchmark case: ${id}`);
    const prompt = await resolvePrompt(repositoryRoot, entry.case);
    const fingerprint = await caseFingerprint(repositoryRoot, entry);
    console.log(`# ${entry.case.id}`);
    console.log(`suite: ${entry.case.suite}`);
    console.log(`repeats: ${entry.case.defaultRepeats}`);
    console.log(`fingerprint: ${fingerprint}`);
    console.log("\n## Generation / diagnosis prompt\n");
    console.log(prompt);
    console.log("\n## Measurement contract\n");
    console.log(entry.case.suite === "diagnostic" ? diagnosticResponseSchema() : semanticResponseSchema(entry.case));
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
