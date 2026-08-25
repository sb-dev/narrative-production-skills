# Narrative Production Skills — Creative Skills Repository and Contracts Specification

## 1. Purpose

This specification defines how Narrative Production Skills is packaged as an open-source Agent Skills repository.

It owns:

- repository structure;
- skill directories;
- complete `SKILL.md` contracts;
- references;
- assets;
- optional scripts;
- evals;
- host/tool requirements;
- installation expectations;
- examples;
- extraction-candidate tracking;
- technical acceptance criteria.

The production lifecycle and artifact semantics are defined in the separate **Creative Skills Workflows and Artifacts Specification**.

---

## 2. Repository Structure

Initial repository:

```text
narrative-production-skills/
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── .gitignore
├── package.json
├── tsconfig.json
│
├── scripts/
│   ├── validate-skills.ts
│   └── smoke-install.ts
│
├── tests/
│   └── validate-skills.test.ts
│
├── docs/
│   ├── 01-creative-skills-system-spec.md
│   ├── 02-creative-skills-workflows-and-artifacts-spec.md
│   ├── 03-creative-skills-repository-and-contracts-spec.md
│   ├── 04-testing-and-benchmark-spec.md
│   └── extraction-candidates.md
│
├── skills/
│   ├── narrative-develop/
│   │   ├── SKILL.md
│   │   ├── references/
│   │   │   ├── artifacts.md
│   │   │   ├── story-development.md
│   │   │   ├── characters.md
│   │   │   ├── world-building.md
│   │   │   ├── structure.md
│   │   │   ├── beats-and-scenes.md
│   │   │   └── draft-selection.md
│   │   ├── assets/
│   │   │   ├── narrative-brief.example.yaml
│   │   │   └── story-outline.example.yaml
│   │   └── evals/
│   │       └── evals.json
│   │
│   ├── narrative-write/
│   │   ├── SKILL.md
│   │   ├── references/
│   │   │   ├── artifacts.md
│   │   │   ├── prose.md
│   │   │   ├── screenplay.md
│   │   │   ├── scene-writing.md
│   │   │   └── discovery-writing.md
│   │   └── evals/
│   │       └── evals.json
│   │
│   ├── narrative-continuity/
│   │   ├── SKILL.md
│   │   ├── references/
│   │   │   ├── artifacts.md
│   │   │   ├── continuity.md
│   │   │   └── context-assembly.md
│   │   ├── assets/
│   │   │   └── continuity-record.example.yaml
│   │   └── evals/
│   │       └── evals.json
│   │
│   ├── narrative-evaluate/
│   │   ├── SKILL.md
│   │   ├── references/
│   │   │   ├── artifacts.md
│   │   │   ├── developmental-evaluation.md
│   │   │   ├── artifact-readiness.md
│   │   │   └── editorial-report.md
│   │   ├── assets/
│   │   │   └── editorial-report.example.yaml
│   │   └── evals/
│   │       └── evals.json
│   │
│   └── narrative-revise/
│       ├── SKILL.md
│       ├── references/
│       │   ├── artifacts.md
│       │   ├── revision.md
│       │   └── impact-analysis.md
│       ├── assets/
│       │   └── revision-plan.example.yaml
│       └── evals/
│           └── evals.json
│
├── examples/
│   ├── 01-short-story/
│   ├── 02-mystery-continuity/
│   ├── 03-screenplay/
│   ├── 04-episodic-story/
│   └── 05-film-handoff/
│
├── evals/
│   └── end-to-end/
│
└── .github/
    ├── ISSUE_TEMPLATE/
    ├── PULL_REQUEST_TEMPLATE.md
    └── workflows/
        └── ci.yml
```

Only create directories and tooling files when they contain working project material.

The root TypeScript tooling shown above is not a speculative runtime framework. It exists to validate the repository contract and exercise clean-project installation.

Do not create empty `guides/`, `showcases/`, or `recipes/` directories merely for symmetry.

---

## 3. Skill Packaging Rule

Every installable skill must be self-contained inside:

```text
skills/<skill-name>/
```

Runtime resources required by that skill must live with it:

```text
SKILL.md
references/
assets/
scripts/   # only when actually needed
```

An installed skill must not depend on repository-level `docs/`, `examples/`, or another skill's private files unless an explicit installation dependency exists.

Selective installation is a supported use case.

If two skills temporarily duplicate a small reference, prefer local duplication until a stable shared contract and installation mechanism is justified.

---

## 4. Required Host Capabilities

The host environment must provide:

```text
Agent Skills loading
+
language-model reasoning and generation
```

For persistent repository workflows it should preferably also provide:

```text
read text files
write text files
modify existing text files
```

Narrative Production Skills does not require:

```text
OpenAI API
Anthropic API
Gemini API
Replicate
MCP
vector database
graph database
custom orchestration service
```

There are no mandatory provider peer skills.

---

## 5. Optional External Tools

Optional deterministic tools may be used where practical.

### Fountain

Preferred screenplay interchange representation.

### Screenplay tooling

May be used for:

- parsing Fountain;
- extracting scenes;
- validating structural syntax;
- FDX conversion.

### Pandoc

May be used for deterministic manuscript format conversion.

### Vale / LanguageTool

May be used for optional mechanical checks.

These tools are not required for core narrative reasoning.

A skill must continue to function for its narrative purpose when optional tools are unavailable, except when the user explicitly requests a transformation that requires the missing tool.

---

## 6. Skill Composition

Do not assume a proprietary skill-to-skill function interface.

Incorrect:

```text
narrativeDevelop.execute(...)
narrativeWrite.generate(...)
```

Composition occurs through:

- agent instructions;
- current working context;
- approved artifacts;
- project files;
- lightweight lineage;
- continuity records;
- outputs produced by previous workflow stages.

Correct pattern:

```text
narrative-develop
      ↓
approved outline / scene card
      ↓
narrative-write
      ↓
draft narrative
      ↓
narrative-evaluate
      ↓
editorial report
      ↓
narrative-revise
```

A single host agent may execute several skills sequentially.

No mandatory multi-agent orchestration is assumed.

---

## 7. `SKILL.md` Requirements

Every skill must include valid Agent Skills frontmatter.

Minimum:

```yaml
---
name: narrative-develop
description: ...
---
```

Each `SKILL.md` should contain:

- activation context;
- scope;
- lifecycle behaviour;
- artifact behaviour;
- context behaviour;
- preservation behaviour;
- retry/refinement behaviour;
- evaluation behaviour;
- boundaries;
- links to detailed local references.

Detailed production knowledge belongs in `references/`.

`SKILL.md` should remain concise enough to guide activation and execution without becoming the project's complete narrative craft manual.

---

# 8. `narrative-develop/SKILL.md`

```markdown
---
name: narrative-develop
description: Develop narrative ideas into story concepts, story-relevant characters and worlds, outlines, beats, and scene plans. Use for premise development, concept alternatives, character motivation and arcs, world constraints, story structure, beat sheets, scene cards, and structural refinement before or alongside prose or screenplay drafting.
---

# Narrative Develop

Develop the story at the lowest useful narrative resolution before spending effort on higher-resolution writing.

The host agent owns language generation and reasoning. This skill owns narrative-development workflow and artifact behaviour.

## Determine the target

Identify the smallest relevant target:

- narrative brief;
- story concept;
- character profile;
- world bible;
- story outline;
- beat sheet;
- scene card.

Do not generate a complete manuscript when the task is a development problem.

## Determine lifecycle state

Use:

- `draft`
- `refine`
- `final`

Default to `draft` when exploring alternatives.

Use `refine` when modifying a selected or approved artifact.

Use `final` when preparing a stable planning artifact for downstream production.

## Determine decision status

Use independently where useful:

- `candidate`
- `selected`
- `approved`
- `rejected`
- `superseded`

Do not equate `selected` with `approved`.

## Brief

Capture only narrative requirements that materially constrain downstream work.

Preserve explicit:

- intent;
- audience;
- genre;
- medium;
- tone;
- themes where specified;
- length;
- hard constraints;
- forbidden elements;
- source/reference requirements.

Do not invent mandatory constraints merely to fill a template.

## Concept exploration

When uncertainty is meaningful:

1. create a small set of genuinely distinct candidates;
2. vary story logic rather than wording;
3. keep candidates cheap enough to compare;
4. evaluate against the brief;
5. accept or recommend a selection;
6. preserve the selected direction.

Do not generate a fixed number of variants when one direction is already clear.

## Characters

Develop story-relevant:

- role;
- want;
- need where useful;
- motivation;
- stakes;
- conflict;
- relationships;
- arc;
- knowledge/beliefs;
- voice;
- behavioural constraints.

Do not default to encyclopaedic biographies.

## World

Develop only world information that supports or constrains the story.

Prioritise:

- rules;
- locations;
- institutions;
- systems;
- history that affects present events;
- narrative constraints.

Do not produce unrelated lore for completeness.

## Outline

Represent the complete story at lower resolution than scenes.

Preserve:

- major events;
- causality;
- character progression;
- conflict;
- turning points;
- setup/payoff;
- ending logic.

Do not require three-act structure or any other fixed framework.

Treat loglines, synopses, and treatments as useful views or representations unless the task requires otherwise.

## Beats

Treat a beat as a meaningful narrative change.

Prefer explicit:

- event;
- cause;
- effect;
- character change where relevant;
- setup/payoff relationships.

Do not treat a beat as merely a small scene.

## Scene planning

A scene card should capture why the scene exists.

Consider:

- entry state;
- objective;
- conflict;
- relevant beats;
- turn;
- exit state;
- information revealed;
- continuity requirements.

Do not force every literary scene into a mechanical formula.

## Local branching

Branch at the smallest unit containing genuine uncertainty.

Prefer:

- one alternative character direction;
- one outline region;
- one beat;
- one scene card;

over regenerating the entire story.

## Refine

When refining:

1. start from the selected/approved artifact;
2. identify what must be preserved;
3. identify what may change;
4. change only the target deficiency;
5. update affected downstream planning only where necessary.

## Discovery writing

If existing prose reveals a better story direction:

1. identify the discovery;
2. determine which planning artifact it affects;
3. update that artifact deliberately;
4. preserve the new decision for downstream work.

Planning artifacts may evolve during drafting.

## Evaluation

At draft stage, evaluate only whether the artifact is useful enough to continue.

At refine stage, verify:

- requested change succeeded;
- approved decisions survived;
- no major regression was introduced.

At final stage, run the applicable structural/readiness checks before downstream writing.

## Do not

- impose a mandatory story formula;
- generate extensive lore unrelated to story needs;
- generate long biographies merely because information can be invented;
- hide structural problems with polished prose;
- silently discard selected or approved decisions;
- build or require a graph/vector database;
- require a model-provider API.
```

---

# 9. `narrative-write/SKILL.md`

```markdown
---
name: narrative-write
description: Write, continue, refine, or finalise prose and screenplay narrative from story artifacts while preserving approved story decisions and continuity. Use for scenes, chapters, dialogue in context, partial or complete manuscripts, screenplay pages, rough drafts, prose refinement, and discovery writing.
---

# Narrative Write

Turn sufficiently developed narrative intent into actual prose or screenplay execution.

The host model performs language generation. This skill supplies artifact-aware writing behaviour.

## Determine the target

Identify:

- prose or screenplay;
- scene, chapter, sequence, episode, or larger draft;
- lifecycle state;
- relevant approved upstream artifacts.

Do not require every planning artifact for every writing task.

## Assemble context

Load only what materially affects the target.

Typical context:

- current scene card;
- relevant beats;
- involved character profiles;
- applicable world constraints;
- current continuity state;
- unresolved setup/payoff;
- nearby preceding narrative;
- explicit voice/style requirements.

Do not automatically load the entire project.

## Draft

For a rough scene, prioritise:

- narrative function;
- character behaviour;
- conflict;
- information flow;
- meaningful turn;
- continuity;
- intended voice direction.

Do not optimise every sentence before the scene itself works.

## Refine

When refining:

1. identify preserve constraints;
2. identify requested changes;
3. edit only the necessary scope;
4. preserve approved story behaviour;
5. avoid introducing new continuity conflicts.

Refinement may improve:

- voice;
- dialogue;
- subtext;
- pacing;
- specificity;
- description;
- POV execution;
- prose rhythm;
- screenplay economy.

## Final

Produce stable narrative execution suitable for editorial approval or downstream handoff.

For screenplay output, prefer Fountain where a portable screenplay interchange format is useful.

## Prose

Support narrative behaviours such as:

- chapter-level prose;
- narration;
- interiority;
- POV;
- dialogue;
- scene transitions.

Do not assume screenplay constraints apply to prose.

## Screenplay

Support:

- scene headings;
- visible action;
- dialogue;
- screenplay-readable scene execution;
- Fountain representation where appropriate.

Do not drift into:

- cinematography;
- shot design;
- storyboard production;
- visual character design.

Those belong to downstream production domains.

## Discovery writing

If drafting reveals a material story discovery:

1. surface the discovery;
2. identify the affected planning artifact;
3. update or recommend updating it;
4. update continuity where needed;
5. continue from the revised story state.

Do not let the manuscript silently diverge from all planning artifacts.

## Upstream conflict

If the requested scene is impossible without violating an approved upstream decision, do not hide the problem with prose.

Surface the conflict and identify the decision that must be revised.

## Evaluation

At draft stage, check whether the scene or section works narratively.

At refine stage, verify the requested improvement and preservation constraints.

At final stage, run all applicable narrative and format-specific checks.

## Do not

- rewrite the whole story for a local prose defect;
- silently change approved character motivation or story outcomes;
- treat planned future events as already canonical;
- require a proprietary text-generation provider;
- create visual-production artifacts.
```

---

# 10. `narrative-continuity/SKILL.md`

```markdown
---
name: narrative-continuity
description: Maintain narrative continuity and assemble task-relevant story context across long-form or evolving narrative work. Use to track canon versus plans, character beliefs and knowledge, important world rules, chronology, unresolved story state, continuity conflicts, and the context needed for a new scene or revision.
---

# Narrative Continuity

Maintain enough explicit story state to prevent narrative drift without turning the project into a knowledge-engineering platform.

This skill owns:

- narrative continuity;
- relevant-context selection.

## Determine whether continuity work is needed

Use this skill when:

- continuing a long-form narrative;
- checking contradictions;
- updating canon;
- tracking character knowledge;
- tracking important chronology;
- tracking world constraints;
- preparing context for a scene;
- assessing impact of an upstream change.

Do not require a continuity workflow for trivial standalone tasks.

## Narrative state

At minimum distinguish:

- `planned`;
- `canonical`;
- `character-belief`;
- `secret`;
- `uncertain`;
- `superseded`.

Do not collapse conflicting testimony, mystery, or unreliable narration into an invented objective fact.

## Planned vs canonical

An outlined future event remains `planned`.

Promote it to `canonical` only when approved narrative establishes it.

If a plan is abandoned, mark or replace it as `superseded` rather than treating it as story fact.

## Character knowledge

Track knowledge or beliefs only where they materially affect narrative behaviour.

Do not assume:

- narrator knowledge;
- reader knowledge;
- one character's belief;
- objective story truth;

are equivalent.

## World constraints

Track world facts and rules that constrain future narrative.

Prioritise consequential rules over descriptive lore.

## Context assembly

For the current task:

1. identify the target artifact;
2. identify involved characters;
3. identify relevant beats or outline region;
4. identify applicable world constraints;
5. identify relevant continuity state;
6. include nearby narrative context;
7. omit unrelated material.

Do not load every artifact merely because it exists.

## Updating continuity

After approved narrative changes:

1. identify what state actually changed;
2. update only relevant continuity entries;
3. promote planned material to canonical only when established;
4. identify future material that may now be affected;
5. leave unrelated state unchanged.

## Impact review

When an upstream decision changes:

1. inspect direct dependent artifacts;
2. determine whether each is actually affected;
3. report affected material;
4. do not automatically rewrite it unless revision is requested.

## Initial implementation boundary

Use portable files and explicit records.

Do not require:

- automatic fact extraction;
- knowledge graph;
- graph database;
- vector database;
- semantic retrieval service;
- entity-resolution engine;
- temporal reasoning engine;
- automatic dependency propagation.

These are follow-up improvements only if core workflows prove a recurring need.

## Evaluation

Continuity findings should be supported by actual story evidence.

Do not invent contradictions merely because information is absent.

## Do not

- convert every outline statement into canon;
- collapse character belief into objective truth;
- load the entire manuscript for every task;
- require hidden agent memory as the source of truth.
```

---

# 11. `narrative-evaluate/SKILL.md`

```markdown
---
name: narrative-evaluate
description: Evaluate story concepts, outlines, beats, scenes, manuscripts, and screenplays using domain-native narrative criteria without silently rewriting them. Use for developmental editing, structural diagnosis, scene evaluation, artifact readiness, continuity-aware review, and editorial reports.
---

# Narrative Evaluate

Diagnose narrative quality and readiness without silently replacing the target artifact.

Evaluation is separate from revision.

## Determine artifact and lifecycle state

Identify the target:

- story concept;
- character profile;
- world bible;
- story outline;
- beat sheet;
- scene card;
- narrative draft;
- manuscript;
- screenplay.

Identify lifecycle state:

- `draft`;
- `refine`;
- `final`.

Evaluate only dimensions that make sense for that artifact and state.

## Draft evaluation

Check only what is needed to decide whether the artifact is useful for continued exploration.

Typical checks:

- basic coherence;
- hard-constraint compliance;
- catastrophic contradiction;
- candidate distinctiveness;
- whether it is worth developing.

Do not criticise prose that does not yet exist.

## Refine evaluation

Verify:

- requested correction succeeded;
- preserve constraints survived;
- approved decisions survived;
- continuity remains acceptable;
- no major regression was introduced.

## Final evaluation

Run all applicable developmental checks.

Possible dimensions:

- premise;
- causality;
- character;
- conflict;
- stakes;
- structure;
- pacing;
- scene purpose;
- world consistency;
- continuity;
- POV;
- voice;
- dialogue;
- theme;
- tone;
- setup/payoff;
- genre/audience fit.

Do not force every dimension onto every artifact.

## Artifact-specific evaluation

### Concept

Check:

- central proposition;
- conflict;
- protagonist/story fit;
- stakes;
- sustainability for intended form;
- distinctiveness;
- brief alignment.

### Character

Check:

- motivation;
- conflict;
- story function;
- behavioural credibility;
- arc potential;
- unnecessary biography.

### World

Check:

- narrative relevance;
- rule coherence;
- useful constraints;
- compatibility with the story;
- unnecessary lore expansion.

### Outline

Check:

- causality;
- escalation;
- character progression;
- turning points;
- setup/payoff;
- ending logic;
- structural coherence.

### Beats

Check:

- meaningful change;
- causes and consequences;
- progression;
- information order;
- escalation;
- redundancy.

### Scene card

Check:

- purpose;
- objective;
- conflict;
- turn;
- entry/exit state;
- relationship to beats;
- continuity requirements.

### Narrative draft

Check applicable:

- scene function;
- character behaviour;
- continuity;
- pacing;
- POV;
- voice;
- dialogue;
- tone;
- execution.

## Editorial report

Findings should identify:

- category;
- severity;
- scope;
- location;
- evidence;
- diagnosis;
- affected material;
- recommendation.

Prioritise root causes over surface symptoms.

Prioritise structural/developmental issues before copy-level polish.

## Evidence

Ground findings in the actual artifact.

Do not invent missing evidence to justify a critique.

## Scoring

Do not require a single numeric narrative-quality score.

Qualitative diagnosis is the default.

## Do not

- rewrite the target when evaluation only was requested;
- impose one structural methodology as universal;
- treat mechanical lint results as narrative-quality scores;
- recommend whole-story rewrites for local defects without evidence;
- confuse taste with hard production constraints.
```

---

# 12. `narrative-revise/SKILL.md`

```markdown
---
name: narrative-revise
description: Plan and perform targeted narrative revision from editorial findings or direct feedback while preserving approved work. Use for developmental rewrites, scene repair, structural revision, applying notes, reopening approved decisions, impact analysis, and verifying that a correction succeeded without unnecessary regeneration.
---

# Narrative Revise

Convert diagnosis or direct feedback into bounded narrative change.

The default is targeted revision, not wholesale regeneration.

## Inputs

Use as available:

- editorial report;
- direct user feedback;
- target artifact;
- relevant upstream artifacts;
- continuity record;
- approved decisions;
- preserve constraints.

## Revision sequence

1. identify the actual problem;
2. identify the root cause;
3. identify the smallest sufficient revision scope;
4. identify what must be preserved;
5. identify what may change;
6. identify affected downstream artifacts;
7. revise;
8. verify.

## Revision scope

Possible scopes:

- local passage;
- scene;
- beat;
- sequence / section;
- character arc;
- story outline;
- page-one rewrite.

Use the smallest scope capable of resolving the diagnosed issue.

## Revision plan

A useful plan records:

- goal;
- source finding/feedback;
- targets;
- preserve constraints;
- intended changes;
- affected material;
- verification conditions.

## Preserve approved work

Approved decisions remain constraints unless explicitly reopened.

Do not silently modify:

- approved protagonist direction;
- approved ending;
- approved world rule;
- approved character relationship;
- other declared preserve constraints.

## Reopening approved decisions

If revision requires changing approved upstream work:

1. identify the approved decision;
2. state why it must be reopened;
3. reopen it explicitly;
4. create/refine alternatives where useful;
5. select the replacement direction;
6. identify affected downstream material;
7. revise only affected descendants.

## Root-cause targeting

Examples:

Weak prose + sound scene:

```text
rewrite prose only
```

Weak scene design + sound beat:

```text
revise scene card
→ rewrite scene
```

Unmotivated beat:

```text
revise beat
→ update affected scenes
```

Weak causal section:

```text
revise affected outline region
```

Do not patch an upstream structural failure only with line-level prose.

## Local alternatives

When the solution is uncertain, explore alternatives only at the affected scope.

Do not generate three complete new stories to solve one weak middle section.

## Verification

After revision verify:

- target issue improved or resolved;
- preserve constraints survived;
- continuity remains coherent;
- no major regression was introduced;
- affected descendants are consistent.

## Do not

- discard approved work without explicit reopening;
- regenerate unaffected narrative;
- treat page-one rewrite as the default;
- change continuity state without evidence from approved narrative;
- require graph-based dependency propagation.
```

---

## 13. References

Each skill's `references/` directory contains detailed production knowledge needed at runtime but too large or specialised for `SKILL.md`.

### `narrative-develop`

```text
artifacts.md
story-development.md
characters.md
world-building.md
structure.md
beats-and-scenes.md
draft-selection.md
```

These should cover multiple craft approaches without turning one theory into a mandatory architecture.

### `narrative-write`

```text
artifacts.md
prose.md
screenplay.md
scene-writing.md
discovery-writing.md
```

### `narrative-continuity`

```text
artifacts.md
continuity.md
context-assembly.md
```

### `narrative-evaluate`

```text
artifacts.md
developmental-evaluation.md
artifact-readiness.md
editorial-report.md
```

### `narrative-revise`

```text
artifacts.md
revision.md
impact-analysis.md
```

Runtime references must remain local to the installed skill.

Each skill-local `artifacts.md` contains only the artifact semantics that skill must consume or produce. Small contract fragments may be duplicated between skills so selective installation remains self-contained.

Do not make an installed skill read repository-level `/docs` at runtime to discover artifact semantics.

---

## 14. Assets

Use `assets/` only for reusable templates/examples that materially improve execution.

Initial assets:

### `narrative-develop`

```text
narrative-brief.example.yaml
story-outline.example.yaml
```

### `narrative-continuity`

```text
continuity-record.example.yaml
```

### `narrative-evaluate`

```text
editorial-report.example.yaml
```

### `narrative-revise`

```text
revision-plan.example.yaml
```

Do not create template files merely to mirror every artifact.

---

## 15. Scripts and Repository Tooling

### Skill-Local Scripts

The initial narrative skills do not require skill-local scripts.

Add one only when deterministic execution is more correct, repeatable, or economical than asking the host model to perform the operation.

Good future candidates:

```text
validate artifact IDs/references
find dangling references
parse Fountain
extract screenplay scenes
validate simple artifact metadata
run mechanical lint
convert document formats
```

Bad script candidates:

```text
judge character depth
choose the strongest concept
decide whether an ending works
evaluate theme
write dialogue
score tension numerically
```

Narrative judgement remains model-directed.

### Repository Tooling

Bootstrap and validation tooling must use **TypeScript**.

Initial repository tooling should provide at least:

```text
scripts/validate-skills.ts
→ validate skill discovery metadata, required files, local runtime references, and eval JSON

scripts/smoke-install.ts
→ exercise local selective installation from a clean consumer project

tests/validate-skills.test.ts
→ automated tests for deterministic validation behaviour
```

Use modern TypeScript and Node.js practices:

- strict static checking;
- explicit runtime validation at filesystem/process boundaries;
- typed internal data structures;
- safe subprocess invocation using argument arrays rather than shell-concatenated commands;
- explicit exit-code handling;
- deterministic tests;
- no hidden network dependency for repository validation.

Repository TypeScript tooling must remain support infrastructure. It must not become a narrative workflow engine, model router, context database, or agent orchestration layer.

---

## 16. Skill Evals

Every skill must contain:

```text
evals/evals.json
```

Evals should cover:

- normal case;
- draft case;
- refinement case;
- final case;
- failure/boundary case.

Quality criteria must remain domain-native.

Prefer observable production invariants over vague prompts such as:

```text
write a good story
```

---

## 17. `narrative-develop` Evals

Initial cases:

### Normal

```text
brief
→ story development
→ coherent outline
```

Verify:

- output remains traceable to brief;
- characters/world support story rather than overwhelm it;
- outline is causal and coherent;
- no mandatory structural formula is imposed.

### Draft

```text
brief
→ several concept alternatives
```

Verify:

- candidates differ meaningfully;
- candidates stay low resolution;
- selection remains open.

### Refine

```text
keep protagonist and ending
fix weak middle escalation
```

Verify:

- protagonist preserved;
- ending preserved;
- affected region changes;
- unaffected structure remains intact.

### Final

```text
selected outline
→ production-ready scene-planning input
```

Verify:

- major causal relationships are clear;
- character progression aligns;
- important setup/payoff is represented;
- unresolved material is surfaced.

### Boundary

A request for character portraits or shot composition must not turn the skill into visual production.

---

## 18. `narrative-write` Evals

### Normal

```text
approved scene card
+ relevant character profile
+ preceding scene
→ draft scene
```

Verify:

- scene fulfils intended function;
- behaviour fits character constraints;
- continuity is preserved;
- outcome matches planned state.

### Draft

Produce a rough scene.

Verify dramatic function is prioritised over polish.

### Refine

```text
preserve revelation and outcome
improve dialogue and subtext
```

Verify both preserve constraints survive.

### Final

Produce polished prose or Fountain screenplay material from approved narrative.

Verify:

- story decisions preserved;
- format-specific execution appropriate;
- no major continuity conflict introduced.

### Boundary

If the scene card contradicts approved character motivation, surface the upstream conflict rather than hiding it with prose.

---

## 19. `narrative-continuity` Evals

### Normal

Prepare relevant context for the next scene of a multi-scene story.

Verify:

- relevant material selected;
- unrelated material omitted;
- continuity state accurately represented.

### Draft

An outline event not yet written must remain:

```text
planned
```

not canonical.

### Refine

An approved scene changes one character's knowledge.

Verify only relevant knowledge state changes.

### Final

Review a completed narrative section for:

- chronology;
- knowledge errors;
- world-rule violations;
- character-state conflicts.

### Boundary

Conflicting testimony in a mystery must preserve:

```text
character A believes X
character B claims Y
objective truth unresolved
```

rather than inventing certainty.

---

## 20. `narrative-evaluate` Evals

### Normal

Evaluate a complete scene.

Verify findings:

- cite actual evidence;
- identify scope;
- diagnose likely cause;
- provide actionable recommendation.

### Draft

Evaluate concept candidates.

Verify evaluation stays at concept resolution rather than criticising absent prose.

### Refine

Evaluate a revised scene against a prior finding.

Verify:

- requested fix;
- preservation;
- regression.

### Final

Perform developmental evaluation of manuscript or screenplay.

Verify:

- major findings are prioritised;
- structural issues precede copy-level polish;
- criteria remain domain-native.

### Boundary

If user requests evaluation only, rewritten replacement prose is a failure.

---

## 21. `narrative-revise` Evals

### Normal

Given a causal-motivation editorial finding, identify and apply the smallest sufficient correction.

### Draft

Generate several possible fixes before changing the narrative.

Verify alternatives target the diagnosed issue.

### Refine

```text
preserve scene outcome and Marcus's dialogue
fix Alice's motivation
```

Verify preserve constraints survive.

### Final

Apply selected revision plan.

Verify:

- target issue resolved;
- affected descendants updated;
- unaffected approved material preserved;
- continuity remains coherent.

### Boundary

If fixing a scene requires changing an approved premise, the skill must report and explicitly reopen that dependency rather than silently changing it.

---

## 22. Hard Cross-Skill Eval Gates

Regardless of subjective story quality, the following are failures:

1. approved constraints are silently lost;
2. a rejected candidate is used instead of the selected direction;
3. a planned event is treated as established canon;
4. unaffected approved material is unnecessarily regenerated;
5. evaluation rewrites when only evaluation was requested;
6. a local problem triggers unjustified whole-story regeneration;
7. screenplay generation drifts into visual-production responsibilities;
8. world-building creates large unrelated lore dumps by default;
9. character development creates irrelevant biography instead of story behaviour;
10. continuity asserts uncertain information as objective fact;
11. revision changes material explicitly marked `preserve`;
12. a skill requires a provider/API that core Narrative Production Skills does not require;
13. a skill assumes a mandatory story theory;
14. project-local runtime references break after selective skill installation.

---

## 23. End-to-End Evals

Repository-level evals should verify complete workflows.

Initial cases:

### E2E-1 — Short Story

```text
brief
→ concept
→ outline
→ scene cards
→ draft
→ evaluate
→ revise
```

### E2E-2 — Candidate Selection

```text
brief
→ three distinct concepts
→ select one
→ downstream work uses selected direction
```

### E2E-3 — Preserve Approved Work

```text
approved character + ending
→ structural revision
→ both survive
```

### E2E-4 — Continuity

```text
multi-scene story
→ character knowledge changes
→ later scene receives correct state
```

### E2E-5 — Screenplay

```text
story artifacts
→ scene cards
→ Fountain screenplay
→ developmental evaluation
→ targeted revision
```

Do not make long-form retrieval infrastructure a prerequisite for the initial eval set.

---

## 24. Eval Fixtures

Fixtures should encode deliberate narrative conditions.

Example:

```text
fixture: preserve-approved-ending

brief:
  ...

approved:
  protagonist: Alice
  ending: Alice chooses exile

problem:
  Act II lacks escalation

expected:
  protagonist preserved
  ending preserved
  only affected middle structure revised
```

Continuity example:

```text
fixture: character-belief-vs-canon

canon:
  murderer unknown

alice:
  believes Marcus is murderer

marcus:
  denies involvement

expected:
  no continuity record states Marcus is objectively guilty
```

Prefer fixtures that can test production invariants.

---

## 25. Consumer Project Structure and Progressive Examples

Installed agent behaviour and creative artifacts must remain separate.

Smallest useful consumer workspace:

```text
.claude/skills/ or .agents/skills/
→ installed Narrative Production Skills

production/
→ story-development and narrative artifacts
```

Do not prescribe a large canonical directory tree as the starting point.

The `production/` workspace should grow only when a new production responsibility needs persistent structure.

For the first controlled output:

```text
production/
└── story.md
```

may be sufficient.

A later continuity workflow may justify:

```text
production/
├── story/
├── characters/
└── continuity/
```

A screenplay or episodic project should then add only the structures it actually needs.

### Progressive Examples

Examples should teach materially increasing capability rather than isolated API-style demos.

Initial progression:

```text
examples/
├── 01-short-story/
├── 02-mystery-continuity/
├── 03-screenplay/
├── 04-episodic-story/
└── 05-film-handoff/
```

#### `01-short-story`

Proves one controlled end-to-end narrative:

```text
brief
→ concept
→ outline
→ scene
→ evaluate
→ revise
```

#### `02-mystery-continuity`

Adds:

- multiple scenes;
- character beliefs;
- secrets;
- planned versus canonical state;
- continuity-aware writing.

#### `03-screenplay`

Adds:

- scene cards;
- screenplay execution;
- Fountain where useful;
- developmental evaluation;
- targeted revision.

#### `04-episodic-story`

Adds:

- multiple sequences/episodes;
- evolving character arcs;
- larger continuity state;
- progressive evaluation.

#### `05-film-handoff`

Adds cross-domain composition:

```text
Narrative Production Skills
→ screenplay / character / world / scene-plan artifacts
→ downstream Video Production Skills
→ optional Music Production Skills
```

The example should demonstrate artifact handoff without introducing shared runtime APIs.

Examples must be creatively compelling enough to showcase the project.

Where applicable preserve:

```text
brief
draft alternatives
selection
character/world material
outline
beats
scene cards
draft narrative
continuity
evaluation
revision plan
revised output
lineage
```

Candidate-selection and preserve-approved-work cases remain important, but they belong primarily in eval fixtures rather than occupying top-level showcase examples.

Avoid examples that demonstrate only one generic text-generation call.

---

## 26. Extraction Candidate Register

Maintain:

```text
docs/extraction-candidates.md
```

Each candidate should record:

```text
candidate
implemented behaviour
narrative-specific semantics
possible second domain
known differences
status
```

Possible initial candidates:

- draft-set semantics;
- lightweight artifact lineage;
- selection/approval semantics;
- preserve/change refinement semantics;
- staged evaluation;
- promotion/refinement lifecycle.

Stage 10 status is:

```text
observe only
```

for every candidate.

Narrative Production Skills is still specified rather than independently implemented. A similar Video Production Skills design therefore does not yet satisfy the repeated-implementation extraction gate.

Explicit non-candidates at this stage:

```text
narrative character_profile
≠ video character_sheet / character_manifest

narrative continuity
≠ visual / product / shot continuity

narrative editorial_report
≠ video evaluation_report schema

narrative scene_card
≠ video storyboard_frame
```

Reassess only after real implementations provide evidence of semantic equivalence and net simplification.

---

## 27. Upstream Reference and Adaptation Policy

External projects may inform references and eval design.

Do not make third-party narrative-skill repositories mandatory runtime dependencies unless a later architecture decision explicitly requires it.

Where upstream material is copied or adapted:

- verify its licence;
- preserve required attribution;
- record provenance in the repository;
- prefer adapting production principles rather than importing an entire unrelated framework.

Narrative Production Skills must remain coherent and domain-native.

---

## 28. Open-Source Boundaries

The repository is canonical for:

- skills;
- specs;
- workflow rules;
- references;
- evals;
- examples;
- extraction candidates;
- installation instructions.

Detailed production methodology may later live in `guides/`.

Finished evidence may later live in `showcases/`.

Reusable specialisations may later live in `recipes/`.

Do not scaffold these surfaces empty.

Do not let examples or blog content silently redefine normative skill behaviour.

---

## 29. Canonical Installation Mechanism

Use the open Agent Skills CLI.

Inspect available skills:

```bash
npx skills add <org>/<repo> --list
```

Install repository skills into the current project:

```bash
npx skills add <org>/<repo>
```

Install one skill:

```bash
npx skills add <org>/<repo> \
  --skill narrative-write
```

Target a specific agent:

```bash
npx skills add <org>/<repo> \
  --skill narrative-write \
  --agent claude-code
```

or:

```bash
npx skills add <org>/<repo> \
  --skill narrative-write \
  --agent codex
```

Global installation is optional:

```bash
npx skills add <org>/<repo> --global
```

**Project-local installation is the default recommendation.**

---

## 30. Why Project-Local Is the Default

Narrative-production skills materially affect agent behaviour.

Project-local installation provides:

- explicit project dependencies;
- reproducibility;
- team visibility;
- isolation between unrelated creative projects;
- easier compatibility management.

Global installation is appropriate only when a user deliberately wants these behaviours across all projects.

---

## 31. Installed Skill Tracking

Useful Skills CLI commands:

```bash
npx skills list
npx skills check
npx skills update
npx skills generate-lock
```

A consuming project may commit `skills-lock.json` where useful.

Do not make experimental lock restoration a core runtime dependency.

Document explicit `npx skills add ...` recovery commands.

---

## 32. Recommended Skill Combinations

### Story Development

```text
narrative-develop
narrative-evaluate
```

### Draft and Revision

```text
narrative-write
narrative-evaluate
narrative-revise
```

### Long-Form

```text
narrative-develop
narrative-write
narrative-continuity
narrative-evaluate
narrative-revise
```

### Screenplay

```text
narrative-develop
narrative-write
narrative-continuity
narrative-evaluate
narrative-revise
```

with optional Fountain tooling where useful.

---

## 33. Local Installation Validation

Before GitHub publication:

```bash
npx skills add . --list
```

Then install **each intended skill independently** from the local repository into a clean temporary consumer project.

Example:

```bash
mkdir /tmp/narrative-skills-smoke
cd /tmp/narrative-skills-smoke
git init

npx skills add /path/to/narrative-production-skills \
  --skill narrative-develop \
  --agent claude-code
```

Repeat for every intended skill.

Verify:

- skill is discovered;
- each intended skill installs independently;
- `SKILL.md` is valid;
- local references are present;
- scripts/assets are present where required;
- no repository-level runtime reference breaks;
- selective installation remains usable;
- TypeScript static checks pass;
- deterministic repository scripts and tests pass;
- installed-skill smoke tests execute from clean consumer projects;
- at least one realistic progressive example exercises intended narrative-production behaviour.

A mandatory gate that cannot be demonstrated is **blocked**, not passed.

Distinguish:

```text
repository defect
vs
environment / network failure
```

but do not advance the bootstrap stage until the required acceptance criterion has been proved.

---

## 34. CI Expectations

Minimum useful CI:

```text
validate SKILL.md/frontmatter
validate expected files
validate eval JSON
run strict TypeScript static checks
run deterministic repository tests
run cheap eval fixtures
test `npx skills add . --list`
test local installation of each intended skill
run installed-skill smoke tests from clean consumer workspaces
detect broken runtime references
```

Core narrative evals should not require paid external provider APIs.

Any provider-backed or externally networked eval may run separately when it introduces meaningful cost or environmental fragility.

---

## 35. README Contract

Benchmark the README against strong, relevant open-source Agent Skills and creative-production repositories before finalising it.

The README is for discovery and onboarding, not a replacement for the canonical specs.

Lead users through:

```text
what Narrative Production Skills enables
→ installation
→ first useful result
→ progressively more ambitious examples
→ skills / requirements
→ deeper documentation
```

Design for narrow screens:

- prefer stacked sections to wide Markdown tables;
- keep installation near the top;
- put every copyable prompt in a fenced code block;
- use examples that expose real narrative-production capabilities.

Until the exact public GitHub owner and repository name have been verified, use placeholders:

```bash
# Inspect
npx skills add <org>/<repo> --list

# Install
npx skills add <org>/<repo>

# Install selected skill
npx skills add <org>/<repo> \
  --skill narrative-write

# Explicit agent target
npx skills add <org>/<repo> \
  --skill narrative-write \
  --agent claude-code
```

Do not publish commands pointing at an inferred repository identity.

After publication, replace placeholders only after verifying the exact GitHub owner and repository name.

Also document:

- required host capabilities;
- optional deterministic dependencies;
- recommended skill combinations;
- project-local default;
- global installation;
- update commands;
- consumer-project workspace guidance.

---

## 36. Technical Acceptance Criteria

The repository contract is correct when:

1. each skill has valid Agent Skills frontmatter;
2. all five skills are independently discoverable;
3. each installed skill is self-contained;
4. each skill carries the artifact semantics it needs in local references rather than depending on repository-level `/docs`;
5. no mandatory text-model provider API is required;
6. no mandatory MCP, database, vector store, or graph store is required;
7. lifecycle behaviour is explicit in each relevant skill;
8. decision status is distinct from lifecycle state;
9. `narrative-develop` owns development without one-skill-per-artifact fragmentation;
10. `narrative-write` supports prose and screenplay without absorbing visual production;
11. `narrative-continuity` distinguishes planned, canonical, belief, secret, uncertainty, and superseded states;
12. context assembly is file/artifact-directed initially;
13. `narrative-evaluate` diagnoses without silently rewriting;
14. `narrative-revise` preserves approved work and targets the smallest sufficient scope;
15. skill evals cover normal, draft, refine, final, and boundary cases;
16. hard cross-skill preservation and canon invariants are tested;
17. end-to-end evals cover selection, approval, continuity, evaluation, and targeted revision;
18. Fountain is treated as an optional screenplay interchange format rather than a narrative model;
19. deterministic skill-local tools remain limited to deterministic tasks;
20. repository tooling is TypeScript with strict static checks, explicit runtime validation at external boundaries, safe subprocess invocation, and deterministic tests;
21. examples demonstrate progressive production capability rather than disconnected text-generation calls;
22. consumer-project guidance separates installed skills from `production/` artifacts and starts from the smallest useful workspace;
23. optional directories are created only when real content exists;
24. extraction candidates are tracked rather than prematurely shared;
25. over-engineered follow-up infrastructure is not required by the initial repository;
26. `npx skills add . --list` succeeds locally;
27. each intended skill installs independently into a clean test project;
28. installed-skill smoke tests execute from clean consumer workspaces;
29. no installed skill breaks because it references repository-level private resources;
30. README commands retain `<org>/<repo>` until exact public repository identity is verified;
31. mandatory validation gates are never reported as passed while blocked.

---

## 37. Initial Repository Completion Gate

Before publication:

```text
✓ repository initialised
✓ three canonical specs directly under /docs
✓ README exists
✓ licence selected
✓ CONTRIBUTING.md exists
✓ CODE_OF_CONDUCT.md exists
✓ SECURITY.md exists
✓ five skills are self-contained
✓ skill evals exist
✓ at least one realistic, capability-led progressive example exists
✓ consumer-project structure is documented
✓ strict TypeScript checks pass
✓ deterministic repository tests pass
✓ local Skills CLI listing succeeds
✓ local selective installation succeeds
✓ installed-skill smoke tests run from clean consumer projects
✓ no mandatory validation gate is being treated as passed while blocked
```

---

## 38. Publication Acceptance Gate

After publication:

```text
✓ public GitHub repository is accessible
✓ exact GitHub owner/repository identity is verified
✓ README installation commands reference that verified repository
✓ README installation commands work
✓ `npx skills add <org>/<repo> --list` succeeds from GitHub
✓ intended skills install individually from GitHub
✓ installed skills contain all required runtime resources
✓ at least two supported agent targets are tested where practical
✓ CI passes
✓ repository metadata is configured
```

Publication is incomplete until the external GitHub installation smoke test succeeds.

---

**Narrative Production Skills — Creative Skills Repository and Contracts Specification v3**
