# Pack Contract

A Narrative Production extension pack is a self-contained Agent Skill that specialises the core workflow without replacing it.

Required semantic fields:

```text
pack identity
intended use
medium
genre
operational style
audience when relevant
optional voice casting
hard constraints
defaults
integration with relevant core skills
pack-aware evaluation
revision/preservation behaviour
downstream handoffs where relevant
external requirements
```

A pack may omit files for concerns it does not need, but it may not omit the production semantics needed to understand its behaviour.

Prefer one coherent pack such as `naturalistic-audio-drama` over four low-level skills that users must compose manually. Reconsider modular composition only after real pack implementations demonstrate recurring independent reuse.
