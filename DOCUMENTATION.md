# Ekub Hub — Full Project Documentation

> Modern **ekub** (rotating savings / `የመወያወያ`) management platform built with
> **Next.js 15 (App Router) + NestJS 10 + Prisma + SQLite**.

This document explains the entire project: architecture, every file, the business
logic, the database schema, the realtime draw system, the HTTP/SSE API, and the
current deployment status.

---

## 1. What the app does

An ekub is a rotating savings club. A group of people contributes a fixed amount
into a shared pot, and each cycle ("draw") one member takes the whole pot. This
app digitizes that process for an **admin** who:

1. Creates an ekub with a schedule (start date, cycle days, number of shares, quotas).
2. Registers members and how much they intend to place.
3. Lets the system **auto-allocate** members into quotas (bins) so every member's
   placed amount is covered by the available shares, in a balanced way.
4. Runs a **random draw** to pick the winner each cycle.
5. Reverses a wrong draw, resets all draws, and issues payment **receipts**.
6. Lets **anyone** watch the draw **live** (public realtime page) — no login needed.

The whole thing has a polished dark/light themed UI (framer-motion animations,
glassmorphism, gradient accents).

---

## 2. Architecture

```
Ekub/
├── server/            NestJS REST + SSE API (port 4000, prefix /api)
│   ├── src/           controllers, services, guards, modules
│   ├── prisma/        schema.prisma + seed.ts
│   ├── src/generated/ generated Prisma client (do not edit)
│   ├── uploads/       receipt images (static, served at /uploads)
│   └── dev.db         SQLite database (auto-created by Prisma)
├── client/            Next.js 15 App Router frontend (port 3000)
│   └── src/           app routes, components, hooks, lib
└── package.json       root scripts (concurrently) to run both
```

**Data flow**

- Client calls the server only over HTTP (`NEXT_PUBLIC_API_URL`, default
  `http://localhost:4000/api`) using `apiFetch` (JSON wrapper) and React Query.
- The admin mutating endpoints require a **JWT bearer token** stored in
  `localStorage` after login.
- Public reads (`GET /ekubs`, `GET /ekubs/:id`) and the **SSE draw stream**
  (`GET /ekubs/:id/events`) require **no token**.
- The watch page and the ekub detail page keep a `EventSource` open so a draw
  performed by the admin is pushed to every open browser in realtime.

---

## 3. Tech stack & added libraries

| Layer    | Choice                                  | Why / notes                                        |
|----------|-----------------------------------------|-----------------------------------------------------|
| Frontend | Next.js 15 (App Router), React 19       | SSR landing + client components, dynamic routes     |
| Styling  | Tailwind CSS v4 (`@import "tailwindcss"`) | `@theme inline` tokens, `@custom-variant dark`    |
| UI       | framer-motion, lucide-react             | animations + icons                                  |
| Data     | @tanstack/react-query                   | server-state cache for lists/queries                |
| Theming  | next-themes                             | dark/light/system toggle                            |
| Backend  | NestJS 10                               | modules, guards, DI                                 |
| Auth     | @nestjs/jwt + passport-jwt              | JWT strategy + `JwtAuthGuard`                       |
| DB       | Prisma 5 + SQLite (`file:./dev.db`)     | dev convenience; see Deployment for prod DB         |
| Realtime | Native **SSE** via Nest `@Sse` (EventSource) | no extra deps, works over plain HTTP               |
| Other    | class-validator + class-transformer     | DTO validation; `multer` for uploads                |
| Uploads  | @nestjs/platform-express (Multer)       | receipts stored in `server/uploads/`, served at `/uploads` |
| Misc     | concurrently (root), tsx (seed)         | dev orchestration + seed runner                     |

---

## 4. Business logic (the ekub rules)

### 4.1 Core concepts

- **Ekub** — the savings club itself. Has a name, description, cycle interval
  (days), start date, total number of shares, and total **registered** money.
- **Member** — a person registered in an ekub with `preferredAmount`
  (how much they want to put in), optional `shareGroup`, and contact info.
- **Quota** — a bin equal to one share of the pot. Every quota has a
  `targetAmount` (total pot / number of shares). Multiple members can fill one
  quota proportionally.
- **Allocation** — the assignment of members to quotas. The admin can either
  allocate manually (quota by quota) or auto-generate all quotas.

### 4.2 Auto-allocation (`generateQuotas` in `ekubs.service.ts`)

The goal: put every registered member's money into the fixed number of quotas so
that **every quota is full** and **every member is fully placed** (this is a
bin-packing problem, solved greedily):

1. `unallocatedTotal = ekub.registeredTotal − Σ quotas.amount`; if there's no
   unallocated money, do nothing.
2. Members without an allocation are collected (those with `member.quotaId == null`).
3. **Best-fit placement**: for each unallocated member, find an existing quota
   whose remaining gap is ≥ member's `preferredAmount`, choosing the quota with
   the **smallest such gap**. If found, assign the member there (deducted amount
   is the member's preferred amount, capped to the gap).
4. **Share split**: if the whole amount doesn't fit in any one gap, split the
   member across the best-fit quota (filling it completely) and try again in the
   next iteration for the remainder (creating new members splits if needed).
5. If no member fits at all, a **new quota** is created for them.

The number of quotas is driven by `ekub.quotas` (total shares). Splitting happens
because a single member can end up with multiple quota rows (each holding part of
their money).

### 4.3 Manual allocation / deduction (`setQuotaMembers`)

Assigns a specific member to a specific quota with a `deductedAmount`. If the
amount would overflow the quota's remaining gap, it's capped, and the system
tracks unallocated money so the admin sees "X unallocated" and can fix it.

### 4.4 Draw, reverse, reset

- **Draw** (`POST /ekubs/:id/draw`): among all quotas of an ACTIVE ekub that
  haven't been drawn yet, pick one **at random**. Mark it `SELECTED`, set
  `winnerAt`, return the winner (the quota's member(s)). Emits an SSE `draw` event.
- **Reverse** (`POST /ekubs/:id/quotas/:quotaId/reverse`): undo a draw — unselect
  the quota, clear `winnerAt`, optionally restore the ekub status to `ACTIVE`.
  Emits SSE `reverse`.
- **Reset all** (`POST /ekubs/:id/reset-draws`): clear `SELECTED` on all quotas,
  clear every `winnerAt`. Emits SSE `reset` with `ekubId: 0` so every open watch
  page refreshes.

A cycle is "full" once every quota is `SELECTED`; the app shows progress via
`selectedCount / totalQuotas`.

### 4.5 Payments & receipts

- A payment records a **transfer between two individuals**: `memberId` is the
  **payer** (who paid) and `recipientId` is the **payee** (who received).
  When attaching a receipt the admin picks the **payee** (a winner of that
  round) and then the **payer** is limited to the people the system assigned
  to that winner, plus the amount, optional note and receipt **file**.
- Uploaded files land in `server/uploads/` (multer, filename = `<timestamp>-<rand>`)
  and are served statically at `/uploads/<filename>`.
- Payments can be edited or deleted; the payee and receipt file can be changed.

### 4.6 Who-pays-who payment plan (computed on the fly)

`GET /ekubs/:id/payment-plan` (public) derives the exact payment map for every
drawn round from the allocation + attached receipts:

- **What each winner gets**: when a quota is drawn, every member of that quota
  is a winner. A winner keeps their own registered share, so the other
  `totalQuotas - 1` shares of their amount are collected from the rest of the
  members: `pot = fill × (totalQuotas - 1)`. Example: quota #2 holds
  A = 30,000, B = 20,000, C = 10,000 in a 6-quota ekub → A collects 150,000,
  B 100,000, C 50,000 (each `fill × 5`).
- **Who pays who**: every registered member who is *not* one of that round's
  winners pays their **full registered amount**. The system assigns each payer
  to exactly one winner (largest pot first, best-fit), so each winner's
  assigned payers sum to their pot — the admin receipt form then only offers
  payees who are winners and only the payers the system assigned to the chosen
  winner.
- **Verified vs owed**: `paid` = sum of receipts where the payer is that member
  for that quota; `received` = sum of receipts where the payee is that winner.
  Each payer gets a `percent` (paid ÷ owed) and a status —
  `PAID` (paid within 1 Br of the owed amount) / `PARTIAL` / `UNPAID`.
- The response also has overall totals (`totalOwed`, `totalPaid`,
  `overallPercent`) and counts of paid / partially-paid / unpaid persons.

---

## 5. Database schema (Prisma)

Source of truth: `server/prisma/schema.prisma`. SQLite file: `server/dev.db`.
`DATABASE_URL=file:./dev.db` (relative to `server/`).

### 5.1 Ekub

| field            | type     | notes                                    |
|------------------|----------|------------------------------------------|
| id               | Int PK   |                                          |
| name             | String   | display name                             |
| description      | String?  |                                          |
| cycleDays        | Int      | days between draws (default 30)          |
| startDate        | DateTime | cycle start                              |
| totalShares      | Int      | number of quotas                         |
| registeredTotal  | Float    | money members intend to place            |
| status           | EkubStatus (`ACTIVE`/`INACTIVE`/`COMPLETED`) | |
| members / quotas / payments | relations | one-to-many           |
| createdAt, updatedAt | DateTime |                                     |

### 5.2 Member

| field            | type     | notes                                    |
|------------------|----------|------------------------------------------|
| id               | Int PK   |                                          |
| ekubId           | FK       |                                          |
| name             | String   |                                          |
| phone, email     | String?  |                                          |
| preferredAmount  | Float    | money they want to place                 |
| shareGroup       | String?  | optional grouping label                  |
| quotaId          | Int?     | FK → Quota (null until allocated)        |
| deductedAmount   | Float    | how much of their money is actually placed |

### 5.3 Quota

| field            | type     | notes                                    |
|------------------|----------|------------------------------------------|
| id               | Int PK   |                                          |
| ekubId           | FK       |                                          |
| position         | Int      | quota number (1..N)                      |
| targetAmount     | Float    | pot value for that quota (per-share)     |
| amount           | Float    | filled so far                            |
| selected         | Boolean  | drawn?                                   |
| winnerAt         | DateTime?| when it was drawn                        |
| members          | relation | members filling this quota               |

### 5.4 Payment

| field            | type     | notes                                    |
|------------------|----------|------------------------------------------|
| id               | Int PK   |                                          |
| ekubId           | (via Quota) | the round it belongs to               |
| quotaId          | FK       | the round / quota slot                  |
| memberId         | FK       | **payer** — who paid                     |
| recipientId      | FK (nullable) | **payee** — who received            |
| amount           | Int      |                                          |
| receiptUrl       | String?  | `/uploads/<file>`                        |
| note             | String?  |                                          |

### 5.5 Seed (`server/prisma/seed.ts`)

Creates the default **admin** user used by the auth endpoints:

- username: `admin`
- password: `admin123` (bcrypt-hashed in DB)

Run with `npm run seed` (from `server/`) or root `npm run setup`. The default
credentials are only for first-time setup — change them from the admin panel
(**Security** button, `PATCH /api/auth/credentials`) before real use.

---

## 6. Server — file by file

### Entry & wiring

| file | purpose |
|------|---------|
| `server/src/main.ts` | Bootstrap: sets global prefix `api`, port `4000`, enables CORS with credentials, serves `/uploads` as static, starts Nest with `app.enableShutdownHooks()`. |
| `server/src/app.module.ts` | Root module: imports `AuthModule`, `EkubsModule`, `PaymentsModule`, `PrismaModule`, `ServeStaticModule`. |
| `server/src/app.controller.ts` / `.service.ts` | `GET /api` → `{ message: "Ekub API is running" }` health check. |

### Auth

| file | purpose |
|------|---------|
| `server/src/auth/auth.module.ts` | Registers JWT module with `JWT_SECRET` (fallback `ekub-secret`) + Passport JWT strategy. |
| `server/src/auth/auth.controller.ts` | `POST /api/auth/login` → validates `{ username, password }` against the `admin` user, returns `{ token }` (JWT, 1h). |
| `server/src/auth/auth.service.ts` | Compares bcrypt hash, signs the token. |
| `server/src/auth/jwt-auth.guard.ts` | Nest guard wrapping `AuthGuard('jwt')`. |
| `server/src/auth/jwt.strategy.ts` | Passport strategy: reads Bearer token, resolves `payload`. |

### Prisma

| file | purpose |
|------|---------|
| `server/src/prisma/prisma.module.ts` | Global Prisma module. |
| `server/src/prisma/prisma.service.ts` | `PrismaClient` singleton (extends OnModuleInit to `$connect`). |
| `server/src/generated/prisma/*` | Generated client used by the app — **never edit manually**; regenerate with `npx prisma generate`. |

### Ekubs (core business)

| file | purpose |
|------|---------|
| `server/src/ekubs/ekubs.module.ts` | Module wiring. |
| `server/src/ekubs/ekubs.controller.ts` | All `/api/ekubs*` routes, including the **public** `@Sse(':id/events')` draw stream. |
| `server/src/ekubs/ekubs.service.ts` | All business logic: CRUD, `generateQuotas` (auto-allocation), `setQuotaMembers`, rebalance, unallocated tracking, `drawWinner`, `reverseDraw`, `resetAllDraws`, the **payment-plan** computation, and the **SSE stream** (`drawEvents` Subject + `emit`). |
| `server/src/ekubs/dto/create-ekub.dto.ts` | `CreateEkubDto`: name, description, cycleDays, startDate, totalShares, registeredTotal. |
| `server/src/ekubs/dto/update-ekub.dto.ts` | Partial of Create (all optional). |
| `server/src/ekubs/dto/create-member.dto.ts` | `CreateMemberDto`: name, phone?, email?, preferredAmount, shareGroup?, deductedAmount?. |

### Payments

| file | purpose |
|------|---------|
| `server/src/payments/payments.module.ts` | Module wiring + Multer upload config (dest `./uploads`). |
| `server/src/payments/payments.controller.ts` | CRUD for `/api/ekubs/:ekubId/payments` + file upload endpoint (JWT-protected); accepts `recipientId` (payee). |
| `server/src/payments/payments.service.ts` | Creates/updates/deletes payments with payer + payee, validates both belong to the same ekub; on delete removes the file from disk. |

### API surface (all routes)

| Method | Route | Auth | Purpose |
|--------|-------|------|---------|
| GET    | `/api` | — | health check |
| POST   | `/api/auth/login` | — | admin login → JWT |
| PATCH  | `/api/auth/credentials` | JWT | change admin username / password (needs current password) |
| GET    | `/api/ekubs` | — | list ekubs |
| POST   | `/api/ekubs` | JWT | create ekub |
| GET    | `/api/ekubs/:id` | — | ekub detail with members/quotas/payments |
| GET    | `/api/ekubs/:id/payment-plan` | — | who-pays-who plan for drawn rounds |
| PATCH  | `/api/ekubs/:id` | JWT | update ekub |
| DELETE | `/api/ekubs/:id` | JWT | delete ekub |
| POST   | `/api/ekubs/:id/members` | JWT | add member |
| PATCH  | `/api/ekubs/:id/members/:memberId` | JWT | update member |
| DELETE | `/api/ekubs/:id/members/:memberId` | JWT | remove member |
| POST   | `/api/ekubs/:id/generate-quotas` | JWT | auto-allocate quotas |
| POST   | `/api/ekubs/:id/quotas/:quotaId/members` | JWT | assign member to quota (`setQuotaMembers`) |
| POST   | `/api/ekubs/:id/draw` | JWT | run the draw |
| POST   | `/api/ekubs/:id/quotas/:quotaId/reverse` | JWT | reverse a draw |
| POST   | `/api/ekubs/:id/reset-draws` | JWT | reset all draws |
| POST   | `/api/ekubs/:ekubId/payments` | JWT | create payment (multipart: quotaId, memberId=payer, recipientId=payee, amount, file) |
| PATCH  | `/api/ekubs/:ekubId/payments/:paymentId` | JWT | update payment (multipart) |
| DELETE | `/api/ekubs/:ekubId/payments/:paymentId` | JWT | delete payment |
| GET    | `/api/ekubs/:id/events` | — | **SSE** realtime draw stream |

---

## 7. Realtime draw (SSE) — how it works

**Server side** (`ekubs.service.ts`):

- A module-level `drawEvents = new Subject<EkubDrawEvent>()`.
- Every mutating action calls the private `emit(event)` helper:
  - `drawWinner()` → `emit({ type: 'draw', ekubId, pending, winner })`
  - `reverseDraw()` → `emit({ type: 'reverse', ekubId, pending, winner: null })`
  - `resetAllDraws()` → `emit({ type: 'reset', ekubId: 0 })` (**broadcast to all**)
- `drawStream(ekubId)` returns a merged `Observable<MessageEvent>`:
  - `drawEvents` filtered by `ekubId` (or accept all when `ekubId === 0`), mapped
    to `{ event: 'ekub-event', data: JSON.stringify(payload) }` with auto id.
  - plus `interval(20000)` heartbeat lines so proxies don't kill idle connections.
- `EkubDrawEvent` payload shape:
  ```
  {
    type: 'draw' | 'reverse' | 'reset',
    ekubId: number,
    pending: [{ id, position, members: [{ name }] }],
    winner: { id, position, members: [{ name }] } | null
  }
  ```

**Controller** (`ekubs.controller.ts`): `@Sse(':id/events') drawEvents()` — **no
JwtAuthGuard**, so the public watch page works without login.

**Client side**:

- `client/src/hooks/use-draw-events.ts` opens `new EventSource(`${API_URL}/ekubs/${ekubId}/events`)`, subscribes to the `ekub-event` event, and calls `onOpen` on connect/reconnect (used to re-sync stale data).
- `client/src/components/watch-draw.tsx` renders the live stage: a **spin animation** (~2 s, 18 frames) that lands on the winner with a trophy reveal, a LIVE badge, a quota grid that highlights the spinning/winning quota, and a catch-up refresh on reconnect.
- `client/src/components/ekub-detail.tsx` also subscribes so the admin dashboard stays in sync when a draw is run from another tab.

---

## 8. Client — file by file

### Routes (App Router)

| route | file | purpose |
|-------|------|---------|
| `/` | `src/app/page.tsx` | Landing page: hero, featured ekubs grid, "how it works", calls `GET /ekubs`. |
| `/admin` | `src/app/admin/page.tsx` | Admin area; if no token shows `LoginForm`, else `AdminDashboard`. |
| `/ekub/[id]` | `src/app/ekub/[id]/page.tsx` | Public ekub detail (SSR, `cache:'no-store'`), renders `EkubDetail`; 404 via `notFound()` if missing. |
| `/watch/[id]` | `src/app/watch/[id]/page.tsx` | Public live draw page (SSR), renders `WatchDraw`; 404 fallback. |
| — | `src/app/layout.tsx` | Root layout: fonts, `ThemeProvider`, `QueryProvider`, `Navbar`, `Footer`, metadata. |
| — | `src/app/globals.css` | Tailwind v4 import, design tokens (light/dark), keyframes (gradient-x, blob, float, shimmer), `.glass`, `.gradient-text`, `.hero-gradient`, scrollbar styling. |

### Components (features)

| file | purpose |
|------|---------|
| `src/components/navbar.tsx` | Sticky glass navbar: logo, anchor links, `ThemeToggle`, Admin/Home switch. |
| `src/components/footer.tsx` | Footer with year + links. |
| `src/components/reveal.tsx` | framer-motion scroll-reveal wrapper (`whileInView`, stagger via `delay`). |
| `src/components/ekub-card.tsx` | Card for the landing grid: name, members, quota progress bar, money, status badge, link to detail. |
| `src/components/ekub-detail.tsx` | Full public detail: stats, quota grid, member table, payments, live refresh via `useDrawEvents`, **"Watch live draw"** link → `/watch/${id}`, and a **Who pays who** section showing each winner's pot, per-member owed/paid %, and who paid / who didn't. |
| `src/components/watch-draw.tsx` | Public watch page component: live spin + reveal, LIVE badge, quota grid, reconnect catch-up. |
| `src/components/theme-provider.tsx` | next-themes provider (`attribute="class"`, system default). |
| `src/components/theme-toggle.tsx` | Sun/Moon toggle (hydrated with `useMounted`). |
| `src/components/query-provider.tsx` | React Query client (no refetch on focus, retry 1). |

### Components (UI kit)

| file | purpose |
|------|---------|
| `src/components/ui/button.tsx` | `Button` with variants (primary/secondary/ghost/danger/outline), sizes, loading spinner. |
| `src/components/ui/input.tsx` | `Input`, `Textarea`, `Select`, `Label` styled primitives. |
| `src/components/ui/modal.tsx` | Animated `Modal` (AnimatePresence, spring scale, glass card, close button). |
| `src/components/ui/progress.tsx` | `ProgressBar` with gradient fill + smooth width transition. |
| `src/components/ui/badge.tsx` | Small colored status pills. |

### Components (admin)

| file | purpose |
|------|---------|
| `src/components/admin/login-form.tsx` | Login form → `POST /auth/login`, stores token in `localStorage`, calls `onSuccess`. |
| `src/components/admin/admin-dashboard.tsx` | Post-login shell: logout, ekub picker/list, quota & draw controls, member & payment management. |
| `src/components/admin/create-ekub-form.tsx` | Modal form to create an ekub (`POST /ekubs`). |
| `src/components/admin/edit-ekub-form.tsx` | Modal form to edit an ekub (`PATCH /ekubs/:id`). |
| `src/components/admin/ekub-manager.tsx` | Per-ekub admin panel: members list, allocate/generate quotas, run draw, reverse, reset. |
| `src/components/admin/member-form.tsx` | Add/edit member modal (`POST/PATCH /members`). |
| `src/components/admin/allocate-quota-form.tsx` | Assign a member to a quota with a deducted amount (`setQuotaMembers`). |
| `src/components/admin/draw-modal.tsx` | Confirmation modal + live-ish draw execution and result display. |
| `src/components/admin/edit-member-form.tsx` | Edit an existing member's details. |
| `src/components/admin/payment-plan.tsx` | Admin **Payments** tab: overall collection % + per round "who pays who", winner pots, payer owed/paid/%, PAID/PARTIAL/UNPAID badges, and attach-receipt modal. |
| `src/components/admin/edit-payment-form.tsx` | Edit a payment (amount, payee, note). |
| `src/components/admin/receipt-form.tsx` | Attach a receipt choosing **who paid (payer)** and **who received it (payee)** from the registered members + amount/file (multipart). |

### Hooks & lib

| file | purpose |
|------|---------|
| `src/hooks/use-draw-events.ts` | `EventSource` hook for the SSE draw stream (onEvent/onOpen/onError). |
| `src/hooks/use-mounted.ts` | `useSyncExternalStore`-based mounted check (avoids hydration mismatch). |
| `src/lib/api.ts` | `API_URL`, `apiFetch` (adds `Authorization: Bearer` from localStorage, JSON + FormData helpers). |
| `src/lib/format.ts` | `cn` (clsx + tailwind-merge), `formatMoney`, `formatDate`. |
| `src/lib/types.ts` | Shared TS types mirroring the API (`Ekub`, `Member`, `Quota`, `Payment`, `EkubDrawEvent`, statuses). |

### Config

| file | purpose |
|------|---------|
| `client/.env.local` | `NEXT_PUBLIC_API_URL=http://localhost:4000/api`, `NEXT_PUBLIC_UPLOADS_URL=http://localhost:4000`. |
| `client/next.config.ts` | Empty default config (no rewrites needed). |

---

## 9. Root & tooling

| file | purpose |
|------|---------|
| `package.json` (root) | Scripts: `setup` (install + seed), `dev` (both via concurrently), `build` (server then client), `start`. |
| `README.md` | Short overview / quick start. |
| `server/.env` | `DATABASE_URL=file:./dev.db`, `JWT_SECRET`, `PORT=4000`. |
| `server/uploads/` | Receipt files uploaded by the payments feature (git-ignored at runtime). |
| `server/dev.db` | The live SQLite database (the 0-byte `dev.db` at repo root is a stray leftover — safe to delete). |

---

## 10. Running locally

```bash
# from repo root
npm run setup      # installs server+client, runs prisma seed (admin/admin123)

npm run dev        # server on :4000, client on :3000
# or separately:
npm run dev:server # NestJS watch
npm run dev:client # Next.js dev
```

Open `http://localhost:3000`, go to `/admin`, login with `admin` / `admin123`.

Build & prod-run:

```bash
npm run build      # nest build + next build
npm start          # runs node dist/main + next start via concurrently
```

---

## 11. Deployment status

**Not deployed yet.** We prepared the app for a free-tier deploy but did not finish
it (the deploy questions were dismissed, and creating the required free accounts
needs your own email/password). Everything below is the verified plan.

### Why free hosting needs extra work

Free tiers of Render / Railway / Fly.io use **ephemeral disks** — anything written
to the container filesystem is wiped on every restart/deploy. Our dev setup relies
on two filesystem stores:

1. **SQLite** (`server/dev.db`) → the database.
2. **`server/uploads/`** → payment receipt images.

So a real deploy **must** switch to persistent external storage:

- **Database**: Neon (serverless Postgres) or Supabase. Update `DATABASE_URL`,
  run `npx prisma migrate deploy` + seed. Prisma already works with Postgres —
  only the schema `provider`/connection changes.
- **Receipts**: Cloudinary (or S3). Upload to Cloudinary instead of disk and store
  the returned URL in `Payment.receiptUrl` (already a string field, so this is a
  small change in `payments.service.ts` only).

### Recommended free stack

- **Frontend** → Vercel (free, persistent builds) pointing at the deployed API.
- **API** → Render free web service (NestJS) with env vars `DATABASE_URL`,
  `JWT_SECRET`, `PORT=4000`; add `uploads` → Cloudinary.
- **DB** → Neon / Supabase free Postgres.
- **Realtime** → SSE works fine over Render (long-lived connections OK; the
  20 s heartbeat keeps them alive).

### What's needed to finish

1. A GitHub repo for the project (currently not a git repo) and push.
2. Your free accounts (Neon/Supabase, Cloudinary, Render/Vercel) — I can't create
   them for you.
3. Small code change in `payments.service.ts` to push to Cloudinary instead of
   local disk, and `.env` updates.

---

## 12. Security notes

- All admin/mutating endpoints are behind `JwtAuthGuard` (except login + public reads + SSE).
- Passwords are bcrypt-hashed. The seed admin (`admin/admin123`) can be changed
  from the admin panel — **Security** → change username / password
  (`PATCH /api/auth/credentials`, requires the current password). The login
  page never reveals any default credentials.
- `JWT_SECRET` has a dev fallback (`ekub-secret`) — always set a strong value in production.
- CORS is enabled with credentials; set `origin` to the real frontend domain in production.

---

## 13. Verification done (manual + e2e)

- Server builds clean; SSE stream unit-tested on a DB copy (draw event reaches only
  the right ekub; reverse emits; reset broadcasts `ekubId: 0`).
- HTTP roundtrip verified against the real DB: opened the SSE stream, ran
  `POST /api/ekubs/4/draw` (won quota 20), confirmed a matching `ekub-event` was
  pushed to the browser/curl, then reversed it — DB fully restored (0 SELECTED,
  status ACTIVE, no `winnerAt` rows).
- Client `next build` passes; the `/watch/[id]` route is generated (`ƒ` dynamic).
- Client lint clean; server lint clean after `eslint --fix` (pre-existing
  `no-unsafe-*` noise in `ekubs.service.ts` unrelated to new code).
- Who-pays-who verified live: created a payment (Tsegaye → Mekdi, 8333 for round
  5) via the API — the plan showed Mekdi's pot 20,000 received 8,333 (41.7%),
  Tsegaye owed 8,333.33 / paid 8,333 → 100% **PAID**; then deleted the test
  payment and confirmed totals returned to 0.
