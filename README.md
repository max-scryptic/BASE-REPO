# Base SaaS Template

A reusable foundation for future SaaS projects built with Next.js App Router,
Tailwind CSS v4, TypeScript, and shadcn/ui.

The template intentionally focuses on product UI and conventions rather than a
marketing site. Supabase is the standard backend and auth target for projects
built from this repo, and Stripe is the standard payments provider. Auth and
billing screens stay UI-only until each app wires its Supabase project, schema,
and Stripe configuration.

## Included

- Semantic light/dark design tokens in `src/app/globals.css`
- shadcn/ui primitives in `src/components/ui`
- Responsive app shell with sidebar, topbar, breadcrumbs, search, and user menu
- Auth screens for sign in, sign up, forgot password, reset password, change
  password, verify
- Settings layout with user, billing, payments & invoices, and appearance tabs,
  covering usage meters, invoices, and payment method UI
- `/plans` route with selectable plan cards, upgrade/downgrade summary, and a
  confirmed save flow through a swappable billing adapter
- Stripe integration behind an environment flag: Checkout, subscription
  updates, the customer portal, and a signature-verified webhook
- TanStack-powered `DataTable` with sorting, filtering, pagination, selection,
  column visibility, and row actions
- `TemplateFormField` wrapper for react-hook-form + zod validation
- Empty, loading, and error state components
- Promise-based destructive confirmation hook
- `/kitchen-sink` route for visual QA
- SEO and AEO foundation: canonical metadata, Open Graph and X cards, a
  generated social image and app icons, web manifest, robots.txt with an AI
  crawler policy, sitemap.xml, llms.txt, JSON-LD structured data, and
  automatic `noindex` for product pages and preview deployments
- Repo-local Codex skills for launch audits and security reviews

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

No environment file is needed to start: auth and billing fall back to mocks.
Copy `.env.example` to `.env.local` when wiring Supabase and Stripe.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Useful routes:

- `/` dashboard
- `/plans`
- `/settings`
- `/auth/sign-in`
- `/auth/sign-up`
- `/auth/forgot-password`
- `/auth/reset-password`
- `/auth/change-password`
- `/auth/verify`
- `/kitchen-sink`
- `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/manifest.webmanifest`,
  `/opengraph-image`

## Design QA

Impeccable is installed repo-locally as a dev dependency, with project-scoped
Codex skills and hooks in `.agents` and `.codex`, plus Claude Code skills and
hooks in `.claude`. After opening the project in Codex or Claude Code, run
`/impeccable init` once to capture durable product context in `PRODUCT.md`. Run
the deterministic UI scan with:

```bash
npm run impeccable
```

To refresh the local Impeccable skills later, run:

```bash
npx impeccable update
```

## Codex Skills

Reusable agent skills live in `skills/` so future projects can carry the
template's operating standards with the codebase. Treat `skills/` as the
canonical source. For Claude Code, mirror them into `.claude/skills/` with:

```bash
npm run skills:sync-claude
```

- `launch-audit` reviews production readiness across configuration, auth,
  billing, persistence, user-facing states, operations, legal, and deployment
  assumptions.
- `security-review` audits auth, authorization, secrets, tenant isolation,
  input validation, webhooks, data exposure, and platform hardening.

## SEO and AEO

Search engine optimization (SEO) and answer engine optimization (AEO: being
read, understood, and cited by ChatGPT, Claude, Perplexity, Google AI
Overviews, and similar) share one foundation here. Everything reads from
`src/lib/seo/`, so a new project changes a config file rather than rewiring
routes.

### Layout

| Path | Role |
| --- | --- |
| `src/lib/seo/site.ts` | Brand name, tagline, description, language, social profiles, fixed colors, AI training opt-out. |
| `src/lib/seo/deployment.ts` | Canonical origin and whether this deployment may be indexed, from env vars. |
| `src/lib/seo/routes.ts` | The public route registry, plus robots.txt `Disallow` prefixes. |
| `src/lib/seo/metadata.ts` | `createMetadata`, `publicPageMetadata`, `robotsFor`. |
| `src/lib/seo/json-ld.ts` | Organization, WebSite, SoftwareApplication, WebPage, BreadcrumbList, FAQPage builders. |
| `src/lib/seo/crawlers.ts` | AI search and AI training crawler user agents. |
| `src/components/seo/` | `<JsonLd>`, `<FaqSection>`, and the brand mark used by generated images. |
| `src/app/robots.ts`, `sitemap.ts`, `manifest.ts`, `llms.txt/` | Generated crawler files. |
| `src/app/opengraph-image.tsx`, `icon.tsx`, `apple-icon.tsx` | Generated social preview and app icons. |
| `src/app/(app)/` | Signed-in product routes, `noindex` by default. |

### What is baked in

- **Metadata.** `metadataBase`, a title template, description, keywords,
  Open Graph and X cards with a 1200x630 generated image, `theme-color` for
  light and dark, web manifest, PNG and Apple touch icons, and search console
  verification tags from env vars.
- **Canonical URLs.** Every public page gets a self-referencing canonical
  built from `NEXT_PUBLIC_APP_URL`. The root layout deliberately sets none.
- **Index control.** Product pages in `(app)` and account recovery screens
  send `noindex, follow`. Preview deployments send `noindex` in every page,
  an `X-Robots-Tag` header on every response, and a robots.txt that disallows
  everything, so only production competes in search. API responses always
  carry `X-Robots-Tag: noindex`.
- **Crawl files.** robots.txt, sitemap.xml, and llms.txt are generated from
  the public route registry, so a page is listed in all three or none.
- **AI crawlers.** AI search crawlers (OAI-SearchBot, ChatGPT-User,
  Claude-SearchBot, PerplexityBot, and others) are named and allowed on public
  pages. AI training crawlers (GPTBot, ClaudeBot, Google-Extended, and others)
  are allowed by default; set `seoConfig.allowAiTraining` to `false` to opt out
  without leaving AI answers. Both groups, plus Next.js' default list, receive
  blocking `<head>` metadata through `htmlLimitedBots` instead of streamed tags.
- **Structured data.** Organization and WebSite JSON-LD on every page, linked
  by `@id`. WebPage with `dateModified` and breadcrumbs on legal pages.
  `softwareApplicationJsonLd()` turns `plans` into Offers for a future landing
  or pricing page, and `<FaqSection>` renders visible Q&A with matching
  FAQPage markup.
- **Semantics.** One `<h1>` per page, `<html lang>`, and machine-readable
  `<time dateTime>` on dated content.

### Adding a public page

1. Create the route outside `src/app/(app)/`.
2. Register it in `publicRoutes` in `src/lib/seo/routes.ts` with a title, a
   description that answers "what is on this page?", a section, and
   `lastModified`.
3. `export const metadata = publicPageMetadata("/your-path");`
4. Add structured data that matches the visible content, for example
   `<JsonLd data={webPageJsonLd("/your-path")} />`, or
   `softwareApplicationJsonLd()` on the landing or pricing page.
5. Optionally add an `opengraph-image.tsx` in the segment for its own preview.

For dynamic pages (blog posts, docs), call `createMetadata` from
`generateMetadata` and extend `sitemap.ts` with the dynamic entries.

### Before launch

- Set `NEXT_PUBLIC_APP_URL` to the production origin in every environment, so
  previews also point canonicals at the real domain.
- Fill in `siteConfig`: tagline, description, keywords, `organization.sameAs`,
  `organization.email`, and `twitterHandle`.
- Set `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION`, then submit
  `/sitemap.xml` in Google Search Console and Bing Webmaster Tools. Bing's
  index powers Copilot and is a source for other AI search engines.
- Check `/robots.txt` on production allows crawling and on a preview
  disallows it.
- Validate public pages with the [Rich Results Test](https://search.google.com/test/rich-results)
  and the [Schema Markup Validator](https://validator.schema.org/), and check
  link previews with each network's card validator.
- If you self-host a staging environment, set `SITE_INDEXING=off` there.

## Auth Adapter

Auth screens submit through `src/lib/auth/auth-adapter.ts`. The adapter is
mocked for now so the template can show complete loading, validation, success,
and error states without requiring a Supabase project during template work.

The methods are intentionally shaped around Supabase Auth:

```ts
supabase.auth.signInWithPassword({ email, password })
supabase.auth.signUp({ email, password, options: { emailRedirectTo } })
supabase.auth.resetPasswordForEmail(email, { redirectTo })
supabase.auth.updateUser({ password })
supabase.auth.updateUser({ password, current_password })
```

When wiring a project, install pinned versions of `@supabase/supabase-js` and
`@supabase/ssr`, keep the service-role key out of browser code, configure the
dashboard redirect URLs for `/auth/reset-password`, and move mutations into
server actions or framework-native Supabase clients.

## Billing

Billing has two implementations behind one interface. Which one runs is decided
by `NEXT_PUBLIC_BILLING_PROVIDER`, so a project turns real billing on by adding
environment variables rather than by rewriting UI.

- `mock` (default) — no keys, no network. `/plans` and `/settings` show their
  full loading, success, and error states out of the box.
- `stripe` — Checkout, in-place subscription updates, the customer portal, and a
  signature-verified webhook.

### Layout

| Path | Role |
| --- | --- |
| `src/lib/billing/types.ts` | Adapter contracts. The only billing types the UI sees. |
| `src/lib/billing/config.ts` | Client-safe config: which provider, which routes, which return paths. |
| `src/lib/billing/billing-adapter.ts` | Picks the provider. What components import. |
| `src/lib/billing/providers/` | `mock-provider.ts` and `stripe-provider.ts`. |
| `src/lib/billing/server.ts` | `getSubscription()` for server components. |
| `src/lib/billing/customer.ts` | The auth ↔ billing seam. Wire Supabase identity here. |
| `src/lib/billing/store.ts` | The persistence seam. Replace the in-memory default. |
| `src/lib/billing/stripe/` | Server-only Stripe code: env, client, service, mapping. |
| `src/app/api/billing/` | `checkout`, `portal`, and `webhook` route handlers. |

Nothing under `src/lib/billing/stripe/` or `store.ts`/`customer.ts` can be
imported from a client component: they start with `import "server-only"`, which
turns that mistake into a build error rather than a leaked secret key.

### Turning Stripe on

1. Create the products and **recurring** prices in the Stripe dashboard, one per
   self-serve plan in `plans` in `src/lib/template-data.ts`.
2. `cp .env.example .env.local` and fill in `STRIPE_SECRET_KEY`, the
   `STRIPE_PRICE_*` ids, and `NEXT_PUBLIC_APP_URL`.
3. Set `NEXT_PUBLIC_BILLING_PROVIDER=stripe`.
4. Forward webhooks locally and copy the printed signing secret into
   `STRIPE_WEBHOOK_SECRET`:

   ```bash
   stripe listen --forward-to localhost:3000/api/billing/webhook
   ```

5. In production, create the endpoint in the dashboard pointing at
   `https://your-domain/api/billing/webhook` and subscribe it to
   `checkout.session.completed`, `customer.subscription.created`,
   `customer.subscription.updated`, `customer.subscription.deleted`, and
   `invoice.payment_failed`.

Test cards live at [docs.stripe.com/testing](https://docs.stripe.com/testing);
`4242 4242 4242 4242` with any future expiry completes a checkout.

### How a plan change flows

A customer with no subscription goes to hosted Checkout. A customer who already
subscribes has their existing subscription item swapped in place, so an upgrade
never bounces them through a second checkout. Both directions settle on the next
invoice — an upgrade adds a charge for the remainder of the period, a downgrade
adds a credit. To hold a downgrade until the period boundary instead, replace the
`proration_behavior` call in `src/lib/billing/stripe/service.ts` with a
[subscription schedule](https://docs.stripe.com/billing/subscriptions/subscription-schedules).

The browser never learns which path it took: the route returns either a URL to
redirect to or an `applied` result, and `BillingResult.outcome` tells the UI
whether the plan really changed.

### The two seams to wire

**Identity.** `resolveBillingIdentity()` in `src/lib/billing/customer.ts` returns
the template user. Point it at the signed-in Supabase user:

```ts
const supabase = await createServerClient();
const { data } = await supabase.auth.getUser();
if (!data.user) throw new UnauthenticatedBillingError();
return { userId: data.user.id, email: data.user.email!, name: data.user.user_metadata.name };
```

**Persistence.** `billingStore` in `src/lib/billing/store.ts` is an in-memory map.
It is enough to click through the whole flow locally, but it resets on restart
and is not shared between serverless instances. Stripe stays the source of truth
either way — a cold store falls back to looking the customer up in Stripe — but
that costs an API call on every render, so give it a real table before launch:

```sql
create table billing_customers (
  user_id uuid primary key references auth.users on delete cascade,
  stripe_customer_id text unique not null,
  created_at timestamptz not null default now()
);

create table billing_subscriptions (
  user_id uuid primary key references auth.users on delete cascade,
  stripe_customer_id text not null,
  stripe_subscription_id text unique not null,
  plan_id text not null,
  status text not null,
  cancel_at_period_end boolean not null default false,
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);

alter table billing_customers enable row level security;
alter table billing_subscriptions enable row level security;

create policy "own subscription" on billing_subscriptions
  for select using (auth.uid() = user_id);
```

Then implement `BillingStore` against those tables. Write with the service-role
key from the webhook — it runs without a user session — and keep row-level
security on so the browser can only read its own row. Never let the client write
these tables; the webhook is the only writer.

### Adding a plan

1. Add it to `plans` in `src/lib/template-data.ts`.
2. Add its price env var to `priceEnvNames` in `src/lib/billing/stripe/env.ts`
   and to `.env.example`.
3. Create the price in Stripe and set the variable.

Sales-led plans (`contactSales: true`) need no price: the checkout route rejects
them, and `requestSalesContact` is where the CRM or scheduling handoff goes.

### Before launch

- Replace the in-memory store and the template identity.
- Confirm the webhook endpoint is registered in live mode with its own signing
  secret — test and live secrets differ.
- Set `NEXT_PUBLIC_APP_URL` to the deployed origin, or Checkout will send
  customers back to `localhost`.
- Decide what an unpaid account loses. `invoice.payment_failed` in the webhook is
  where dunning starts.

## Template Rules

- Treat `src/components/ui` as vendored shadcn source.
- Put reusable product compositions in `src/components`.
- Use semantic tokens instead of hardcoded palette classes for app surfaces.
- Keep every async view covered by loading, empty, and error states.
- Use `AlertDialog` or `useConfirmDialog` for destructive actions.
- Treat Supabase as the default backend/auth target and Stripe as the default
  payments provider; keep billing behind an adapter so app-specific schema and
  webhook details stay contained.
- Keep components on the billing adapter types; never import the Stripe SDK
  outside `src/lib/billing/stripe/`.
- Mark every server-only billing module with `import "server-only"`.

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Rebranding

For a new SaaS project, start by changing:

- `siteConfig` in `src/lib/seo/site.ts`, which feeds metadata, the social
  image, the manifest, llms.txt, and structured data
- Brand name in `appConfig` and sample data in `src/lib/template-data.ts`
- Brand logo in `src/components/app-branding.tsx`
- Semantic tokens in `src/app/globals.css`
