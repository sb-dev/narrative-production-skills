# Narrative Production Customisation Packs Specification

## 1. Purpose

Customisation Packs provide reusable narrative production profiles for Narrative Production Skills.

```text
Narrative Production Skills
→ knows how to develop, write, maintain, evaluate and revise narrative

customisation pack
→ defines what kind of narrative production to create
```

A pack may combine:

```text
medium + genre + style + audience + optional voice cast
```

It may also define narrative conventions, structural expectations, dialogue/performance direction, artifact requirements, downstream handoffs and pack-aware evaluation criteria.

Packs are distributed as installable Agent Skills and consumed as peer skills by:

```text
narrative-develop
narrative-write
narrative-continuity
narrative-evaluate
narrative-revise
```

This is a supplemental Narrative Production Skills specification. It does not replace the canonical Creative Production Skills specs or the Testing and Benchmark Specification.

---

## 2. Goals

A pack should:

- make a coherent narrative production language reusable across projects;
- specialise the core workflow without replacing it;
- influence relevant artifacts from concept development through final evaluation;
- preserve approved creative decisions;
- adapt evaluation to intentional medium, genre and style characteristics;
- define downstream handoffs where the medium requires another Creative Production Skills project;
- remain optional;
- install independently;
- remain useful as one Agent Skill;
- support optional voice casting without making speech-provider execution mandatory;
- reuse existing host-model and provider capabilities rather than reimplement them.

---

## 3. Non-Goals

A pack does not:

- replace the five core Narrative Production Skills;
- implement a language-model provider API;
- implement speech-provider APIs;
- turn Narrative Production Skills into a visual, audio, game or web production system;
- silently override explicit user instructions;
- silently override approved narrative artifacts or approved production decisions;
- require one installed skill per medium, genre, style or voice;
- require a universal style engine;
- require a universal media ontology;
- require pack inheritance or a composition runtime;
- reproduce a specific living creator's style as the entire definition of a pack;
- copy a specific existing work's plot, characters, dialogue or scene construction.

A medium pack may define a handoff to another production domain, but the receiving domain continues to own its own production work.

---

## 4. Core Model

```text
CUSTOMISATION PACK

Medium
  +
Genre
  +
Style
  +
Audience (optional)
  +
Voice cast (optional)
        ↓
Production profile
        ↓
Narrative Production Skills
        ↓
Narrative artifacts
        ↓
Optional downstream handoff
```

A pack represents a **coherent narrative production recipe**.

Prefer ready-made packs such as:

```text
literary-mystery-novella
naturalistic-audio-drama
contained-psychological-thriller-screenplay
episodic-science-fiction-drama
young-reader-fantasy-adventure
interactive-detective-game-narrative
```

over requiring users initially to assemble low-level skills such as:

```text
medium-screenplay
genre-thriller
style-restrained-naturalism
voice-cast-london-drama
```

The dimensions remain explicit inside every pack so that later modularisation is possible.

Independent medium, genre, style and voice-cast skills are deferred until real use demonstrates that users repeatedly need to recombine those dimensions independently.

---

## 5. Pack Dimensions

### 5.1 Medium

Medium defines the narrative form being produced and therefore has the strongest effect on artifacts, workflow and handoff behaviour.

It may define:

- final narrative deliverable;
- structural units;
- artifact expectations;
- writing conventions;
- pacing and length expectations;
- dialogue and description conventions;
- interactivity where applicable;
- narration/performance requirements;
- downstream Creative Production Skills handoffs;
- medium-specific evaluation criteria.

Medium constraints may be hard requirements where the deliverable depends on them.

### 5.2 Written and Literary Media

#### Books

Examples:

```text
novel
novella
short-story
short-story-collection
poetry-anthology
memoir
```

A book-oriented pack may define:

```text
chapter or section strategy
point of view
narrative voice
interiority
prose density
scene/chapter rhythm
manuscript conventions
front/back matter where relevant
```

#### Screenplays and Dramatic Text

Examples:

```text
feature-screenplay
television-pilot
teleplay
stage-play
```

A screenplay-oriented pack may define:

```text
scene-based execution
playable action
screenplay economy
dialogue conventions
scene turns
Fountain output where useful
television or stage-specific constraints
```

A screenplay pack does not own cinematography, storyboarding or video generation.

#### Graphic Narrative

Examples:

```text
comic-book
graphic-novel
manga
webtoon
illustrated-memoir
```

Narrative Production Skills may own:

```text
story structure
characters
world constraints
scene/sequence intent
dialogue
captions
panel-relevant narrative information
```

Comic Production Skills owns visual page and panel production.

### 5.3 Audio and Sonic Media

#### Podcasts

Examples:

```text
audio-drama
serialised-fiction-podcast
investigative-narrative
educational-narrative
talk-format
```

A narrative podcast pack may define:

```text
episode structure
host/narrator role
spoken-word rhythm
scene-to-audio translation
dialogue density
sound-cue intent
recap and cliffhanger conventions
```

A pack must not claim ownership of music composition, final sound design or speech synthesis unless delegated to the appropriate downstream production capability.

#### Audiobooks

An audiobook pack may define:

```text
narration segmentation
narrator versus character speech
performance direction
chapter handling
pronunciation requirements
voice consistency
```

The source manuscript remains authoritative unless adaptation is explicitly requested.

### 5.4 Visual and Audiovisual Media

#### Feature Films

Examples:

```text
live-action-feature
animated-feature
documentary-feature
```

Narrative Production Skills may produce:

```text
screenplay
characters
world constraints
scene plans
story-relevant locations
dialogue
narrative handoff package
```

Video Production Skills or another audiovisual production system owns visual production.

#### Television Series

Examples:

```text
episodic-drama
sitcom
serial-drama
docuseries
reality-format
```

A television pack may define:

```text
episode engine
serial versus episodic balance
season arc
recurring cast state
act or segment constraints when genuinely required
recap / teaser conventions
episode-level continuity
```

A pack must not impose one universal television structure across all formats.

### 5.5 Interactive and Digital Media

#### Interactive Web Narrative

Examples:

```text
interactive-story
branching-editorial
web-documentary
web-magazine-narrative
```

A pack may define:

```text
narrative nodes
reader choices
branch consequences
progressive disclosure
state-dependent text
non-linear navigation
```

Narrative Production Skills owns narrative logic and content. Web implementation remains outside scope.

#### Video Games

Examples:

```text
console-game-narrative
pc-game-narrative
mobile-game-narrative
vr-narrative
```

A game-narrative pack may define:

```text
player agency
branching narrative
quests/objectives
dialogue states
character relationship state
fail/recovery states
replay-dependent narrative
canonical versus player-dependent events
```

Narrative Production Skills does not own gameplay systems, code, level implementation or visual game assets.

### 5.6 Genre

Genre defines dramatic and audience expectations.

Examples:

```text
mystery
horror
thriller
romance
comedy
science-fiction
fantasy
crime
drama
action
historical
western
noir
coming-of-age
```

Genre may influence:

- conflict;
- stakes;
- information release;
- tension and relief;
- expected emotional experience;
- reveal patterns;
- world assumptions;
- scene rhythm;
- dialogue conventions;
- audience expectations;
- evaluation criteria.

Genre guidance should normally be soft rather than formulaic.

For example, a mystery pack may require coherent evidence and controlled information release without requiring a detective, murder, three suspects or a prescribed act structure.

### 5.7 Style

Style defines how narrative material is expressed.

A style must be expressed through operational characteristics, not only a label.

Example:

```yaml
style: restrained-naturalism

prose:
  description: concrete
  exposition: minimal
  emotion: behaviour-led

dialogue:
  phrasing: conversational
  directness: low-to-moderate
  interruption: allowed
  subtext: preferred

pacing:
  rhythm: measured
  escalation: cumulative

evaluation:
  preserve:
    - understatement
    - behavioural emotion
  reject:
    - explanatory dialogue
    - melodramatic emotional labelling
```

Useful style vocabulary may include:

```text
naturalistic
minimalist
lyrical
satirical
deadpan
heightened
surreal
documentary-like
pulpy
epistolary
dialogue-driven
introspective
fast-paced
slow-burn
```

Style labels named only after an individual living creator are insufficient pack definitions.

### 5.8 Audience

Audience is optional but should be defined when it materially changes production decisions.

Examples:

```text
children
middle-grade
young-adult
family
general-adult
professional
educational
```

Audience may influence:

- vocabulary;
- exposition;
- narrative complexity;
- pacing;
- humour;
- intensity;
- subject-matter boundaries;
- episode/chapter length;
- accessibility expectations.

Audience does not replace explicit project content constraints.

### 5.9 Optional Voice Cast

A pack may contain:

```text
no voice configuration
voice/performance direction only
specific authorised provider voices
human voice-cast references
```

Example:

```yaml
voices:
  narrator:
    role: narrator
    direction: calm, mature, understated
    language: en-GB
    accent: neutral-British
    provider: elevenlabs
    voice_id: optional-authorised-voice-id

  mara:
    role: protagonist
    direction: controlled, dry, increasingly urgent
    language: en-GB
    accent: London
    provider: elevenlabs
    voice_id: optional-authorised-voice-id
```

Voice configuration may define:

- narrative role;
- performance direction;
- approximate vocal age where useful;
- language;
- accent;
- pace;
- emotional range;
- provider;
- provider voice identifier;
- pronunciation notes;
- consistency requirements.

Packaged voices must reference voices the pack author and consumer are permitted to use.

API credentials, access tokens and private voice assets must never be embedded in a pack.

Voice casting remains optional unless spoken performance is intrinsic to the selected medium.

---

## 6. Production Profile

A pack translates its dimensions into production behaviour.

It may define:

```text
medium conventions
narrative structure
genre expectations
prose/dialogue language
performance direction
continuity expectations
artifact requirements
handoff requirements
evaluation criteria
voice casting
```

Example:

```yaml
pack: naturalistic-audio-mystery

medium:
  type: audio-drama
  episode_duration: 20-30m
  season_shape: 6-8-episodes

genre:
  primary: mystery
  secondary: psychological-drama

audience: general-adult

style:
  type: restrained-naturalism
  dialogue: conversational
  exposition: sparse
  emotion: behaviour-and-voice-led

structure:
  episode:
    requires:
      - local dramatic objective
      - meaningful state change
      - one controlled information reveal
  season:
    requires:
      - cumulative central question
      - persistent character consequences

continuity:
  distinguish:
    - canonical-fact
    - character-belief
    - secret
    - planned-reveal
    - superseded-assumption

voices:
  narrator:
    required: false
  cast:
    consistency: required

evaluation:
  do_not_penalise:
    - incomplete spoken sentences
    - intentional silence
    - indirect emotional expression
  still_require:
    - intelligible causal progression
    - distinguishable character intent
    - coherent knowledge state
    - earned reveals
```

The profile is a production contract, not merely descriptive metadata.

---

## 7. Decision Precedence

A pack provides defaults and constraints but does not override stronger production decisions.

```text
1. explicit project/user instructions
2. approved narrative artifacts and approved production decisions
3. selected customisation pack
4. Narrative Production Skills defaults
```

Within the pack:

```text
medium hard constraints
→ may override softer genre/style defaults

genre conventions
→ normally soft

style guidance
→ normally soft

voice direction
→ applies only to spoken performance
```

If a pack conflicts with approved work, surface the conflict rather than silently rewriting either side.

A pack may never reopen an approved decision merely because a different convention would be more typical for its genre or style.

---

## 8. Integration with Core Narrative Skills

Narrative Production Skills remains fully usable without a pack.

```text
core skills
   │
   ├── no pack
   │   → derive narrative direction from the brief and artifacts
   │
   └── customisation pack
       → inherit predefined production language
```

Only relevant guidance should apply.

A novel pack should not invent voice-cast requirements. An audiobook pack should not introduce branching narrative. A video-game narrative pack should not impose screenplay formatting unless the project explicitly uses screenplay-like cutscene scripts.

### 8.1 `narrative-develop`

A pack may influence:

```text
brief interpretation
concept exploration
structural expectations
character design priorities
worldbuilding scope
genre promises
information-release strategy
beat/scene planning
medium-specific artifact needs
```

It must not silently choose major creative decisions that remain unresolved in the brief.

### 8.2 `narrative-write`

A pack may influence:

```text
prose form
screenplay form
dialogue style
narration
scene/chapter/episode rhythm
medium-specific execution
performance cues where appropriate
```

The pack changes execution constraints, not authorship ownership.

### 8.3 `narrative-continuity`

A pack may add medium- or genre-relevant continuity concerns.

Examples:

```text
mystery
→ clue visibility, beliefs, secrets and reveal timing

serial television
→ episode state, season state and recurring character knowledge

video game
→ canonical state versus player-dependent state

audio drama
→ voice identity and spoken-information continuity
```

The core continuity status model remains authoritative.

### 8.4 `narrative-evaluate`

Evaluation must understand intentional medium, genre and style characteristics.

Examples:

```text
restrained naturalism
→ indirect dialogue is not automatically weak dialogue

noir
→ heightened metaphor may be intentional

children's adventure
→ clarity and emotional legibility may matter more than ambiguity

interactive narrative
→ mutually exclusive branches are not continuity contradictions

episodic comedy
→ repeated structural motifs may be intentional format behaviour
```

A pack may define:

```yaml
evaluation:
  preserve:
    - indirect emotional expression
    - recurring episode engine

  do_not_penalise:
    - clipped conversational dialogue

  reject:
    - exposition that states already-known facts
    - mystery solution unsupported by established evidence
```

`narrative-evaluate` must still detect unintended failures such as broken causality, inconsistent motivation, accidental continuity contradictions, unearned reveals, voice drift, genre promises abandoned without purpose, or medium constraints violated accidentally.

The pack changes the quality target, not the requirement for quality.

### 8.5 `narrative-revise`

A pack may influence how a diagnosed problem should be corrected.

It must preserve the core revision rule:

> **Fix the smallest narrative unit capable of resolving the diagnosed problem.**

A pack must not use genre/style conformity as justification for unnecessary story-wide regeneration.

---

## 9. Cross-Project Handoffs by Medium

Medium packs can define explicit artifact projections into other Creative Production Skills projects.

### 9.1 Graphic Novel / Comic

```text
Narrative Production Skills
        ↓
story
characters
world constraints
scene/sequence intent
dialogue/captions
        ↓
Comic Production Skills
```

Narrative does not own page layout, panel composition or illustration.

### 9.2 Feature Film / Television

```text
Narrative Production Skills
        ↓
screenplay
characters
world/story constraints
scene plans
dialogue
        ↓
Video Production Skills
```

Narrative does not own visual identity, cinematography, storyboard, shot design, editing or mastering.

### 9.3 Audio Drama / Audiobook

```text
Narrative Production Skills
        ↓
script/manuscript
cast roles
performance direction
pronunciation requirements
        ↓
voice/audio production
        ↓
optional Music Production Skills
```

Narrative does not own speech synthesis, final sound design or mastering.

### 9.4 Video Game

```text
Narrative Production Skills
        ↓
world
characters
quests/objectives
dialogue
branching narrative
story constraints
        ↓
game implementation
Video Game Asset Production Skills
```

Narrative does not own mechanics implementation, level production or game-ready assets.

### 9.5 Interactive Website

```text
Narrative Production Skills
        ↓
content structure
narrative nodes
branch logic
copy/story content
        ↓
web implementation
```

A pack does not turn general website production into a Narrative Production responsibility.

---

## 10. Voice Cast Integration

Voice-enabled packs add production metadata and performance constraints without coupling core Narrative Production Skills to one speech provider.

A pack may include:

```text
cast roles
voice direction
voice references
pronunciation dictionary
language/accent constraints
performance continuity rules
```

It may optionally require a peer provider skill.

Example:

```text
naturalistic-audio-drama
        ↓
Narrative Production Skills
        ↓
voice cast metadata
        ↓
optional ElevenLabs or other speech-provider Agent Skills
```

The provider skill owns execution.

The customisation pack owns the intended casting and performance profile.

Voice-cast references should remain stable across a production unless explicitly recast.

If a referenced voice becomes unavailable, the pack should surface the dependency failure rather than silently substituting a materially different voice.

---

## 11. Agent Skills Packaging

Example repository:

```text
narrative-customisation-packs/
├── README.md
├── LICENSE
├── skills/
│   ├── literary-mystery-novella/
│   │   ├── SKILL.md
│   │   ├── references/
│   │   │   ├── production-profile.md
│   │   │   ├── medium.md
│   │   │   ├── genre.md
│   │   │   ├── style.md
│   │   │   └── evaluation.md
│   │   └── evals/
│   ├── naturalistic-audio-drama/
│   │   ├── SKILL.md
│   │   ├── references/
│   │   │   ├── production-profile.md
│   │   │   ├── voice-casting.md
│   │   │   └── pronunciation.md
│   │   ├── assets/
│   │   │   └── cast.example.yaml
│   │   └── evals/
│   ├── contained-thriller-screenplay/
│   ├── episodic-science-fiction-drama/
│   └── interactive-detective-game-narrative/
└── evals/
    └── end-to-end/
```

Only create files a pack actually needs.

A simple pack may be only:

```text
SKILL.md
references/production-profile.md
```

Each `SKILL.md` should define:

```text
pack identity
intended use
medium
genre
style
audience when relevant
optional voice requirements
production constraints
what must remain consistent
integration with core narrative skills
downstream handoffs where relevant
external provider/skill requirements
pack-aware evaluation behaviour
```

Every installable pack must be self-contained inside its own skill directory.

Repository-level documentation is not a runtime dependency.

### 11.1 `narrative-pack-create` Command Decomposition

The pack-authoring skill is decomposed into five skill-local commands:

```text
pack:inspect
→ determine whether an existing catalogue pack already satisfies the production need

pack:create
→ define and scaffold a coherent new pack contract

pack:example
→ create the showcase README and exact copyable generation prompt

pack:evals
→ create behavioural evals for relevance, application, overrides, boundaries and pack-aware evaluation

pack:validate
→ verify packaging, completeness, self-containment, voice safety and catalogue readiness
```

These commands are part of `narrative-pack-create`; they are not separate installable skills.

The normal creation path is:

```text
pack:inspect
→ pack:create
→ pack:example
→ pack:evals
→ pack:validate
```

The skill must also support direct entry when earlier work already exists.

```text
"Add evals to this existing pack"
→ pack:evals
→ pack:validate
```

```text
"Check whether this pack is ready for the catalogue"
→ pack:validate
```

Do not recreate a pack merely to preserve a fixed command sequence.

---

## 12. Example Packs

### `literary-mystery-novella`

```text
Medium: novella
Genre: mystery / psychological drama
Style: restrained literary prose
Audience: adult
Voices: none
```

Focus:

```text
controlled information release
character-centred causality
limited cast
meaningful clues
interiority without explanatory overstatement
compact structural escalation
```

### `naturalistic-audio-drama`

```text
Medium: serialised audio drama
Genre: contemporary drama / mystery
Style: restrained naturalism
Audience: adult
Voices: ensemble cast
```

Focus:

```text
spoken-first scene construction
recognisable character voices
subtext
silence and ambience as narrative space
clear knowledge state
persistent voice casting
```

### `contained-psychological-thriller-screenplay`

```text
Medium: feature screenplay / short screenplay
Genre: psychological thriller
Style: contained naturalistic suspense
Audience: adult
Voices: optional table-read cast
```

Focus:

```text
limited locations
objective/conflict/turn scene construction
escalating reinterpretation
playable action
subtext-heavy dialogue
minimal explanatory exposition
```

### `episodic-science-fiction-drama`

```text
Medium: television / serial narrative
Genre: science fiction drama
Style: grounded speculative realism
Audience: teen / adult
Voices: optional
```

Focus:

```text
repeatable episode engine
serial arc
stable speculative rules
evolving character knowledge
planned versus canonical events
controlled season reveals
```

### `young-reader-fantasy-adventure`

```text
Medium: middle-grade novel
Genre: fantasy adventure
Style: clear, energetic, emotionally legible
Audience: middle-grade / family
Voices: optional audiobook narrator
```

Focus:

```text
accessible vocabulary
clear stakes
wonder without uncontrolled lore
strong character motivation
readable causal progression
age-appropriate intensity
```

### `interactive-detective-game-narrative`

```text
Medium: video-game narrative
Genre: detective mystery
Style: grounded procedural
Audience: teen / adult
Voices: optional cast
```

Focus:

```text
player agency
clue state
branch consequences
character knowledge
evidence versus belief
multiple valid investigation paths
reconvergence without invalidating prior choices
```

---

## 13. Installation and Use

Install a pack independently:

```bash
npx skills add <org>/<customisation-packs-repo> \
  --skill naturalistic-audio-drama \
  --agent claude-code
```

A consumer project may install both Narrative Production Skills and a pack:

```bash
npx skills add <org>/<narrative-production-repo> \
  --skill narrative-develop \
  --skill narrative-write \
  --skill narrative-continuity \
  --skill narrative-evaluate \
  --skill narrative-revise \
  --agent claude-code

npx skills add <org>/<customisation-packs-repo> \
  --skill naturalistic-audio-drama \
  --agent claude-code
```

For Codex, use:

```text
--agent codex
```

Example use:

```text
Use Narrative Production Skills with the naturalistic-audio-drama customisation pack to develop and write this brief.
```

The pack is a peer capability, not an embedded runtime dependency.

Project-local installation remains the default recommendation.

---

## 14. Authoring Rules

A pack should:

- describe production characteristics, not merely name a medium, genre or style;
- be coherent enough to use as one installed Agent Skill;
- define medium-specific constraints where they materially affect artifacts or handoffs;
- define genre expectations without reducing the genre to a formula;
- express style operationally;
- preserve approved narrative decisions;
- define intentional traits that evaluation must preserve;
- define downstream handoffs without absorbing downstream production responsibilities;
- keep optional voice casting separate from core narrative behaviour;
- reference only voice assets the pack author and consumer are permitted to use;
- avoid provider execution logic unless explicitly required;
- avoid unnecessary files and configuration layers.

A pack should not use an individual creator's name as its entire style definition or attempt to reproduce a specific work beat-for-beat, scene-for-scene or line-for-line.

---

## 15. Evals

Every pack should prove that an agent can:

```text
recognise when the pack is relevant
apply the medium constraints
apply genre expectations without formulaic copying
apply operational style guidance
preserve pack constraints across multiple artifacts
adapt evaluation correctly
avoid applying the pack when not requested
respect explicit project overrides
respect approved narrative artifacts
maintain the core draft/selection/approval lifecycle
preserve the smallest-sufficient-revision rule
produce the correct downstream handoff where applicable
```

Medium-specific evals should verify relevant behaviour.

Examples:

```text
screenplay
→ scene execution remains playable and screenplay-appropriate

novel
→ prose does not collapse into screenplay-like summary

audio drama
→ spoken information is intelligible without visual exposition

interactive narrative
→ branches do not become accidental continuity contradictions

game narrative
→ player-dependent state is not silently promoted to universal canon
```

Voice-enabled packs should also verify:

```text
correct voice-role mapping
voice consistency
pronunciation rules where declared
provider reference resolution where applicable
no voice requirement when spoken performance is unnecessary
no unauthorised voice material embedded in the pack
```

Provider-backed voice or production evals may run separately when they incur meaningful cost.

Pack evals should also test negative cases so a pack is not rewarded merely for aggressively applying its conventions everywhere.

`narrative-pack-create` must additionally have command-level evals for `pack:inspect`, `pack:create`, `pack:example`, `pack:evals`, and `pack:validate`. Each command requires at least one normal and one boundary case.

---

## 16. Acceptance Criteria

```text
✓ installs independently as an Agent Skill
✓ has a coherent narrative production identity
✓ defines medium, genre and style
✓ defines audience when materially relevant
✓ voice casting remains optional unless intrinsic to the medium
✓ medium constraints are operational rather than labels
✓ genre guidance does not impose unnecessary formula
✓ style characteristics are operational rather than labels
✓ core Narrative Production Skills remain usable without the pack
✓ narrative-develop applies relevant pack guidance
✓ narrative-write applies relevant pack guidance
✓ narrative-continuity applies relevant pack semantics
✓ narrative-evaluate distinguishes intentional traits from defects
✓ narrative-revise preserves approved work and targets the smallest sufficient scope
✓ explicit project instructions override pack defaults
✓ approved narrative artifacts are not silently rewritten
✓ downstream handoffs respect project boundaries
✓ provider execution logic is not duplicated
✓ voice credentials/private assets are not embedded
✓ at least one realistic example demonstrates the pack
✓ behavioural evals pass
✓ `narrative-pack-create` command contracts pass independently
✓ pack creation can enter directly at inspect, example, eval or validation work when earlier stages already exist
```

---

## 17. Deferred Extensions

Do not implement these until real usage proves the need:

```text
independent medium skills
independent genre skills
independent style skills
independent voice-cast skills
pack inheritance
pack composition engine
pack conflict resolver
pack marketplace metadata
automatic pack recommendation
automatic pack mixing
provider-specific voice optimisation
central medium/genre/style ontology
automatic conversion between media
```

The first implementation should prove coherent ready-made packs before introducing a compositional framework.

---

## 18. Extraction Candidate

The customisation-pack concept may eventually be reusable across the Creative Production Skills family.

Potential shared concepts include:

```text
pack identity
production profile
precedence rules
pack-aware evaluation
optional provider references
voice-cast metadata
```

Do not extract them yet.

Reconsider extraction only after at least one additional production domain independently implements substantially equivalent behaviour and the shared contract would reduce rather than increase complexity.

Until then, this remains a Narrative Production Skills vertical capability.

---

## 19. Initial Implementation Order

```text
1. define the Narrative customisation-pack contract
2. define the extension-pack catalogue and showcase contract
3. implement `narrative-pack-create` and its five command contracts
4. add command-level and skill-orchestration evals for `narrative-pack-create`
5. use `narrative-pack-create` to create the first 3-5 coherent ready-made packs
6. integrate pack consumption into `narrative-develop`
7. integrate pack consumption into `narrative-write`
8. add medium/genre-aware continuity where needed
9. integrate pack-aware evaluation into `narrative-evaluate`
10. integrate pack-aware revision into `narrative-revise`
11. add behavioural evals
12. test packs against real showcase productions
13. refine the contract from observed failures
14. only then reconsider modular composition
```

Recommended initial pack set:

```text
literary-mystery-novella
contained-psychological-thriller-screenplay
naturalistic-audio-drama
episodic-science-fiction-drama
interactive-detective-game-narrative
```

This set deliberately spans different media so that the implementation proves that **medium changes production behaviour**, rather than merely demonstrating five genre/style variations of the same written form.

---

## 20. Related Documents

- `docs/01-creative-skills-system-spec.md` — project scope, core skills and boundaries.
- `docs/02-creative-skills-workflows-and-artifacts-spec.md` — narrative lifecycle and first-class artifacts.
- `docs/03-creative-skills-repository-and-contracts-spec.md` — Agent Skill packaging and technical contracts.
- `docs/04-testing-and-benchmark-spec.md` — testing, regression and benchmark policy.
- `docs/06-extension-pack-catalogue.md` — ready-made pack catalogue, showcase prompts and pack-authoring workflow.
- `docs/extraction-candidates.md` — candidates that may later become family-level abstractions.

---

**Narrative Production Customisation Packs Specification**  
**Version 3 — 26 August 2026**
