# Implementation Prompt — Decompose Narrative Production Skills into Testable Commands

Implement the command decomposition defined by the updated Narrative Production Skills specifications in this repository.

Work directly in the existing `narrative-production-skills` repository. Do not redesign the project. Preserve the existing public skill catalogue, artifact model, examples, extension-pack catalogue, and provider-neutral architecture.

## Source of truth

Read these files before changing code or skill content:

```text
docs/01-creative-skills-system-spec.md
docs/02-creative-skills-workflows-and-artifacts-spec.md
docs/03-creative-skills-repository-and-contracts-spec.md
docs/04-testing-and-benchmark-spec.md
docs/05-customisation-packs-spec.md
docs/06-extension-pack-catalogue.md
docs/extraction-candidates.md
```

Also inspect the current:

```text
skills/*/SKILL.md
skills/*/references/
skills/*/evals/evals.json
scripts/validate-skills.ts
tools/run-benchmark.ts
tests/
package.json
```

The specifications are authoritative. Reuse the existing skill language and artifact semantics rather than inventing a parallel workflow.

## Goal

Keep the six current installable skills:

```text
narrative-develop
narrative-write
narrative-continuity
narrative-evaluate
narrative-revise
narrative-pack-create
```

Decompose their internal behaviour into **29 skill-local commands** so that individual production operations can be tested and debugged independently.

The architecture must remain:

```text
user / calling agent
→ installable skill
→ SKILL.md orchestration
→ one or more skill-local command contracts
→ existing references/artifacts/host model
```

Commands are **not** independently installable Agent Skills.

Do not add a command runtime, command registry service, workflow engine, provider SDK, MCP dependency, model router, database, or cross-skill function API.

## 1. Create the command files

Create exactly this initial command catalogue unless a contradiction in the existing specs makes one impossible. If that happens, make the smallest correction and document it rather than silently inventing a different architecture.

```text
skills/narrative-develop/commands/
├── concept.md       # develop:concept
├── character.md     # develop:character
├── world.md         # develop:world
├── outline.md       # develop:outline
├── beats.md         # develop:beats
├── scene-plan.md    # develop:scene-plan
└── select.md        # develop:select

skills/narrative-write/commands/
├── rough-scene.md   # write:rough-scene
├── refine-scene.md  # write:refine-scene
├── prose.md         # write:prose
├── screenplay.md    # write:screenplay
└── discovery.md     # write:discovery

skills/narrative-continuity/commands/
├── check.md         # continuity:check
├── update.md        # continuity:update
├── context.md       # continuity:context
└── impact.md        # continuity:impact

skills/narrative-evaluate/commands/
├── artifact.md      # evaluate:artifact
├── scene.md         # evaluate:scene
├── draft.md         # evaluate:draft
└── readiness.md     # evaluate:readiness

skills/narrative-revise/commands/
├── diagnose.md      # revise:diagnose
├── plan.md          # revise:plan
├── apply.md         # revise:apply
└── verify.md        # revise:verify

skills/narrative-pack-create/commands/
├── inspect.md       # pack:inspect
├── create.md        # pack:create
├── example.md       # pack:example
├── evals.md         # pack:evals
└── validate.md      # pack:validate
```

## 2. Use one command contract

Every command file must use this structure:

```markdown
# <logical-command-name>

## Purpose

## Inputs

## Reads

## Produces

## Must

## Must Not

## Completion
```

Rules:

- `Purpose` defines one independently useful operation.
- `Inputs` names explicit inputs required from the caller/workflow.
- `Reads` names only local artifacts/references/context that are needed.
- `Produces` names the output artifact/state, or states that the command is diagnostic-only.
- `Must` contains observable production requirements.
- `Must Not` contains boundaries, preservation rules, and forbidden side effects.
- `Completion` says what must be true before control returns to `SKILL.md`.
- Do not add Agent Skills frontmatter to command files.
- Do not reference repository-level `/docs` at runtime.
- Reuse the owning skill's existing local references rather than copying large amounts of craft guidance into command files.

Keep each command concise. It is an execution contract, not another skill manual.

## 3. Preserve the intended command boundaries

Use the existing specifications and skill references to implement these responsibilities.

### `narrative-develop`

```text
develop:concept
→ create/refine concept candidates at concept resolution

develop:character
→ create/refine story-relevant character profiles

develop:world
→ create/refine story-relevant world rules and constraints

develop:outline
→ create/refine the causal low-resolution complete story

develop:beats
→ turn relevant story structure into meaningful narrative changes

develop:scene-plan
→ create/refine scene cards with entry state, objective, conflict, turn and exit state

develop:select
→ compare supplied candidates, select/recommend using the governing brief, preserve rejected candidates, never silently approve
```

### `narrative-write`

```text
write:rough-scene
→ execute a scene cheaply enough to test dramatic function

write:refine-scene
→ improve an existing scene while preserving approved outcome/constraints

write:prose
→ execute approved narrative material in prose/manuscript form

write:screenplay
→ execute approved narrative material in screenplay form without taking over visual production

write:discovery
→ use controlled exploratory writing to discover candidate upstream decisions; discoveries remain candidates until promoted
```

Do not create a standalone dialogue command initially. Dialogue remains scene-context behaviour.

### `narrative-continuity`

```text
continuity:check
→ detect contradictions, knowledge leaks, chronology/state conflicts and world-rule violations

continuity:update
→ update continuity state after approved narrative establishes or supersedes facts

continuity:context
→ assemble the smallest relevant context for a task while preserving planned/canonical/belief/secret distinctions

continuity:impact
→ identify downstream material potentially affected by an upstream change
```

### `narrative-evaluate`

```text
evaluate:artifact
→ evaluate non-scene planning/development artifacts at their own resolution

evaluate:scene
→ diagnose scene-level dramatic and continuity quality without rewriting

evaluate:draft
→ developmental evaluation of partial/complete manuscript or screenplay drafts

evaluate:readiness
→ determine whether an artifact is ready to progress to the next lifecycle/production stage
```

Evaluation commands diagnose only. They must not silently perform revision.

### `narrative-revise`

```text
revise:diagnose
→ identify root cause and owning artifact from supplied feedback/findings/material

revise:plan
→ produce the smallest sufficient revision plan including preserve/change/verify sets; do not rewrite

revise:apply
→ execute an approved/supplied revision plan only across affected material

revise:verify
→ verify the requested correction, preservation constraints, downstream consistency and regressions
```

The skill must support direct entry:

```text
existing approved revision plan
→ revise:apply
→ revise:verify
```

Do not re-diagnose or re-plan simply to preserve a fixed sequence.

### `narrative-pack-create`

```text
pack:inspect
→ inspect catalogue/current pack and decide reuse, refine, or create

pack:create
→ create/refine the coherent pack contract and self-contained package

pack:example
→ create the showcase README with the exact copyable generation prompt

pack:evals
→ create behavioural evals that make pack behaviour falsifiable

pack:validate
→ verify completeness, self-containment, precedence, boundaries, voice safety, showcase/eval presence and catalogue readiness
```

Support direct entry for existing packs, for example:

```text
existing pack missing evals
→ pack:evals
→ pack:validate
```

## 4. Turn each `SKILL.md` into the orchestrator

Do not replace the existing skill contracts.

For every installable skill:

1. keep its frontmatter and public activation semantics;
2. add a concise `## Commands` section;
3. link every local command file;
4. explain how the skill chooses commands;
5. explain common sequences;
6. explain direct-entry/re-entry behaviour;
7. preserve lifecycle, approval, continuity, pack precedence and project-boundary rules;
8. avoid loading every command for every request when only one is needed.

The user-facing interface remains the skill.

Normal use should still look like:

```text
Use narrative-revise to fix the structural problems in this story.
```

not:

```text
Run revise:diagnose, then revise:plan, then revise:apply...
```

Commands are primarily implementation units, orchestration primitives and test units.

## 5. Add command-level eval fixtures

Create:

```text
skills/<skill>/evals/commands/<command>.json
```

for all 29 commands.

Use this minimum JSON shape unless the existing repository has a stronger compatible convention:

```json
{
  "skill": "narrative-revise",
  "command": "revise:plan",
  "version": 1,
  "cases": [
    {
      "id": "revise-plan-normal",
      "case": "normal",
      "prompt": "...",
      "expected": ["..."],
      "forbidden": ["..."]
    },
    {
      "id": "revise-plan-boundary",
      "case": "boundary",
      "prompt": "...",
      "expected": ["..."],
      "forbidden": ["..."]
    }
  ]
}
```

Every command must have at least:

```text
1 normal case
+
1 boundary / must-not case
```

Therefore the initial implementation must contain at least:

```text
29 command files
58 command eval cases
```

Add more cases only where the command's semantics require them. Do not inflate counts for symmetry.

Important command eval examples:

```text
develop:select
→ selected candidate is used
→ rejected candidate remains rejected
→ selected is not silently promoted to approved

continuity:context
→ relevant canonical facts included
→ character beliefs remain beliefs
→ planned events do not become canon
→ unrelated lore omitted

revise:plan
→ root cause and smallest scope identified
→ preserve set explicit
→ no narrative rewrite occurs

revise:apply
→ preserve set survives exactly where technically significant
→ unaffected approved material is not regenerated

pack:inspect
→ reuses/refines a materially equivalent existing pack instead of creating needless duplication

pack:validate
→ rejects embedded credentials, missing showcase prompt, missing evals, or repository-level runtime dependencies
```

## 6. Strengthen skill-orchestration evals

Keep the existing `skills/<skill>/evals/evals.json` lifecycle cases.

Add orchestration coverage so each skill proves at least:

```text
normal multi-command path
+
direct-entry / skip case
```

Examples:

```text
narrative-develop
brief → concept → select → outline

narrative-develop direct entry
existing candidates → select only

narrative-revise
finding → diagnose → plan → apply → verify

narrative-revise direct entry
approved revision plan → apply → verify

narrative-pack-create
need → inspect → create → example → evals → validate

narrative-pack-create direct entry
existing pack → validate only
```

A command may pass while orchestration fails. Keep those results separable.

## 7. Update deterministic repository validation

Extend `scripts/validate-skills.ts`.

Define one explicit expected command map in TypeScript for the 29 commands.

Validation must fail when:

- a required `commands/` directory is missing;
- a required command file is missing;
- a command's H1 logical name does not match the expected logical command;
- any required command contract section is missing;
- a command references repository-level `/docs` as a runtime dependency;
- the corresponding command eval JSON is missing or malformed;
- command eval metadata names a different skill/command;
- fewer than one normal and one boundary case exist for a command;
- an eval exists for an unknown command;
- the owning `SKILL.md` does not reference the command;
- selective installation would omit required command resources.

Do not validate prose style with brittle string matching beyond the stable structural contract.

## 8. Add provider-neutral command test tooling

Create:

```text
tools/run-command-evals.ts
```

Do **not** call a model provider from this tool.

It must support:

```bash
# list all command cases
node dist/tools/run-command-evals.js --list

# filter by skill
node dist/tools/run-command-evals.js --list --skill narrative-revise

# prepare a command and its cases
node dist/tools/run-command-evals.js --command revise:plan

# prepare one case if useful
node dist/tools/run-command-evals.js --case <case-id>

# score a recorded structured result offline
node dist/tools/run-command-evals.js --score path/to/result.json
```

For a prepared case print enough information for a host agent or external harness to execute it:

```text
skill
logical command
command file
case ID
case fingerprint
command contract
prompt / fixture
expected behaviour
forbidden behaviour
```

Fingerprint at least:

```text
command contract text
+
case definition
```

A changed command contract or eval case must change the fingerprint so stale results cannot be mistaken for current evidence.

Structured semantic results should record booleans/evidence for:

```text
input discipline
context discipline
output correctness
must behaviour
must-not behaviour
completion
```

A hard `Must Not` failure is a failed command regardless of prose quality.

Keep semantic collection outside the repository runtime. This tool prepares and scores evidence; it does not introduce a provider dependency.

## 9. Add TypeScript tests

Create or extend:

```text
tests/command-contracts.test.ts
```

Test at least:

- expected command count is exactly 29;
- every expected command is present;
- every command satisfies the structural contract;
- every command has at least two eval cases with normal + boundary coverage;
- minimum command eval case count is at least 58;
- each `SKILL.md` references all of its commands;
- unknown command evals are rejected;
- command runner filtering works;
- command fingerprint is stable for unchanged input;
- command fingerprint changes when command contract or case changes;
- scorer accepts a valid passing fixture;
- scorer rejects a hard `Must Not` failure;
- stale fingerprints are refused when scoring.

Prefer testing exported pure functions where possible rather than spawning the CLI repeatedly.

## 10. Update package scripts

Add scripts equivalent to:

```json
{
  "test:commands": "npm run build && node --test dist/tests/command-contracts.test.js",
  "command:list": "npm run build && node dist/tools/run-command-evals.js -- --list"
}
```

Update `test:all` so deterministic command-contract validation runs as part of the repository's normal deterministic gates.

Do not make semantic model collection part of `npm test`, `npm run test:all`, or CI.

## 11. Preserve the release benchmark boundary

Do not expand the existing 32-case release benchmark simply because commands now exist.

Keep:

```text
diagnostic:     10
production:      5
packs:          12
pack-authoring:  5
------------------
total:          32
```

Command conformance is a separate component matrix:

```text
29 commands
minimum 58 command cases
```

The quality hierarchy should be:

```text
command correctness
→ skill orchestration
→ cross-skill production correctness
→ end-to-end narrative quality
```

When an end-to-end case fails, the command layer should make it possible to identify the smallest failing operation where evidence supports that diagnosis.

## 12. Installation and packaging

Verify commands are inside the installed skill package.

Do not create independently installable command skills.

Do not add new public Agent Skill names.

The current installable set remains six skills.

Selective installation must still work: installing only `narrative-revise`, for example, must include its command files, local references, assets and command eval fixtures without requiring repository-level docs or another skill's private files.

## 13. README and changelog

Do not turn the README into a command reference.

If documentation needs updating, add only a concise note under testing/development that skills are internally decomposed into testable commands. Keep user-facing examples centred on skills and production outcomes.

Add a concise `CHANGELOG.md` entry covering:

```text
- skill-local command decomposition
- command-level eval coverage
- orchestration eval coverage
- provider-neutral command test tooling
```

## 14. Non-goals

Do not:

- create 29 new installable Agent Skills;
- create a global `commands/` runtime outside skills;
- create a command bus, dispatcher service or workflow engine;
- add model-provider API dependencies;
- add MCP;
- add a database, graph, vector store or RAG system;
- change the narrative artifact model merely to fit commands;
- change the five core skill boundaries without demonstrated conflict;
- split medium, genre, style or voice into separate customisation skills;
- rewrite examples or extension-pack concepts unless required to fix a real broken reference;
- fabricate semantic benchmark results;
- claim Stage 13 validation has passed unless the required local installation and validation gates actually run successfully.

## 15. Validation

Run the repository's deterministic validation after implementation:

```bash
npm install
npm run check
npm run validate
npm test
npm run test:commands
npm run test:benchmark
npm run test:all
```

Then inspect command coverage:

```bash
npm run command:list
```

Expected structural totals:

```text
installable skills: 6
commands: 29
minimum command eval cases: 58
release benchmark cases: 32
```

If the environment prevents a mandatory gate from running, report it as **BLOCKED**, not passed.

Do not proceed to GitHub publication as part of this task.

## 16. Completion report

When finished, report only concrete implementation evidence:

```text
files added/changed
command count by skill
command eval count by skill
orchestration cases added
validator changes
tooling/tests added
commands executed
pass/fail/blocked status for each validation gate
any deliberate deviation from the specs and why
```

Do not report semantic quality scores unless real repeated semantic measurements were collected.
