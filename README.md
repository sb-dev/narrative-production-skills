# Narrative Production Skills

**Develop complete AI-assisted narratives, not isolated text generations.**

Narrative Production Skills gives AI coding agents a production workflow for turning a brief into a coherent short story, manuscript, screenplay, or reusable story package.

It supports the full narrative-production process:

- **Story development**: briefs, premise exploration, concepts, story direction
- **Characters and world**: story-relevant character profiles, relationships, rules and constraints
- **Structure**: outlines, beats, scene cards, setup/payoff and causal progression
- **Writing**: rough scenes, refined prose, dialogue, chapters and screenplays
- **Continuity**: canon, planned events, character beliefs, secrets and uncertainty
- **Editorial**: developmental evaluation, revision planning and targeted rewriting

The workflow is designed to explore uncertainty at low resolution, select and approve creative decisions, preserve continuity, write from persistent artifacts, evaluate at the right narrative level, and revise only what actually needs to change.

## Creative control

Selection and approval are different decisions.

- **Selection** means: keep developing this direction.
- **Approval** means: preserve this decision downstream unless it is explicitly reopened.

Rejected candidates should not silently influence later work. Approved character behaviour, world rules, endings, reveals, or other creative decisions become constraints rather than suggestions.

When a story needs to change, the workflow reopens the smallest useful decision and identifies the affected descendants instead of regenerating everything from the original brief.

```text
approved decision
→ new narrative evidence
→ explicit reopen
→ alternative / refinement
→ selection
→ revise affected material only
```

Planned material is also kept separate from established canon. An event in an outline is not treated as something that has already happened in the story.

## Install

The public GitHub owner and repository name are not verified yet, so publication commands intentionally use `<org>/<repo>`.

Install the full narrative workflow for Claude Code:

```bash
npx skills add <org>/<repo> \
  --skill narrative-develop \
  --skill narrative-write \
  --skill narrative-continuity \
  --skill narrative-evaluate \
  --skill narrative-revise \
  --agent claude-code
```

For Codex, use `--agent codex` instead.

Inspect before installing:

```bash
npx skills add <org>/<repo> --list
```

Install only what a project needs:

```bash
npx skills add <org>/<repo> \
  --skill narrative-develop \
  --skill narrative-evaluate \
  --agent claude-code
```

Project-local installation is the default. Global installation is optional:

```bash
npx skills add <org>/<repo> --global
```

Track and update installed skills with:

```bash
npx skills list
npx skills check
npx skills update
npx skills generate-lock
```

## Quick start — Tomorrow's Receipt

Start with one short story and learn the complete narrative-production loop.

```text
Use Narrative Production Skills to develop a 2,000-word speculative short story titled “Tomorrow's Receipt”.

Premise:
Closing a small corner shop, cashier Lena Rahman finds that the till has printed one extra receipt dated tomorrow. The purchases are ordinary, but together they suggest that one of her regular customers, Mr Kavanagh, will need urgent help before midnight the next day.

Requirements:
- Genre: speculative human drama
- Tone: intimate, restrained, quietly tense
- Point of view: close third person through Lena
- Setting: the shop, the surrounding street, and one nearby flat
- Length: about 2,000 words
- Keep the speculative mechanism unexplained
- Do not turn the story into a large conspiracy or time-travel mythology
- The final consequence should arise from Lena's choice, not from a twist imposed from outside
- Avoid sentimental exposition

Workflow:
- Explore three genuinely different story concepts at low resolution
- Compare them and select one direction
- Develop only the character and world information the selected story needs
- Produce a compact complete outline before drafting prose
- Draft from the selected development artifacts
- Evaluate the draft without rewriting it
- Create a revision plan from the findings
- Revise the smallest sufficient scope
- Preserve unaffected selected or approved decisions

What to optimise for:
- causal coherence
- emotional credibility
- a clear protagonist choice
- escalating significance of the receipt items
- economical setup and payoff
- scene purpose
- a satisfying ending without explaining the phenomenon
```

A first project should stay small. For example:

```text
production/
└── narrative/
    ├── brief.md
    ├── concepts.md
    ├── outline.md
    ├── draft.md
    ├── evaluation.md
    └── revision-plan.md
```

Add characters, world, continuity, scene directories, or episode structure only when the story actually needs them.

The important behaviour is:

```text
low-resolution exploration
→ select
→ approve
→ write
→ evaluate
→ revise only affected material
```

See [Tomorrow's Receipt](examples/level-1-tomorrows-receipt/README.md).

## Learn by producing

Progress through increasingly demanding narrative-production problems. **Each level contains three productions from different genres or audience modes**, so the capability is demonstrated as a reusable production behaviour rather than a thriller-specific trick.

### Level 1 — Develop and revise one complete story

Prove the complete narrative-production loop on compact short fiction across very different tones before continuity infrastructure or cross-domain handoffs are needed.

- **[Tomorrow's Receipt](examples/level-1-tomorrows-receipt/README.md)** — speculative human drama. Closing a corner shop, a cashier's till prints tomorrow's final receipt. The listed purchases suggest that one of her regular customers will need help before midnight.
- **[Wrong Number, Right Song](examples/level-1-wrong-number-right-song/README.md)** — romantic comedy. A struggling songwriter receives a voice note meant for someone else after a disastrous blind date, and a polite correction turns into an unexpectedly honest conversation over one evening.
- **[The Birthday Weather Machine](examples/level-1-the-birthday-weather-machine/README.md)** — family science-fiction comedy. An eleven-year-old inventor tries to save her little brother's outdoor birthday from rain and discovers that controlling one tiny patch of weather is harder than building the machine.

```text
brief → concept alternatives → selection → outline → draft → evaluation → revision plan → targeted revision
```

### Level 2 — Maintain knowledge, belief and canon

Add explicit continuity because relationships, promises, identity and evidence now depend on who knows, believes, conceals or misinterprets what.

- **[Wedding Table Nine](examples/level-2-wedding-table-nine/README.md)** — ensemble comedy / farce. A last-minute seating reshuffle puts six wedding guests together whose relationships, secrets and assumptions are known differently by everyone at the table.
- **[The Dragon's Three Promises](examples/level-2-the-dragons-three-promises/README.md)** — fantasy. A dragon has separately made three binding promises to three people, and a single midsummer festival makes it impossible to honour all three literally.
- **[The Duplicate Astronaut](examples/level-2-the-duplicate-astronaut/README.md)** — science fiction / identity story. Two astronauts return from the same one-person mission with identical memories up to a short communications blackout, and both sincerely believe they are the original.

```text
objective state + beliefs + secrets + uncertainty → task context → scenes → continuity evaluation → local correction
```

### Level 3 — Develop and execute a screenplay

Translate medium-independent story decisions into scene cards and Fountain-compatible screenplay pages across comedy, romance and action while keeping audiovisual direction downstream.

- **[Returns Desk](examples/level-3-returns-desk/README.md)** — workplace fantasy comedy. A department-store returns clerk is asked to refund a dragon egg, but every normal policy choice creates a new practical problem as the egg begins to hatch.
- **[Table for Two](examples/level-3-table-for-two/README.md)** — romantic comedy. Two people at neighbouring restaurant tables realise their blind dates have been accidentally swapped, but neither wants to interrupt the unexpectedly better conversation.
- **[The Princess's Day Off](examples/level-3-the-princess-day-off/README.md)** — fantasy adventure comedy. A royal bodyguard discovers the princess has slipped into a festival in disguise just as a ceremonial procession makes returning unseen almost impossible.

```text
story intent → scene cards → screenplay → developmental evaluation → bounded screenplay revision
```

### Level 4 — Manage an episodic story

Prove repeatable episode engines, persistent ensembles, planned-versus-canonical separation and growing continuity across contrasting series genres.

- **[Department of Minor Miracles](examples/level-4-department-of-minor-miracles/README.md)** — workplace fantasy comedy. A municipal office investigates small supernatural inconveniences that are too trivial for emergency services but too impossible for ordinary departments.
- **[Second Chance Café](examples/level-4-second-chance-cafe/README.md)** — romantic ensemble series. Each episode follows a customer using a neighbourhood café to attempt one second chance, while the staff's own relationships change across the season.
- **[Local Legends Club](examples/level-4-local-legends-club/README.md)** — children's adventure / mystery. Four children investigate one neighbourhood legend per episode and gradually discover that the supposedly unrelated stories describe the same hidden route through their town.

```text
series engine → episode stories → evolving character state → continuity → progressive evaluation
```

### Level 5 — Prepare a narrative handoff for audiovisual production

Prove artifact-based composition with downstream Video, Animation and Music Production Skills while preserving the boundary between story decisions and production decisions.

- **[The Orchestra in the Walls](examples/level-5-the-orchestra-in-the-walls/README.md)** — magical realism / music-driven drama. A lonely tenant hears one isolated instrument through each wall of her flat and gradually realises the separate fragments form one unfinished composition.
- **[Paper Moon Parade](examples/level-5-paper-moon-parade/README.md)** — family fantasy / animated short. A child's folded paper animals come alive and lead her across the city to find the elderly neighbour who taught her how to make them.
- **[The Day Gravity Blinked](examples/level-5-the-day-gravity-blinked/README.md)** — science-fiction comedy. Gravity disappears for exactly three seconds every hour while a baker tries to deliver an elaborate wedding cake across town before the next scheduled blink.

```text
narrative package → story constraints / screenplay / scene plans → downstream audiovisual and music production
```

The examples are intentionally genre-diverse. A continuity system that only works for mysteries, or a screenplay workflow that only produces tense two-handers, has not demonstrated general narrative-production capability.

## Project structure grows with the story

**One controlled story**  
Use a brief, concept material, an outline, the draft, evaluation and revision plan.

**Character knowledge or world state starts to matter**  
Add `characters/`, `world/` and `continuity/` only as needed.

**Scenes need independent planning or revision**  
Add `beats/` and `scenes/`.

**A screenplay becomes the target**  
Add screenplay-specific output while keeping the upstream story model reusable.

**A flat narrative stops scaling**  
Introduce episode, sequence, or other higher-level organisation only when the work requires it.

**Other creative domains contribute**  
Use domain-specific production areas such as:

```text
production/
├── narrative/
├── video/
└── music/
```

Keep the structure lean:

- branch at the smallest creative unit containing the uncertainty;
- preserve selected and approved decisions instead of recreating them from the brief;
- keep lifecycle state separate from decision status;
- treat planned events as planned until established in approved narrative;
- load only the context relevant to the current task;
- create shared or specialised structure only after the work needs it.

## Skills

### `narrative-develop`

Develop the story before full execution: brief interpretation, concept alternatives, characters, world, outline, beats and scene cards.

Use it to answer:

```text
What story are we telling?
What must be true for it to work?
What is the cheapest narrative representation that can resolve the next uncertainty?
```

### `narrative-write`

Write prose or screenplay material from relevant approved artifacts.

Supports rough scenes, refined scenes, chapters, dialogue in context, discovery writing, manuscripts and screenplay execution.

### `narrative-continuity`

Maintain story state and assemble task-relevant context.

It distinguishes:

```text
planned
canonical
character belief
secret
uncertain
superseded
```

### `narrative-evaluate`

Diagnose narrative problems without silently rewriting the work.

Evaluation is developmental and actionable rather than one generic score:

```text
weak prose, sound scene       → revise prose
weak scene, sound beat        → revise scene card and affected scene
unmotivated beat              → revise beat and affected descendants
weak causal middle            → revise the affected outline region
continuity contradiction      → fix the owning story decision, then affected material
```

### `narrative-revise`

Turn evaluation findings or direct feedback into bounded revision plans and targeted changes.

The governing rule is:

> **Correct the highest upstream cause of the failure, but regenerate only downstream material actually affected.**

### `narrative-pack-create`

Create or revise self-contained Narrative Production extension packs.

Use it when a reusable medium, genre, style, audience, voice-cast, evaluation or handoff profile should become an installable Agent Skill rather than remain project-specific prompting. Every created pack must include a realistic showcase example with the exact generation prompt.

This is an **extension-authoring skill**, not a sixth core narrative-production capability.

## Extension packs

Customisation packs specialise the core workflow without replacing it:

```text
Narrative Production Skills
        +
medium + genre + style + audience + optional voice cast
        ↓
coherent production profile
```

The initial catalogue spans literary, screenplay, graphic, stage, audio, film/television and interactive narrative. See [Extension Pack Catalogue](docs/06-extension-pack-catalogue.md).

Each catalogue example has a copyable generation prompt under [`examples/extension-packs/`](examples/extension-packs/).

Install the authoring skill when creating or revising packs:

```bash
npx skills add <org>/<repo> \
  --skill narrative-pack-create \
  --agent claude-code
```

For Codex, use `--agent codex`.

## Execution

The skills decide **what narrative-production work is needed**. The host AI agent performs language generation and reasoning.

Core Narrative Production Skills require no provider-specific model API.

Optional deterministic tools may support specialised operations:

- **Fountain-compatible tooling** — screenplay parsing, validation and interchange
- **Pandoc** — manuscript/document conversion
- **Vale / LanguageTool** — optional mechanical language checks

The project does not require an MCP server, vector database, graph database, model router, or multi-agent orchestration runtime.

> **Explore uncertainty at the cheapest narrative resolution capable of resolving it.**
>
> **Preserve approved decisions and change only what needs to change.**

## Testing and benchmarks

Repository correctness and narrative quality are measured separately.

The executable benchmark currently contains **42 cases**:

```text
10 diagnostic cases
15 progressive production cases
12 extension-pack showcase cases
 5 extension-pack authoring cases
```

Deterministic validation:

```bash
npm install
npm run check
npm run validate
npm test
npm run test:benchmark
```

Inspect the benchmark:

```bash
npm run benchmark:list

# after npm run build
node dist/tools/run-benchmark.js --case prod-level-1-tomorrows-receipt
```

The benchmark measures defect detection, root-cause routing, revision scope, preservation, narrative quality, medium/genre/style adherence, optional voice-cast handling, cross-domain boundaries, and extension-pack authoring.

Semantic quality uses repeated, anchored per-dimension judgement rather than one authoritative story score. No production baseline is reported until real outputs have actually been measured.

See [Testing and Benchmark Specification](docs/04-testing-and-benchmark-spec.md) and [benchmarks/README.md](benchmarks/README.md).

## Documentation

### Specifications

- [Creative Skills System Specification](docs/01-creative-skills-system-spec.md)
  - [Production Principles](docs/01-creative-skills-system-spec.md#7-production-principles)
  - [System Architecture](docs/01-creative-skills-system-spec.md#8-system-architecture)
  - [Core Skills](docs/01-creative-skills-system-spec.md#10-core-skills)
  - [Draft Strategy](docs/01-creative-skills-system-spec.md#17-draft-strategy)
  - [Context Assembly](docs/01-creative-skills-system-spec.md#18-context-assembly)
  - [Retry and Escalation](docs/01-creative-skills-system-spec.md#25-retry-and-escalation)
- [Creative Skills Workflows and Artifacts Specification](docs/02-creative-skills-workflows-and-artifacts-spec.md)
  - [Production Axes](docs/02-creative-skills-workflows-and-artifacts-spec.md#2-production-axes)
  - [Draft Sets](docs/02-creative-skills-workflows-and-artifacts-spec.md#5-draft-sets)
  - [Selection](docs/02-creative-skills-workflows-and-artifacts-spec.md#6-selection)
  - [Approval](docs/02-creative-skills-workflows-and-artifacts-spec.md#7-approval)
  - [First-Class Artifacts](docs/02-creative-skills-workflows-and-artifacts-spec.md#11-first-class-artifacts)
  - [Canonical Development Workflow](docs/02-creative-skills-workflows-and-artifacts-spec.md#27-canonical-development-workflow)
  - [Evaluation Lifecycle](docs/02-creative-skills-workflows-and-artifacts-spec.md#39-evaluation-lifecycle)
  - [Revision Workflow](docs/02-creative-skills-workflows-and-artifacts-spec.md#41-revision-workflow)
- [Creative Skills Repository and Contracts Specification](docs/03-creative-skills-repository-and-contracts-spec.md)
  - [Repository Structure](docs/03-creative-skills-repository-and-contracts-spec.md#2-repository-structure)
  - [Skill Packaging Rule](docs/03-creative-skills-repository-and-contracts-spec.md#3-skill-packaging-rule)
  - [Skill Evals](docs/03-creative-skills-repository-and-contracts-spec.md#16-skill-evals)
  - [End-to-End Evals](docs/03-creative-skills-repository-and-contracts-spec.md#24-end-to-end-evals)
  - [Consumer Project Structure and Progressive Examples](docs/03-creative-skills-repository-and-contracts-spec.md#26-consumer-project-structure-and-progressive-examples)
  - [Canonical Installation Mechanism](docs/03-creative-skills-repository-and-contracts-spec.md#30-canonical-installation-mechanism)
- [Testing and Benchmark Specification](docs/04-testing-and-benchmark-spec.md)
  - [Testing Layers](docs/04-testing-and-benchmark-spec.md#2-testing-layers)
  - [Defect Taxonomy](docs/04-testing-and-benchmark-spec.md#4-defect-taxonomy)
  - [Runbook](docs/04-testing-and-benchmark-spec.md#5-runbook)
  - [Deterministic Contract Tests](docs/04-testing-and-benchmark-spec.md#6-deterministic-contract-tests)
  - [Semantic Benchmark](docs/04-testing-and-benchmark-spec.md#7-semantic-benchmark)
  - [Initial Benchmark Cases](docs/04-testing-and-benchmark-spec.md#8-initial-benchmark-cases)
  - [Known Blind Spots Before the First Baseline](docs/04-testing-and-benchmark-spec.md#14-known-blind-spots-before-the-first-baseline)
- [Narrative Production Customisation Packs Specification](docs/05-customisation-packs-spec.md)
  - [Core Model](docs/05-customisation-packs-spec.md#4-core-model)
  - [Pack Dimensions](docs/05-customisation-packs-spec.md#5-pack-dimensions)
  - [Production Profile](docs/05-customisation-packs-spec.md#6-production-profile)
  - [Integration with Core Narrative Skills](docs/05-customisation-packs-spec.md#8-integration-with-core-narrative-skills)
  - [Cross-Project Handoffs by Medium](docs/05-customisation-packs-spec.md#9-cross-project-handoffs-by-medium)
  - [Agent Skills Packaging](docs/05-customisation-packs-spec.md#11-agent-skills-packaging)
  - [Example Packs](docs/05-customisation-packs-spec.md#12-example-packs)
  - [Deferred Extensions](docs/05-customisation-packs-spec.md#17-deferred-extensions)
- [Extension Pack Catalogue](docs/06-extension-pack-catalogue.md)
  - [Catalogue Rules](docs/06-extension-pack-catalogue.md#2-catalogue-rules)
  - [Initial Catalogue](docs/06-extension-pack-catalogue.md#3-initial-catalogue)
  - [Pack Creation Skill](docs/06-extension-pack-catalogue.md#16-pack-creation-skill)
  - [Required Pack Output](docs/06-extension-pack-catalogue.md#17-required-pack-output)
  - [Catalogue Acceptance Criteria](docs/06-extension-pack-catalogue.md#18-catalogue-acceptance-criteria)

### Project-family evolution

- [Extraction Candidates](docs/extraction-candidates.md) — cross-domain concepts observed for possible future extraction, not shared abstractions today.

## Project status

Bootstrap Stage 12 is complete.

Before publication, Stage 13 must prove local validation: TypeScript checks, deterministic tests, Skills CLI discovery, independent installation of every intended skill, and clean consumer-project smoke tests.

No blocked validation gate is treated as passed.

## Licence

MIT. See [LICENSE](LICENSE).
