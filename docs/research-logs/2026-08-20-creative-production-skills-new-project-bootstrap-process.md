# Creative Production Skills — New Project Bootstrap Process

## 1. Purpose

This process defines how a new Creative Production Skills family project moves from an idea to a **scaffolded, public, installable open-source GitHub repository**.

It applies to projects such as:

- `video-production-skills`
- `narrative-production-skills`
- `comic-production-skills`
- `video-game-asset-production-skills`
- `music-production-skills`
- `advertising-production-skills`

The process is complete only when the repository can be installed into another project and used by an AI agent.

## 2. Required Outputs

The bootstrap must produce:

1. a clear project goal;
2. production-domain research;
3. AI skills/tools research;
4. a domain-native workflow and artifact model;
5. a justified skill set;
6. evals and quality criteria;
7. the three canonical specs;
8. an open-source repository scaffold;
9. a documented skill-installation path;
10. local and GitHub installation smoke tests.

## 3. Governing Principles

- **Domain first** — understand real production practice before designing skills.
- **Research before reimplementation** — find existing Agent Skills, provider skills, MCPs, models, and deterministic tools first.
- **Vertical first** — design a complete domain workflow before extracting shared abstractions.
- **Draft before expensive production** — identify cheap representations that validate decisions early.
- **Preserve approved work** — promote/refine approved artifacts rather than restart from the brief.
- **Evals are product behaviour** — define quality before finalising skill contracts.
- **Installability is part of the product** — a skill repository is incomplete if consumers cannot install it cleanly.
- **Extract later** — cross-domain concepts go to `docs/2026-08-20-extraction-candidates.md` until proven reusable.

## 4. Bootstrap Flow

```text
PROJECT IDEA
    ↓
1. Define Project Goal
    ↓
2. Research Production Domain
    ↓
3. Map Workflow + Artifacts
    ↓
4. Define Draft Strategy
    ↓
5. Research AI Skills / Tools
    ↓
6. Choose Execution Layer
    ↓
7. Gap Analysis
    ↓
8. Design Skills + Evals
    ↓
9. Generate Three Specs
    ↓
10. Cross-Project Review
    ↓
11. Scaffold Repository
    ↓
12. Configure Skill Installation
    ↓
13. Local Validation
    ↓
14. Publish GitHub Repository
    ↓
15. External Install Smoke Test
    ↓
READY FOR IMPLEMENTATION
```

## 5. Stage 1 — Project Goal

Do not begin with a proposed skill list.

Define:

- target creative output;
- intended users;
- supported scenarios;
- expected autonomy and quality;
- expensive/difficult stages to improve;
- persistent decisions/artifacts;
- human selection points;
- failure modes;
- explicit non-goals.

Questions:

```text
What does the user ultimately produce?
What does a successful end-to-end workflow look like?
Which stages require the most judgement?
Which stages are expensive?
Which decisions must persist?
Where does quality commonly fail?
What should remain human-selectable?
What is explicitly out of scope?
```

## 6. Stage 2 — Production-Domain Research

Study how practitioners actually produce the target asset.

Research:

```text
production stages
specialist roles
working artifacts
decision points
iteration loops
approval gates
common failures
quality criteria
handoffs
```

Do not derive the workflow merely from current AI model capabilities.

## 7. Stage 3 — Workflow and Artifact Mapping

Turn production research into the simplest credible end-to-end workflow.

For each first-class artifact identify:

```text
who creates it
what it represents
what consumes it
what decisions it preserves
whether it can be refined
whether it can be promoted
whether another project consumes it
```

## 8. Stage 4 — Draft Strategy

Identify where cheap artifacts can validate creative decisions before expensive production.

Examples:

```text
Video:
storyboard → reference frame → motion prototype → final video

Comic:
thumbnail → page layout → panel draft → final panel

Narrative:
scene card → rough scene → refined scene

Music:
motif → rough arrangement → demo → final production

Video Game Assets:
silhouette → concept sheet → asset draft → game-ready asset
```

Define what a draft is, what gets selected, how selection is preserved, and when stronger production is justified.

## 9. Stage 5 — AI Skills and Tools Research

Research by **production capability**, not only by project name.

Search:

- official Agent Skills;
- open-source Agent Skills;
- provider-maintained skills;
- MCPs/agent integrations;
- model-provider tools;
- deterministic production tools.

For each candidate record:

| Field | Purpose |
|---|---|
| Name | Skill/tool |
| Source | Repository/provider |
| Licence | Reuse/adaptation constraints |
| Production role | Workflow stage |
| Capabilities | Actual functionality |
| Provider coupling | API/model dependency |
| Cost | Relevant execution cost |
| Quality suitability | Fit |
| Maintenance | Current/active |
| Integration mode | Use/adapt/reference/reject |
| Gaps | Missing behaviour |

Classify:

```text
USE       → consume directly
ADAPT     → reuse/fork if licence permits
REFERENCE → learn from it only
REJECT    → unsuitable/duplicate/stale
```

## 10. Stage 6 — Choose the Execution Layer

Decide which existing provider/tool skills own model execution.

Example:

```text
Video Production Skills
        ↓
Official Replicate Skills
        ↓
Replicate
```

Other domains may use different provider skills and deterministic tools.

Do not force Replicate or any single provider architecture onto the whole project family.

## 11. Stage 7 — Gap Analysis

Compare:

```text
required production workflow
            vs
available skills and tools
```

Classify capabilities:

```text
covered
partially covered
missing
```

Native project skills should address the production behaviour still missing after upstream capabilities are considered.

## 12. Stage 8 — Skill and Eval Design

Create the **smallest useful set of domain-native skills**.

Do not force symmetry with other projects.

For each skill define:

```text
activation context
scope
inputs
outputs
lifecycle behaviour
upstream/provider skills
artifact responsibilities
retry/refinement behaviour
evaluation behaviour
```

Before finalising contracts, define evals for:

```text
normal case
draft case
refinement case
final case
failure / boundary case
```

Quality criteria must be domain-native.

## 13. Stage 9 — Generate the Three Canonical Specs

The three primary specs live directly under the root `docs/` folder:

```text
docs/
├── 01-creative-skills-system-spec.md
├── 02-creative-skills-workflows-and-artifacts-spec.md
└── 03-creative-skills-repository-and-contracts-spec.md
```

### Spec 1 — Creative Skills System

Owns:

- project goal;
- scope/non-goals;
- architecture;
- core skills;
- external dependencies;
- project boundaries;
- high-level execution model;
- build order;
- system acceptance criteria.

### Spec 2 — Creative Skills Workflows and Artifacts

Owns:

- `draft → refine → final`;
- production policy;
- production workflows;
- first-class artifacts;
- draft sets;
- selection;
- promotion/refinement;
- provenance;
- evaluation lifecycle;
- cross-project artifact handoffs.

### Spec 3 — Creative Skills Repository and Contracts

Owns:

- repository structure;
- `SKILL.md` contracts;
- references/assets/scripts;
- peer skill requirements;
- eval layout;
- installation expectations;
- examples;
- technical acceptance criteria.

## 14. Stage 10 — Cross-Project Review

Review against existing project-family repositories.

Ask:

```text
Does this duplicate an existing production skill?
Can it consume an existing artifact instead?
Are we reimplementing provider functionality?
Is a similar concept genuinely equivalent?
Is this an extraction candidate?
```

Potential overlap goes to:

```text
docs/2026-08-20-extraction-candidates.md
```

Do not extract automatically.

## 15. Stage 11 — Scaffold the Open-Source Repository

The process must generate a working repository skeleton:

```text
<project>-production-skills/
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── .gitignore
│
├── docs/
│   ├── 01-creative-skills-system-spec.md
│   ├── 02-creative-skills-workflows-and-artifacts-spec.md
│   ├── 03-creative-skills-repository-and-contracts-spec.md
│   └── 2026-08-20-extraction-candidates.md
│
├── skills/
│   └── <skill-name>/
│       ├── SKILL.md
│       ├── references/
│       ├── assets/
│       ├── scripts/
│       └── evals/
│
├── examples/
│   └── ...
│
├── evals/
│   └── end-to-end/
│
└── .github/
    ├── ISSUE_TEMPLATE/
    ├── PULL_REQUEST_TEMPLATE.md
    └── workflows/
```

Only create optional directories when needed.

The scaffold also initialises:

```text
git repository
main branch
open-source licence
initial README
GitHub contribution files
```

Licence selection must account for licences of adapted upstream material.

## 16. Skill Packaging Rule

Every installable skill must be **self-contained** inside:

```text
skills/<skill-name>/
```

Runtime resources must live with the skill:

```text
SKILL.md
references/
assets/
scripts/
```

Do not require an installed skill to access repository-level shared references.

Repository-level `docs/`, `guides/`, and `examples/` are project/public knowledge, not runtime dependencies.

If two skills temporarily duplicate a small reference, prefer that local duplication until a reliable shared contract and installation mechanism is justified.

## 17. Canonical Installation Mechanism

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
npx skills add <org>/<repo> --skill <skill-name>
```

Target a specific agent:

```bash
npx skills add <org>/<repo>   --skill <skill-name>   --agent claude-code
```

or:

```bash
npx skills add <org>/<repo>   --skill <skill-name>   --agent codex
```

Global installation is optional:

```bash
npx skills add <org>/<repo> --global
```

**Project-local installation is the default recommendation.**

## 18. Why Project-Local Is the Default

Creative-production skills can materially affect agent behaviour.

Project-local installation provides:

- explicit project dependencies;
- reproducibility;
- team visibility;
- isolation between unrelated projects;
- easier compatibility management.

Global installation is appropriate only when a user deliberately wants a skill available across all projects.

## 19. Installed Skill Tracking

Useful Skills CLI commands:

```bash
npx skills list
npx skills check
npx skills update
npx skills generate-lock
```

A consuming project may commit `skills-lock.json` to record installed skill sources.

Do not make experimental lock-based restore behaviour a hard project dependency yet.

The canonical recovery mechanism remains explicit `npx skills add ...` commands documented in the consuming project.

## 20. Multi-Project Consumer Example

A film project might install only the skills it needs:

```bash
npx skills add <org>/narrative-production-skills   --skill narrative-write   --agent claude-code

npx skills add <org>/video-production-skills   --skill replicate-video   --skill replicate-character   --skill replicate-evaluate   --agent claude-code

npx skills add <org>/music-production-skills   --skill music-compose   --agent claude-code
```

The consuming project composes production domains without installing the entire family.

## 21. Stage 12 — Local Installability Validation

Before GitHub publication:

```bash
npx skills add . --list
```

Then install each skill from the local repository into a clean temporary project.

Example:

```bash
mkdir /tmp/creative-skills-smoke
cd /tmp/creative-skills-smoke
git init

npx skills add /path/to/project   --skill <skill-name>   --agent claude-code
```

Verify:

- skill is discovered;
- skill installs;
- `SKILL.md` is valid;
- references are present;
- scripts/assets are present where required;
- no repository-relative runtime references break.

## 22. Stage 13 — Publish the GitHub Repository

After local validation:

```text
initial commit
 ↓
create public GitHub repository
 ↓
push main
 ↓
configure repository metadata
 ↓
run CI
```

Repository metadata should include:

- concise description;
- project topics;
- licence;
- issues;
- discussions where useful;
- contribution guidance.

## 23. Stage 14 — External GitHub Install Smoke Test

Publication is incomplete until a clean project can install from GitHub:

```bash
npx skills add <org>/<repo> --list
```

Then:

```bash
npx skills add <org>/<repo>   --skill <skill-name>   --agent claude-code
```

Where practical also test another supported agent, such as Codex.

This is the final bootstrap gate.

## 24. CI Expectations

Minimum useful CI:

```text
validate SKILL.md/frontmatter
validate expected files
run deterministic tests
run cheap eval fixtures
test `npx skills add . --list`
test local installation of each skill
detect broken runtime references
```

Provider-backed generation evals may run separately when they incur meaningful cost.

## 25. README Installation Contract

Every repository README should show:

```bash
# Inspect
npx skills add <org>/<repo> --list

# Install
npx skills add <org>/<repo>

# Install selected skill
npx skills add <org>/<repo> --skill <skill-name>

# Explicit agent target
npx skills add <org>/<repo>   --skill <skill-name>   --agent claude-code
```

Also document:

- provider credentials;
- local deterministic dependencies;
- recommended skill combinations;
- global installation;
- update commands.

## 26. Scaffold Acceptance Gate

Before publication:

```text
✓ repository initialised
✓ three canonical specs directly under /docs
✓ README exists
✓ licence selected
✓ CONTRIBUTING.md exists
✓ CODE_OF_CONDUCT.md exists
✓ SECURITY.md exists
✓ skills are self-contained
✓ skill evals exist
✓ at least one realistic example exists
✓ local Skills CLI install succeeds
```

## 27. Publication Acceptance Gate

After publication:

```text
✓ public GitHub repository accessible
✓ README install instructions work
✓ `npx skills add <org>/<repo> --list` succeeds
✓ intended skills install individually
✓ installed skills contain all required resources
✓ at least two agent targets tested where practical
✓ CI passes
✓ repository metadata configured
```

The project is now implementation-ready and consumable.

## 28. Working Research Artifacts

Bootstrap may create temporary working documents:

```text
project-goals.md
production-domain-research.md
ai-skills-and-tools-research.md
```

These are inputs, not additional canonical specs.

Their stable conclusions should be absorbed into the three canonical specs.

## 29. Complete Bootstrap Output

```text
Research
├── project goals
├── production-domain understanding
└── AI skill/tool selection rationale

Canonical Specs
├── docs/01-creative-skills-system-spec.md
├── docs/02-creative-skills-workflows-and-artifacts-spec.md
└── docs/03-creative-skills-repository-and-contracts-spec.md

Open-Source Repository
├── README
├── licence
├── contribution files
├── skills
├── examples
├── evals
└── GitHub configuration

Distribution
├── `npx skills add <org>/<repo>`
├── selective installation
├── project-local installation
└── update/source tracking

Validation
├── local install smoke test
├── GitHub install smoke test
└── CI
```

The bootstrap ends with a repository that can be cloned, contributed to, and **installed into another project for use by an AI agent**.

---

**Creative Production Skills — New Project Bootstrap Process v1**
