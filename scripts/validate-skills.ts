import { readFile, readdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, relative, resolve } from "node:path";

export const expectedSkills = [
  "narrative-develop",
  "narrative-write",
  "narrative-continuity",
  "narrative-evaluate",
  "narrative-revise",
] as const;

export interface ValidationResult {
  readonly errors: readonly string[];
  readonly checkedSkills: readonly string[];
}

async function isDirectory(path: string): Promise<boolean> {
  try {
    return (await stat(path)).isDirectory();
  } catch {
    return false;
  }
}

async function isFile(path: string): Promise<boolean> {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

function parseFrontmatter(markdown: string): Record<string, string> | null {
  const match = /^---\n([\s\S]*?)\n---(?:\n|$)/.exec(markdown);
  if (!match?.[1]) return null;

  const fields: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator <= 0) continue;
    fields[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }
  return fields;
}

async function collectTextFiles(directory: string): Promise<string[]> {
  const result: string[] = [];
  if (!(await isDirectory(directory))) return result;

  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      result.push(...(await collectTextFiles(path)));
    } else if (/\.(md|json|ya?ml|txt)$/i.test(entry.name)) {
      result.push(path);
    }
  }
  return result;
}

export async function validateRepository(repositoryRoot: string): Promise<ValidationResult> {
  const root = resolve(repositoryRoot);
  const errors: string[] = [];
  const checkedSkills: string[] = [];
  const skillsRoot = join(root, "skills");

  if (!(await isDirectory(skillsRoot))) {
    return { errors: ["Missing skills/ directory"], checkedSkills };
  }

  for (const skill of expectedSkills) {
    const skillRoot = join(skillsRoot, skill);
    checkedSkills.push(skill);

    if (!(await isDirectory(skillRoot))) {
      errors.push(`Missing skill directory: skills/${skill}`);
      continue;
    }

    const skillFile = join(skillRoot, "SKILL.md");
    const references = join(skillRoot, "references");
    const evalFile = join(skillRoot, "evals", "evals.json");

    if (!(await isFile(skillFile))) {
      errors.push(`Missing skills/${skill}/SKILL.md`);
      continue;
    }
    if (!(await isDirectory(references))) {
      errors.push(`Missing skills/${skill}/references/`);
    }
    if (!(await isFile(join(references, "artifacts.md")))) {
      errors.push(`Missing skills/${skill}/references/artifacts.md`);
    }
    if (!(await isFile(evalFile))) {
      errors.push(`Missing skills/${skill}/evals/evals.json`);
    }

    const markdown = await readFile(skillFile, "utf8");
    const frontmatter = parseFrontmatter(markdown);
    if (!frontmatter) {
      errors.push(`Invalid or missing frontmatter: skills/${skill}/SKILL.md`);
    } else {
      if (frontmatter["name"] !== skill) {
        errors.push(`Frontmatter name mismatch in skills/${skill}/SKILL.md`);
      }
      if (!frontmatter["description"]) {
        errors.push(`Missing frontmatter description in skills/${skill}/SKILL.md`);
      }
    }

    if (await isFile(evalFile)) {
      try {
        const parsed = JSON.parse(await readFile(evalFile, "utf8")) as unknown;
        if (!parsed || typeof parsed !== "object") {
          errors.push(`Eval file must contain an object: ${relative(root, evalFile)}`);
        }
      } catch (error) {
        errors.push(`Invalid JSON in ${relative(root, evalFile)}: ${String(error)}`);
      }
    }

    for (const file of await collectTextFiles(skillRoot)) {
      const content = await readFile(file, "utf8");
      if (/\.\.\/\.\.\/docs\//.test(content) || /(?:^|\s)\/docs\//m.test(content)) {
        errors.push(`Repository-level docs runtime dependency in ${relative(root, file)}`);
      }
    }
  }

  return { errors, checkedSkills };
}

async function main(): Promise<void> {
  const currentFile = fileURLToPath(import.meta.url);
  const scriptDirectory = dirname(currentFile);
  const repositoryRoot = resolve(scriptDirectory, "..", "..");
  const result = await validateRepository(repositoryRoot);

  console.log(`Validated ${result.checkedSkills.length} skills.`);
  if (result.errors.length > 0) {
    for (const error of result.errors) console.error(`ERROR: ${error}`);
    process.exitCode = 1;
    return;
  }
  console.log("Repository skill contract is valid.");
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
