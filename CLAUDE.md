@AGENTS.md

# Harness Skills

- Project skills are authored in `skills/` as harness-neutral Agent Skills.
- Claude Code discovers the mirrored copies in `.claude/skills/`.
- When adding or updating a root skill, run `npm run skills:sync-claude`.
- Available project skills include `/launch-audit` and `/security-review`.
