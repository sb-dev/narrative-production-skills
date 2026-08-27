---
name: narrative-pack-create
description: Create or revise self-contained Narrative Production customisation/extension packs. Use when defining a reusable medium, genre, style, audience, voice-cast, evaluation, or cross-project production profile that should be packaged as an Agent Skill rather than embedded in one project prompt.
---

# Narrative Pack Create

Create coherent Narrative Production customisation packs from proven production needs.

## Operating sequence

1. Identify the production need and inspect the existing extension-pack catalogue before proposing a new pack.
2. Decide whether the need justifies a reusable pack or belongs in project-specific instructions.
3. Define one coherent production profile: medium, genre, operational style, audience when relevant, and optional voice casting.
4. Separate hard medium constraints from softer genre/style defaults.
5. Define how the pack influences `narrative-develop`, `narrative-write`, `narrative-continuity`, `narrative-evaluate`, and `narrative-revise` only where relevant.
6. Define downstream handoffs without taking over Comic, Video, Music/Audio, Game, or Web implementation responsibilities.
7. Define pack-aware evaluation: intentional traits to preserve, defects to reject, and conditions that should not be penalised.
8. Create a self-contained Agent Skill package with only the references/assets it needs.
9. Create at least one showcase example whose `README.md` contains the exact generation prompt.
10. Create behavioural evals covering activation, application, refinement, precedence, and boundary behaviour.
11. Validate the package against the acceptance rules before treating it as ready.

## Core rules

- Prefer a coherent ready-made pack over one skill per medium, genre, style, or voice dimension.
- Do not create a new pack when an existing catalogue pack plus project-specific instructions is sufficient.
- Medium constraints may be hard; genre and style guidance are normally soft.
- Explicit project instructions and approved artifacts override pack defaults.
- Never silently reopen or rewrite approved narrative decisions to satisfy a pack.
- A style must be operational: describe observable production characteristics, not merely a label.
- Do not use an individual creator's name as the whole style definition or attempt to reproduce an existing work exactly.
- Keep voice casting optional unless spoken performance is intrinsic to the medium.
- Never embed API keys, private voice assets, or unlicensed voice references.
- Do not invent provider voice IDs. Use placeholders or casting direction when a licensed/configured voice is unavailable.
- Do not duplicate provider execution logic.
- Every installable pack must be self-contained; repository-level docs are not runtime dependencies.
- Every pack must include a showcase generation prompt and behavioural evals.

## Minimum output

```text
skills/<pack-name>/
├── SKILL.md
├── references/
│   └── production-profile.md
└── evals/
    └── evals.json

examples/extension-packs/<pack-name>/
└── README.md
```

Add only files the pack genuinely needs.

## Pack profile

A pack should define:

```text
identity
intended use
medium
genre
operational style
audience when relevant
optional voice casting
hard constraints
defaults
artifact/workflow effects
continuity effects
evaluation behaviour
revision behaviour
downstream handoffs
external requirements
conflicts / incompatibilities
```

## Precedence

```text
1. explicit project instructions
2. approved narrative artifacts and approved production decisions
3. selected extension pack
4. Narrative Production defaults
```

Surface conflicts rather than silently resolving them against stronger decisions.

## Evaluation

A created pack is not ready merely because its files exist.

Verify that it:

- activates when requested and stays inactive otherwise;
- changes relevant production behaviour rather than only adding labels;
- preserves approved work;
- adapts evaluation to intentional characteristics without hiding real defects;
- respects medium and project boundaries;
- handles voice casting safely where present;
- can be demonstrated by its showcase prompt.

Read the local references and templates when authoring or reviewing a pack.
