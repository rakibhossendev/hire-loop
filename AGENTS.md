<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Single-package Next.js 16 (App Router) frontend for a job board. Use **npm** (`package-lock.json`), not pnpm/yarn. There is **no test framework and no CI** — don't invent a test command.

## Commands

- `npm run dev` — dev server (also regenerates the block above)
- `npm run typecheck` — `tsc --noEmit`, currently passes
- `npm run lint` — `eslint`, passes clean (0 problems)
- `npm run format` — Prettier over ts/tsx only
- `npm run build` — production build
- Standard verification: `npm run typecheck && npm run lint`

## Conventions that differ from defaults

- Prettier (`.prettierrc`): **no semicolons**, double quotes, 2-space, `prettier-plugin-tailwindcss` sorts classes. Match surrounding files or run `npm run format`.
- Tailwind **v4, CSS-first** — no `tailwind.config`; theme lives in `app/globals.css`.
- shadcn/ui uses style **`base-nova`**: primitives are **Base UI (`@base-ui/react`)**, not Radix. `npx shadcn@latest add <component>` respects `components.json`; don't hand-write Radix-based components (examples online will be wrong for this repo).
- Path alias `@/*` → repo root (`tsconfig.json`).

## Structure

- Route groups (names never appear in URLs): `(authentication)` → `/sign-in`, `/sign-up`; `(dashboard)` → `/recruiter`, `/recruiter/new`, `/recruiter/manage-jobs`, `/admin`; `/` is `app/page.tsx`, and `/browse-jobs` lives under `(home-page)`.
- The dashboard sidebar (`app/(dashboard)/_components/common/DashboardSidebar.tsx`) links to routes that **don't exist yet** (`/seeker/*`, `/admin/users`, `/recruiter/applications`, …). Only the pages listed above exist — a 404 there is expected, not a wiring bug.
- Shared types live in `Typescript/main.ts` (imported as `@/Typescript/main`). Odd location, but it's the real types module.

## Auth & data

- Better Auth: server config `lib/auth.ts`, client `lib/auth-client.ts`, catch-all handler `app/api/auth/[...all]/route.ts`. MongoDB adapter, database `hire-loop`.
- Roles are `admin | seeker | recruiter`; public sign-up is clamped to seeker/recruiter by a `transform.input` in `lib/auth.ts` — keep that restriction.
- **No middleware**: dashboard routes are not server-guarded; session checks are client-side via `useSession()`.
- Job CRUD calls an **external API** at `process.env.NEXT_PUBLIC_API_BASE_URL` (`/create-jobs`, `/manage-jobs/:email`) through `lib/actions/*.ts`. The backend is not in this repo — when it's unreachable, that's environment, not app code.
- Required env vars (`.env` is gitignored; recreate if missing): `MONGODB_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_API_BASE_URL`.

## Other files

- `CLAUDE.md` is just `@AGENTS.md` — edit this file only, never `CLAUDE.md`.
