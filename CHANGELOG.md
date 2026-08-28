# Changelog

All notable project changes should be recorded here.

## [Unreleased]

### Added

- Reworked the Testing and Benchmark specification around production correctness, narrative quality, extension-pack fidelity, and pack-authoring quality.
- Added an executable 42-case benchmark definition: 10 diagnostic, 15 progressive production, 12 extension-pack, and 5 pack-authoring cases.
- Added anchored benchmark rubrics, case fingerprints, offline result scoring, benchmark coverage tests, and CI validation.
- Added the Extension Pack Catalogue with 12 cross-medium ready-made pack definitions and showcase generation prompts.
- Added `narrative-pack-create` for authoring and revising self-contained extension packs.
- Added one prompt-led showcase README for every catalogue pack.
- Added the Narrative Production Customisation Packs Specification for reusable medium, genre, style, audience and optional voice-cast production profiles.
- Benchmarked every progressive example rather than one per level, so all fifteen `examples/level-{1..5}-*` showcases are covered and production case ids map one-to-one onto their example directory.
- Added diagnostic, clean-control and precision scorer fixtures, and table-driven coverage that scores every benchmark case.

### Fixed

- Fixed the diagnostic scorer crashing on every diagnostic case: `smallestSufficientScope` is a list of acceptable phrasings, matched after trimming and case folding, not a single string.
- Validated `groundTruth` field by field when parsing a case, so a case file can no longer contradict the declared type without failing.
- Scored the rubric's `precision` axis from `unrelatedFindings` instead of discarding it; it is reported in `axisRates` and stays outside strict pass.
- Routed diagnoses against the first entry of `owningArtifacts`, the root cause, rather than accepting any downstream artifact.
- Removed a hard-gate branch in semantic scoring that could never fire, leaving readiness as the specification defines it.

### Changed

- The runner now loads `benchmarks/manifest.json` for suite ids, case directories, repeat counts and rubric paths instead of re-declaring them, and fails validation when the two disagree.
- Case `hardGates` and `requiredDimensions` are cross-checked against the rubric they name, and the diagnostic rubric may not declare an axis the scorer does not compute.
- Scoring reports `expectedRepeats` and `underRepeated` and warns when a result records fewer repeats than the case requires.
- Scoring requires a `caseFingerprint` on recorded results; `"AUTO"` remains available for deliberate local iteration and warns that staleness was not checked.
- Missing production-suite coverage is now an error rather than a warning, matching the extension-pack suite.

### Added (initial scaffold)

- Initial open-source repository scaffold.
- Five Narrative Production Agent Skills.
- Three canonical specifications, Testing and Benchmark specification, and extraction-candidate register.
- Skill-local references, assets, and eval fixtures.
- Progressive narrative-production examples.
- TypeScript repository validation and installation smoke tooling.
- Project-local, selective, Claude Code, Codex, global, update, lock-tracking, and recovery installation guidance.
- Agent-selectable clean-project smoke-install runner for Stage 13 and external validation.
