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
production:       15
packs:            12
pack-authoring:    5
--------------------
total:            42
```

Coverage is enforced, not documented. `pnpm run test:benchmark` fails when any current `examples/level-{1..5}-*/README.md` or `examples/extension-packs/*/README.md` prompt is not represented by a case, and when the suite counts drift from the number of showcase directories. Production case ids map one-to-one onto their example directory.

`benchmarks/manifest.json` is loaded by the runner rather than mirrored in it: suite ids, case directories, per-suite repeat counts and rubric paths all come from the manifest, and validation fails if the manifest and the runner disagree about which suites exist or which directory a case belongs in.

Each case's `hardGates` must equal the hard dimensions its rubric declares (`kind: "hard"` for the scored rubrics, the `strict` array for `diagnostic`), and every `requiredDimensions` entry must be a dimension the rubric actually defines. A rubric cannot declare an axis the scorer does not compute.

## Commands

```bash
# Validate the benchmark definition and coverage
pnpm run test:benchmark

# List cases
pnpm run benchmark:list

# Prepare one case after pnpm run build
node dist/tools/run-benchmark.js --case prod-level-1-tomorrows-receipt

# Score a recorded structured result
node dist/tools/run-benchmark.js --score path/to/result.json
```

## Recording a result

A result must carry the `caseFingerprint` printed by `--case`. Scoring refuses a result whose
fingerprint no longer matches the case definition, prompt and rubric (`STALE RESULT`), and refuses a
result with no fingerprint at all. Use `"caseFingerprint": "AUTO"` only for deliberate local
iteration; it skips the staleness check and says so.

Scoring also reports `expectedRepeats` and `underRepeated`, and warns when fewer repeats were
recorded than the case requires — a single repeat can score `PASS` but is not a baseline.

## Diagnostic ground truth

`owningArtifacts` is the **set** of artifacts a correct routing may name — not an ordered
root-cause-first list. Several cases deliberately list both the authoritative artifact that must not
change and the artifact the correction belongs to (`world_bible` with `beat_sheet`,
`continuity_record` with `narrative_draft`), so routing passes on any of them. Comparisons of
`defectClasses` and `owningArtifacts` are trimmed and case folded.

Diagnostic ground truth must declare a non-empty `owningArtifacts` and `smallestSufficientScope`;
omitting them would invert the routing and scope axes so that refusing to answer scored a pass. Use
`["none"]` when the correct answer is to change nothing.

`smallestSufficientScope` is a list of acceptable phrasings; a recorded `revisionScope` matches if it
equals any of them after trimming and case folding. Use `["none"]` when the correct answer is to
change nothing.

`precision` is scored from `unrelatedFindings` and reported in `axisRates`, but it is deliberately
excluded from strict pass — a reviewer may surface a second genuine defect the fixture did not seed.

## Semantic measurement

The runner does not make Narrative Production Skills depend on a provider API. Generate artifacts with the host agent under test, record an independent structured review, then score it offline.

Use at least three repeats for a baseline.

Do not commit a baseline until real system-under-test outputs exist.

The committed `fixtures/` prove the scoring code only. They are not a quality baseline.

See `docs/04-testing-and-benchmark-spec.md` for the full runbook, rubrics, pass/fail semantics, staleness rules and release policy.
