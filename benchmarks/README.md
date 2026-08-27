# Narrative Production Skills Benchmark

This directory contains the executable benchmark definition for Narrative Production Skills.

The benchmark measures four surfaces independently:

```text
production correctness
narrative quality
extension-pack fidelity
extension-pack authoring quality
```

It intentionally does not produce one authoritative story-quality score.

## Coverage

```text
diagnostic:       10
production:        5
packs:            12
pack-authoring:    5
--------------------
total:            32
```

The `production` cases reference the five progressive example README prompts. The `packs` suite references every current `examples/extension-packs/*/README.md` prompt. `pnpm run test:benchmark` fails when a current extension-pack showcase is not represented.

## Commands

```bash
# Validate the benchmark definition and coverage
pnpm run test:benchmark

# List cases
pnpm run benchmark:list

# Prepare one case after pnpm run build
node dist/tools/run-benchmark.js --case prod-level-1-short-story

# Score a recorded structured result
node dist/tools/run-benchmark.js --score path/to/result.json
```

## Semantic measurement

The runner does not make Narrative Production Skills depend on a provider API. Generate artifacts with the host agent under test, record an independent structured review, then score it offline.

Use at least three repeats for a baseline.

Do not commit a baseline until real system-under-test outputs exist.

See `docs/04-testing-and-benchmark-spec.md` for the full runbook, rubrics, pass/fail semantics, staleness rules and release policy.
