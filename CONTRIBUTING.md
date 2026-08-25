# Contributing

Contributions should strengthen real narrative-production behaviour rather than expand architecture speculatively.

## Development principles

- Keep Narrative Production Skills responsible for story, not visual/media production.
- Preserve the five-skill architecture unless a real activation or responsibility conflict justifies a split.
- Keep every installable skill self-contained.
- Put runtime knowledge under that skill's `references/` directory, not repository-level `docs/`.
- Use TypeScript for repository tooling and deterministic scripts.
- Do not introduce provider wrappers, databases, retrieval services, multi-agent orchestration, or numeric narrative scoring without evidence from a recurring production failure.
- Add or update evals whenever production behaviour changes.

## Pull requests

A pull request should explain:

1. the narrative-production problem;
2. the smallest behaviour change that solves it;
3. affected skills/artifacts;
4. preservation or compatibility concerns;
5. evals or tests proving the change.

Before submitting:

```bash
pnpm install
pnpm run check
pnpm test
pnpm run validate
```

Installation-impacting changes should also run the clean-project smoke test when the environment permits it.

## Extraction candidates

Cross-domain overlap belongs in `docs/extraction-candidates.md`. Do not create shared Creative Production abstractions merely because two projects use similar names.
