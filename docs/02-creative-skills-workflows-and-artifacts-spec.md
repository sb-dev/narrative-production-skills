# Narrative Production Skills — Creative Skills Workflows and Artifacts Specification

## 1. Purpose

This specification defines the production lifecycle, first-class artifacts, draft strategy, selection and approval semantics, provenance, continuity, evaluation stages, revision behaviour, and end-to-end workflows used by Narrative Production Skills.

It answers:

> **What artifacts exist, how do they evolve, and how does narrative production preserve approved creative work?**

---

## 2. Production Axes

Narrative Production Skills uses two independent axes.

### Workflow State

```text
draft
refine
final
```

Workflow state describes where an artifact is in production.

### Decision Status

```text
candidate
selected
approved
rejected
superseded
```

Decision status describes how downstream work should treat a creative direction.

Do not collapse them.

Examples:

```yaml
workflowState: draft
decisionStatus: selected
```

The direction has been chosen but remains developmental.

```yaml
workflowState: final
decisionStatus: approved
```

The artifact is production-ready and its approved decisions should be preserved downstream.

---

## 3. Draft

A draft is a persistent, inspectable production artifact created to explore, test, or implement a narrative decision before that decision is treated as final.

Drafts are used to reduce:

- generation cost;
- reasoning cost;
- context growth;
- evaluation cost;
- revision cost;
- downstream rework.

A draft is not disposable prompting.

It should retain enough information to understand:

- artifact identity;
- parent or source artifact;
- source requirements;
- candidate relationship;
- important creative decisions;
- selection status;
- evaluation where applicable;
- lightweight lineage.

---

## 4. Narrative Resolution

Narrative artifacts form a resolution ladder.

```text
Narrative Brief
      ↓
Story Concept
      ↓
Story Outline
      ↓
Beat Sheet
      ↓
Scene Card
      ↓
Rough Scene
      ↓
Refined Scene
      ↓
Approved Narrative
```

Character and world development operate alongside this ladder.

The governing rule is:

> **When a decision can be tested at a lower resolution, do not unnecessarily test it first in full prose or screenplay pages.**

Resolution escalation is more important than merely choosing a cheaper or stronger model.

---

## 5. Draft Sets

Meaningful exploration may produce a draft set.

```text
Requirement
    ↓
Draft Set
 ├── A
 ├── B
 ├── C
 └── D
    ↓
Compare
    ↓
Select / Combine / Reject
```

Use draft sets where creative uncertainty is meaningful.

Do not automatically generate a fixed number of variants for every artifact.

Candidate diversity matters more than candidate count.

A useful draft set should retain:

```text
draft-set ID
artifact type
purpose
parent
candidate IDs
selection
selection reason
```

Each candidate should retain:

```text
candidate ID
parent
derived-from relationships
important decisions
constraints
evaluation
decision status
```

Exact schemas may remain lightweight.

---

## 6. Selection

Selection means:

> **This is the direction to continue developing.**

Selection does not necessarily mean final approval.

A candidate may move through:

```text
candidate
   ↓
selected
   ↓
refined
   ↓
approved
```

Rejected candidates should not silently influence downstream production unless intentionally reused.

Selection may combine decisions from several candidates.

Example:

```text
Concept A
  strongest protagonist

Concept B
  strongest central conflict

Concept C
  strongest ending
       ↓
Concept D
  derives deliberately from A + B + C
```

Lineage should preserve the intentional composition.

---

## 7. Approval

Approval means:

> **Downstream production should preserve this decision unless it is explicitly reopened.**

Approved work becomes a constraint.

Example:

```text
Approved:
Alice cannot knowingly kill another person.
```

If a later scene requires Alice to deliberately kill someone, the workflow must identify the conflict.

Valid responses include:

```text
scene is wrong
```

or:

```text
character decision must be explicitly reopened
```

The workflow must not silently change Alice.

---

## 8. Reopening Approved Decisions

Approval is not immutability.

A story may evolve.

Use:

```text
approved decision
      ↓
new narrative evidence
      ↓
explicit reopen
      ↓
new alternative / refinement
      ↓
new selection
      ↓
identify affected descendants
      ↓
targeted revision
```

Reopening should be deliberate and visible.

---

## 9. Refine

A refinement starts from a selected or approved parent artifact.

Rule:

> **Preserve approved decisions and change only what needs to change.**

Every meaningful refinement should distinguish:

```text
preserve
change
```

Example:

```yaml
preserve:
  - protagonist motive
  - scene outcome
  - reveal timing

change:
  - dialogue
  - pacing
  - subtext
```

Prefer targeted editing and local regeneration over recreating an artifact from the original brief.

Refinement evaluation checks:

- requested change achieved;
- approved features preserved;
- continuity maintained;
- no major regression introduced.

---

## 10. Final

Final artifacts are production-ready deliverables or direct inputs to downstream production.

Finalisation should:

- preserve approved creative direction;
- resolve applicable major narrative issues;
- run full relevant evaluation;
- satisfy format-specific requirements where applicable.

Final does not mean the most verbose, most expensive, or most model-intensive execution.

---

## 11. First-Class Artifacts

The initial artifact vocabulary is:

```text
narrative_brief
story_concept

character_profile
world_bible
story_outline

beat_sheet
scene_card

narrative_draft
continuity_record

editorial_report
revision_plan

manuscript
screenplay
```

These artifacts are narrative-native.

Do not generalise them into universal cross-domain schemas prematurely.

---

## 12. `narrative_brief`

### Purpose

Captures originating narrative intent and hard creative constraints.

Typical content:

```yaml
intent:
premise:
audience:
genre:
medium:
tone:
themes:
length:
constraints:
references:
requirements:
forbidden:
```

Not every field is mandatory.

### Created by

- user;
- calling agent;
- upstream project;
- `narrative-develop`.

### Consumed by

All downstream narrative production.

### Preserves

- original intent;
- explicit requirements;
- audience;
- format;
- hard constraints;
- exclusions.

### Refinement

Allowed when intentional.

Changes to hard requirements should not occur through accidental drift.

---

## 13. `story_concept`

### Purpose

Represents a candidate or selected overall narrative proposition.

A concept is more substantial than a one-line premise but lower resolution than a full outline.

Typical content:

```yaml
premise:
dramaticQuestion:
protagonist:
centralConflict:
stakes:
storyDirection:
theme:
tone:
endingDirection:
distinctiveElements:
```

It should answer:

> **What story are we actually telling?**

### Created by

`narrative-develop`.

### Consumed by

- character development;
- world development;
- story outline;
- evaluation;
- downstream adaptation.

### Draft Strategy

Concepts are strong candidates for broad alternatives.

Alternatives should differ in real story logic rather than surface wording.

Useful differences include:

- central conflict;
- protagonist strategy;
- narrative engine;
- thematic tension;
- ending logic.

---

## 14. `character_profile`

### Purpose

Stores story-relevant character intelligence.

Typical content:

```yaml
identity:
role:
want:
need:
motivation:
stakes:
conflicts:
relationships:
strengths:
weaknesses:
arc:
voice:
knowledge:
beliefs:
secrets:
constraints:
```

Rule:

> **Record character information because it affects narrative behaviour, not merely because it can be invented.**

### Created by

`narrative-develop`.

### Consumed by

- story outline;
- beats;
- scenes;
- dialogue;
- continuity;
- evaluation;
- downstream creative projects.

### Draft Strategy

Explore role, motivation, conflict, and arc before generating exhaustive detail.

Do not default to long fictional biographies.

---

## 15. `world_bible`

### Purpose

Stores story-relevant world information and narrative constraints.

Typical sections:

```yaml
setting:
locations:
institutions:
cultures:
history:
technology:
systems:
socialRules:
constraints:
knownFacts:
openQuestions:
```

The most important content is not descriptive lore but rules that constrain story.

Example:

```text
Lore:
The kingdom was founded 800 years ago.

Narrative constraint:
Magic cannot resurrect the dead.
```

### Created by

`narrative-develop`.

### Consumed by

- outline;
- beats;
- scenes;
- continuity;
- evaluation;
- downstream creative projects.

### Draft Strategy

Expand world material on narrative demand.

Do not create a comprehensive world encyclopedia unless the production genuinely requires one.

---

## 16. `story_outline`

### Purpose

Represents the complete story at lower resolution than written scenes.

It owns:

```text
major events
causality
character arcs
conflicts
turning points
major reveals
setup/payoff
ending
structural organisation
```

It does not require a particular structural framework.

Valid organisation may include:

```text
acts
sequences
chapters
movements
episodes
non-linear sections
custom sections
```

### Synopsis and Treatment

Initially treat these as useful representations of the story outline rather than separate lifecycle primitives.

```text
story_outline
      │
      ├── logline view
      ├── synopsis view
      ├── treatment view
      └── structural outline view
```

Promote one of these to a first-class artifact only if real production proves it has independent lifecycle semantics.

### Draft Strategy

The outline is a primary low-cost structural test.

Use it to expose:

- weak causality;
- weak escalation;
- missing motivation;
- structural imbalance;
- unearned endings;
- missing setup/payoff;
- repetitive movement.

Prefer local structural branches over regenerating complete outlines where possible.

---

## 17. `beat_sheet`

### Purpose

Represents meaningful narrative changes required to realise the outline.

A beat is not merely a small scene.

Typical beat:

```yaml
id: beat-014

event: Alice discovers the message was forged

cause:
  - Alice compares the signatures

effect:
  - she stops trusting Marcus
  - the investigation changes direction

characterChange:
  alice:
    from: trusting
    to: suspicious

setup:
  - beat-006

payoff:
  - forged-message revelation

status: planned
```

Core semantics:

```text
something changes
because something happened
with consequences for what follows
```

### Consumed by

- scene planning;
- narrative drafting;
- structural evaluation;
- continuity.

---

## 18. `scene_card`

### Purpose

Represents what a scene must accomplish before or alongside detailed writing.

Typical content:

```yaml
id: scene-023

setting:
characters:

entryState:
objective:
conflict:

beats:
  - beat-041
  - beat-042

turn:
exitState:

informationRevealed:
continuityRequirements:
```

Optional properties may include:

- POV;
- tone;
- estimated length;
- time;
- location;
- dialogue intent;
- setup/payoff references.

The card should record **why the scene exists**.

A useful scene pattern is:

```text
entry state
    ↓
interaction / conflict / discovery
    ↓
meaningful change
    ↓
exit state
```

This is a planning aid, not a mandatory literary formula.

---

## 19. `narrative_draft`

### Purpose

Represents actual narrative execution before final approval.

A draft may contain:

```text
one scene
multiple scenes
chapter
episode
sequence
partial manuscript
complete manuscript
partial screenplay
complete screenplay
```

It should retain relationship to upstream story decisions.

Example:

```text
story_concept
      ↓
story_outline
      ↓
beat-032
      ↓
scene-017
      ↓
draft scene
```

### Draft Strategy

A rough scene prioritises:

- dramatic function;
- character behaviour;
- conflict;
- information flow;
- turn;
- voice direction;
- continuity.

It does not prioritise perfect line-level polish.

---

## 20. `continuity_record`

### Purpose

Maintains persistent narrative state across the developing work.

It must not reduce narrative to a flat list of facts.

At minimum distinguish:

```text
planned
canonical
character-belief
secret
uncertain
superseded
```

Example:

```yaml
id: fact-017
subject: Alice
statement: Alice believes Marcus betrayed her
status: canonical
scope: character-belief
establishedIn: scene-023
```

Mystery example:

```yaml
proposition: Marcus killed David

narrativeStatus: uncertain

beliefs:
  alice: true
  marcus: false
  detective: unknown
```

Do not turn this into:

```yaml
marcusKilledDavid: true
```

unless the approved narrative establishes that fact.

### Planned vs Canonical

```text
Story Outline:
Alice discovers Marcus is the killer in chapter 20.

Current approved narrative:
Chapter 12.
```

The discovery remains:

```text
planned
```

Only after approved narrative establishes it may it become:

```text
canonical
```

---

## 21. `editorial_report`

### Purpose

Separates evaluation from rewriting.

A finding should identify:

```text
category
severity
scope
location
evidence
diagnosis
affected material
recommendation
```

Example:

```yaml
scope: story

findings:
  - id: finding-01
    category: causality
    severity: major

    location:
      beat: beat-052

    diagnosis:
      The protagonist changes strategy without sufficient cause.

    evidence:
      - scene-021
      - scene-022

    affected:
      - beat-052
      - scene-023
      - scene-024

    recommendation:
      Establish a causal revelation before the strategy change.
```

An editorial report should not silently replace the target narrative.

---

## 22. `revision_plan`

### Purpose

Transforms diagnosis or direct feedback into bounded production work.

Example:

```yaml
goal:
  restore causal motivation for Alice's decision

sourceFindings:
  - finding-01

targets:
  - beat-051
  - scene-021
  - scene-022

preserve:
  - Marcus reveal
  - chapter ending
  - Alice/James relationship state

change:
  - add discovery establishing Alice's new information

verify:
  - motivation becomes credible
  - downstream continuity remains intact
```

Rule:

> **A revision plan says both what may change and what must survive.**

---

## 23. `manuscript`

Represents final or near-final prose narrative.

May contain:

- chapters;
- prose;
- narration;
- interiority;
- POV;
- dialogue.

A manuscript consumes the shared narrative model but has prose-specific execution semantics.

Format conversion is not part of the artifact semantics.

---

## 24. `screenplay`

Represents final or near-final screenplay narrative.

Consumes:

- story concept;
- characters;
- world;
- outline;
- beats;
- scene cards;
- continuity.

Screenplay execution includes medium-specific conventions such as:

- scenes;
- visible action;
- dialogue;
- scene headings;
- screenplay formatting.

Fountain is the preferred plain-text interchange representation where appropriate.

Narrative Production Skills does not own cinematography or visual production.

---

## 25. Artifacts Not First-Class Initially

Do not initially create independent lifecycle primitives for:

```text
logline
synopsis
treatment
act
sequence
chapter
dialogue
series_bible
```

### Logline

Projection of `story_concept`.

### Synopsis / Treatment

Representations of `story_outline` at different presentation depths.

### Act / Sequence

Structural grouping mechanisms.

### Chapter

A manuscript container.

### Dialogue

Part of scene execution.

### Series Bible

Initially a composite production view:

```text
story concept
+
character profiles
+
world bible
+
continuity record
+
series / season outline
```

Promote any of these only when production evidence demonstrates distinct lifecycle semantics.

---

## 26. Artifact Dependency Model

```text
                    narrative_brief
                          │
                          ▼
                    story_concept
                          │
              ┌───────────┼───────────┐
              ▼           ▼           ▼
      character_profile world_bible story_outline
              │           │           │
              └───────────┼───────────┘
                          ▼
                     beat_sheet
                          │
                          ▼
                     scene_card
                          │
                          ▼
                   narrative_draft
                          │
             ┌────────────┴────────────┐
             ▼                         ▼
      continuity_record         editorial_report
                                         │
                                         ▼
                                  revision_plan
                                         │
                                         ▼
                                  targeted revision
                                         │
                                         └──────┐
                                                │
                         ┌──────────────────────┘
                         ▼
                   narrative_draft
                         │
                         ▼
                 approved narrative
                    ┌────┴────┐
                    ▼         ▼
               manuscript  screenplay
```

This is a logical dependency graph.

It does not require graph storage.

---

## 27. Canonical Development Workflow

```text
Narrative Brief
      ↓
Concept Draft Set
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
Editorial Report
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

This workflow supports skipping or compressing stages where the task does not need them.

---

## 28. Discovery-Writing Workflow

Planning depth is optional.

Valid workflow:

```text
Narrative Brief
      ↓
Story Concept
      ↓
Initial Scene / Chapter Draft
      ↓
Story Discovery
      ↓
Update:
- character
- world
- outline
- continuity
      ↓
Continue Drafting
```

Or:

```text
Outline
   ↓
Draft
   ↓
Unexpected Discovery
   ↓
Revise Outline
   ↓
Revise Affected Future Scenes
   ↓
Continue
```

Planning artifacts and written narrative may co-evolve until decisions are intentionally approved.

---

## 29. Concept Draft Workflow

```text
Narrative Brief
      ↓
Concept Draft Set
 ├── A
 ├── B
 ├── C
 └── D
      ↓
Compare
      ↓
Selected Concept
      ↓
Refine
      ↓
Approved Story Direction
```

Concept alternatives should be meaningfully different.

Avoid superficial paraphrase variants.

---

## 30. Character Draft Workflow

```text
Story Concept
      ↓
Character Directions
 ├── A
 ├── B
 └── C
      ↓
Evaluate Against Story
      ↓
Selected Direction
      ↓
Character Profile
```

Prefer testing:

- function;
- motivation;
- conflict;
- arc;

before generating extensive biography.

---

## 31. World Draft Workflow

```text
Story Requirements
      ↓
Rule / Setting Alternatives
      ↓
Selected Narrative Constraints
      ↓
World Bible Grows as Required
```

World-building should expand on narrative demand.

---

## 32. Outline Draft Workflow

```text
Selected Story Concept
      ↓
Outline Draft
      ↓
Structural Evaluation
      ↓
Weak Region?
 ┌────┴────┐
 no       yes
 │         ↓
 │     Local Branches
 │      ├── A
 │      ├── B
 │      └── C
 │         ↓
 │      Selection
 │         ↓
 └─────────┘
      ↓
Refined Outline
```

Do not regenerate the complete story when uncertainty is local.

---

## 33. Beat Workflow

```text
Approved / Selected Outline
      ↓
Beat Sheet Draft
      ↓
Evaluate:
- causality
- escalation
- character movement
- setup/payoff
- pacing
      ↓
Refine
```

If one beat is uncertain, branch that beat rather than the entire beat sheet.

---

## 34. Scene-Card Workflow

```text
Selected Beats
      ↓
Scene Card Draft
      ↓
Evaluate:
- purpose
- objective
- conflict
- turn
- exit state
      ↓
Selected Scene Design
      ↓
Narrative Draft
```

Scene cards are a low-cost way to discover scene failures before high-resolution prose.

---

## 35. Scene Draft Workflow

```text
Selected Scene Card
      ↓
Rough Scene
      ↓
Scene Evaluation
      ↓
Refine
      ↓
Approved Scene
```

Rough scene evaluation asks:

> **Does the scene work?**

Refinement then asks:

> **Is the execution strong enough?**

---

## 36. Progressive Long-Form Evaluation

Do not wait for the entire manuscript before every evaluation.

Use progressively:

```text
scene
      ↓
sequence / chapter
      ↓
arc / section
      ↓
complete draft
```

Possible workflow:

```text
Scenes 1–5
   ↓
local continuity / evaluation
   ↓
continue

Part / Act Complete
   ↓
structural evaluation
   ↓
continue

Full Draft
   ↓
developmental evaluation
```

Local approval remains revisable when larger structural evidence changes.

---

## 37. Context Assembly

Context assembly is explicit production behaviour.

For a scene-writing task:

```text
target scene
      ↓
relevant beats
      ↓
involved character profiles
      ↓
applicable world constraints
      ↓
current character state / knowledge
      ↓
unresolved setup/payoff
      ↓
nearby narrative
```

Avoid loading:

- every rejected concept;
- every character;
- the whole world bible;
- the entire manuscript;
- every historical editorial report;

unless the task genuinely needs them.

The initial implementation uses direct file/artifact selection by the agent.

---

## 38. Continuity Update Workflow

```text
Approved Narrative Change
      ↓
What Narrative State Changed?
      ↓
Update Relevant Continuity
      ↓
Identify Potentially Affected Future Material
      ↓
Continue Production
```

Examples:

```text
character learns a secret
→ update character knowledge
```

```text
planned betrayal occurs in approved scene
→ planned → canonical
```

```text
world rule intentionally changes
→ supersede prior rule
→ inspect affected material
```

---

## 39. Evaluation Lifecycle

Evaluation intensity depends on workflow state.

### Draft

Check:

- basic coherence;
- hard-constraint compliance;
- catastrophic contradiction;
- usefulness for comparison;
- whether the candidate is worth developing.

Do not perform exhaustive prose criticism on low-resolution concept drafts.

### Refine

Check:

- requested correction succeeded;
- preserve constraints survived;
- approved decisions survived;
- continuity remains acceptable;
- no major regression was introduced.

### Final

Run all applicable domain-native checks.

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

Structural issues should be prioritised before copy-level polish.

---

## 40. Evaluation by Artifact Type

### Story Concept

Check:

- premise strength;
- central conflict;
- protagonist/story fit;
- stakes;
- sustainability for intended length/form;
- distinctiveness;
- fit to brief.

### Character Profile

Check:

- motivation;
- internal/external conflict;
- relationship to story;
- credible behavioural constraints;
- arc potential;
- unnecessary biography.

### World Bible

Check:

- narrative relevance;
- rule coherence;
- constraint clarity;
- compatibility with intended story;
- unnecessary lore expansion.

### Story Outline

Check:

- causality;
- escalation;
- character progression;
- turning points;
- setup/payoff;
- ending logic;
- structural coherence.

### Beat Sheet

Check:

- meaningful change;
- causes and consequences;
- progression;
- information order;
- escalation;
- repeated or redundant beats.

### Scene Card

Check:

- purpose;
- objective;
- conflict;
- turn;
- entry/exit state;
- relationship to beats;
- continuity requirements.

### Narrative Draft

Check applicable:

- scene function;
- character behaviour;
- continuity;
- pacing;
- POV;
- voice;
- dialogue;
- tone;
- prose or screenplay execution.

### Manuscript / Screenplay

Run full applicable developmental evaluation.

---

## 41. Revision Workflow

```text
Diagnosis
   ↓
Identify Root Cause
   ↓
Identify Smallest Sufficient Scope
   ↓
Identify Preserve Constraints
   ↓
Identify Affected Descendants
   ↓
Revise
   ↓
Verify
```

Possible scopes:

```text
local
scene
beat
sequence / section
arc
outline
page-one
```

---

## 42. Failure Escalation

### Weak prose, sound scene

```text
scene card valid
story beat valid
prose weak

→ rewrite prose only
```

### Weak scene

```text
beat valid
scene design weak

→ revise scene card
→ rewrite scene
```

### Unmotivated beat

```text
scene symptom
beat failure

→ revise beat
→ update affected scenes
```

### Weak causal section

```text
multiple beat failures
outline-region failure

→ revise affected outline region
```

### Whole premise failure

Only then reopen the high-level story concept or premise.

---

## 43. Provenance

Narrative provenance is primarily creative lineage.

Useful fields include:

```text
id
parent
derivedFrom
selectedFrom
revisionSource
sourceBrief
implements
```

Do not initially capture:

- every prompt;
- every token;
- every model parameter;
- hidden reasoning traces;
- immutable execution event streams.

Add execution provenance only where a real reproducibility requirement justifies it.

---

## 44. Cross-Project Handoffs

Artifacts from or to other project-family repositories should enter through explicit files/artifacts.

### Handoff Naming

The internal artifact model remains canonical:

```text
narrative_brief
story_concept
character_profile
world_bible
story_outline
beat_sheet
scene_card
narrative_draft
continuity_record
editorial_report
revision_plan
manuscript
screenplay
```

Existing family handoff terms are explicit projections:

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

Do not create duplicate first-class artifacts merely to match consumer vocabulary.

### Narrative → Video

```text
story brief
character profile
world bible
screenplay
scene plan
dialogue
```

### Narrative → Comic

```text
story concept
character profile
world bible
story outline
beat sheet
scene plan
script / screenplay material
dialogue
```

### Narrative → Video Game Asset Production

```text
world bible
character profile
item / creature description
location description
story constraint
```

### Advertising → Narrative

```text
campaign brief
audience
proposition
approved claims
narrative requirement
```

These become production inputs, not shared runtime dependencies.

---

## 45. Extraction Candidates

Potential cross-domain concepts should be recorded in:

```text
docs/extraction-candidates.md
```

Initial candidates include:

- `draft_set` semantics;
- lightweight artifact lineage;
- selection/approval semantics;
- preserve/change refinement semantics;
- staged evaluation;
- promotion/refinement semantics.

Stage 10 status for every candidate is:

```text
observe only
```

Narrative Production Skills is still specified rather than independently implemented. Similarity with Video Production Skills therefore does not yet satisfy the repeated-implementation extraction gate.

The following remain explicitly domain-specific despite similar vocabulary:

```text
character_profile ≠ character_sheet / character_manifest
narrative continuity ≠ visual / product / shot continuity
editorial_report ≠ video evaluation_report schema
scene_card ≠ storyboard_frame
```

The register is evidence for future extraction, not a roadmap forcing extraction.

---

## 46. Over-Engineering Deferred Improvements

Do not initially implement:

```text
automatic fact extraction
knowledge graph
graph database
vector retrieval
semantic manuscript index
context optimiser
automatic dependency propagation
automatic branch merge
entity resolution engine
temporal reasoning engine
multi-agent writers' room
numeric narrative scoring
```

Core file-based workflows must prove their limitations first.

---

## 47. Workflow Acceptance Criteria

The workflow model is correct when:

1. drafts are persistent and comparable;
2. candidate and workflow lifecycle states remain distinct;
3. selections are explicit;
4. approved decisions become downstream constraints;
5. approved decisions can be intentionally reopened;
6. refinement preserves approved work;
7. lineage remains sufficient to identify relevant parents and sources;
8. narrative resolution increases only when needed;
9. local uncertainty can branch without whole-story regeneration;
10. concepts, outlines, beats, and scenes remain distinct;
11. character profiles focus on story behaviour;
12. world bibles focus on story-relevant constraints;
13. planning and discovery writing can co-evolve;
14. planned events remain distinct from canon;
15. continuity can represent beliefs, secrets, and uncertainty;
16. context assembly loads relevant material rather than the entire project by default;
17. evaluation is appropriate to artifact type and lifecycle state;
18. evaluation can occur without rewriting;
19. editorial findings can become bounded revision plans;
20. revision targets the smallest sufficient scope;
21. root-cause changes identify affected downstream material;
22. manuscript and screenplay outputs preserve the same upstream story decisions;
23. cross-project composition happens through artifacts;
24. domain-specific narrative semantics remain local until proven reusable elsewhere;
25. deferred infrastructure is not required for the core workflow.

---

**Narrative Production Skills — Creative Skills Workflows and Artifacts Specification v2**
