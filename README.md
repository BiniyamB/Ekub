# Ekub Hub

A modern digital **ekub** (Ethiopian rotating savings & credit association) platform.

- **Client** — Next.js 16 (App Router, Turbopack), Tailwind CSS v4, framer-motion, TanStack Query, next-themes (dark/light)
- **Server** — NestJS 11, Prisma 7 (SQLite), JWT auth, multer receipt uploads

## Features

- Create an ekub: quota value (e.g. 50,000 Br), number of quotas, weekly / monthly / annually cycle
- Register members (name, address, phone, preferred amount)
- **Auto-combine** members into quota slots so each quota sums exactly to the quota value (e.g. a 30k + 20k member fill one 50k quota)
- **Random draw**: one quota per round is selected fairly (animated slot-machine reveal in the UI)
- **Receipts**: every member of a winning quota can attach a receipt image, visible publicly
- Public landing + detail pages show everything; only the admin panel registers/mutates data
- Modern, animated, gradient UI with full dark/light mode

## Getting started

Requirements: Node.js 20.9+ and npm.

```bash
# 1. Install dependencies, create the DB and seed the admin account
npm run setup

# 2. Run both servers (API on :4000, web on :3000)
npm run dev
```

Open http://localhost:3000 — admin panel at http://localhost:3000/admin.

### Default admin
- Username: `admin`
- Password: `admin123`

> Change the password and `JWT_SECRET` in `server/.env` before deploying.

## Project layout

```
server/          NestJS API (http://localhost:4000/api)
  prisma/        schema, migrations, seed
  src/           modules: auth, ekubs, payments, prisma
  uploads/       receipt images (static-served at /uploads)
client/          Next.js app (http://localhost:3000)
  src/app/       routes: /, /ekub/[id], /admin
  src/components pages & admin components
```

## API overview

| Method | Route                        | Auth | Purpose                             |
| ------ | ---------------------------- | ---- | ----------------------------------- |
| POST   | `/auth/login`                | —    | Admin login → JWT                   |
| GET    | `/ekubs`                     | —    | List ekubs (public)                 |
| GET    | `/ekubs/:id`                 | —    | Ekub detail incl. quotas/payments   |
| POST   | `/ekubs`                     | JWT  | Create ekub                         |
| POST   | `/ekubs/:id/members`         | JWT  | Register one member                 |
| POST   | `/ekubs/:id/members/bulk`    | JWT  | Register many members               |
| DELETE | `/ekubs/:id/members/:mid`    | JWT  | Remove member                       |
| POST   | `/ekubs/:id/generate`        | JWT  | Auto-combine members into quotas    |
| POST   | `/ekubs/:id/draw`            | JWT  | Randomly select a winner quota      |
| POST   | `/ekubs/:id/quotas/:quotaId/reverse` | JWT | Undo a draw (quota back to pending) |
| POST   | `/ekubs/reset-draws`         | JWT  | Clear every draw across all ekubs   |
| PATCH  | `/ekubs/:id/status`          | JWT  | Active / completed / cancelled      |
| DELETE | `/ekubs/:id`                 | JWT  | Delete ekub                         |
| POST   | `/payments`                  | JWT  | Upload receipt (multipart)          |
| DELETE | `/payments/:id`              | JWT  | Delete receipt                      |

## Database

SQLite via Prisma 7 (driver adapter). Recreate the schema with:

```bash
cd server
npx prisma migrate dev
npm run seed
```
