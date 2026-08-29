import test from "node:test";
import assert from "node:assert/strict";
import { resolve } from "node:path";
import { validateRepository, expectedSkills } from "../scripts/validate-skills.js";

test("repository contains six valid self-contained skills", async () => {
  const result = await validateRepository(resolve(process.cwd()));
  assert.deepEqual(result.checkedSkills, expectedSkills);
  assert.deepEqual(result.errors, []);
});
