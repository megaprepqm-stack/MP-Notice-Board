# MegaPrep TV Notice Display System

A production-focused Next.js 15 application for managing and broadcasting TV notice displays.

## What is implemented
- Supabase auth login UI at `/login`.
- Protected `/dashboard` routes with middleware + auth check.
- Display management page for creating/listing TV displays.
- Public TV player page at `/display/[slug]` with animated autoplay.
- Cloudflare R2 presigned upload API (`POST /api/uploads/r2`).
- Publish API that snapshots current slides into `publish_history`.
- Rate-limited API example (`GET /api/rate-limited`).
- Supabase SQL schema with core tables + RLS.

## Environment
Copy `.env.example` to `.env.local` and fill all values.

## Run
```bash
npm install
npm run dev
```

## Deploy (Vercel)
1. Import repo in Vercel.
2. Add all env vars from `.env.example`.
3. Run Supabase migration: `supabase db push`.
4. Deploy.
