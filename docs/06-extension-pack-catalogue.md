# Narrative Production Skills — Extension Pack Catalogue

## 1. Purpose

This catalogue defines coherent ready-made Narrative Production customisation packs and the showcase example used to prove each pack.

A catalogue entry is not merely a label. Each pack combines a medium, genre, style, audience where relevant, optional voice casting, production constraints, pack-aware evaluation, and downstream handoff behaviour.

Every showcase example includes a **copyable generation prompt**. The prompt is part of the pack definition because a pack that cannot produce a convincing example is not ready to ship.

This catalogue complements `docs/05-customisation-packs-spec.md`. The pack contract remains owned there.

## 2. Catalogue Rules

1. Prefer coherent ready-made packs over one skill per medium, genre, style, or voice dimension.
2. Every pack must demonstrate a materially different production behaviour, not just a renamed aesthetic.
3. Medium constraints may be hard; genre and style guidance are normally soft unless the pack explicitly justifies otherwise.
4. Explicit project instructions and approved creative decisions outrank pack defaults.
5. Voice casting is optional unless spoken performance is intrinsic to the medium. Provider voice IDs must be licensed/configured rather than invented.
6. A pack must remain useful without a proprietary runtime or provider API unless its medium intrinsically requires one downstream.
7. Each pack ships with at least one realistic showcase example and generation prompt.
8. Packs named after an individual creator or built to reproduce one existing work are not accepted as catalogue defaults.

## 3. Initial Catalogue

| Pack | Medium | Genre | Style | Voice |
|---|---|---|---|---|
| `literary-mystery-novella` | novella | mystery / psychological drama | restrained literary prose | none |
| `young-reader-fantasy-adventure` | middle-grade novel | fantasy adventure | clear, energetic, emotionally legible | optional audiobook narrator |
| `contained-psychological-thriller-screenplay` | feature screenplay / short screenplay | psychological thriller | contained naturalistic suspense | optional table-read cast |
| `graphic-noir-investigation` | graphic novel / comic narrative | noir mystery | lean procedural noir | none |
| `intimate-two-hander-stage-drama` | stage play | family drama | intimate naturalism | optional table-read cast |
| `naturalistic-audio-drama` | serialised audio drama | contemporary mystery / drama | restrained naturalism | ensemble cast; optional licensed provider voice IDs |
| `intimate-literary-audiobook` | audiobook / narrated literary fiction | contemporary literary drama | intimate first-person reflection | single narrator; optional licensed provider voice |
| `contained-speculative-feature-film` | feature film narrative package | speculative mystery / drama | contained cinematic realism | optional table-read or downstream cast |
| `episodic-science-fiction-drama` | television / serial narrative | science-fiction drama | grounded speculative realism | optional ensemble cast |
| `workplace-comedy-series` | half-hour television comedy | workplace comedy | dry ensemble naturalism | optional ensemble table-read cast |
| `interactive-detective-game-narrative` | video-game narrative | detective mystery | grounded procedural | optional cast |
| `branching-web-mystery` | interactive web narrative | mystery / digital uncanny | documentary web realism | optional embedded audio roles |

The first implementation should begin with a smaller cross-medium subset, then expand only after the pack-creation workflow and evals prove stable.

## 4. `literary-mystery-novella`

```text
Medium: novella
Genre: mystery / psychological drama
Style: restrained literary prose
Audience: adult
Voices: none
```

### Production focus

- controlled information release
- character-centred causality
- limited cast
- meaningful clues
- interiority without explanatory overstatement
- compact structural escalation

### Showcase — *The Marginalia*

A rare-book conservator catalogues a donation from her estranged mother and discovers handwritten annotations that connect several unrelated books to the disappearance that ended their relationship twenty years earlier.

### Generation prompt

```text
Use Narrative Production Skills with the literary-mystery-novella customisation pack to develop and write **The Marginalia**.

Premise:
A rare-book conservator catalogues a donation from her estranged mother and discovers handwritten annotations that connect several unrelated books to the disappearance that ended their relationship twenty years earlier.

Requirements:
- Medium: novella
- Target length: 18,000–25,000 words
- Genre: mystery / psychological drama
- Style: restrained literary prose
- Audience: adult
- Keep the cast compact and the mystery character-centred
- Let clues acquire new meaning as the protagonist understands her mother differently
- Use interiority, but do not explain emotions the scene can demonstrate
- Do not solve the mystery through information unavailable to the reader

Workflow:
- Develop 3 materially different concept approaches at low resolution
- Select one before expanding the outline
- Create only story-relevant character and world material
- Build a complete causal outline with setup/payoff tracking
- Draft the opening chapter and one later turning-point scene
- Evaluate mystery fairness, character causality, voice and pacing
- Revise only the smallest sufficient scope

What to optimise for:
- clue fairness without obviousness
- emotional consequence attached to every major revelation
- literary restraint
- a resolution that changes both the case and the protagonist's understanding of her mother
```

### Evidence of a successful pack

The produced artifacts should make the pack visible in production behaviour and evaluation, not only in descriptive metadata. The example should demonstrate the listed production focus, preserve explicit project constraints, and avoid taking over responsibilities owned by downstream production domains.

Example folder: [`examples/extension-packs/literary-mystery-novella/`](../examples/extension-packs/literary-mystery-novella/README.md)

## 5. `young-reader-fantasy-adventure`

```text
Medium: middle-grade novel
Genre: fantasy adventure
Style: clear, energetic, emotionally legible
Audience: middle-grade / family
Voices: optional audiobook narrator
```

### Production focus

- accessible vocabulary
- clear stakes
- wonder without uncontrolled lore
- strong motivation
- readable causal progression
- age-appropriate intensity

### Showcase — *The Map That Forgot Home*

A twelve-year-old apprentice mapmaker discovers that places vanish from a magical map when everyone stops remembering why they matter, and her own village is beginning to fade.

### Generation prompt

```text
Use Narrative Production Skills with the young-reader-fantasy-adventure customisation pack to develop **The Map That Forgot Home**.

Premise:
A twelve-year-old apprentice mapmaker discovers that places vanish from a magical map when everyone stops remembering why they matter, and her own village is beginning to fade.

Requirements:
- Medium: middle-grade novel
- Genre: fantasy adventure
- Audience: middle-grade / family
- Style: clear, energetic and emotionally legible
- Protagonist: 12 years old, capable but not implausibly adult
- Keep the magic rule simple enough to explain in one paragraph
- Build wonder from story-relevant places rather than encyclopaedic lore
- Stakes may become serious but avoid graphic violence
- Preserve humour, friendship and agency alongside danger

Workflow:
- Explore 3 possible meanings of the disappearing-map rule
- Select the version with the strongest character consequence
- Define only the world rules the plot actually needs
- Build the protagonist's want, fear, relationship conflict and arc
- Outline the full adventure before drafting chapters
- Draft the opening and the first major discovery
- Evaluate clarity, causality, age fit, wonder and emotional readability

What to optimise for:
- a rule children can understand and anticipate
- active problem solving
- memorable but economical worldbuilding
- emotional stakes that grow naturally from the protagonist's home and relationships
```

### Evidence of a successful pack

The produced artifacts should make the pack visible in production behaviour and evaluation, not only in descriptive metadata. The example should demonstrate the listed production focus, preserve explicit project constraints, and avoid taking over responsibilities owned by downstream production domains.

Example folder: [`examples/extension-packs/young-reader-fantasy-adventure/`](../examples/extension-packs/young-reader-fantasy-adventure/README.md)

## 6. `contained-psychological-thriller-screenplay`

```text
Medium: feature screenplay / short screenplay
Genre: psychological thriller
Style: contained naturalistic suspense
Audience: adult
Voices: optional table-read cast
```

### Production focus

- limited locations
- objective/conflict/turn scenes
- escalating reinterpretation
- playable action
- subtext-heavy dialogue
- minimal explanatory exposition

### Showcase — *The Missing Flat*

A housing officer visits a tenant to resolve a clerical anomaly: according to every council record, the flat does not exist. The tenant produces the original tenancy agreement carrying the officer’s own signature.

### Generation prompt

```text
Use Narrative Production Skills with the contained-psychological-thriller-screenplay customisation pack to develop and write **The Missing Flat**.

Premise:
A housing officer visits a tenant to resolve a clerical anomaly: according to every council record, the flat does not exist. The tenant produces the original tenancy agreement carrying the officer's own signature.

Requirements:
- Medium: contained screenplay
- Genre: psychological thriller
- Style: naturalistic suspense
- Primary location: one flat and its immediate corridor
- Keep the cast small
- Every scene must have an objective, conflict, turn and changed exit state
- Dialogue should carry subtext rather than explanation
- Action lines must remain playable and concise
- Do not use visual-production instructions such as lenses, lighting setups or shot composition

Workflow:
- Develop the story concept and the rule behind the anomaly
- Create character motivations and knowledge state
- Build a complete outline
- Convert the key confrontation into a scene card
- Write the scene in Fountain-compatible screenplay form
- Evaluate suspense, information control, scene mechanics and dialogue
- Perform one targeted revision while preserving the scene's approved turn

What to optimise for:
- escalating reinterpretation
- power shifting through dialogue
- physical evidence that changes the dramatic state
- an ending earned by information already established
```

### Evidence of a successful pack

The produced artifacts should make the pack visible in production behaviour and evaluation, not only in descriptive metadata. The example should demonstrate the listed production focus, preserve explicit project constraints, and avoid taking over responsibilities owned by downstream production domains.

Example folder: [`examples/extension-packs/contained-psychological-thriller-screenplay/`](../examples/extension-packs/contained-psychological-thriller-screenplay/README.md)

## 7. `graphic-noir-investigation`

```text
Medium: graphic novel / comic narrative
Genre: noir mystery
Style: lean procedural noir
Audience: adult / older teen
Voices: none
```

### Production focus

- page-turn revelations
- economical dialogue
- visualisable action without panel direction
- clue state
- character secrets
- clean handoff to Comic Production Skills

### Showcase — *Gallery Seven Blackout*

A museum object disappears during a 97-second camera blackout. A security investigator reconstructs the theft from contradictory witness accounts while discovering that the blackout was authorised from inside the museum.

### Generation prompt

```text
Use Narrative Production Skills with the graphic-noir-investigation customisation pack to develop **Gallery Seven Blackout** as a graphic-novel narrative package.

Premise:
A museum object disappears during a 97-second camera blackout. A security investigator reconstructs the theft from contradictory witness accounts while discovering that the blackout was authorised from inside the museum.

Requirements:
- Medium: graphic novel / comic narrative
- Genre: noir mystery
- Style: lean procedural noir
- Audience: adult / older teen
- Track evidence, claims, beliefs and secrets separately
- Keep dialogue economical enough for sequential art
- Describe narratively important action and environments without prescribing panels, camera angles or drawing style
- Design revelations around page/sequence turns where useful

Workflow:
- Create the mystery solution before drafting the investigation
- Define witness knowledge and deception states
- Build a complete story outline and clue map
- Create scene cards for the opening, midpoint reveal and final confrontation
- Produce a downstream handoff containing story brief, characters, locations, dialogue and story constraints for Comic Production Skills
- Evaluate clue fairness, continuity and handoff completeness

What to optimise for:
- evidence that can be represented visually downstream
- concise dialogue
- clean distinction between narrative intent and panel design
- revelations that reinterpret earlier clues without cheating
```

### Evidence of a successful pack

The produced artifacts should make the pack visible in production behaviour and evaluation, not only in descriptive metadata. The example should demonstrate the listed production focus, preserve explicit project constraints, and avoid taking over responsibilities owned by downstream production domains.

Example folder: [`examples/extension-packs/graphic-noir-investigation/`](../examples/extension-packs/graphic-noir-investigation/README.md)

## 8. `intimate-two-hander-stage-drama`

```text
Medium: stage play
Genre: family drama
Style: intimate naturalism
Audience: adult
Voices: optional table-read cast
```

### Production focus

- two-character pressure
- sustained objective conflict
- stageable action
- subtext
- reveals through dialogue
- minimal location dependence

### Showcase — *After the Applause*

Two estranged siblings clear their late mother’s tiny community theatre before its sale and discover that each has secretly made a different promise about what should happen to it.

### Generation prompt

```text
Use Narrative Production Skills with the intimate-two-hander-stage-drama customisation pack to develop **After the Applause**.

Premise:
Two estranged siblings clear their late mother's tiny community theatre before its sale and discover that each has secretly made a different promise about what should happen to it.

Requirements:
- Medium: one-act stage play
- Genre: family drama
- Style: intimate naturalism
- Cast: two speaking characters
- Location: one stage/backstage space
- Conflict must be sustainable through changing objectives, not repeated argument
- Use stageable actions and objects that carry emotional meaning
- Dialogue should reveal history indirectly
- Avoid cinematic scene changes or visual-production language

Workflow:
- Define what each sibling wants, what each is hiding and what would force a genuine choice
- Outline the dramatic progression as beats and reversals
- Draft the opening 8–10 pages and the central confrontation
- Evaluate subtext, escalation, stageability and emotional causality
- Revise the weakest exchange without flattening the characters into exposition

What to optimise for:
- changing power
- playable silence
- specific shared history
- a final choice that resolves the present conflict without pretending the relationship is fully repaired
```

### Evidence of a successful pack

The produced artifacts should make the pack visible in production behaviour and evaluation, not only in descriptive metadata. The example should demonstrate the listed production focus, preserve explicit project constraints, and avoid taking over responsibilities owned by downstream production domains.

Example folder: [`examples/extension-packs/intimate-two-hander-stage-drama/`](../examples/extension-packs/intimate-two-hander-stage-drama/README.md)

## 9. `naturalistic-audio-drama`

```text
Medium: serialised audio drama
Genre: contemporary mystery / drama
Style: restrained naturalism
Audience: adult
Voices: ensemble cast; optional licensed provider voice IDs
```

### Production focus

- spoken-first scenes
- recognisable character voices
- subtext
- silence and ambience as narrative space
- knowledge state
- persistent casting

### Showcase — *The Quiet Line*

A night helpline operator receives repeated calls from a woman who refuses to reveal her location. The only reliable clues are ordinary sounds in the background and details from calls made weeks apart.

### Generation prompt

```text
Use Narrative Production Skills with the naturalistic-audio-drama customisation pack to develop the pilot of **The Quiet Line**.

Premise:
A night helpline operator receives repeated calls from a woman who refuses to reveal her location. The only reliable clues are ordinary sounds in the background and details from calls made weeks apart.

Requirements:
- Medium: 25–30 minute serialised audio drama pilot
- Genre: contemporary mystery / drama
- Style: restrained naturalism
- Dialogue and sound-relevant action must carry information without visual explanation
- Give recurring characters clearly distinguishable speech patterns without caricature
- Treat silence, interruption and ambient sound as narrative space
- Track exactly what the operator knows after each call
- Do not invent provider voice IDs; use configured licensed voices only when supplied

Workflow:
- Define the series engine and season question
- Develop the pilot's self-contained dramatic problem
- Create voice/performance briefs for recurring roles
- Outline the pilot and write the opening call plus the pilot-ending call
- Produce an audio-production handoff with dialogue, performance direction and sound intentions
- Evaluate audibility of story logic, voice distinction, subtext and continuity

What to optimise for:
- information understandable without images
- natural speech rather than exposition disguised as dialogue
- sound clues that matter causally
- a pilot resolution that opens rather than merely postpones the serial question
```

### Evidence of a successful pack

The produced artifacts should make the pack visible in production behaviour and evaluation, not only in descriptive metadata. The example should demonstrate the listed production focus, preserve explicit project constraints, and avoid taking over responsibilities owned by downstream production domains.

Example folder: [`examples/extension-packs/naturalistic-audio-drama/`](../examples/extension-packs/naturalistic-audio-drama/README.md)

## 10. `intimate-literary-audiobook`

```text
Medium: audiobook / narrated literary fiction
Genre: contemporary literary drama
Style: intimate first-person reflection
Audience: adult
Voices: single narrator; optional licensed provider voice
```

### Production focus

- narrator consistency
- sentence rhythm for listening
- clear temporal transitions
- pronunciation notes
- restraint in performance direction
- faithful text-to-audio handoff

### Showcase — *Salt on the Windowsill*

A woman returns to the coastal boarding house where she grew up to empty her late father’s room and records, for herself, the small memories she had spent years insisting did not matter.

### Generation prompt

```text
Use Narrative Production Skills with the intimate-literary-audiobook customisation pack to develop **Salt on the Windowsill** as a short literary work designed to perform well in audiobook form.

Premise:
A woman returns to the coastal boarding house where she grew up to empty her late father's room and records, for herself, the small memories she had spent years insisting did not matter.

Requirements:
- Medium: short literary fiction with audiobook handoff
- Target text length: 6,000–9,000 words
- Genre: contemporary literary drama
- Voice: first person
- Style: intimate, restrained, rhythmically clear when read aloud
- Avoid ornamental prose that becomes difficult to follow aurally
- Make temporal shifts easy to understand without visual chapter furniture
- Provide pronunciation notes only for genuinely ambiguous names/terms
- If no licensed narrator is configured, provide casting/performance direction rather than inventing a voice ID

Workflow:
- Develop the narrator's present objective and the memory structure
- Outline the complete story
- Draft the opening 1,500–2,000 words
- Read/evaluate for prose quality and listening clarity as separate concerns
- Produce a narrator performance brief and pronunciation list
- Revise only passages whose written or spoken rhythm fails

What to optimise for:
- distinctive but sustainable narrative voice
- emotional accumulation through concrete memory
- sentences that remain intelligible when heard once
- restrained performance guidance that leaves acting choices to the narrator
```

### Evidence of a successful pack

The produced artifacts should make the pack visible in production behaviour and evaluation, not only in descriptive metadata. The example should demonstrate the listed production focus, preserve explicit project constraints, and avoid taking over responsibilities owned by downstream production domains.

Example folder: [`examples/extension-packs/intimate-literary-audiobook/`](../examples/extension-packs/intimate-literary-audiobook/README.md)

## 11. `contained-speculative-feature-film`

```text
Medium: feature film narrative package
Genre: speculative mystery / drama
Style: contained cinematic realism
Audience: adult / older teen
Voices: optional table-read or downstream cast
```

### Production focus

- strong filmable premise
- limited locations
- causal scene progression
- visualisable action without cinematography
- screenplay handoff
- clear boundary to Video Production Skills

### Showcase — *The Last Projection*

Closing an old cinema alone, a projectionist finds an unlabelled reel showing the auditorium exactly ten minutes in the future. Each time she watches again, the footage reflects choices she has made since the previous screening.

### Generation prompt

```text
Use Narrative Production Skills with the contained-speculative-feature-film customisation pack to develop **The Last Projection**.

Premise:
Closing an old cinema alone, a projectionist finds an unlabelled reel showing the auditorium exactly ten minutes in the future. Each time she watches again, the footage reflects choices she has made since the previous screening.

Requirements:
- Medium: contained feature-film narrative package
- Genre: speculative mystery / drama
- Style: cinematic realism with one impossible rule
- Primary location: an old cinema
- Keep the speculative rule stable and testable
- Build escalation through the protagonist's choices, not arbitrary new powers
- Describe filmable action but do not prescribe cinematography, storyboard frames, lenses, lighting setups or editing grammar

Workflow:
- Explore 3 possible rule interpretations and endings
- Select one rule set before detailed plotting
- Develop protagonist, supporting characters and cinema-specific story constraints
- Build a complete screenplay outline and key scene cards
- Draft the opening sequence and final confrontation in screenplay form
- Produce a Narrative → Video handoff package
- Evaluate rule consistency, causality, character motivation and handoff boundary

What to optimise for:
- a rule viewers can infer
- escalation caused by choices
- contained production scope
- enough narrative specificity for downstream production without taking over visual direction
```

### Evidence of a successful pack

The produced artifacts should make the pack visible in production behaviour and evaluation, not only in descriptive metadata. The example should demonstrate the listed production focus, preserve explicit project constraints, and avoid taking over responsibilities owned by downstream production domains.

Example folder: [`examples/extension-packs/contained-speculative-feature-film/`](../examples/extension-packs/contained-speculative-feature-film/README.md)

## 12. `episodic-science-fiction-drama`

```text
Medium: television / serial narrative
Genre: science-fiction drama
Style: grounded speculative realism
Audience: teen / adult
Voices: optional ensemble cast
```

### Production focus

- repeatable episode engine
- serial arc
- stable speculative rules
- evolving knowledge
- planned versus canonical events
- controlled season reveals

### Showcase — *Unclaimed*

Objects begin arriving at a railway lost-property office several days before they are lost. Each episode follows one object toward its future owner while the clerk gradually discovers that some objects belong to events in her own future.

### Generation prompt

```text
Use Narrative Production Skills with the episodic-science-fiction-drama customisation pack to develop **Unclaimed** as an 8-episode first season.

Premise:
Objects begin arriving at a railway lost-property office several days before they are lost. Each episode follows one object toward its future owner while the clerk gradually discovers that some objects belong to events in her own future.

Requirements:
- Medium: television / serial narrative
- Season length: 8 episodes
- Genre: science-fiction drama
- Style: grounded speculative realism
- Every episode needs a self-contained object story and a meaningful serial advancement
- Keep the early-arrival rule stable
- Distinguish planned future events from canonical events already established on the page
- Track protagonist knowledge and recurring-character state across episodes

Workflow:
- Define the repeatable episode engine
- Define season question, midpoint change and finale revelation
- Create concise recurring-character and rule references
- Outline all 8 episodes at low resolution
- Fully break the pilot and one late-season episode
- Evaluate engine repeatability, escalation, continuity and reveal discipline

What to optimise for:
- episodes that are satisfying independently
- a serial mystery that genuinely progresses
- state changes that persist
- future possibilities that are not accidentally treated as established canon
```

### Evidence of a successful pack

The produced artifacts should make the pack visible in production behaviour and evaluation, not only in descriptive metadata. The example should demonstrate the listed production focus, preserve explicit project constraints, and avoid taking over responsibilities owned by downstream production domains.

Example folder: [`examples/extension-packs/episodic-science-fiction-drama/`](../examples/extension-packs/episodic-science-fiction-drama/README.md)

## 13. `workplace-comedy-series`

```text
Medium: half-hour television comedy
Genre: workplace comedy
Style: dry ensemble naturalism
Audience: general adult
Voices: optional ensemble table-read cast
```

### Production focus

- repeatable workplace engine
- ensemble wants
- comic escalation
- character-specific dialogue
- A/B story interaction
- continuity without serial heaviness

### Showcase — *The Escalations Team*

A tiny municipal complaints unit receives only cases that every other department has refused to own. A new manager tries to impose efficiency on a team whose survival depends on knowing exactly how the bureaucracy fails.

### Generation prompt

```text
Use Narrative Production Skills with the workplace-comedy-series customisation pack to develop the pilot of **The Escalations Team**.

Premise:
A tiny municipal complaints unit receives only cases that every other department has refused to own. A new manager tries to impose efficiency on a team whose survival depends on knowing exactly how the bureaucracy fails.

Requirements:
- Medium: half-hour television comedy
- Genre: workplace comedy
- Style: dry ensemble naturalism
- Create a repeatable case-of-the-week engine
- Give each regular a distinct comic objective and conversational rhythm
- Build A and B stories that collide rather than simply run in parallel
- Keep jokes rooted in character, procedure and consequence
- Avoid turning every character into the same sarcastic voice

Workflow:
- Define the workplace engine and five recurring roles
- Generate 6 episode-case ideas and select the strongest pilot case
- Outline the pilot by story beats
- Draft the cold open and one ensemble scene
- Evaluate joke causality, character distinction, escalation and episode repeatability

What to optimise for:
- comic problems that arise from the job
- characters whose incentives collide naturally
- dialogue that remains recognisable without speaker labels
- a pilot ending that demonstrates the weekly engine
```

### Evidence of a successful pack

The produced artifacts should make the pack visible in production behaviour and evaluation, not only in descriptive metadata. The example should demonstrate the listed production focus, preserve explicit project constraints, and avoid taking over responsibilities owned by downstream production domains.

Example folder: [`examples/extension-packs/workplace-comedy-series/`](../examples/extension-packs/workplace-comedy-series/README.md)

## 14. `interactive-detective-game-narrative`

```text
Medium: video-game narrative
Genre: detective mystery
Style: grounded procedural
Audience: teen / adult
Voices: optional cast
```

### Production focus

- player agency
- clue state
- branch consequences
- character knowledge
- evidence versus belief
- multiple valid investigation paths
- reconvergence without invalidation

### Showcase — *The Red Ledger*

A junior fraud investigator is handed a ledger recovered from a closed company and must determine which of four former employees diverted money before a witness disappears. Players choose which records to inspect and whom to confront first.

### Generation prompt

```text
Use Narrative Production Skills with the interactive-detective-game-narrative customisation pack to develop **The Red Ledger**.

Premise:
A junior fraud investigator is handed a ledger recovered from a closed company and must determine which of four former employees diverted money before a witness disappears. Players choose which records to inspect and whom to confront first.

Requirements:
- Medium: narrative detective game
- Genre: grounded procedural mystery
- Audience: teen / adult
- Player must have multiple valid investigation paths
- Track evidence discovered, character knowledge, player-facing hypotheses and branch consequences separately
- No required single clue order unless causally necessary
- Reconvergence may simplify production but must not erase meaningful prior choices
- The mystery solution must be fixed before branch design

Workflow:
- Define the true event sequence and solution
- Build evidence and character knowledge states
- Design the investigation loop
- Create at least 3 viable investigation routes to the midpoint
- Define consequences for confronting suspects with weak, partial or strong evidence
- Produce dialogue/state handoff material without implementing game code or UI
- Evaluate solvability, agency, state consistency and branch integrity

What to optimise for:
- choices that change information or relationships
- fair deductions
- no branch that requires the player to know unseen information
- reconvergence that preserves consequences
```

### Evidence of a successful pack

The produced artifacts should make the pack visible in production behaviour and evaluation, not only in descriptive metadata. The example should demonstrate the listed production focus, preserve explicit project constraints, and avoid taking over responsibilities owned by downstream production domains.

Example folder: [`examples/extension-packs/interactive-detective-game-narrative/`](../examples/extension-packs/interactive-detective-game-narrative/README.md)

## 15. `branching-web-mystery`

```text
Medium: interactive web narrative
Genre: mystery / digital uncanny
Style: documentary web realism
Audience: teen / adult
Voices: optional embedded audio roles
```

### Production focus

- navigation as narrative choice
- page/state dependencies
- document authenticity
- branch readability
- progressive revelation
- clean handoff to web implementation

### Showcase — *The Vanishing Page*

A local-history website contains a set of archived pages about a demolished neighbourhood. Each page disappears permanently after it is read, forcing the reader to decide which links to follow before the evidence closes behind them.

### Generation prompt

```text
Use Narrative Production Skills with the branching-web-mystery customisation pack to develop **The Vanishing Page**.

Premise:
A local-history website contains a set of archived pages about a demolished neighbourhood. Each page disappears permanently after it is read, forcing the reader to decide which links to follow before the evidence closes behind them.

Requirements:
- Medium: interactive web narrative
- Genre: mystery / digital uncanny
- Style: documentary web realism
- Navigation choices must change what information remains available
- Design documents/pages as narrative artifacts, not as generic exposition dumps
- At least three reading paths should produce meaningfully different interpretations before reconvergence
- Keep implementation concerns such as framework, CSS and component code out of Narrative Production Skills
- Produce a clean content/state handoff for downstream web implementation

Workflow:
- Define the underlying truth first
- Map the information graph and irreversible navigation choices
- Create the major page/document types and their narrative purposes
- Draft 3 representative pages and the link choices between them
- Define branch state and what can become unavailable
- Evaluate information fairness, branch readability and handoff completeness

What to optimise for:
- navigation that is itself a story decision
- credible document voices
- different paths revealing different but compatible truths
- no path accidentally exposing information it has not earned
```

### Evidence of a successful pack

The produced artifacts should make the pack visible in production behaviour and evaluation, not only in descriptive metadata. The example should demonstrate the listed production focus, preserve explicit project constraints, and avoid taking over responsibilities owned by downstream production domains.

Example folder: [`examples/extension-packs/branching-web-mystery/`](../examples/extension-packs/branching-web-mystery/README.md)

## 16. Pack Creation Skill

`narrative-pack-create` is the authoring skill for creating or revising Narrative Production customisation packs.

It creates a pack from a production need rather than starting from a proposed file tree.

```text
production need
→ pack:inspect
→ pack:create
→ pack:example
→ pack:evals
→ pack:validate
```

Command responsibilities:

```text
pack:inspect
→ inspect the catalogue and decide reuse, refine, or create

pack:create
→ define medium, genre, operational style, audience/voice where relevant, precedence, boundaries and pack-aware evaluation

pack:example
→ create a capability-led showcase README containing the exact generation prompt

pack:evals
→ create behavioural cases that make the pack falsifiable

pack:validate
→ verify self-contained packaging, completeness, safety, example/eval presence and catalogue readiness
```

The commands are internal to the installable `narrative-pack-create` skill. They are not separately installable pack-authoring skills.

The skill must not automatically split a coherent pack into separate medium/genre/style/voice skills. That modular architecture remains deferred until real usage proves it reduces complexity.

## 17. Required Pack Output

Minimum useful output:

```text
skills/<pack-name>/
├── SKILL.md
├── references/
│   └── production-profile.md
└── evals/
    └── evals.json

examples/extension-packs/<pack-name>/
└── README.md   # includes exact generation prompt
```

Add `voice-casting.md`, pronunciation assets, handoff references, or other files only when the pack genuinely needs them.

## 18. Catalogue Acceptance Criteria

```text
✓ every catalogue entry is a coherent ready-made pack
✓ each entry defines medium, genre and operational style
✓ audience is defined where it materially changes production
✓ optional voice casting is explicit and licensable
✓ each pack changes real production behaviour
✓ each pack defines pack-aware evaluation
✓ each pack respects Narrative Production project boundaries
✓ each pack has a showcase example
✓ every showcase README contains the exact generation prompt
✓ narrative-pack-create can reproduce the required package structure
✓ its five command contracts can be tested independently
✓ its orchestration can skip already-completed authoring stages
✓ behavioural evals exist before a pack is considered implemented
```

---

**Narrative Production Skills — Extension Pack Catalogue**  
**Version 2 — 26 August 2026**
