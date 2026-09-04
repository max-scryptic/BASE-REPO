---
name: launch-audit
description: Pre-launch readiness audit for a Next.js App Router SaaS template or product. Use when asked to prepare a repo for production, verify launch readiness, review deploy blockers, inspect template completeness, or audit SaaS surfaces such as auth, billing, env vars, metadata, legal pages, async states, observability, and deployment configuration.
---

# Launch Audit

## Purpose

Use this skill to produce a practical launch-readiness review for a SaaS repo. Prioritize concrete blockers, missed production wiring, and template seams that must be replaced before real users arrive.

## Workflow

1. Read the repo instructions first, especially `AGENTS.md`, `README.md`, `package.json`, framework config, env examples, and any deployment docs.
2. Inspect app routes, API routes, provider seams, and shared components before making claims.
3. Run available static checks when practical: lint, typecheck, build, and focused tests. If a check is missing, report it as a gap rather than inventing results.
4. Review user-facing flows in both happy and unhappy states. For frontend apps, verify loading, empty, error, disabled, destructive, and responsive states where possible.
5. Report findings in severity order. Prefer actionable file references and exact remediation over broad advice.

## Audit Areas

### Product Completeness

- Confirm the primary app routes exist and are reachable.
- Check that placeholder names, sample data, mocked identities, and template copy have either been intentionally kept or replaced.
- Verify every async product view has designed loading, empty, and error states.
- Confirm destructive actions use the repo's confirmation pattern.
- Check navigation, breadcrumbs, not-found, error, and global loading surfaces.

### Configuration

- Compare `.env.example`, runtime env reads, provider docs, and deployment expectations.
- Flag missing required production variables, misleading defaults, localhost callback URLs, and public env vars that should be server-only.
- Check metadata, app name, favicon, robots/sitemap expectations, and canonical production URL.
- Verify the deployment target has a documented build command and runtime assumptions.

### Auth And Access

- Identify whether auth is mocked, UI-only, or production-wired.
- Confirm protected routes and API routes enforce authentication and authorization.
- Check redirect URLs, password reset/update flows, session handling, and account states.
- Flag any launch path that relies on template users or static identities.

### Billing And Payments

- Confirm the selected billing provider and fallback behavior.
- Check checkout, portal, subscription updates, webhook signature verification, event handling, and customer mapping.
- Verify pricing configuration, plan ids, env var names, contact-sales plans, success/cancel URLs, and local-vs-production URLs.
- Flag in-memory stores, mock providers, test keys, and missing webhook registration as launch blockers.

### Data And Persistence

- Identify temporary stores, seed data, hardcoded records, or client-owned mutations.
- Check database schema, migrations, row-level security, tenant scoping, backups, and data retention notes when present.
- Flag any path where browser code can write authoritative billing, role, or account state.

### Operations

- Check logging, error boundaries, monitoring, analytics, health checks, rate limits, and incident-relevant diagnostics.
- Confirm CI runs the same critical checks expected before deploy.
- Note missing smoke tests for signup/signin, core app flow, billing, and settings.

### Legal And Support

- Check privacy policy, terms, billing language, refund/cancellation expectations, support contact, and transactional email readiness.
- Flag placeholder legal text as a business decision, not a code bug, unless the repo claims it is final.

## Output Format

Start with one of:

- `Launch ready`
- `Launch ready with caveats`
- `Not launch ready`

Then provide:

1. **Blockers**: issues that should stop production launch.
2. **High Priority**: issues that materially increase launch risk.
3. **Polish / Follow-up**: non-blocking improvements.
4. **Checks Run**: commands or inspections performed, with failures called out.
5. **Assumptions**: anything inferred from missing provider, deployment, or product context.

Use file and line references when the evidence is local. Keep advice specific to the repo's existing conventions.
