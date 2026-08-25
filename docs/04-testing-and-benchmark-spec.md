# Narrative Production Skills — Testing and Benchmark Specification

## 1. Purpose

This specification defines how Narrative Production Skills is tested and benchmarked, and serves as the runbook for those checks.

It exists to prevent a specific class of failure: a narrative can appear fluent and polished while silently violating approved decisions, leaking rejected alternatives, confusing planned events with canon, breaking character knowledge, or revising far more material than the diagnosed problem requires.

Most of those failures should be discoverable before a complete manuscript, screenplay, or episodic production is generated.

The governing principle is:

> **No narrative defect class should require a full production run to discover.**

A second principle is equally important:

> **A benchmark must measure whether the system changes the right thing, not only whether it notices that something is wrong.**

This document complements `docs/02-creative-skills-workflows-and-artifacts-spec.md` and `docs/03-creative-skills-repository-and-contracts-spec.md`. It does not redefine their artifact or skill contracts.

---

## 2. Testing Layers

| Layer | Question it answers | Model/provider required | Intended command |
|---|---|---|---|
| typecheck / validate | Is the repository and skill packaging well formed? | no | `npm run check`, `npm run validate` |
| unit | Do deterministic repository tools reject malformed input and unsafe states? | no | `npm test` |
| contract | Do artifact and lifecycle invariants hold on synthetic fixtures? | no | `npm run test:contracts` |
| evals | Are declared skill behaviours represented by falsifiable cases? | no for structure; opt-in for behaviour | `npm run test:evals` |
| benchmark — deterministic | Are machine-checkable narrative invariants detected without false positives? | no | `npm run benchmark` |
| benchmark — semantic, scoring | Does the benchmark score recorded answers correctly? | no | `node tools/run-benchmark.ts --rescore` |
| benchmark — semantic, collection | Can the installed skills diagnose, route, and bound narrative defects? | opt-in | `RUN_SEMANTIC_BENCHMARK=1 node tools/run-benchmark.ts --repeat 3` |
| install smoke | Can every intended skill be installed independently into a clean consumer project? | no model required | `npm run smoke:install` |

The Stage 11 scaffold already provides repository validation, tests, and installation smoke tooling. Contract, eval-runner, and benchmark commands are implementation requirements for the testing system defined here; they must not be reported as available until implemented.

### 2.1 What Each Layer Cannot Do

Coverage boundaries must be explicit.

- **typecheck / validate** prove packaging and static correctness. They do not prove narrative behaviour.
- **unit** tests prove deterministic tool behaviour. They cannot judge character motivation, causality, pacing, or scene effectiveness.
- **contract** tests can catch state violations such as `planned` being promoted to `canonical` without evidence. They cannot decide whether a story choice is creatively strong.
- **evals** are only behavioural evidence when the case is executable. Prose-only examples are useful documentation but must not inflate automated coverage.
- **deterministic benchmark** can test declared facts, lifecycle state, lineage, preserve sets, and structural invariants. It cannot reliably judge theme, voice, emotional impact, or whether an ending works.
- **semantic benchmark** can judge narrative meaning, but model output is nondeterministic. A single sample is not a measurement.
- **recorded transcripts** prove what was asked and answered. They become stale if the prompt, fixture, skill contract, model identity, or relevant input artifact changes.
- **install smoke tests** prove distribution, not narrative quality.

No layer may claim coverage for a class of failure it cannot observe.

---

## 3. Standing Rules

1. **A test that cannot run skips loudly or fails explicitly.** Missing capability must never appear as a green result.
2. **Coverage is reported, not implied.** Automated, semantic, manual, skipped, and blocked cases are counted separately.
3. **Every production defect that reaches an approved deliverable becomes a regression fixture.**
4. **Every defect fixture has a clean control.** A benchmark without negative cases measures eagerness to complain, not discrimination.
5. **Narrative fixtures are minimal.** Test the smallest artifact set that can expose the failure instead of generating an entire book or screenplay.
6. **Approved material is part of the ground truth.** A benchmark must know what must survive, not only what must change.
7. **The owning artifact is part of the ground truth.** Detection without root-cause routing is incomplete.
8. **Revision scope is part of the ground truth.** A fix that solves the defect by rewriting unaffected approved material is still a failure.
9. **Recorded semantic answers are retained.** Re-scoring should be free and offline.
10. **Stale evidence is refused, not silently reused.** Editing the question or its relevant artifacts invalidates existing transcripts.
11. **One semantic sample is not a measurement.** Use repeated runs and majority verdicts.
12. **Flakiness is reported separately from regression.** Do not turn sampling noise into a hard gate.
13. **No single numeric story-quality score is authoritative.** Report capabilities and defect classes separately.
14. **Evaluation and revision remain distinct.** An evaluation benchmark must fail an answer that rewrites the story when only diagnosis was requested.
15. **Benchmarks must not impose a mandatory story theory.** Three-act structure, Save the Cat, Hero's Journey, and similar frameworks may appear only when relevant to the fixture or requested by the user.

---

## 4. Defect Taxonomy

The benchmark taxonomy follows the production failures the skills are designed to prevent.

### 4.1 Governance and Lifecycle

```text
approved-decision-loss
rejected-candidate-leakage
selected-candidate-ignored
unapproved-promotion
workflow-state-confusion
preserve-set-violation
```

### 4.2 Continuity and Story State

```text
planned-as-canon
canonical-fact-contradiction
character-knowledge-leak
character-belief-confusion
secret-disclosure-error
superseded-fact-reuse
world-rule-violation
chronology-contradiction
```

### 4.3 Structure and Causality

```text
missing-causal-link
unmotivated-beat
scene-without-change
setup-without-payoff
payoff-without-setup
arc-state-contradiction
stakes-discontinuity
```

### 4.4 Evaluation and Revision

```text
evaluation-rewrites-output
symptom-not-root-cause
wrong-owning-artifact
revision-scope-too-broad
revision-scope-too-narrow
unaffected-approved-material-changed
finding-without-evidence
finding-invented-on-clean-control
```

### 4.5 Domain Boundaries

```text
screenplay-to-storyboard-leakage
visual-character-design-leakage
provider-requirement-invented
mandatory-story-framework-imposed
irrelevant-character-biography
irrelevant-world-lore-expansion
```

These classes are not a universal taxonomy for fiction. They exist because they map to explicit Narrative Production Skills contracts.

---

## 5. Runbook

### 5.1 Prerequisites

Required for repository-level tests:

```text
Node.js >= 22
npm
Git
```

Install development dependencies:

```bash
npm install
```

Optional deterministic tools such as Fountain parsers, Pandoc, Vale, or LanguageTool are tested only when a case explicitly depends on them.

A missing optional tool must report `SKIP` or `NOT RUN`; it must not silently substitute another implementation.

### 5.2 Run Current Scaffold Checks

```bash
npm run check
npm run validate
npm test
npm run smoke:install
```

These commands exercise the Stage 11 repository scaffold.

They do **not** constitute the complete narrative benchmark defined by this document.

### 5.3 Run the Complete Test Suite

Once the contract/eval/benchmark runners are implemented:

```bash
npm run test:all
```

The intended order is:

```text
typecheck
→ repository validation
→ unit
→ contract tests
→ eval structure
→ deterministic benchmark
→ install smoke
```

Semantic collection is intentionally excluded from default CI because it is nondeterministic and may incur provider cost.

Exit `0` is the only pass for required deterministic layers.

### 5.4 Run One Layer

```bash
npm run test:contracts
npm run test:evals
npm run benchmark
npm run smoke:install
```

Run one benchmark class:

```bash
node tools/run-benchmark.ts --only continuity
node tools/run-benchmark.ts --only revision
node tools/run-benchmark.ts --only governance
```

### 5.5 Run One Skill's Evals

```bash
node tools/run-evals.ts --skill narrative-develop
node tools/run-evals.ts --skill narrative-write
node tools/run-evals.ts --skill narrative-continuity
node tools/run-evals.ts --skill narrative-evaluate
node tools/run-evals.ts --skill narrative-revise
```

The runner must report:

```text
total cases
executable cases
semantic cases
manual cases
skipped cases
blocked cases
```

A prose-only eval case is never reported as an automated pass.

---

## 6. Deterministic Contract Tests

Deterministic tests should target facts and state transitions that do not require literary judgement.

### 6.1 Decision Status

Fixtures must prove:

```text
candidate ≠ selected
selected ≠ approved
rejected candidate cannot become downstream source implicitly
superseded decision cannot silently reappear
```

### 6.2 Canon and Planning

Fixtures must prove:

```text
planned event ≠ canonical fact
character belief ≠ canonical fact
secret known by reader ≠ secret known by character
uncertain possibility ≠ established fact
```

### 6.3 Preserve / Change

Given:

```text
preserve:
- protagonist identity
- approved ending

change:
- weak middle turn
```

an output that changes the protagonist identity or ending fails even if the new version reads well.

### 6.4 Lineage

Machine-checkable lineage may assert:

```text
selectedFrom references a real candidate
derivedFrom references a real parent
revisionSource references the diagnosed artifact or finding
rejected candidates are not silent ancestors
```

### 6.5 Evaluation / Revision Separation

When the requested operation is evaluation, the fixture fails if the response replaces or rewrites the source narrative instead of returning findings.

### 6.6 Boundary Checks

Deterministic text checks may reject explicit repository/runtime violations such as:

```text
mandatory provider API requirement
repository-level /docs runtime dependency
missing local artifact reference
invalid eval JSON
missing required SKILL.md frontmatter
```

Do not stretch deterministic checks into literary judgement.

---

## 7. Semantic Benchmark

The semantic tier measures behaviour that cannot be established from metadata alone.

Cases live under:

```text
tests/fixtures/benchmark/
├── taxonomy.json
├── cases/
├── controls/
├── transcripts/
└── baseline.json
```

Each case records at least:

```text
id
class
skill
task
inputArtifacts
approvedConstraints
preserve
expectedDefect
owningArtifact
smallestSufficientScope
forbiddenChanges
```

### 7.1 Benchmark Passes

Each case is evaluated in two passes.

#### Open Diagnosis

The system receives the task and relevant artifacts without being told the seeded defect class.

Question:

> Can it notice and explain the real problem without being led to it?

#### Corrective Diagnosis

The system must then identify:

```text
finding
owning artifact
root cause
smallest sufficient revision scope
material to preserve
material affected downstream
```

This second pass is deliberately stronger than a checklist pass. Narrative Production Skills must not merely say that something is wrong; it must route the correction to the right level.

### 7.2 Scoring Axes

Score the semantic benchmark on separate capabilities.

#### Detection

Did the answer identify the seeded defect?

#### Evidence

Did it support the finding with relevant story/artifact evidence rather than generic craft advice?

#### Routing

Did it identify the correct highest upstream owning artifact?

Example:

```text
symptom: scene feels arbitrary
root cause: missing causal beat in story outline
```

A proposal to rewrite prose only fails routing.

#### Scope

Did it choose the smallest sufficient revision scope?

A whole-story rewrite for one local scene defect fails even if it fixes the scene.

#### Preservation

Did it preserve approved material and explicit `preserve` constraints?

#### Precision

Did it avoid inventing unrelated defects on a case designed to isolate one failure?

#### Boundary Compliance

Did the answer stay inside Narrative Production Skills responsibilities?

A screenplay case that responds by designing shots, lenses, or storyboard frames fails the boundary axis unless the user explicitly requested those downstream artifacts.

### 7.3 Strict Verdict

A strict case pass requires:

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
boundary compliance
```

Precision is reported separately because a useful diagnosis may surface a second genuine problem that the fixture did not originally target.

Do not hide capability differences inside one aggregate score.

---

## 8. Initial Benchmark Cases

The first benchmark should remain small and diagnostic.

### 8.1 Clean Control

A coherent short scene with matching outline, character state, and continuity.

Expected:

```text
no seeded defect invented
no unnecessary rewrite proposed
```

### 8.2 Rejected Candidate Leakage

A rejected concept contains a distinctive ending absent from the selected concept.

The generated outline uses that rejected ending.

Expected:

```text
detect rejected-candidate leakage
route to story_concept / selection lineage
preserve selected concept decisions
```

### 8.3 Planned as Canon

The outline plans a revelation for a later chapter.

An earlier scene refers to it as already established fact.

Expected:

```text
detect planned-as-canon
route to scene / continuity state
preserve the planned future reveal
```

### 8.4 Character Knowledge Leak

The reader knows the antagonist's identity, but the protagonist does not.

The protagonist speaks as if they know it.

Expected:

```text
detect knowledge leak
route to scene + continuity record
preserve reader-visible information
```

### 8.5 World Rule Violation

The world bible states that a mechanism has a hard limitation.

A beat succeeds only by ignoring that limitation.

Expected:

```text
detect world-rule violation
route to beat / outline rather than prose polish
```

### 8.6 Root Cause Above the Scene

A scene lacks conflict because the outline gives both characters the same objective.

Expected:

```text
detect scene symptom
route root cause to outline / character objective
revise affected descendants only
```

### 8.7 Preserve Approved Ending

The middle of a story needs revision.

The ending is approved and explicitly preserved.

Expected:

```text
change middle only
approved ending survives
```

### 8.8 Evaluation Must Not Rewrite

The request is to evaluate a scene.

Expected:

```text
editorial findings only
no replacement scene
```

### 8.9 Screenplay Boundary

The request is to draft screenplay pages from approved scene cards.

Expected:

```text
screenplay narrative
no storyboard
no camera plan
no visual character sheet
```

### 8.10 Structure-Neutral Control

The story deliberately follows a non-three-act structure.

Expected:

```text
evaluate on its own stated intent
no forced three-act conversion
```

These ten cases are sufficient for the first benchmark. Add more only when real failures justify them.

---

## 9. Semantic Collection and Recorded Evidence

Semantic collection is opt-in.

Example target command:

```bash
RUN_SEMANTIC_BENCHMARK=1 node tools/run-benchmark.ts --repeat 3
```

The runner must print the planned number of model calls before invoking any paid provider-backed execution.

It must record:

```text
case ID
skill version or repository revision
host agent
model/provider identity when observable
prompt/question hash
input artifact hashes
repeat number
raw answer
scored dimensions
```

The benchmark must not introduce a mandatory provider API into the skills themselves. The collection harness is test infrastructure, not the Narrative Production Skills execution layer.

### 9.1 Re-Scoring

Recorded answers must be re-scoreable offline:

```bash
node tools/run-benchmark.ts --rescore
```

Changing a scoring rule must not require paying to recollect unchanged answers.

### 9.2 Staleness

A transcript is stale when any scored input changes materially, including:

```text
task text
criteria
fixture content
approved constraints
preserve set
expected owning artifact
skill contract
model identity where the baseline is model-specific
```

Stale evidence is refused with a non-zero result for baseline operations.

Do not silently score an answer against a question it was never asked.

---

## 10. Repeats, Baselines, Regressions and Flakes

Use at least three repeats for a semantic baseline.

A verdict is based on majority behaviour, but the observed rate must always be reported.

### Regression

A case that previously demonstrated a capability and now fails every repeat on the same benchmark revision is a regression.

### Flaky

A case that passes some repeats and fails others is `FLAKY`.

Flakiness is evidence about reliability and must remain visible, but one flipped sample does not automatically fail CI.

### Tie

A tie does not demonstrate the capability and therefore cannot establish a passing baseline.

### Baseline Update

Baseline updates are deliberate operations, never a side effect of a passing run.

Target command:

```bash
RUN_SEMANTIC_BENCHMARK=1 node tools/run-benchmark.ts --repeat 3 --update-baseline
```

Do not change a fixture, prompt, and scorer in one benchmark revision and then compare the resulting number directly with the old baseline.

---

## 11. Adding Coverage

When a defect reaches an approved narrative deliverable:

1. **Name the defect class.** Use an existing class where it genuinely fits.
2. **Reduce it to the smallest useful fixture.** Do not preserve an entire novel when three artifacts expose the problem.
3. **Add a clean control.** Prove the detector/reviewer can leave correct material alone.
4. **Add deterministic coverage** where the failure is machine-checkable.
5. **Add or update the relevant skill eval** with explicit `expect` and `forbid` behaviour.
6. **Add a semantic benchmark case** when narrative judgement is required.
7. **Record the owning artifact and smallest sufficient revision scope.**
8. **Record the preserve set.**
9. **Run the deterministic suite.**
10. **Collect semantic evidence only when necessary**, then commit the resulting transcripts and baseline metadata.

Changing an existing semantic case invalidates any transcript whose question or relevant evidence changed.

That friction is deliberate. A benchmark that can be reworded until it passes without invalidating its history is not a benchmark.

---

## 12. Triage

| Symptom | Owning layer | Likely cause | Action |
|---|---|---|---|
| `validate` fails | repository | malformed skill or broken local reference | fix repository contract |
| install smoke fails | packaging | selective skill is not self-contained | fix skill-local packaging |
| deterministic canon test fails | continuity | invalid state promotion or stale reference | fix continuity/artifact state |
| rejected candidate appears downstream | development / lineage | selection not respected | repair selection source and affected descendants |
| character knows secret too early | continuity / scene | wrong task context or continuity state | correct context/state, then revise affected scene |
| scene is weak but outline cause is sound | writing | local execution defect | revise scene only |
| scene defect originates in beat/outline | development | upstream structural cause | revise upstream cause and affected descendants |
| evaluation returns rewritten prose | evaluation | skill boundary violation | return findings; do not rewrite |
| revision changes approved ending | revision | preserve contract ignored | restore ending and bound revision scope |
| screenplay emits storyboard/camera plan | boundary | visual-production leakage | remove downstream visual-production work |
| semantic result varies by repeat | benchmark | model nondeterminism | report `FLAKY`; inspect rate and case clarity |
| semantic transcript rejected | benchmark evidence | fixture/question changed | recollect intentionally |

The ordered diagnosis is:

```text
repository / packaging
→ artifact state and continuity
→ upstream story structure
→ scene design
→ prose / screenplay execution
→ revision implementation
```

Do not retry prose repeatedly when the owning defect is upstream.

---

## 13. Measured Results

No Narrative Production Skills semantic benchmark baseline exists yet.

Do not publish invented scores.

The first measured-results section may be added only after:

```text
benchmark runner implemented
+
initial fixtures reviewed
+
clean controls included
+
semantic answers collected with repeats
+
baseline written deliberately
```

Report results by capability and defect class, for example:

```text
detection
routing
scope
preservation
precision
boundary compliance
```

Do not collapse these into a single "story quality" number.

---

## 14. Known Blind Spots Before the First Baseline

The initial design does not establish:

- whether a model can maintain quality across an entire novel-length context;
- whether context selection remains reliable with very large casts or world bibles;
- whether subtle thematic drift is detected consistently;
- whether dialogue quality can be measured without overfitting to a style rubric;
- whether repeated evaluation causes convergence toward generic prose;
- whether routing remains accurate when multiple upstream defects interact;
- whether discovery writing can update upstream artifacts without over-promoting speculative material.

These belong in later stress suites after the core workflow works.

Do not introduce vector databases, knowledge graphs, multi-agent reviewers, or dedicated model-routing infrastructure merely to benchmark these future cases.

---

## 15. Acceptance Criteria

The testing and benchmark design is correct when:

1. repository correctness and narrative behaviour are tested separately;
2. every automated layer states what it cannot observe;
3. skill eval coverage distinguishes executable from manual cases;
4. deterministic tests cover lifecycle, lineage, canon, preserve/change, and packaging invariants;
5. semantic cases include clean controls;
6. semantic cases score detection and evidence separately from routing and revision scope;
7. approved material is represented explicitly in benchmark ground truth;
8. root-cause ownership is represented explicitly in benchmark ground truth;
9. a whole-story rewrite can fail even when it removes the seeded defect;
10. evaluation-only cases fail if the system rewrites the narrative;
11. domain-boundary cases detect leakage into visual production or provider infrastructure;
12. semantic answers are retained and re-scoreable offline;
13. changed questions invalidate stale transcripts;
14. semantic baselines use repeated samples rather than single runs;
15. flakes remain visible without being confused with deterministic regressions;
16. no single numeric story-quality score becomes the release gate;
17. real escaped defects become regression fixtures;
18. future benchmark complexity is added only when real narrative-production failures justify it.

---

## 16. Related Documents

- `docs/01-creative-skills-system-spec.md` — project boundaries, architecture, build order, system acceptance.
- `docs/02-creative-skills-workflows-and-artifacts-spec.md` — lifecycle, artifact semantics, continuity, evaluation, and revision behaviour.
- `docs/03-creative-skills-repository-and-contracts-spec.md` — skill contracts, eval packaging, TypeScript tooling, CI, and installation validation.
- `docs/extraction-candidates.md` — cross-domain concepts under observation; testing abstractions are not extracted automatically.

---

**Narrative Production Skills — Testing and Benchmark Specification v1**
