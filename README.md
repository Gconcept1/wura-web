# WURA — Web App (Next.js 16 + Supabase)

The production marketplace app. The static prototype in `../site` is the pixel reference.

## Run locally

```bash
cd web
npm install      # first time only
npm run dev      # http://localhost:3000
```

> On Windows, if `npm`/`node` aren't found, open a fresh terminal (Node was installed
> to `C:\Program Files\nodejs`) or add it to PATH.

Other scripts: `npm run build` (production build), `npm start` (serve the build), `npm run lint`.

## Environment

Copy `.env.example` to `.env.local` and fill in. The Supabase URL + anon key are
already set. Still needed before payments: `SUPABASE_SERVICE_ROLE_KEY` and the
Paystack keys (from their dashboards). Never commit `.env.local`.

## Structure

- `src/app/` — routes (App Router). `page.tsx` home, `login/`, `account/`, `auth/`.
- `src/lib/supabase/` — `client.ts` (browser), `server.ts` (server, async cookies).
- `src/proxy.ts` — session refresh (Next 16 renamed `middleware` → `proxy`).
- `src/components/` — shared UI (e.g. `site-header.tsx`).
- `src/app/globals.css` — WURA brand tokens + Tailwind v4 theme.

## Backend

Postgres schema (25 tables, escrow, RLS) lives in Supabase project
`aehtwhdmuhiecwulgakt`. Schema source of truth: `../site/schema.sql`.
Manage it at https://supabase.com/dashboard.

## Auth

Email/password works out of the box (email confirmation may be on by default —
toggle in Supabase → Authentication → Sign In / Providers). For Google sign-in,
enable the Google provider in the dashboard and add the OAuth redirect URL
`<site>/auth/callback`.

## Note on Next.js version

This uses **Next.js 16**, newer than the `docs/` ("Next 15"). Version-accurate
docs are bundled at `node_modules/next/dist/docs/`. Key differences already
handled: `proxy` (not `middleware`); `cookies()`/`params`/`searchParams` are async.
