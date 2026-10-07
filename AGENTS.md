<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Base SaaS Template Rules

This repository is a reusable SaaS starter. Prefer extending the existing
template layer before introducing new component patterns.

## UI Decisions

- Use Next.js App Router, TypeScript, Tailwind CSS v4, and shadcn/ui.
- Use semantic tokens from `src/app/globals.css` for foundational color,
  radius, and typography decisions.
- Do not use raw hex colors in product UI. Add semantic tokens first when a
  new brand or status color is needed.
- Keep shadcn primitives in `src/components/ui` as owned source. Compose
  product-level components outside that folder.
- Use the app shell, form field wrapper, table, state components, and confirm
  dialog hook before creating one-off replacements.
- Every async product view should have designed loading, empty, and error
  states.
- Destructive actions should go through `useConfirmDialog` or
  `AlertDialog`, not a generic dialog.
- No em dashes in anything users can see. Use a comma, a colon, or a
  rewritten sentence. `no-restricted-syntax` in `eslint.config.mjs` rejects
  them in string literals, template literals, and JSX text under `src/`;
  code comments and docs are exempt. Text that arrives at runtime from
  outside the repo (provider errors, API messages) goes through
  `withoutEmDashes` from `src/lib/text.ts` before it is rendered.

## SEO and AEO

- `src/lib/seo/site.ts` is the source of truth for the product name,
  description, canonical origin, social profiles, and the fixed colors used by
  the manifest and generated images. Metadata, robots.txt, sitemap.xml,
  llms.txt, and structured data all read from it. Do not hardcode the brand or
  domain anywhere else.
- Signed-in product pages live in `src/app/(app)/` and are `noindex` by
  default. Do not register them as public routes.
- Every public page (marketing, pricing, docs, legal, sign in) must be
  registered in `publicRoutes` in `src/lib/seo/routes.ts` and export
  `metadata = publicPageMetadata("/path")`. Registration is what lists it in
  sitemap.xml and llms.txt. Bump `lastModified` when its content changes.
- Page titles (the browser tab text) are pipe-delimited, never colon-delimited:
  `<AppName> | <tagline>` for the home page and `<PageName> | <AppName>`
  everywhere else. Pages set only the bare page name (`title: "Settings"`) and
  the root layout's `title.template` adds ` | <AppName>`. `no-restricted-syntax`
  in `eslint.config.mjs` rejects colons in titles set through `metadata`,
  `generateMetadata`, `createMetadata`, and `publicRoutes`.
- Use `createMetadata` from `src/lib/seo/metadata.ts` instead of hand-writing
  `openGraph` or `twitter` objects: Next.js merges them shallowly and a
  hand-written one drops the site name, locale, and social image.
- Never set `alternates.canonical` in a layout. It is inherited by every child
  page and declares them all duplicates.
- Public pages render one `<h1>`, real heading order, semantic landmarks, and
  machine-readable dates (`<time dateTime>`). Their content is server-rendered
  and present in the HTML, not behind client-only fetches or unmounted
  accordions, so crawlers that do not run JavaScript can read it.
- Structured data goes through `<JsonLd>` with the builders in
  `src/lib/seo/json-ld.ts`, and only describes what the page visibly shows.
  Render FAQs with `FaqSection`, which keeps the visible answers and FAQPage
  markup in sync.
- Lead public copy with the direct answer: the first sentence of a page,
  section, or FAQ answer should stand on its own when quoted by an answer
  engine.
- AI crawler access is set in `src/lib/seo/crawlers.ts` and
  `seoConfig.allowAiTraining`. AI search crawlers stay allowed on public pages.

## Template Boundaries

- Supabase is the standard backend and auth target for projects built from this
  template. Stripe is the standard payments provider. Auth screens are UI-only
  until wired to Supabase; billing screens are UI-only until wired to Stripe and
  backed by billing state in the app's Supabase schema.
- Billing ships two providers behind one interface, selected by
  `NEXT_PUBLIC_BILLING_PROVIDER`: a mock that needs no keys, and Stripe.
  Components import `billingAdapter` and the types in `src/lib/billing/types.ts`
  — never a provider SDK. Server-only billing modules start with
  `import "server-only"`.
- The identity and persistence seams (`src/lib/billing/customer.ts` and
  `src/lib/billing/store.ts`) are the two files a new project is expected to
  replace. Keep them small and aligned with Supabase-backed user and billing
  tables.
- Marketing pages are intentionally not included. Add project-specific
  marketing after the app surface is clear.
- Use `/kitchen-sink` to QA token changes in both light and dark mode.
