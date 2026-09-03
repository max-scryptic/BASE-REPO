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
- Settings layout with profile, team, billing, and API key sections
- Billing page with pricing cards, usage meters, invoices, and payment method UI
- TanStack-powered `DataTable` with sorting, filtering, pagination, selection,
  column visibility, and row actions
- `TemplateFormField` wrapper for react-hook-form + zod validation
- Empty, loading, and error state components
- Promise-based destructive confirmation hook
- `/kitchen-sink` route for visual QA

## Getting Started

Install dependencies and run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Useful routes:

- `/` dashboard
- `/settings`
- `/billing`
- `/auth/sign-in`
- `/auth/sign-up`
- `/auth/forgot-password`
- `/auth/reset-password`
- `/auth/change-password`
- `/auth/verify`
- `/kitchen-sink`

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

## Template Rules

- Treat `src/components/ui` as vendored shadcn source.
- Put reusable product compositions in `src/components`.
- Use semantic tokens instead of hardcoded palette classes for app surfaces.
- Keep every async view covered by loading, empty, and error states.
- Use `AlertDialog` or `useConfirmDialog` for destructive actions.
- Treat Supabase as the default backend/auth target and Stripe as the default
  payments provider; keep billing behind an adapter so app-specific schema and
  webhook details stay contained.

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Rebranding

For a new SaaS project, start by changing:

- `metadata` in `src/app/layout.tsx`
- Brand label and initials in `src/components/app-shell.tsx`
- Semantic tokens in `src/app/globals.css`
- Sample data in `src/lib/template-data.ts`
