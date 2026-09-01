# Base SaaS Template

A reusable foundation for future SaaS projects built with Next.js App Router,
Tailwind CSS v4, TypeScript, and shadcn/ui.

The template intentionally focuses on product UI and conventions rather than a
marketing site. Auth and billing are UI-only so each new project can choose the
right provider without deleting backend assumptions.

## Included

- Semantic light/dark design tokens in `src/app/globals.css`
- shadcn/ui primitives in `src/components/ui`
- Responsive app shell with sidebar, topbar, breadcrumbs, search, and user menu
- Auth screens for sign in, sign up, forgot password, reset password, verify
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
- `/auth/verify`
- `/kitchen-sink`

## Template Rules

- Treat `src/components/ui` as vendored shadcn source.
- Put reusable product compositions in `src/components`.
- Use semantic tokens instead of hardcoded palette classes for app surfaces.
- Keep every async view covered by loading, empty, and error states.
- Use `AlertDialog` or `useConfirmDialog` for destructive actions.
- Keep auth and billing provider-neutral until a project chooses its stack.

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
