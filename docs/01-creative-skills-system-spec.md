# Narrative Production Skills — Creative Skills System Specification

## 1. Purpose

**Narrative Production Skills** is an open-source Agent Skills project for directing AI-assisted narrative development through reusable, medium-independent story-production workflows.

It owns the production intelligence required to move from narrative intent to a coherent, editable, evaluable manuscript, screenplay, or reusable story package while preserving important creative decisions throughout development.

The project does not provide its own language model or writing application.

The governing boundary is:

> **Narrative Production Skills owns story-development workflow and narrative-production intelligence. The host agent owns language generation and reasoning.**

Narrative Production Skills owns **story**, not visual production.

---

## 2. Project Goal

Enable an AI agent to develop, evaluate, and refine a narrative from initial intent to a coherent manuscript, screenplay, or reusable story package while:

- exploring meaningful alternatives before expensive downstream writing;
- preserving selected and approved decisions;
- maintaining sufficient continuity;
- separating planned narrative from established canon;
- evaluating at the correct narrative resolution;
- revising the smallest sufficient part of the work;
- supporting both planned and discovery-writing workflows;
- remaining independent of any single model provider.

The default production progression is:

```text
Narrative Brief
      ↓
Concept Exploration
      ↓
Selected Story Concept
      ↓
Story Development
 ├── Character Profiles
 ├── World Bible
 └── Story Outline
      ↓
Beat Sheet
      ↓
Scene Cards
      ↓
Narrative Draft
      ↓
Developmental Evaluation
      ↓
Revision Plan
      ↓
Targeted Revision
      ↺
      ↓
Approved Narrative
      ↓
Manuscript / Screenplay / Story Handoff
```

This is a default production path, not a mandatory story formula.

---

## 3. Intended Users

Primary users are:

- writers using AI as a structured creative collaborator;
- creators developing stories before visual, comic, video, game, or other production;
- creative teams that need inspectable story-development artifacts;
- AI agents operating autonomously or interactively on narrative work;
- developers installing reusable narrative-production behaviour into agent-enabled projects.

---

## 4. Supported Outputs

The project supports development of:

- short stories;
- novels and novellas;
- episodic or serial fiction;
- feature screenplays;
- episodic screenplays;
- narrative treatments or story packages;
- story material intended for downstream creative-production projects.

The important abstraction is the evolving **story model and its creative decisions**, not a specific final file type.

Final execution may diverge into:

```text
Narrative Story Model
       │
       ├── Prose
       │    └── manuscript
       │
       └── Screen
            └── screenplay
```

---

## 5. Project Scope

Narrative Production Skills owns:

- narrative brief interpretation;
- premise and concept development;
- meaningful concept alternatives;
- character development for story behaviour;
- world development and narrative constraints;
- story outlining;
- beats;
- scene planning;
- artifact-aware prose drafting;
- artifact-aware screenplay drafting;
- discovery-writing support;
- narrative continuity;
- task-relevant context assembly;
- draft sets;
- candidate selection;
- approval and preservation semantics;
- lightweight artifact lineage;
- developmental evaluation;
- editorial reports;
- revision planning;
- targeted revision;
- cross-project narrative artifact handoffs.

---

## 6. Non-Goals

Narrative Production Skills does not own:

- image generation;
- character visual design;
- storyboards as visual-production artifacts;
- comic page or panel production;
- cinematography;
- video generation;
- music composition or production;
- game mechanics or gameplay systems;
- game asset generation;
- advertising campaign strategy;
- publishing or distribution platforms;
- a proprietary screenplay editor;
- a custom manuscript editor;
- a custom LLM API client;
- a mandatory model router;
- a mandatory MCP runtime;
- a mandatory multi-agent orchestrator;
- a graph database;
- a vector database;
- a universal Creative Production framework.

The project may produce narrative artifacts consumed by those domains without absorbing their responsibilities.

---

## 7. Production Principles

### 7.1 Domain First

Narrative workflows are based on real narrative-production practice rather than current model capabilities.

### 7.2 Multi-Resolution Development

Narrative work progresses through different useful resolutions:

```text
concept
→ outline
→ beats
→ scenes
→ written narrative
```

Do not collapse these representations.

### 7.3 Draft at the Cheapest Useful Resolution

Resolve uncertainty at the lowest narrative resolution capable of resolving it.

Do not write full scenes to answer questions a concept, outline, beat, or scene card can answer.

### 7.4 Preserve Approved Work

Approved decisions become downstream constraints unless intentionally reopened.

Refinement should preserve what already works and change only what needs to change.

### 7.5 Branch Locally

When alternatives are needed, branch at the smallest creative unit containing the uncertainty.

Prefer:

```text
approved beginning
+
three alternative middles
```

over generating three unrelated complete stories.

### 7.6 Evaluation Before Rewrite

Evaluation diagnoses. Revision changes.

Do not silently rewrite narrative when the requested operation is evaluation.

### 7.7 Fix the Root Cause

Correct the highest upstream cause of a failure while regenerating only affected downstream material.

### 7.8 Planning and Drafting Co-Evolve

Discovery writing is valid.

Draft prose may reveal better character, world, or structural decisions. Those discoveries should be reflected in persistent artifacts rather than remaining trapped only in manuscript text.

### 7.9 Planned Is Not Canonical

An outlined future event is planned.

It becomes canonical only when established in approved narrative.

### 7.10 Structure-Framework Neutral

The project may reference three-act structure, five-act structure, sequence approaches, beat systems, Hero's Journey, Save the Cat, or other craft frameworks.

None is a mandatory system architecture.

---

## 8. System Architecture

```text
                    User / Calling Agent
                            │
                            ▼
                  Narrative Production Skill
                            │
             ┌──────────────┼───────────────┐
             │              │               │
             ▼              ▼               ▼
       Workflow State   Artifact State   Task Intent
             │              │               │
             └──────────────┼───────────────┘
                            ▼
                     Context Assembly
                            │
                            ▼
                      Host AI Model
                            │
                            ▼
                    Narrative Artifact
                            │
             ┌──────────────┴──────────────┐
             │                             │
             ▼                             ▼
    Narrative Evaluation          Optional Deterministic
             │                    Utility
             ▼                             │
      Revision / Approval                  ▼
             │                       validated /
             │                       converted output
             └──────────────┬──────────────┘
                            ▼
                     Project Files
```

The host model owns language generation and reasoning.

Narrative Production Skills owns what to develop, which artifacts matter, what must be preserved, what context should be loaded, how narrative quality is evaluated, and where revision should occur.

---

## 9. Execution Layer

Core execution requires only:

```text
Agent Skills-compatible host
+
host language model
+
skill instructions/references
+
portable project files
```

The initial implementation must not require:

```text
network access
provider API key
custom LLM SDK
MCP
database
vector store
graph store
workflow engine
background service
multi-agent runtime
```

Project-local file access is strongly recommended for persistent workflows.

---

## 10. Core Skills

The initial project contains five domain-native skills.

```text
narrative-develop
narrative-write
narrative-continuity
narrative-evaluate
narrative-revise
```

Artifacts are not mapped one-to-one to skills.

The governing rule is:

> **Artifacts represent production state. Skills represent coherent production capabilities.**

---

## 11. `narrative-develop`

Owns story development before and alongside high-resolution writing.

Responsibilities:

- interpret narrative intent into a usable brief;
- explore story concepts;
- generate meaningfully distinct alternatives;
- develop story-relevant characters;
- develop story-relevant world constraints;
- create and refine story outlines;
- develop beats;
- plan scenes;
- branch locally when structural uncertainty exists;
- compare and select candidate directions;
- preserve selected and approved decisions;
- avoid mandatory story formulas.

Primary artifacts:

```text
narrative_brief
story_concept
character_profile
world_bible
story_outline
beat_sheet
scene_card
```

---

## 12. `narrative-write`

Owns narrative execution from sufficiently developed story artifacts.

Responsibilities:

- rough scene drafting;
- refined scene writing;
- chapter writing;
- prose narrative;
- screenplay narrative;
- dialogue in scene context;
- manuscript development;
- screenplay development;
- discovery-writing support;
- format-aware refinement;
- preservation of approved story behaviour.

Primary artifacts:

```text
narrative_draft
manuscript
screenplay
```

The skill must not hide structural failures with polished prose.

---

## 13. `narrative-continuity`

Owns explicit narrative state and task-relevant context selection.

Responsibilities:

- distinguish planned and canonical material;
- track character beliefs and knowledge where important;
- track narrative-relevant world constraints;
- track important chronology and state;
- preserve secrets and unresolved uncertainty without collapsing them into fact;
- select relevant artifacts for the next task;
- identify continuity conflicts;
- identify potentially affected artifacts after an upstream change.

The initial implementation remains file-based and agent-directed.

It does not require automatic extraction, knowledge graphs, vector retrieval, or a temporal reasoning engine.

---

## 14. `narrative-evaluate`

Owns narrative diagnosis without silently rewriting the target artifact.

Responsibilities:

- concept evaluation;
- outline and structural evaluation;
- beat and scene evaluation;
- developmental manuscript evaluation;
- developmental screenplay evaluation;
- continuity-aware evaluation;
- lifecycle-aware evaluation;
- artifact-readiness assessment;
- editorial reports;
- actionable recommendations.

Applicable quality dimensions include:

```text
premise
causality
character
conflict
stakes
structure
pacing
scene purpose
world consistency
continuity
POV
voice
dialogue
theme
tone
setup/payoff
genre/audience fit
```

Not every dimension applies to every artifact or lifecycle state.

---

## 15. `narrative-revise`

Owns bounded revision after diagnosis or direct feedback.

Responsibilities:

- convert findings into revision plans;
- identify root causes;
- identify the smallest sufficient revision scope;
- state what must be preserved;
- state what may change;
- identify affected descendants;
- reopen approved decisions explicitly where necessary;
- perform targeted revision;
- verify that the requested correction succeeded;
- verify that approved unaffected material survived.

Possible revision scopes include:

```text
local passage
scene
beat
sequence / section
character arc
story outline
page-one rewrite
```

Page-one rewriting is allowed when genuinely required, but is not the default.

---

## 16. Cross-Cutting Lifecycle

Every production artifact uses one lifecycle state:

```text
draft
refine
final
```

Lifecycle state is separate from decision status:

```text
candidate
selected
approved
rejected
superseded
```

Examples:

```yaml
workflowState: draft
decisionStatus: selected
```

```yaml
workflowState: final
decisionStatus: approved
```

Do not collapse these dimensions.

---

## 17. Draft Strategy

Narrative resolution should escalate only when the next creative decision cannot be evaluated adequately at the current resolution.

Typical progression:

```text
Concept Drafts
      ↓
Selected Concept
      ↓
Character / World / Outline Drafts
      ↓
Selected Story Direction
      ↓
Beat Drafts
      ↓
Selected Beats
      ↓
Scene-Card Drafts
      ↓
Selected Scene Design
      ↓
Rough Scene
      ↓
Refined Scene
      ↓
Approved Narrative
```

Candidate counts are not fixed.

Prefer meaningful diversity over many superficial variants.

---

## 18. Context Assembly

Context assembly is narrative-production behaviour.

For each task:

```text
current task
      ↓
target artifact
      ↓
relevant upstream decisions
      ↓
relevant characters
      ↓
relevant world constraints
      ↓
relevant continuity
      ↓
nearby narrative context
      ↓
generation / evaluation
```

Do not load the whole narrative project automatically.

The initial implementation uses skill-directed file selection rather than embeddings, RAG infrastructure, or a vector store.

---

## 19. Optional Deterministic Tools

The project may use existing deterministic tools where they are more reliable than model reasoning.

### Fountain

Preferred screenplay interchange format.

The host model creates screenplay content. Deterministic tooling may parse or validate Fountain where useful.

### Screenplay parsing/conversion

Existing screenplay tooling may be used for operations such as:

- parsing Fountain;
- extracting scenes;
- validating screenplay structure;
- converting to FDX.

Do not build a custom screenplay parser unless an actual gap requires it.

### Pandoc

May be used for deterministic manuscript conversion to formats such as:

- DOCX;
- EPUB;
- HTML;
- PDF-oriented workflows.

### Vale / LanguageTool

May be used for optional mechanical checks such as:

- spelling;
- grammar;
- house style;
- forbidden terminology;
- simple mechanical consistency.

These tools must not define narrative quality.

---

## 20. External Dependencies

### Required

No narrative-specific provider skill is mandatory.

Required environment capability:

```text
Agent Skills-compatible host
+
language-model reasoning/generation
```

### Optional

Depending on the task:

```text
Fountain-compatible tooling
Pandoc
Vale
LanguageTool
```

No custom text-generation provider client is part of the project.

---

## 21. Skill Composition

Do not assume a proprietary skill-to-skill function interface.

Incorrect:

```text
narrativeDevelop.execute(...)
narrativeEvaluate.run(...)
```

Composition occurs through:

- agent instructions;
- current working context;
- approved artifacts;
- project files;
- artifact lineage;
- continuity records;
- files produced by previous workflow stages.

Example:

```text
narrative-develop
      ↓
approved outline + scene card
      ↓
narrative-write
      ↓
draft scene
      ↓
narrative-evaluate
      ↓
editorial report
      ↓
narrative-revise
```

---

## 22. Project Boundaries

Narrative Production Skills may consume external material such as:

- creative briefs;
- campaign requirements;
- source/reference material;
- existing prose;
- existing screenplays;
- adaptation source material.

It may produce:

```text
narrative brief
story concept
character profile
world bible
story outline
beat sheet
scene plan
manuscript
screenplay
dialogue
editorial report
revision plan
continuity material
```

Cross-project composition should occur through artifacts before shared runtime APIs.

### Consumer Workspace Boundary

Installed Agent Skills and narrative-production artifacts are separate concerns.

A consuming project should begin with:

```text
.claude/skills/ or .agents/skills/
→ installed Agent Skills

production/
→ narrative and production artifacts
```

Do not require a large canonical story workspace before the workflow needs it.

Production structure should grow as new responsibilities appear:

```text
one controlled story output
→ multi-scene continuity
→ polished screenplay or manuscript
→ episodic / multi-sequence production
→ multi-domain handoff
```

This keeps installation behaviour separate from creative state and avoids turning repository structure into a premature narrative framework.

---

## 23. Cross-Project Handoffs

### Handoff Naming

Internal Narrative Production artifact names remain canonical inside this repository.

Where the family or an existing consumer already uses a different handoff term, expose an explicit projection rather than inventing another first-class artifact:

```text
narrative_brief
→ story brief

scene_card
→ scene plan

narrative_draft / screenplay
→ dialogue extract where needed

world_bible
→ item / creature / location / story-constraint views where needed
```

These are handoff representations, not new lifecycle primitives.

### Narrative → Video

May provide:

```text
story brief
character profile
world bible
screenplay
scene plan
dialogue
```

### Narrative → Comic

May provide:

```text
story concept
character profile
world bible
story outline
beat sheet
scene plan
screenplay / script material
dialogue
```

### Narrative → Video Game Asset Production

May provide:

```text
world bible
character profile
item / creature descriptions
location material
story constraints
```

### Advertising → Narrative

Narrative Production Skills may consume:

```text
campaign brief
audience
proposition
approved claims
narrative requirement
```

when an advertising workflow requires specialist story development.

The receiving project owns its own domain execution.

---

## 24. Evaluation Policy

Evaluation intensity depends on lifecycle stage.

### Draft

Check only what is necessary to decide whether the artifact is useful for continued exploration.

Typical checks:

- basic coherence;
- brief/constraint compliance;
- catastrophic narrative defects;
- candidate distinctiveness;
- whether the artifact is worth developing.

### Refine

Check:

- requested change succeeded;
- approved decisions were preserved;
- continuity remains acceptable;
- no major regression was introduced.

### Final

Run all applicable developmental checks for the target artifact.

Structural issues should precede copy-level polish.

---

## 25. Retry and Escalation

Retry at the level where the failure originates.

Examples:

```text
weak prose + sound scene
→ rewrite prose only
```

```text
weak scene design + sound beat
→ revise scene card
→ rewrite affected scene
```

```text
unmotivated beat
→ revise beat
→ update affected scenes
```

```text
weak causal middle
→ revise affected outline region
```

The governing rule is:

> **Correct the highest upstream cause of the failure, but regenerate only downstream material actually affected.**

---

## 26. Over-Engineering Boundaries

The following are explicitly deferred until core workflows prove a recurring need:

- narrative knowledge graph;
- graph database;
- vector database;
- automatic semantic retrieval;
- context-ranking service;
- automatic canon extraction;
- entity-resolution engine;
- temporal reasoning engine;
- automatic dependency propagation;
- Git-like narrative branch engine;
- merge engine;
- multi-agent writers' room;
- agent debate architecture;
- dedicated LLM router;
- provider-specific API layer;
- numeric narrative-quality score;
- full provenance/event sourcing;
- custom screenplay editor;
- custom publishing pipeline;
- automatic style fingerprinting;
- semantic manuscript index.

The rule is:

> **Introduce infrastructure only after a real narrative-production workflow demonstrates a recurring failure that the infrastructure directly solves.**

---

## 27. Extraction Policy

Potential shared abstractions belong in:

```text
docs/extraction-candidates.md
```

Likely candidates include:

- draft-set semantics;
- lightweight artifact lineage;
- promotion/refinement semantics;
- selection/approval semantics;
- staged evaluation;
- preserve/change refinement contracts.

Stage 10 review status:

> **Observe only. Design overlap is not repeated implementation.**

Narrative Production Skills has not yet independently implemented these concepts, so none currently satisfies the family extraction gate.

Explicitly do **not** treat the following same-looking concepts as equivalent:

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

A concept may move into Creative Production Skills only when:

1. at least two production domains independently implement it;
2. the semantics are substantially equivalent;
3. a stable reusable contract exists;
4. extraction reduces more complexity than it adds.

Do not extract automatically.

---

## 28. Build Order

Implement vertically.

```text
1. narrative-develop
2. draft / selection / approval semantics
3. narrative-write
4. narrative-evaluate
5. narrative-revise
6. narrative-continuity
```

The first complete vertical slice should prove:

```text
Brief
 ↓
Concept Draft Set
 ↓
Select
 ↓
Outline
 ↓
Scene Card
 ↓
Draft Scene
 ↓
Evaluate
 ↓
Revise
```

The next slice should prove preservation:

```text
Approved Character + Ending
 ↓
Structural Revision
 ↓
Affected Middle Changes
 ↓
Approved Character + Ending Survive
```

The next slice should prove continuity:

```text
Multi-Scene Story
 ↓
Character Knowledge Changes
 ↓
Continuity Updated
 ↓
Later Scene Uses Correct State
```

Only after those workflows work should long-form retrieval or graph infrastructure be reconsidered.

---

## 29. System Acceptance Criteria

The system is correctly designed when:

1. the host agent owns language generation and reasoning;
2. no custom LLM API client is required;
3. narrative workflow and artifact semantics remain provider-neutral;
4. the five initial skills cover the missing production behaviour without one-skill-per-artifact proliferation;
5. lifecycle state and decision status remain independent;
6. meaningful alternatives can be created and selected without discarding lineage;
7. approved decisions are preserved unless explicitly reopened;
8. story development remains structure-framework neutral;
9. character profiles remain story-relevant rather than encyclopaedic by default;
10. world building expands on narrative demand rather than completeness for its own sake;
11. beats and scenes remain distinct production concepts;
12. planned events are not treated as established canon;
13. discovery writing can update upstream planning artifacts;
14. context assembly loads relevant material rather than the entire project;
15. evaluation is separate from revision;
16. evaluation changes by artifact type and lifecycle state;
17. revision targets the smallest sufficient scope;
18. downstream material is regenerated only when affected;
19. manuscript and screenplay execution share story development while preserving format-specific behaviour;
20. cross-project composition happens through artifacts;
21. optional deterministic tools remain outside narrative judgement;
22. shared abstractions are extracted only after proven duplication;
23. deferred infrastructure remains deferred until core production failures justify it;
24. consuming projects keep installed skills separate from narrative-production artifacts;
25. consumer examples grow progressively without requiring a large canonical workspace at the start.

---

**Narrative Production Skills — Creative Skills System Specification v3**
