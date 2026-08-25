import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { spawnSync } from "node:child_process";
import { expectedSkills } from "./validate-skills.js";

function run(command: string, args: readonly string[], cwd: string): void {
  const result = spawnSync(command, [...args], {
    cwd,
    stdio: "inherit",
    shell: false,
    env: process.env,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed with exit code ${String(result.status)}`);
  }
}

function parseAgent(argv: readonly string[]): string {
  const index = argv.indexOf("--agent");
  if (index < 0) return "claude-code";
  const agent = argv[index + 1];
  if (!agent || agent.startsWith("--")) {
    throw new Error("--agent requires a value");
  }
  return agent;
}

async function main(): Promise<void> {
  const currentFile = fileURLToPath(import.meta.url);
  const repositoryRoot = resolve(dirname(currentFile), "..", "..");
  const agent = parseAgent(process.argv.slice(2));

  run("npx", ["skills", "add", repositoryRoot, "--list"], repositoryRoot);

  for (const skill of expectedSkills) {
    const consumer = await mkdtemp(join(tmpdir(), `narrative-skills-${skill}-`));
    try {
      run("git", ["init", "-q", "-b", "main"], consumer);
      run(
        "npx",
        ["skills", "add", repositoryRoot, "--skill", skill, "--agent", agent],
        consumer,
      );
    } finally {
      await rm(consumer, { recursive: true, force: true });
    }
  }

  console.log(`All intended skills passed local clean-project installation smoke tests for ${agent}.`);
}

await main();
