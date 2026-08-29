# Narrative Production Skills — Extraction Candidates

## 1. Purpose

This register records cross-domain concepts observed during the Stage 10 review.

It is evidence for future extraction, not a roadmap forcing extraction.

Current status:

```text
observe only
```

Narrative Production Skills is still specified rather than independently implemented. No candidate currently satisfies the project-family extraction gate.

---

## 2. Extraction Gate

A candidate may move into Creative Production Skills only after:

1. at least two production domains have independently implemented it;
2. the semantics are substantially equivalent;
3. a stable common contract can be extracted without weakening either domain;
4. extraction removes more duplication than it adds in coupling or indirection.

Design similarity alone is insufficient.

---

## 3. Candidate Review

| Candidate | Video Production Skills | Narrative Production Skills | Stage 10 assessment | Status |
|---|---|---|---|---|
| Draft-set semantics | Persistent draft sets with generation metadata, variants, selection, and model/cost provenance | Persistent candidate sets with selection/composition and lightweight creative lineage | Similar exploration pattern, but Video treats `draft_set` as a first-class artifact and carries provider-generation metadata; Narrative currently treats it primarily as workflow semantics | observe only |
| Lightweight artifact lineage | Video retains parent/variant relationships inside richer production provenance | Narrative uses `parent`, `derivedFrom`, `selectedFrom`, `revisionSource`, and `implements` while deliberately avoiding full execution provenance | A small lineage subset may later converge; the full provenance concepts are not equivalent | observe only |
| Promotion/refinement | Approved visual artifacts are promoted/refined instead of recreated from the brief | Selected/approved narrative decisions are preserved, may be explicitly reopened, and drive targeted revision | Strong conceptual overlap, but Narrative adds decision-status/reopening semantics and neither common contract is proven in two implementations | observe only |
| Selection/approval | Video selects draft candidates and works from approved artifacts | Narrative formalises `candidate → selected → approved` as a separate decision axis | Partial overlap; Video does not currently expose the same independent decision-status contract | observe only |
| Preserve/change refinement | Video rule: preserve approved decisions and change only what needs to change | Narrative makes `preserve` and `change` explicit revision constraints | Strong common principle; contract equivalence still unproven | observe only |
| Staged evaluation | Draft/refine/final evaluation intensity with video-specific criteria | Draft/refine/final evaluation intensity with narrative-specific criteria | Lifecycle pattern looks reusable; domain evaluation semantics remain separate | observe only |
| Customisation-pack contract | Video Production has a vertical customisation-pack design combining format, genre, style, audience and optional voice casting | Narrative defines a vertical pack contract combining medium, genre, style, audience, optional voice casting, pack-aware evaluation and artifact handoffs | Strong design similarity, but neither domain has yet proved a stable shared implementation contract; keep both vertical until real use demonstrates equivalence | observe only |
| Skill-local command decomposition | No stable shared family contract has been established | Narrative decomposes installable skills into local command contracts for component testing and orchestration without exposing commands as separate skills | Potentially useful across production domains, but it must first prove that the same command contract and testing model is useful outside Narrative | observe only |

---

## 4. Explicit Non-Candidates

### Narrative Character Profile vs Video Character Identity

```text
narrative character_profile
≠
video character_sheet / character_manifest
```

Narrative profiles preserve story behaviour such as motivation, beliefs, relationships, and arcs.

Video character artifacts preserve visual identity and reference constraints.

The shared word `character` is not semantic equivalence.

### Narrative Continuity vs Video Continuity

```text
narrative continuity
≠
visual / product / shot continuity
```

Narrative continuity tracks canon, plans, character beliefs, secrets, uncertainty, chronology, and story state.

Video continuity tracks visual and media consistency across generated assets and shots.

### Editorial Report vs Video Evaluation Report

```text
narrative editorial_report
≠
video evaluation_report
```

Both are evaluation outputs, but their evidence, quality criteria, and corrective semantics are domain-native.

A generic report envelope may be reconsidered only after real implementations demonstrate useful equivalence.

### Scene Card vs Storyboard Frame

```text
narrative scene_card
≠
video storyboard_frame
```

A narrative scene card describes story purpose, dramatic state, conflict, turn, and required beats.

A storyboard frame is a visual-production artifact.

### Narrative Draft vs Video Draft Asset

Both use the lifecycle word `draft`, but the underlying artifact semantics remain domain-specific.

---

## 5. Cross-Project Handoff Mapping

Narrative internal artifact names remain canonical.

Existing family handoff vocabulary maps explicitly as follows:

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

These are projections for consumers, not additional first-class Narrative artifacts.

Current known consumers include:

```text
Narrative → Video
Narrative → Comic
Narrative → Video Game Asset Production
Advertising → Narrative
```

Cross-project composition remains artifact-based and does not require shared runtime APIs.

---

## 6. Reassessment Trigger

Revisit a candidate only after:

```text
Narrative implementation exists
        ↓
real workflow exercises the concept
        ↓
second domain implementation is compared
        ↓
semantic equivalence is demonstrated
        ↓
common contract is stable
        ↓
net simplification is clear
```

Do not extract merely to reduce repeated wording between specifications.

---

**Narrative Production Skills — Extraction Candidate Register v3**
