---
name: security-review
description: Security review for Next.js App Router SaaS applications and reusable templates. Use when asked to audit a repo for security, auth, authorization, secrets, webhook safety, tenant isolation, data exposure, dependency risk, route-handler safety, payment security, or production hardening before launch.
---

# Security Review

## Purpose

Use this skill to perform a security-focused code review. Prioritize exploitable behavior, secret exposure, authorization gaps, tenant isolation failures, unsafe server/client boundaries, and production hardening issues.

## Review Posture

- Treat mocked auth, in-memory persistence, fixture users, and template seams as acceptable only when the repo clearly labels them as non-production.
- Do not assume UI checks protect server behavior. Verify route handlers, server actions, database policies, and provider callbacks directly.
- Prefer evidence from code over broad checklists. Report exact files, line references, affected flows, and likely impact.
- Avoid claiming a vulnerability when the evidence only supports a hardening suggestion. Separate confirmed findings from residual risk.

## Workflow

1. Read repo guidance, `README.md`, `package.json`, env examples, framework config, auth code, billing code, API routes, middleware, and data access modules.
2. Map trust boundaries: browser, server components, route handlers, webhooks, provider SDKs, database, external APIs, and background jobs.
3. Search for secrets and sensitive identifiers using targeted patterns: `SECRET`, `TOKEN`, `KEY`, `PASSWORD`, `PRIVATE`, `NEXT_PUBLIC`, `process.env`, `apiKey`, `bearer`, and provider-specific names.
4. Inspect every mutation path for authentication, authorization, input validation, CSRF/replay concerns, idempotency, and auditability.
5. Run available checks when practical: lint, typecheck, tests, build, and dependency audit. If dependency audit needs network or is not available, state that clearly.
6. Report findings first, ordered by severity, with remediation.

## Checklist

### Auth And Authorization

- Confirm protected pages, layouts, API routes, route handlers, and server actions require a real user session.
- Check role, workspace, organization, and tenant scoping before reads and writes.
- Verify auth callbacks, reset-password redirects, invitation links, and post-login redirects reject unsafe external destinations.
- Flag use of static users, client-trusted user ids, or user-controlled billing/customer ids in server mutations.

### Secrets And Environment

- Ensure server secrets are only read in server-only modules.
- Flag sensitive values exposed through `NEXT_PUBLIC_*`, committed env files, logs, browser bundles, or error messages.
- Check `.env.example` documents required production values without including real secrets.
- Confirm provider SDK clients that use secret keys cannot be imported by client components.

### Input And Output Safety

- Verify route handlers parse and validate body, params, query strings, headers, and webhook payloads.
- Check file uploads, rich text, markdown, HTML rendering, redirects, and links for injection or unsafe rendering.
- Confirm user-facing errors do not leak stack traces, secret values, SQL details, or provider internals.
- Look for unsafe `dangerouslySetInnerHTML`, dynamic eval, command execution, path traversal, SSRF, and open redirects.

### Billing And Webhooks

- Verify webhooks use raw bodies and provider signature verification.
- Check event idempotency, duplicate event handling, subscription ownership, customer mapping, and status downgrades.
- Ensure billing state is written by trusted server/webhook paths, not browser-controlled requests.
- Confirm test keys, mock providers, in-memory stores, and localhost URLs cannot accidentally ship as production behavior.

### Data Protection

- Check database row-level security, tenant filters, service-role usage, and least-privilege client access.
- Verify logs, analytics, telemetry, and error reporting avoid passwords, tokens, payment data, and unnecessary PII.
- Review retention/deletion behavior for accounts, invoices, customer records, and uploaded files where relevant.

### Platform Hardening

- Check security headers, cookies, CSP expectations, image/domain allowlists, CORS, rate limits, and middleware.
- Review dependency risk and whether lockfiles are present.
- Confirm CI includes security-relevant checks and production build verification.

## Output Format

Use a code-review style:

1. **Findings** first, ordered by severity. Include file/line evidence, impact, and remediation.
2. **Open Questions / Assumptions** for unknown deployment, provider, or data-policy context.
3. **Checks Run** with exact commands and whether they passed.
4. **Residual Risk** only when useful.

If no confirmed issues are found, say so clearly and list the remaining coverage gaps.
