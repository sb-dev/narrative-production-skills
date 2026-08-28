# Narrative Production Skills — Testing and Benchmark Specification

## 1. Purpose

This specification defines how Narrative Production Skills is tested and benchmarked, and serves as the runbook for measuring production quality.

The benchmark must detect two very different kinds of failure:

```text
production-contract failure
→ approved work is lost, canon is broken, the wrong artifact is revised, a pack is ignored

creative-quality failure
→ the output obeys the contract but the story, scene, dialogue, pacing, medium fit, or style is weak
```

A fluent narrative is not automatically a correct production, and a contract-correct production is not automatically a strong narrative.

The governing principles are:

> **No narrative defect class should require a full production run to discover.**
>
> **Measure whether the system changes the right thing, not only whether it notices that something is wrong.**
>
> **Report a quality profile, not one authoritative story-quality number.**

This document complements `docs/02-creative-skills-workflows-and-artifacts-spec.md`, `docs/03-creative-skills-repository-and-contracts-spec.md`, `docs/05-customisation-packs-spec.md`, and `docs/06-extension-pack-catalogue.md`.

---

## 2. Quality Model

Quality is measured on six surfaces.

```text
1. Command correctness
   one operation obeys its inputs, outputs, must/must-not rules and completion contract

2. Skill orchestration
   the skill chooses and sequences commands correctly without replaying unnecessary work

3. Production correctness
   lifecycle, selection, approval, canon, lineage, preservation, boundaries

4. Narrative quality
   causality, character, conflict, structure, scenes, continuity, setup/payoff, voice

5. Extension-pack fidelity
   medium, genre, style, audience, optional voice cast, pack-aware evaluation, handoff

6. Pack-authoring quality
   necessity, completeness, operational specificity, packaging, examples, evals, boundaries
```

These surfaces must remain separately visible in reports.

A release must never hide a continuity regression behind a stronger prose score, or a weak pack behind a high aggregate story score.

---

## 3. Benchmark Suites

The release benchmark contains **42 cases**.

| Suite | Cases | What it measures | Default semantic repeats |
|---|---:|---|---:|
| `diagnostic` | 10 | defect detection, evidence, root-cause routing, revision scope, preservation, boundaries | 3 |
| `production` | 15 | three examples at each of the five progressive levels | 3 |
| `packs` | 12 | every current extension-pack showcase | 3 |
| `pack-authoring` | 5 | `narrative-pack-create` behaviour | 3 |

The suite count is deliberate, not a target to grow.

Add cases only when a capability is added or a real failure justifies new coverage.

### 3.1 Core Release Tier

The core release tier is:

```text
diagnostic
+
production
```

It tests the narrative workflow without requiring the entire extension-pack catalogue to be regenerated for every change.

### 3.2 Catalogue Release Tier

The catalogue tier is:

```text
packs
+
pack-authoring
```

Run it when:

- a pack changes;
- pack consumption changes;
- `narrative-pack-create` changes;
- the catalogue changes;
- preparing a release that claims pack support.

A change to one pack may run that pack's case first. The full pack suite remains the release benchmark for the catalogue as a whole.

### 3.3 Command Conformance Matrix

Command-level evals are intentionally **not counted inside the 42-case release benchmark**.

They form a component test matrix derived from the installed skill contracts:

```text
core production commands: 24
pack-authoring commands:     5
------------------------------
total commands:             29

minimum semantic cases per command:
1 normal + 1 boundary

minimum initial command cases: 58
```

Keeping this matrix separate avoids turning the end-to-end benchmark into hundreds of near-duplicate cases while still making every component falsifiable.

Validate the complete command/eval matrix deterministically:

```bash
npm run test:commands
```

Prepare one semantic command case:

```bash
npm run build
node dist/tools/run-command-evals.js --command revise:plan
```

Filter the case catalogue by skill when exploring coverage:

```bash
node dist/tools/run-command-evals.js --list --skill narrative-revise
```

The repository remains provider-neutral: semantic execution is performed by the host agent or an external harness, then the recorded structured result is scored offline.

A full command-conformance measurement is required when command contracts, shared skill references, or skill orchestration change. A targeted command case is appropriate during development.

---

## 4. Testing Layers

| Layer | Question | Model required | Command |
|---|---|---|---|
| typecheck | Does deterministic tooling compile strictly? | no | `npm run check` |
| repository validation | Are skills, commands and runtime references well formed? | no | `npm run validate` |
| unit | Does deterministic tooling behave correctly? | no | `npm test` |
| command definition | Are command contracts and their eval coverage structurally valid? | no | `npm run test:commands` |
| command semantic | Does one command obey its independently testable production contract? | yes | command case protocol |
| skill orchestration | Does the owning skill choose and sequence commands correctly? | yes | skill eval protocol |
| benchmark definition | Are all cases, prompts, rubrics and catalogue coverage valid? | no | `npm run test:benchmark` |
| install smoke | Can intended skills install independently with all command resources? | no model | `npm run smoke:install` |
| diagnostic semantic | Can the system identify and correctly route seeded defects? | yes | case protocol |
| production semantic | Is the generated narrative production-ready? | yes | case protocol |
| pack semantic | Does the pack materially affect production in the intended way? | yes | case protocol |
| pack-authoring semantic | Does pack creation produce a reusable, safe, testable skill package? | yes | case protocol |

### 4.1 Layer Limits

- **Typecheck** proves static correctness, not production behaviour.
- **Repository validation** proves packaging and command-contract shape, not narrative quality.
- **Unit tests** cannot judge causality, character motivation, pacing, voice, or dramatic effect.
- **Command-definition validation** proves that command contracts and eval fixtures are present and well formed. It does not execute narrative behaviour.
- **Command semantic evals** measure one operation in isolation. They do not prove that the owning skill chooses the right operation.
- **Skill-orchestration evals** prove routing and sequencing. They do not establish end-to-end narrative quality.
- **Benchmark-definition validation** proves the measurement system is wired correctly. It does not prove the system under test passes it.
- **Diagnostic semantic cases** measure explicit seeded failures. They do not establish broad creative quality.
- **Production semantic cases** depend on judgement and therefore require repeated measurement.
- **Extension-pack cases** establish pack fidelity only for the current showcase prompts and relevant dimensions.
- **Pack-authoring cases** establish the authoring contract, not whether every possible pack is useful.
- **Install smoke tests** prove distribution, not production quality.

No layer may claim coverage for a failure it cannot observe.

---

## 5. Standing Rules

1. **A required check that cannot run is blocked, not passed.**
2. **Coverage is reported, not implied.**
3. **Every escaped approved-deliverable defect becomes a regression fixture.**
4. **Every seeded defect class has a clean or non-defective comparison somewhere in the suite.**
5. **Use the smallest fixture capable of exposing the failure.**
6. **Approved work is ground truth.**
7. **The owning artifact is ground truth.**
8. **The smallest sufficient revision scope is ground truth.**
9. **Evaluation and revision remain distinct.**
10. **A benchmark must not impose one story theory.**
11. **Extension-pack style labels are insufficient; the benchmark measures operational effects.**
12. **Voice-enabled packs never require invented or unauthorised provider voice IDs.**
13. **All current progressive example prompts are benchmarked.**
14. **All current extension-pack showcase prompts are benchmarked.**
15. **Semantic evidence is retained and fingerprinted.**
16. **Changed cases, prompts or rubrics invalidate stale comparisons.**
17. **One semantic sample is not a baseline.**
18. **No single aggregate story score is a release gate.**
19. **Every command has at least one normal and one boundary case.**
20. **Command correctness and skill orchestration are reported separately.**
21. **A command failure should identify the smallest failing operation rather than being hidden inside an end-to-end failure.**
22. **Do not create benchmark-only command semantics; tests measure the same contracts installed with the skill.**

---

## 6. Repository Layout

```text
benchmarks/
├── manifest.json
├── README.md
├── rubrics/
│   ├── diagnostic.json
│   ├── narrative-quality.json
│   ├── pack-adherence.json
│   └── pack-authoring.json
├── cases/
│   ├── diagnostic/
│   ├── production/
│   ├── packs/
│   └── pack-authoring/
└── fixtures/
    ├── semantic-pass.json
    ├── semantic-fail.json
    ├── diagnostic-pass.json
    ├── diagnostic-fail.json
    ├── diagnostic-clean-control-pass.json
    ├── diagnostic-clean-control-fail.json
    └── diagnostic-precision-flag.json

skills/<skill>/
├── commands/
└── evals/commands/

tools/
├── run-benchmark.ts
└── run-command-evals.ts
```

Do not create committed result/baseline directories until measured evidence exists.

---

## 7. Runbook

### 7.1 Deterministic Checks

```bash
npm install
npm run check
npm run validate
npm test
npm run test:benchmark
```

Run all deterministic checks defined by the repository:

```bash
npm run test:all
```

`test:all` does not collect semantic model results.

### 7.2 Command and Skill Component Tests

Validate all command definitions and the minimum eval matrix without model execution:

```bash
npm run test:commands
```

List or prepare the smallest relevant semantic case:

```bash
npm run build
node dist/tools/run-command-evals.js --list --skill narrative-continuity
node dist/tools/run-command-evals.js --command continuity:check
node dist/tools/run-command-evals.js --command revise:plan
```

The prepared case must expose at least:

```text
skill
command
case ID
command contract
prompt / fixture
expected behaviour
forbidden behaviour
case fingerprint
```

After the host agent or external harness executes the case, retain a structured result and score it offline:

```bash
node dist/tools/run-command-evals.js --score path/to/result.json
```

Then run the owning skill's orchestration evals before relying on an end-to-end benchmark.

The preferred diagnosis order is:

```text
command
→ skill orchestration
→ cross-skill production contract
→ end-to-end creative quality
```

This prevents a low-level regression from being diagnosed only as "the story benchmark got worse".

### 7.3 List Benchmark Cases

```bash
npm run benchmark:list
```

Expected current coverage:

```text
diagnostic:      10
production:       15
packs:           12
pack-authoring:   5
-------------------
total:           42
```

### 7.4 Prepare One Case

Build first:

```bash
npm run build
```

Then:

```bash
node dist/tools/run-benchmark.js \
  --case prod-level-1-tomorrows-receipt
```

The runner prints:

```text
case ID
suite
case fingerprint
generation / diagnosis prompt
measurement contract
```

The fingerprint binds the case definition, current prompt text, and current rubric.

### 7.5 Score Recorded Results

```bash
node dist/tools/run-benchmark.js \
  --score path/to/result.json
```

`--rescore` is an alias:

```bash
node dist/tools/run-benchmark.js \
  --rescore path/to/result.json
```

Scoring is deterministic once the structured review has been recorded.

### 7.6 Semantic Execution

Narrative Production Skills intentionally does not require a provider-specific model runtime.

Semantic collection therefore follows this protocol:

```text
prepare benchmark case
→ install/run the requested skills in a clean consumer project
→ retain generated artifact(s)
→ review against the case rubric
→ record structured scores/evidence
→ score offline
```

The collection adapter may be implemented for a host agent later, but it must remain test infrastructure rather than a runtime dependency of the skills.

---

## 8. Case Definition

Every case defines:

```text
id
suite
capability
skills
rubric
prompt OR promptSource
hard gates
required dimensions where semantic scoring is used
```

### 8.1 Prompt Sources

The progressive and extension-pack suites reference the actual example README prompt:

```text
examples/<example>/README.md
examples/extension-packs/<pack>/README.md
```

The runner extracts the fenced `## Prompt` block.

This creates an important invariant:

> **The benchmark measures the examples the repository actually advertises.**

Changing an example prompt changes the case fingerprint.

---

## 9. Command and Skill-Orchestration Benchmark

### 9.1 Command Contract Axes

Every command repeat is evaluated against the command's installed contract:

```text
input discipline
→ uses supplied inputs and does not invent unavailable state

context discipline
→ reads only relevant artifacts/context

output correctness
→ produces the declared artifact/state or diagnosis

must behaviour
→ satisfies all applicable observable requirements

must-not behaviour
→ respects boundaries, preservation rules and forbidden side effects

completion
→ stops when the command's responsibility is complete
```

A command with a failed hard `Must Not` rule fails regardless of stylistic quality.

### 9.2 Representative Failure Localisation

```text
symptom:
approved ending changed during revision

revise:diagnose PASS
revise:plan PASS
revise:apply FAIL  ← preserve set ignored
revise:verify FAIL ← regression not caught

skill orchestration
→ correctly selected apply + verify

end-to-end
→ FAIL
```

This is more actionable than recording only an end-to-end failure.

### 9.3 Skill-Orchestration Axes

For each installable skill evaluate:

```text
command selection
sequence correctness
state/artifact handoff
skip/re-entry behaviour
upstream conflict handling
stop condition
```

A skill must be able to enter at an already-resolved stage when sufficient approved inputs exist.

### 9.4 Command Coverage Gate

The initial expected catalogue is:

```text
narrative-develop:      7
narrative-write:        5
narrative-continuity:   4
narrative-evaluate:     4
narrative-revise:       4
narrative-pack-create:  5
--------------------------
total:                 29
```

Repository validation must fail when:

- a declared command file is missing;
- a command is not referenced by its owning `SKILL.md` routing guidance;
- a command lacks command-level evals;
- a command eval points to a command that does not exist;
- an installed skill would omit command resources required at runtime.

The benchmark reports command coverage by skill rather than only one repository-wide percentage.

---

## 10. Diagnostic Benchmark

The diagnostic suite contains ten minimal cases:

```text
clean control
rejected candidate leakage
planned-as-canon
character knowledge leak
world-rule violation
root cause above the scene
preserve approved ending
Evaluation must not rewrite
screenplay / storyboard boundary
structure-neutral control
```

### 9.1 Diagnostic Axes

Each repeat is scored independently on:

#### Detection

Did the system identify the seeded defect, or correctly leave a clean control alone?

#### Evidence

Did the diagnosis cite supplied story/artifact evidence rather than generic craft advice?

#### Routing

Did it identify the highest useful owning artifact?

```text
weak scene
→ missing conflict in scene card
→ or conflicting/identical objectives upstream
```

A prose rewrite fails routing when the root cause is structural.

A case's `owningArtifacts` ground truth is the **set** of artifacts a correct routing may name, not
an ordered root-cause-first list. For several defects it deliberately contains both the
authoritative artifact that must not change and the artifact the correction belongs to — a world
rule violated by a beat lists `world_bible` and `beat_sheet`; a knowledge leak lists
`continuity_record` and `narrative_draft`. Routing passes when the diagnosis names any of them.

Identifier comparisons for `defectClasses` and `owningArtifacts` are normalised (trimmed and case
folded), so casing is not scored as a routing error.

#### Scope

Did it choose the smallest sufficient revision scope?

#### Preservation

Did approved and explicit preserve-set material survive?

#### Boundary

Did it remain inside Narrative Production Skills responsibilities?

#### Precision

Did it avoid inventing unrelated problems?

Precision is reported separately from strict pass because a reviewer may identify a second genuine defect not seeded by the fixture.

### 9.2 Strict Diagnostic Pass

A repeat passes only when:

```text
detection
+
evidence
+
routing
+
scope
+
preservation
+
boundary
```

A correct diagnosis with the wrong revision target is not a pass.

---

## 11. Production Benchmark

The production suite uses fifteen progressive examples: three genre-diverse productions at each of five capability levels.

```text
Level 1 — complete narrative-production loop
├── Tomorrow's Receipt
├── Wrong Number, Right Song
└── The Birthday Weather Machine

Level 2 — continuity and information state
├── Wedding Table Nine
├── The Dragon's Three Promises
└── The Duplicate Astronaut

Level 3 — screenplay execution
├── Returns Desk
├── Table for Two
└── The Princess's Day Off

Level 4 — episodic / serial continuity
├── Department of Minor Miracles
├── Second Chance Café
└── Local Legends Club

Level 5 — cross-domain audiovisual handoff
├── The Orchestra in the Walls
├── Paper Moon Parade
└── The Day Gravity Blinked
```

The production suite intentionally spans comedy, romance, family work, fantasy, science fiction, children's adventure, ensemble storytelling and music/animation-oriented handoffs. Each example's README is the source of the generation prompt.

### 10.1 Narrative Quality Scale

Each relevant dimension uses a four-point anchored scale:

```text
0 = fails or contradicts the requirement
1 = material weakness; not production-ready
2 = acceptable production quality
3 = strong, deliberate execution
```

Do not use a 1–10 scale whose middle values have no operational meaning.

### 10.2 Narrative Quality Dimensions

Relevant dimensions are selected per case from:

```text
instruction adherence
causality
character
conflict and stakes
structure and pacing
scene purpose
continuity
setup and payoff
voice and dialogue
medium fit
originality and specificity
production discipline
```

### 10.3 Hard Dimensions

The following are normally hard gates when relevant:

```text
instruction adherence
continuity
medium fit
production discipline
```

A beautifully written screenplay that violates approved canon is not production-ready.

### 10.4 Production Readiness

One repeat is ready when:

```text
no hard-gate failure
+
every required dimension >= 2
```

Report each dimension separately.

Do not sum them into an authoritative story-quality score.

---

## 12. Extension-Pack Benchmark

Every current catalogue showcase has a benchmark case.

Current catalogue coverage is **12/12**.

The pack suite measures whether the pack materially changes production rather than merely adding a label to the prompt.

### 11.1 Pack Dimensions

#### Medium

Does the output use the artifacts and conventions of the requested medium?

#### Genre

Does genre influence conflict, information, rhythm, expectation or audience experience without becoming a rigid formula?

#### Style

Is style expressed operationally through prose, dialogue, structure, performance direction, or other medium-relevant characteristics?

#### Audience

When relevant, does audience guidance materially affect production decisions?

#### Voice Cast

When applicable:

```text
roles are coherent
performance direction is usable
pronunciation/consistency requirements are preserved
specific provider voices are referenced only when authorised
no voice ID is invented merely to make the pack look complete
```

#### Pack Consistency

Does the pack survive from development through writing, evaluation and revision?

#### Pack-Aware Evaluation

Does evaluation preserve intentional traits while still detecting genuine defects?

A naturalistic dialogue pack should not be penalised for incomplete sentences merely because a generic prose rubric prefers polished exposition.

#### Handoff Boundary

Does the pack hand off downstream requirements without absorbing visual, audio, web or game implementation into Narrative Production Skills?

### 11.2 Pack Strict Pass

Hard gates normally include:

```text
medium
pack consistency
pack-aware evaluation
handoff boundary
```

Voice is a hard gate only where the pack actually configures a voice cast.

---

## 13. Pack-Authoring Benchmark

`narrative-pack-create` has five benchmark cases aligned with its lifecycle evals:

```text
normal creation
draft / catalogue-reuse decision
refinement while preserving approved dimensions
final release preparation
boundary / unauthorised creator or voice imitation
```

### 12.1 Authoring Dimensions

```text
necessity
contract completeness
operational specificity
self-contained packaging
showcase prompt
eval coverage
voice safety
project boundary
```

### 12.2 Most Important Gate: Necessity

A pack creator that always creates a new pack fails.

Before scaffolding, it must distinguish:

```text
existing pack already fits
→ reuse

one-project difference
→ project instruction

stable reusable production profile
→ new pack
```

This prevents the extension system from becoming a combinatorial catalogue of trivial variants.

### 12.3 Showcase Prompt Gate

Every created pack must include a realistic README example with an exact fenced generation prompt.

A pack without a runnable showcase is incomplete.

---

## 14. Semantic Judging Protocol

Creative quality has no single objective ground truth.

The benchmark therefore treats semantic judgement as measurement with known uncertainty, not as an oracle.

### 13.1 Required Evidence

A semantic review should record:

```text
case ID
case fingerprint
repository revision
host agent
writer model when observable
reviewer model or human reviewer identity when appropriate
repeat number
generated artifact path/hash
per-dimension score
artifact-specific evidence
hard-gate failures
```

### 13.2 Repeats

Use at least three repeats for a baseline.

Every case carries a repeat count: its own `defaultRepeats`, or the suite default from
`benchmarks/manifest.json`. Scoring reports `expectedRepeats` and `underRepeated`, and warns when a
result records fewer repeats than the case requires. A single repeat can still score `PASS` — it can
never be `FLAKY` — so an under-repeated result is a measurement, not a baseline.

Report:

```text
per-repeat readiness
dimension medians
pass rate
flakiness
```

### 13.3 Judge Separation

Where practical, do not use the exact same generation invocation as the only judge of its own output.

Possible reviewers include:

- a separate model invocation;
- a different model;
- a human reviewer;
- a combination for important releases.

### 13.4 Rubric Order Bias

When a model judge is used for ordinal rubric scoring, vary or balance score-anchor ordering in calibration experiments rather than assuming presentation order is neutral.

This is especially important before treating a judge configuration as a stable long-term benchmark component.

### 13.5 Pairwise Comparison

Pairwise comparison may be used when comparing two repository/model revisions.

If used:

```text
blind A/B identity
run A/B and B/A order
compare the same prompt and benchmark revision
retain both outputs
```

Pairwise preference is supplementary.

It does not replace hard production invariants.

---

## 15. Results, Fingerprints and Staleness

A case fingerprint covers:

```text
case JSON
+
resolved generation prompt
+
rubric
```

A recorded result against a different fingerprint is stale.

The runner refuses a mismatched fingerprint with:

```text
STALE RESULT
```

The fingerprint is required evidence (section 13.1), so the runner also refuses a result that omits
it rather than treating an absent fingerprint as nothing to check. Reserve `"AUTO"` for deliberate
local iteration: it skips the staleness comparison and warns that it did.

Do not compare scores across changed prompts or rubrics as though they measured the same thing.

### 14.1 Evidence Retention

Once semantic runs begin, retain:

```text
generated outputs
raw reviews
structured review JSON
case fingerprint
scored report
```

Re-scoring the same structured evidence must remain free and offline.

### 14.2 No Fabricated Baseline

The repository currently has scorer fixtures only.

They prove the scoring code, not Narrative Production Skills quality.

Do not publish benchmark scores until real system-under-test outputs have been collected.

---

## 16. Pass, Flake and Regression Semantics

### PASS

All semantic repeats meet strict readiness.

### FLAKY

Some repeats meet strict readiness and some do not.

Flakiness remains visible and should be investigated, but one flipped nondeterministic sample is not treated like a deterministic repository failure.

### FAIL

No repeat demonstrates strict readiness.

### Regression

A regression is one of:

```text
previous strict case passes → now fails every repeat

or

previous required dimension median >= 2
→ unchanged case now has median <= 1
```

Do not compare baselines when the case fingerprint changed.

---

## 17. Quality Assurance Policy

### Pull Requests

Required deterministic gates:

```text
npm run check
npm run validate
npm test
npm run test:benchmark
```

Run affected command and skill-orchestration cases when a skill/command changes, then run affected semantic benchmark cases when the change touches behaviour they measure.

### Core Release Candidate

Run:

```text
full command conformance for changed core skills
+
skill-orchestration evals for changed core skills
+
diagnostic suite
+
production suite
```

### Extension-Pack Change

Run:

```text
affected pack showcase
+
relevant pack-authoring case when authoring behaviour changed
```

### Catalogue Release Candidate

Run all:

```text
12 pack cases
+
5 pack-authoring cases
```

### Escaped Production Defect

The next change must include:

```text
reduced regression fixture
+
clean control where needed
+
relevant skill eval update
+
benchmark case or deterministic assertion
```

---

## 18. Adding Coverage

When a defect reaches an approved deliverable:

1. Name the defect class.
2. Reduce it to the smallest useful artifact set.
3. Identify the owning artifact.
4. Define the smallest sufficient correction scope.
5. Define the preserve set.
6. Add deterministic coverage where possible.
7. Add/update the smallest relevant command eval when the defect belongs to one operation.
8. Add/update the owning skill-orchestration eval when routing or sequencing contributed.
9. Add/update the relevant skill eval.
10. Add a semantic benchmark case only when judgement is genuinely required.
11. Add a clean comparison if false positives are plausible.
12. Collect repeated evidence only after the fixture and rubric are reviewed.

When a new extension pack is added:

1. add its showcase README;
2. include an exact `## Prompt`;
3. add a matching pack benchmark case;
4. define only relevant rubric dimensions;
5. add voice scoring only when voice is part of the pack;
6. validate with `npm run test:benchmark`.

The benchmark validator must fail if an extension-pack showcase exists without benchmark coverage.

---

## 19. Known Blind Spots

The initial benchmark does not yet establish:

- novel-length or season-length quality at very large context sizes;
- consistency error density over tens of thousands of words;
- subtle theme evolution across a long work;
- human preference across different literary traditions;
- multilingual quality;
- voice performance quality from generated audio;
- downstream visual/audio/game asset quality after handoff;
- whether one semantic judge systematically prefers its own style;
- whether pack style distinctions remain discriminative across many adjacent packs;
- whether repeated evaluation encourages generic prose convergence;
- whether the initial command boundaries remain optimal after real implementation;
- whether command-level semantic tests are stable across different host agents.

These are later stress suites.

Do not introduce a vector database, knowledge graph, multi-agent writers' room, or dedicated model router merely to make the benchmark look more sophisticated.

---

## 20. Measured Results

No production baseline has been recorded yet.

Current measurable facts are repository coverage only:

```text
benchmark cases:       42
diagnostic:            10
progressive production: 15
extension packs:       12
pack authoring:         5
core example coverage: 15/15
extension-pack showcase coverage: 12/12
command contracts implemented: 0/29 (specified; implementation pending)
command eval minimum target: 58
```

These are **coverage counts**, not quality scores.

The first quality baseline requires real generated outputs and at least three repeated semantic measurements per baselined case.

---

## 21. Prior Art and Design Rationale

The benchmark borrows ideas selectively rather than adopting another benchmark wholesale.

### ConStory-Bench

Useful ideas:

- narrative consistency deserves its own explicit defect taxonomy;
- contradictions should be grounded in textual evidence;
- character knowledge, timeline/plot, style, factual detail and world rules fail differently;
- long-form consistency needs separate stress testing.

Narrative Production Skills extends this concern with production-state semantics such as selected versus rejected, planned versus canonical, approved preservation, root-cause routing and smallest sufficient revision scope.

### Creative Writing Benchmark / EQ-Bench

Useful ideas:

- creative-writing prompts should expose weaknesses rather than merely invite fluent prose;
- repeated generations matter;
- rubric and pairwise measurements expose different information;
- judge bias and length/style preference must remain visible.

Narrative Production Skills does not adopt Elo as its release metric because the project is measuring production capabilities and invariants, not only ranking writer models.

### LitBench

Useful conclusion:

- off-the-shelf LLM judges do not perfectly reproduce human creative-writing preferences.

Therefore benchmark reviews are evidence, not unquestionable ground truth. Important releases should retain outputs for human audit.

### Rubric-Order Research

Recent work shows rubric-based LLM judges can exhibit position bias.

Therefore any long-lived semantic-judge configuration should be calibrated rather than assuming that numeric anchor presentation is neutral.

---

## 22. Acceptance Criteria

The benchmark is correctly implemented when:

```text
✓ deterministic benchmark validation is executable
✓ every benchmark case has a valid rubric
✓ all fifteen progressive examples are covered
✓ every extension-pack showcase is covered
✓ current catalogue coverage is 12/12
✓ all 29 initial commands are structurally discoverable inside their owning skills once implemented
✓ every implemented command has at least one normal and one boundary eval case
✓ command correctness is reported separately from skill orchestration
✓ skill orchestration evals test command selection, sequencing, re-entry and stopping
✓ command failures identify the smallest failing operation where possible
✓ pack authoring has normal/draft/refine/final/boundary coverage
✓ diagnostic cases include clean-control behaviour
✓ diagnostic scoring separates detection, evidence, routing, scope, preservation and boundary
✓ creative quality uses anchored dimensions rather than an ungrounded total score
✓ extension-pack scoring separates medium, genre, style, voice and handoff concerns
✓ pack-authoring scoring measures necessity, not only package completeness
✓ hard production invariants can fail a creatively strong output
✓ semantic repeats and flakiness remain visible
✓ results are tied to a case fingerprint
✓ stale result fingerprints are refused
✓ recorded reviews can be re-scored offline
✓ no fabricated semantic baseline is published
✓ new pack showcases cannot silently escape benchmark coverage
```

---

## 23. Related Documents

- `docs/01-creative-skills-system-spec.md`
- `docs/02-creative-skills-workflows-and-artifacts-spec.md`
- `docs/03-creative-skills-repository-and-contracts-spec.md`
- `docs/05-customisation-packs-spec.md`
- `docs/06-extension-pack-catalogue.md`
- `benchmarks/README.md`
- `benchmarks/manifest.json`

---

**Narrative Production Skills — Testing and Benchmark Specification v5**  
**27 August 2026**
