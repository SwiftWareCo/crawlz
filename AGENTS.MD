<!--
Instructions for GitHub Copilot and other AI agents. Keep these short, practical,
and focused on things that help us avoid constantly-read docs or repeated context.
-->

# Crawlz-specific Coding Guide

## 1. Architecture in a nutshell

- This is a T3 stack Next.js 15 app-router project (`src/app`), so pages live under
  `(auth)` for public/authentication walls and `(main)` for the authenticated experience.
- `src/app/(main)/layout.tsx` simply wraps content in `AppShell`, which renders the
  `DesktopSidebar`, `MobileBottomNav`, and the `main` slot for page content.
- Global UI decisions (fonts + colors) live in `src/styles/globals.css`, which now
  uses Tailwind 4 + `@clerk/themes/shadcn.css` plus `@custom-variant` declarations.
- Reusable primitives (buttons, cards, tabs, etc.) live in `src/components/ui` and
  follow the shadcn-inspired `className` + `cn` helper pattern from `src/lib/utils.ts`.

## 2. Layout & authentication

- The root layout (`src/app/layout.tsx`) wraps everything inside `ClerkProvider` +
  our `ThemeProvider` that configures `next-themes`. Auth pages live under `(auth)` while
  `(main)` layouts are behind `AppShell`.
- `src/middleware.ts` uses `createRouteMatcher` to protect `/`, `/saved`, and `/preferences`
  with Clerk `auth.protect()`. Any new protected routes must be reflected in that matcher.

## 3. Data + action modules (TanStack Query first)

- Every screen’s data fetching must go through a `{feature}.data.ts` module that exports the
  underlying Drizzle/Neon helpers and reusable TanStack Query hooks. For example, place
  `inbox.data.ts` next to `inbox/page.tsx`, and let it export `getInboxJobs`, `inboxQueryKey`,
  and `useInboxQuery` (all of them should import `db` from `src/server/db`). Server components
  can `await getInboxJobs()` while client components re-use `useInboxQuery` for caching.
- Mutations belong in `{feature}.actions.ts`. These files should wrap Drizzle writes and
  expose TanStack Query `useMutation` hooks and invalidation helpers so that client-side
  interactions (e.g., saving/dismissing a job from `JobCardStack`) can stay in sync.
- Always lean on `@tanstack/react-query` for both reads and writes—whether the call originates
  client-side or from a server component that reuses the same helpers. Keep `queryClient` logic
  near the UI entrypoint when you need to prefetch/dehydrate on the server.


## 4. UI conventions

- Interactive pieces (swipe cards, tabs, mode toggle) are `"use client"` components. Keep them
  lean and push business logic (API calls, state mutations, caching) to the `.data.ts`/`.actions.ts`
  modules described above.
- `JobCard` and `JobCardStack` live under `src/components` and currently rely on `motion` +
  `Lucide` icons for UX. When adding new cards, reuse the existing component props (`job`,
  `variant`, `onSave`, etc.) for visual consistency.
- `AppShell` expects the main content to sit in `main` (it already reserves padding for the sidebar)
  so avoid nested layout wrappers that reflow the `DesktopSidebar` height.

## 5. Database & environment

- `src/server/db/index.ts` wires Drizzle to Neon using `dotenv`. Any query helper should import
  `db` from this file so migrations and queries share the same connection.
- Keep `.env` in sync with `src/env.js` (T3’s `env-nextjs` schema). `DATABASE_URL` is required
  and `NODE_ENV` defaults to `development`. When you need a local Postgres instance, run
  `./start-database.sh` (WSL hoops on Windows) to spin up a container that matches the URL.
- Reasonably frequent helper scripts: `pnpm run db:generate`, `pnpm run db:migrate`,
  `pnpm run db:push`, and `pnpm run db:studio` all go through Drizzle Kit.

## 6. Common workflows

- Install deps with `pnpm install`. Start the dev server via `pnpm run dev` (Next.js app router)
  or run `pnpm run preview` once you’ve built.
- Use `pnpm run check` to run lint + type checking, `pnpm run typecheck` for TypeScript only,
  and `pnpm run lint` / `pnpm run lint:fix` for ESLint. Formatting is governed by Prettier +
  Tailwind plugin via `pnpm run format:write` / `format:check`.
- Keep `Clerk` theme synchronized through `src/app/layout.tsx` and avoid hard-coding `dark`/`light`
  styles outside of that provider.

## 7. Key files to reference

- `src/components/AppShell.tsx`: layout container for the desktop sidebar + bottom nav.
- `src/components/ui/*`: shared UI primitives (button, input, badge, tabs, etc.).
- `src/server/db/index.ts` + `src/server/db/schema.ts`: Drizzle setup and schema examples.
- `src/middleware.ts`: route protection matcher for authenticated screens.

Please review this guide and let me know if any instructions need clarification or if you’d like
more detail on a specific section.
