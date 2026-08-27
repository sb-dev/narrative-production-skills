import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { discoverCases, scoreResultObject, validateBenchmark } from "../tools/run-benchmark.js";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

test("benchmark definition covers all current examples and packs", async () => {
  const result = await validateBenchmark(repositoryRoot);
  assert.deepEqual(result.errors, []);
  assert.equal(result.caseCount, 32);
  assert.equal(result.suiteCounts.diagnostic, 10);
  assert.equal(result.suiteCounts.production, 5);
  assert.equal(result.suiteCounts.packs, 12);
  assert.equal(result.suiteCounts["pack-authoring"], 5);
});

test("semantic scorer distinguishes ready from failed outputs", async () => {
  const entries = await discoverCases(repositoryRoot);
  const benchmarkCase = entries.find((entry) => entry.case.id === "prod-level-1-short-story")?.case;
  if (!benchmarkCase) throw new Error("Missing prod-level-1-short-story benchmark case");
  const passing = JSON.parse(await readFile(resolve(repositoryRoot, "benchmarks/fixtures/scorer-pass.json"), "utf8")) as unknown;
  const failing = JSON.parse(await readFile(resolve(repositoryRoot, "benchmarks/fixtures/scorer-fail.json"), "utf8")) as unknown;
  assert.equal(scoreResultObject(benchmarkCase, passing).status, "PASS");
  assert.equal(scoreResultObject(benchmarkCase, failing).status, "FAIL");
});
