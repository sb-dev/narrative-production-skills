# Implementation Prompt — Generate the Narrative Extension Pack Catalogue

Implement the Narrative Production extension-pack catalogue as a **real repository catalogue**, generated from the current Narrative Production customisation-pack and extension-pack specifications.

The catalogue must become a first-class repository surface rather than remaining only as prose in `docs/` or duplicated showcase definitions under `examples/extension-packs/`.

## Goal

Materialise every currently approved Narrative Production extension pack as:

```text
catalogue entry
+
canonical showcase production
+
exact copy-ready generation prompt
+
independently installable Agent Skill package
+
behavioural eval coverage
+
benchmark coverage
```

Keep the concerns separate:

```text
extension-packs/
→ human discovery
→ catalogue metadata
→ canonical showcase
→ authoritative generation prompt

skills/<pack>/
→ independently installable Agent Skill runtime package

benchmarks/
→ quality measurement

narrative-pack-create
→ authoring and validating new catalogue entries
```

Naming rule:

```text
Concept / product name
→ Extension Pack Catalogue

Repository folder
→ extension-packs/
```

Do not use `catalogue/` as the repository folder name.

Do not turn this into a marketplace, pack-composition framework, generic profile engine, or new runtime.

---

# Start by inspecting the repository

Before changing anything:

1. inspect `README.md`;
2. inspect:
   - `docs/01-creative-skills-system-spec.md`
   - `docs/02-creative-skills-workflows-and-artifacts-spec.md`
   - `docs/03-creative-skills-repository-and-contracts-spec.md`
   - `docs/04-testing-and-benchmark-spec.md`
   - `docs/05-customisation-packs-spec.md`
   - `docs/06-extension-pack-catalogue.md`
   - `docs/extraction-candidates.md`;
3. inspect `skills/narrative-pack-create/`;
4. inspect all current core Narrative Production skills;
5. inspect `examples/extension-packs/`;
6. inspect `benchmarks/manifest.json`;
7. inspect every `benchmarks/cases/packs/*.json`;
8. inspect repository validation and install-smoke tooling;
9. inspect current command decomposition if it has already been implemented;
10. run the current deterministic repository checks before editing.

Record the pre-change result.

Use the current specifications as the source of truth.

Do not hard-code a pack count from this prompt if `docs/06-extension-pack-catalogue.md` has changed. The current repository is expected to define twelve approved catalogue packs, but the implementation must derive the authoritative set from the current specification.

---

# 1. Repository Structure

Create the first-class catalogue surface:

```text
extension-packs/
├── README.md
├── manifest.json
│
├── literary-mystery-novella/
│   └── README.md
├── young-reader-fantasy-adventure/
│   └── README.md
├── contained-psychological-thriller-screenplay/
│   └── README.md
├── graphic-noir-investigation/
│   └── README.md
├── intimate-two-hander-stage-drama/
│   └── README.md
├── naturalistic-audio-drama/
│   └── README.md
├── intimate-literary-audiobook/
│   └── README.md
├── contained-speculative-feature-film/
│   └── README.md
├── episodic-science-fiction-drama/
│   └── README.md
├── workplace-comedy-series/
│   └── README.md
├── interactive-detective-game-narrative/
│   └── README.md
└── branching-web-mystery/
    └── README.md
```

Derive the final directory list from the current Extension Pack Catalogue specification.

Keep installable Agent Skills under the normal skills surface:

```text
skills/
├── narrative-develop/
├── narrative-write/
├── narrative-continuity/
├── narrative-evaluate/
├── narrative-revise/
├── narrative-pack-create/
│
├── literary-mystery-novella/
├── young-reader-fantasy-adventure/
├── contained-psychological-thriller-screenplay/
├── graphic-noir-investigation/
├── intimate-two-hander-stage-drama/
├── naturalistic-audio-drama/
├── intimate-literary-audiobook/
├── contained-speculative-feature-film/
├── episodic-science-fiction-drama/
├── workplace-comedy-series/
├── interactive-detective-game-narrative/
└── branching-web-mystery/
```

Do **not** move installable skills under:

```text
extension-packs/<pack>/skills/
```

or:

```text
extension-packs/skills/
```

The responsibilities are:

```text
extension-packs/
→ product/discovery/showcase surface

skills/
→ Agent Skills runtime/distribution surface

docs/
→ normative specifications

benchmarks/
→ measurement surface

examples/
→ progressive core Narrative Production examples
```

---

# 2. Migrate Existing Extension-Pack Showcases

The current repository already contains extension-pack showcase definitions under:

```text
examples/extension-packs/<pack>/README.md
```

The canonical location must become:

```text
extension-packs/<pack>/README.md
```

For every existing extension-pack showcase:

```text
read existing example
→ preserve useful concept and prompt content
→ migrate into extension-packs/<pack>/README.md
→ update benchmark promptSource
→ update documentation links
→ remove duplicate example only when safe
```

The authoritative showcase prompt must not exist in two identical maintained copies.

After migration:

```text
examples/
→ progressive Level 1–5 Narrative Production examples only

extension-packs/
→ extension-pack catalogue showcases
```

If an old `examples/extension-packs/<pack>/README.md` contains material that is genuinely different from the catalogue showcase and still serves a distinct purpose, retain it only with an explicit reason and no duplicated canonical prompt.

Prefer removing redundant extension-pack example directories once all references are updated.

---

# 3. Catalogue Manifest

Create:

```text
extension-packs/manifest.json
```

It is the machine-readable authority for the **implemented** Extension Pack Catalogue.

For each pack include only useful fields such as:

```text
slug
name
family
medium
genre
style
audience
voices
skillPath
cataloguePath
benchmarkCase
status
```

Example shape:

```json
{
  "slug": "literary-mystery-novella",
  "name": "Literary Mystery Novella",
  "family": "written-and-literary",
  "medium": "novella",
  "genre": ["mystery", "psychological-drama"],
  "style": ["restrained-literary-prose"],
  "audience": "adult",
  "voices": "none",
  "skillPath": "skills/literary-mystery-novella",
  "cataloguePath": "extension-packs/literary-mystery-novella/README.md",
  "benchmarkCase": "benchmarks/cases/packs/literary-mystery-novella.json",
  "status": "implemented"
}
```

Use arrays only when they are useful.

Do not add speculative marketplace fields such as:

```text
ranking
downloads
price
rating
featured
popularity
publisher reputation
recommendation score
```

The manifest must agree with:

```text
actual catalogue directories
+
actual skill directories
+
actual benchmark cases
```

Do not manually maintain information that can be deterministically validated from those surfaces.

---

# 4. Catalogue Families

Use the current media taxonomy already established by Narrative Production Skills.

Expected families currently map approximately to:

```text
Written and Literary Media
├── literary-mystery-novella
├── young-reader-fantasy-adventure
├── contained-psychological-thriller-screenplay
├── graphic-noir-investigation
└── intimate-two-hander-stage-drama

Audio and Sonic Media
├── naturalistic-audio-drama
└── intimate-literary-audiobook

Visual and Audiovisual Media
├── contained-speculative-feature-film
├── episodic-science-fiction-drama
└── workplace-comedy-series

Interactive and Digital Media
├── interactive-detective-game-narrative
└── branching-web-mystery
```

Use the current specifications if the taxonomy has changed.

Do not invent extra families merely to balance counts.

The family is a browse aid, not a new runtime abstraction.

---

# 5. Catalogue Entry Contract

Every:

```text
extension-packs/<pack-slug>/README.md
```

must be a concise, self-contained catalogue/showcase entry.

Required structure:

```markdown
# <Pack Name>

**Pack:** `<pack-slug>`

<one short paragraph explaining the production identity>

## Production profile

**Medium:** ...
**Genre:** ...
**Style:** ...
**Audience:** ...
**Voices:** ...

## What this pack changes

- ...
- ...
- ...

## Showcase

### <Showcase title>

<short production concept>

## Prompt

```text
<exact copy-ready generation prompt>
```

## Expected production traits

- ...
- ...

## Evaluation focus

- ...
- ...

## Handoff

<only when the medium has a meaningful downstream Creative Production handoff>

## Install

```bash
npx skills add <actual-or-placeholder-repository> \
  --skill <pack-slug> \
  --agent claude-code
```
```

Use the repository's verified public identity only when it is actually known.

Until publication verification, preserve the repository's established placeholder convention:

```text
<org>/<repo>
```

Do not invent a GitHub owner or repository URL.

Keep entries mobile-friendly.

Do not duplicate the full specification inside each README.

---

# 6. Authoritative Showcase Prompt

The Extension Pack Catalogue entry is the single source of truth for each pack's showcase prompt:

```text
extension-packs/<pack>/README.md
```

Do not maintain an identical prompt under:

```text
examples/extension-packs/<pack>/README.md
```

The core progressive Narrative Production examples remain under:

```text
examples/level-*/
```

Extension-pack showcases belong under:

```text
extension-packs/
```

Any benchmark or tool that needs the showcase prompt must read it from the canonical catalogue README.

---

# 7. Generation Prompt Standard

Every pack README must contain an exact fenced:

```markdown
## Prompt

```text
...
```
```

The prompt must be directly usable by an AI coding agent with Narrative Production Skills installed.

It should:

```text
name Narrative Production Skills or the relevant core Narrative skill(s)
name the extension pack
state the intended production
state the medium
state length / duration / episode / delivery expectations where meaningful
state the defining pack-specific narrative challenge
state important hard constraints
state relevant softer genre/style expectations
state optional voice requirements when relevant
request the Narrative Production workflow rather than raw provider execution
request evaluation and targeted revision
state downstream handoff requirements where relevant
```

Preferred shape:

```text
Use Narrative Production Skills with the <pack-slug> extension pack to develop ...

Premise:
...

Requirements:
- Medium: ...
- Genre: ...
- Style: ...
- Audience: ...
- ...

Workflow:
- ...
- ...
- ...

What to optimise for:
- ...
- ...
```

The prompt must be strong enough to expose both:

```text
pack adherence
+
pack-specific failure modes
```

Bad:

```text
Write a cool fantasy story.
```

Better:

```text
Use Narrative Production Skills with the young-reader-fantasy-adventure extension pack to develop a middle-grade fantasy adventure ...

Preserve clear cause-and-effect, emotionally legible stakes, accessible language and a sense of wonder without lore dumping.

Evaluate whether the adventure remains readable for the target audience and revise only the smallest affected scope.
```

Do not reduce a pack showcase to a style label.

---

# 8. Installable Pack Skill Package

For every current catalogue pack create or validate:

```text
skills/<pack-slug>/
├── SKILL.md
├── references/
│   └── production-profile.md
└── evals/
    └── evals.json
```

Create additional files only when they contain useful runtime guidance.

Possible optional references include:

```text
medium-conventions.md
genre-conventions.md
style-guidance.md
voice-casting.md
pronunciation.md
handoffs.md
evaluation.md
```

Do not create all of them for symmetry.

Do not create empty directories.

A small coherent pack is better than a decomposed pack full of redundant files.

Every generated pack must remain independently installable and self-contained.

An installed pack must not require access to repository-level:

```text
docs/
extension-packs/
benchmarks/
examples/
```

at runtime.

Small local duplication is acceptable when it is required for selective installation.

---

# 9. Pack `SKILL.md` Contract

Each pack `SKILL.md` must define:

```text
pack identity
activation / intended use

medium
genre
operational style
audience where relevant
optional voice/performance direction

hard constraints
soft defaults

artifact and workflow effects
continuity effects where relevant
evaluation behaviour
revision behaviour

must-preserve traits
intentional traits evaluation must tolerate
genuine defects evaluation must reject

relevant downstream handoffs
explicit user/project instruction precedence
approved-artifact precedence

external requirements only when genuinely needed
project/domain boundaries
```

A label is not enough.

Bad:

```text
Style: literary
```

Required:

```text
sentence-level restraint
controlled interiority
concrete scene evidence before explanation
limited exposition
voice consistency
meaningful image/motif recurrence
avoid melodramatic overstatement unless explicitly requested
```

Likewise, genre guidance must be operational rather than formulaic.

Bad:

```text
Genre: mystery
```

Better:

```text
central question remains legible
clues have causal relevance
character knowledge is tracked
reveals reinterpret earlier material
resolution does not depend on unavailable information
```

Do not force one story theory, act structure, beat framework, or formula unless the pack explicitly and justifiably requires one.

---

# 10. Command-Aware Pack Behaviour

Extension packs do not need their own command system.

If command decomposition has been implemented in the core Narrative skills, define only how the pack affects relevant existing commands.

Examples:

```text
develop:concept
→ constrain concept alternatives to the pack's medium, audience and genre expectations

develop:character
→ apply only pack-relevant character/performance constraints

develop:outline
→ reflect medium structure and genre expectations without imposing one universal template

develop:scene-plan
→ preserve pack-specific scene function, pacing or interaction requirements

write:prose
→ apply prose/style profile where relevant

write:screenplay
→ apply screenplay/medium conventions where relevant

continuity:check
→ enforce pack-specific continuity or information-state rules where relevant

evaluate:artifact
→ judge against intentional medium/genre/style traits

revise:plan
→ preserve pack-defining traits while targeting the smallest sufficient revision scope

revise:apply
→ do not use pack adherence as justification for unrelated rewriting
```

Only document effects that genuinely matter to the pack.

Do not build a full command-by-pack matrix merely for completeness.

If command decomposition is specified but not yet implemented in runtime files:

```text
do not invent fake command runtime dependencies
→ integrate at the skill contract level
→ keep the pack ready to specialise commands when they exist
```

---

# 11. Pack Evaluation Contract

Every pack must explicitly distinguish:

```text
preserve
do_not_penalise
reject
```

For example:

```text
preserve
→ approved clue placement
→ restrained literary voice
→ character knowledge boundaries

do_not_penalise
→ deliberate ambiguity
→ slower pacing when the pack intentionally calls for it
→ explicit emotional legibility in a young-reader pack

reject
→ accidental continuity contradiction
→ medium violation
→ style drift
→ hidden deus-ex-machina information
→ approved-decision mutation
→ unnecessary whole-story regeneration
```

The extension pack changes the quality target.

It does not excuse genuine narrative defects.

Pack-aware evaluation must remain able to reject:

```text
broken causality
character inconsistency
world-rule violation
knowledge-state errors
unearned reveals
voice/style drift
medium mismatch
unrequested boundary crossing
approved-work mutation
```

---

# 12. Voice Casting and Performance

Voice configuration remains optional unless spoken performance is intrinsic to the medium.

A pack may define:

```text
no voice configuration
voice/performance direction only
licensed/configured provider voice references
```

Voice-enabled packs may define:

```text
role
performance direction
language
accent where relevant
approximate vocal range where useful
pronunciation notes
consistency requirements
authorised provider reference
```

Rules:

- do not invent provider voice IDs;
- do not embed credentials;
- do not embed private voice assets;
- do not make imitation of an identifiable real actor/person the defining behaviour of a pack;
- do not require voice configuration when the production does not need spoken audio;
- if no authorised provider voice is available, produce a casting/performance brief rather than inventing one.

The catalogue README may describe voice requirements.

The installed runtime pack must contain any voice/performance guidance it actually needs.

---

# 13. Medium and Cross-Project Boundaries

Medium packs may define Narrative Production handoffs without taking over downstream production responsibilities.

Examples:

```text
graphic novel / comic
Narrative owns:
→ story
→ characters
→ scene intent
→ dialogue
→ narrative constraints

Comic Production owns:
→ panel/page composition
→ visual character design
→ final visual production
```

```text
feature film / television
Narrative owns:
→ story package
→ screenplay
→ character/world constraints
→ scene plans
→ dialogue

Video Production owns:
→ cinematography
→ shot design
→ visual continuity
→ editing
→ final audiovisual production
```

```text
audio drama / audiobook
Narrative owns:
→ script / text
→ character voice intent
→ pronunciation / performance notes where relevant

Audio / Music execution owns:
→ recording/generation
→ sound design
→ music
→ mix/master
```

```text
video game / interactive web
Narrative owns:
→ narrative state
→ branching logic intent
→ dialogue
→ quests / story conditions
→ character/world constraints

Game / Web implementation owns:
→ mechanics
→ runtime state machine
→ UI
→ rendering
→ code
```

Do not let an extension pack silently expand Narrative Production Skills into another production domain.

---

# 14. Behavioural Evals

Every catalogue pack must have behavioural eval coverage.

At minimum test relevant cases for:

```text
correct activation
non-activation when irrelevant

hard medium constraint application
soft genre/style default application

explicit-user override precedence
approved-artifact precedence

approved-decision preservation
pack consistency across multiple artifacts
continuity behaviour where relevant

pack-aware evaluation
pack-aware targeted revision
no unnecessary regeneration

medium / project boundary
downstream handoff correctness where relevant

no provider/API reimplementation
```

Voice-enabled packs additionally test:

```text
correct role/performance direction
voice consistency
no invented provider voice identifier
no voice requirement when spoken performance is unnecessary
```

Use command-targeted evals when command decomposition exists.

Do not inflate eval counts with trivial restatements.

Each eval must be falsifiable.

---

# 15. Catalogue Acceptance Gate

A pack enters:

```text
extension-packs/manifest.json
```

only when:

```text
✓ a coherent reusable pack is justified
✓ no existing pack plus project-specific instruction is sufficient
✓ installable Agent Skill exists
✓ SKILL.md frontmatter is valid
✓ pack is self-contained
✓ medium / genre / operational style are coherent
✓ hard constraints and defaults are distinguishable
✓ audience is defined where materially relevant
✓ voice behaviour is safe when present
✓ operational production profile exists
✓ artifact/workflow effects are explicit
✓ intentional traits are explicit
✓ genuine defects are explicit
✓ pack-aware evaluation exists
✓ pack-aware targeted revision behaviour exists
✓ explicit user/project instructions outrank pack defaults
✓ approved artifacts outrank conflicting pack defaults
✓ project/domain boundaries are respected
✓ no unnecessary provider implementation exists
✓ behavioural evals exist
✓ canonical extension-packs/<pack>/README.md exists
✓ exact fenced ## Prompt exists
✓ showcase is pack-specific
✓ benchmark case exists
✓ benchmark promptSource points to the canonical catalogue README
✓ repository validation passes
✓ independent installation can be demonstrated
```

If a mandatory requirement cannot be demonstrated:

```text
status: blocked
```

or leave the pack out of the implemented catalogue.

Never mark an unproved gate as passed.

---

# 16. Benchmark Integration

The repository already has a first-class `packs` benchmark suite.

Every implemented catalogue pack must have a matching benchmark case:

```text
extension-packs/manifest.json pack
↔
extension-packs/<pack>/README.md
↔
skills/<pack>/
↔
benchmarks/cases/packs/<pack>.json
```

Update every current pack benchmark case from the old showcase source:

```text
examples/extension-packs/<pack>/README.md
```

to the new canonical source:

```text
extension-packs/<pack>/README.md
```

Required invariant:

```text
catalogue slug
=
skill slug
=
pack benchmark pack field
=
benchmark filename identity
```

The benchmark runner must extract the exact fenced `## Prompt` from the catalogue README.

Changing the canonical showcase prompt must change/invalidate the benchmark fingerprint.

Repository validation must fail when:

```text
catalogue pack has no benchmark case
benchmark pack has no catalogue pack
catalogue entry points to missing skill
catalogue entry points to missing README
benchmark promptSource points to old duplicate example
```

Do not require provider-backed generation merely to validate benchmark **coverage**.

Do not fabricate semantic benchmark results.

Existing semantic results, if any, become stale if their prompt fingerprint changes.

---

# 17. Catalogue README

Create:

```text
extension-packs/README.md
```

This is the human browse surface.

Keep it concise and mobile-friendly.

Recommended flow:

```text
# Narrative Extension Pack Catalogue

What extension packs are
→ how they relate to the five core Narrative Production skills
→ how to install one
→ browse by media family
→ pack links
→ how to create a new pack
```

For each pack show only:

```text
name
one-line production identity
medium / genre / style
showcase title
link to pack README
```

Do not paste every generation prompt into the root catalogue README.

Do not use a wide table when stacked family sections are easier to read on phones.

The catalogue README should make clear:

```text
core skills
→ production behaviour

extension pack
→ medium / genre / style / audience / optional voice specialisation
```

---

# 18. Root Repository README

Update the root `README.md` only enough to expose the implemented catalogue.

Add a concise section such as:

```markdown
## Extension packs

Specialise Narrative Production Skills for particular media, genres and production styles.

Browse the [Extension Pack Catalogue](extension-packs/README.md).
```

Optionally mention:

```text
medium
genre
style
audience
optional voice cast
```

Do not copy the complete catalogue into the root README.

The root README remains focused on Narrative Production Skills itself and its progressive Level 1–5 examples.

---

# 19. Update `narrative-pack-create`

Update:

```text
skills/narrative-pack-create/
```

so its output contract matches the implemented catalogue.

Its catalogue-oriented workflow should become:

```text
inspect current catalogue
→ assess whether a new reusable pack is justified
→ reuse or adapt when sufficient
→ define pack
→ derive production profile
→ define evaluation profile
→ define optional voice profile
→ create installable skill package
→ create behavioural evals
→ create canonical catalogue showcase
→ validate pack
→ add catalogue manifest entry
→ add benchmark coverage
→ validate repository integration
```

The skill must not automatically create a new pack when:

```text
an existing pack already fits
```

or:

```text
an existing pack + project-specific instructions is sufficient
```

This necessity gate is mandatory.

Do not add a pack-composition engine.

## Creator Output

Replace the old showcase output:

```text
examples/extension-packs/<pack-name>/README.md
```

with:

```text
extension-packs/<pack-name>/README.md
```

Minimum generated output becomes:

```text
skills/<pack-name>/
├── SKILL.md
├── references/
│   └── production-profile.md
└── evals/
    └── evals.json

extension-packs/<pack-name>/
└── README.md

extension-packs/manifest.json
→ catalogue registration after validation

benchmarks/cases/packs/<pack-name>.json
→ benchmark registration
```

Update local templates and references accordingly.

If command decomposition for `narrative-pack-create` has already been implemented, align its command contracts with the new catalogue surface.

If it has not yet been implemented, make only the smallest contract/reference change required; do not invent another command framework as part of this task.

---

# 20. Materialise the Full Current Catalogue

Materialise **every currently approved pack** in:

```text
docs/06-extension-pack-catalogue.md
```

Do not stop after a representative subset.

For every approved pack:

```text
create extension-packs/<pack>/README.md
→ preserve the specified showcase concept
→ preserve/improve the exact generation prompt without changing its intent

create skills/<pack>/SKILL.md
create skills/<pack>/references/production-profile.md
create skills/<pack>/evals/evals.json

add extension-packs/manifest.json entry

update/create benchmarks/cases/packs/<pack>.json
→ canonical promptSource = extension-packs/<pack>/README.md

validate pack
validate catalogue
validate benchmark coverage
```

The current expected pack set is:

```text
literary-mystery-novella
young-reader-fantasy-adventure
contained-psychological-thriller-screenplay
graphic-noir-investigation
intimate-two-hander-stage-drama
naturalistic-audio-drama
intimate-literary-audiobook
contained-speculative-feature-film
episodic-science-fiction-drama
workplace-comedy-series
interactive-detective-game-narrative
branching-web-mystery
```

Derive the final set from the spec if it differs.

If a pack cannot be implemented because a required core capability is genuinely missing:

```text
do not fake implementation
→ mark it BLOCKED
→ explain the missing capability
→ do not claim acceptance
```

The full catalogue should become real repository content, not a list of future ideas.

---

# 21. Preserve the Catalogue Specification

Keep:

```text
docs/06-extension-pack-catalogue.md
```

as the normative design document.

The new:

```text
extension-packs/
```

folder is the implemented product/discovery surface.

Do not copy the entire catalogue spec verbatim into `extension-packs/README.md`.

Update `docs/05-customisation-packs-spec.md`, `docs/06-extension-pack-catalogue.md`, `docs/03-creative-skills-repository-and-contracts-spec.md`, or `docs/04-testing-and-benchmark-spec.md` only where the implemented repository structure or acceptance rules genuinely require it.

Increment version footers only for changed specs.

Update references from:

```text
examples/extension-packs/
```

to:

```text
extension-packs/
```

where the catalogue showcase is intended.

Do not alter the progressive Level 1–5 example architecture.

---

# 22. Repository Validation

Extend deterministic repository validation to verify:

```text
extension-packs/manifest.json parses

pack slugs are unique
manifest pack count matches implemented catalogue pack count

manifest cataloguePath exists
manifest skillPath exists
manifest benchmarkCase exists

every manifest pack directory exists
every pack README exists

every canonical README contains ## Prompt
prompt uses fenced text block
prompt is non-empty

every pack skill directory exists
every pack SKILL.md exists
frontmatter is valid

every pack has references/production-profile.md
every pack has evals/evals.json

every benchmark case exists
every benchmark promptSource points to extension-packs/<pack>/README.md

manifest family/media value is valid

no orphan extension-packs/<pack>/ directory exists
no orphan installable catalogue skill exists
no orphan pack benchmark exists

no canonical pack prompt still points only to examples/extension-packs/

runtime pack resources do not depend on repository-level docs/
runtime pack resources do not depend on extension-packs/
runtime pack resources do not depend on benchmarks/
runtime pack resources do not depend on examples/
```

Do not require optional reference files that a pack does not need.

Add deterministic tests for the validator.

Where useful, validate:

```text
manifest slug
=
catalogue folder slug
=
skill folder slug
=
benchmark pack identity
```

---

# 23. Installation Smoke Test

Every extension pack must install independently.

Use the repository's established Agent Skills smoke-test path.

At minimum prove the equivalent of:

```bash
npx skills add . --list
```

and for each pack:

```bash
npx skills add . \
  --skill <pack-slug> \
  --agent claude-code
```

Also test Codex where the repository currently supports it:

```bash
npx skills add . \
  --skill <pack-slug> \
  --agent codex
```

Use the current CLI flags actually supported by the repository/Skills CLI. Do not copy obsolete flags blindly.

Verify the installed pack contains every runtime file it references.

An installed pack must remain usable without repository-level:

```text
docs/
extension-packs/
benchmarks/
examples/
```

Catalogue material is discovery/documentation.

`skills/<pack>/` is the runtime package.

Do not mark installation as passed when environment/network limitations block it.

---

# 24. TypeScript Only

Any repository tooling added for:

```text
catalogue validation
manifest validation
prompt extraction
benchmark coverage checks
orphan detection
install-smoke expansion
```

must use TypeScript and the repository's current strict TypeScript conventions.

Use:

```text
strict static checking
explicit boundary validation
safe subprocess invocation
deterministic tests
```

Do not add Python.

Do not add a new framework merely to generate or validate Markdown/JSON.

---

# 25. Non-Goals

Do not introduce:

```text
pack inheritance
pack mixins
pack composition DSL
automatic pack mixing
automatic pack recommendation engine
central genre/style ontology
marketplace backend
ranking / rating system
download telemetry
provider-specific pack forks without real production need
automatic voice marketplace
generic creative-profile framework
database
vector database
graph database
workflow engine
new model router
new provider abstraction
```

Do not split each pack into independently installed:

```text
medium skill
genre skill
style skill
voice skill
```

The initial extension-pack architecture remains:

> a curated collection of coherent, independently installable production profiles.

Composition remains deferred until repeated real production needs prove it reduces complexity.

---

# 26. Completion Criteria

The change is complete only when:

```text
✓ extension-packs/ exists
✓ extension-packs/README.md exists
✓ extension-packs/manifest.json exists

✓ every approved catalogue pack has a catalogue directory
✓ every catalogue directory has a README
✓ every README contains an exact fenced ## Prompt

✓ redundant examples/extension-packs showcase prompts are migrated/removed or explicitly justified

✓ every catalogue pack has an independently installable skill package
✓ every pack has an operational production profile
✓ every pack has behavioural eval coverage

✓ medium/genre/style behaviour is operational rather than label-only
✓ hard constraints and defaults are distinguished
✓ approved decisions remain higher precedence
✓ pack-aware evaluation distinguishes intentional traits from defects
✓ revision stays targeted
✓ downstream domain boundaries remain intact

✓ voice-enabled packs do not invent voice IDs
✓ voice behaviour is optional unless intrinsic to the medium

✓ catalogue manifest maps correctly to skills/showcases/benchmarks
✓ every catalogue pack has benchmark coverage
✓ every pack benchmark promptSource uses extension-packs/<pack>/README.md
✓ benchmark prompt fingerprinting still works

✓ narrative-pack-create outputs the implemented catalogue structure
✓ new-pack necessity is checked before creation

✓ repository validation detects catalogue drift
✓ deterministic tests cover validation

✓ all pack skills are discoverable
✓ each pack installs independently when the environment permits
✓ installed packs remain self-contained

✓ root README links to the catalogue
✓ specs reflect the implemented surface where necessary
✓ no fabricated semantic benchmark result is introduced
✓ no unnecessary framework is introduced
```

---

# 27. Final Validation

Run the repository's **actual current commands**, not commands copied blindly from another project.

At minimum verify the current equivalents of:

```bash
npm install
npm run check
npm run validate
npm test
npm run test:benchmark
npm run benchmark:list
npm run smoke:install
git diff --check
```

If command-component testing exists after the command-decomposition implementation, also run its actual command.

Explicitly verify catalogue coverage and report counts such as:

```text
catalogue packs: N
catalogue showcase READMEs: N
fenced generation prompts: N/N

installable pack skills: N/N
pack production profiles: N/N
pack behavioural eval files: N/N

pack benchmark cases: N/N
canonical benchmark prompt sources: N/N

catalogue manifest cross-references: N/N
install-smoke coverage: N/N
```

These are coverage counts, not semantic quality scores.

Do not mark a required check as passing if it could not run.

If a check is blocked, report:

```text
BLOCKED
reason
what remains unproved
```

---

# 28. Final Report

After implementation report:

1. the final `extension-packs/` tree;
2. pack list by media family;
3. implemented catalogue pack count;
4. installable pack-skill count;
5. showcase prompt coverage;
6. behavioural eval coverage;
7. benchmark coverage;
8. canonical prompt-source migration from `examples/extension-packs/` to `extension-packs/`;
9. redundant example/showcase material removed or retained and why;
10. `narrative-pack-create` changes;
11. validator/tests added;
12. installation smoke results;
13. specs changed and version bumps;
14. blocked packs, if any;
15. anything deliberately deferred.

The final repository should make the extension-pack system tangible:

```text
docs/05-customisation-packs-spec.md
→ defines the pack contract

docs/06-extension-pack-catalogue.md
→ defines the approved catalogue

extension-packs/
→ exposes the implemented catalogue and canonical showcases

skills/<pack>/
→ provides independently installable runtime behaviour

benchmarks/cases/packs/
→ measures pack adherence

narrative-pack-create
→ creates and validates future packs
```

The implementation is not complete while the catalogue exists only as documentation or duplicate example prompts.
