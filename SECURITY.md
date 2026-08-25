# Security Policy

## Scope

Security reports may concern repository tooling, dependency handling, unsafe subprocess execution, generated installation commands, or other behaviour that could put consuming projects at risk.

Do not use public issues for vulnerabilities that would create immediate risk for users.

## Reporting

Use GitHub private vulnerability reporting when enabled. If it is not available, contact the maintainers privately through the repository owner once the public repository exists.

## Supported versions

Until the first release, only the current `main` branch is supported.

## Design constraints

Repository tooling must use argument-array subprocess invocation and must not construct shell commands from untrusted input. Narrative skill content must not require hidden credentials or direct model-provider API keys.
