# Overtime Tea ☕

A premium, animation-rich social media management agency website with a full CMS admin panel and backend API.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, serves at `/api`)
- `pnpm --filter @workspace/overtime-tea run dev` — run the frontend (Vite)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Framer Motion + wouter + Tailwind CSS + shadcn/ui
- API: Express 5 + multer (file uploads)
- DB: PostgreSQL + Drizzle ORM (`@workspace/db`)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/overtime-tea/` — React/Vite frontend
  - `src/pages/` — Home, Services, Process, Work, Insights, Contact, Admin
  - `src/components/` — Navbar, Footer, SEO
  - `src/context/ContentContext.tsx` — **source of truth** for all CMS content types + API sync
- `artifacts/api-server/` — Express API server
  - `src/routes/admin.ts` — content GET/PUT, image upload/list/delete routes
  - `uploads/` — uploaded image files (served as `/api/uploads/*`)
- `lib/db/` — Drizzle schema: `site_content` (jsonb blob), `site_images`

## Architecture decisions

- All site copy lives in a single `SiteContent` object (jsonb) in the DB; admin CMS reads/writes this blob via `/api/admin/content`
- Images are uploaded via multipart to `/api/admin/upload`, stored on disk, URLs persisted in `site_images` table
- Frontend falls back to localStorage if the API is unavailable
- Logo support: if `content.global.logoUrl` is set, Navbar/Footer show the image; otherwise fallback to text brand name
- Admin panel is hidden (not linked publicly) at `/admin` — credentials: `admin` / `OvertimeTea@2025`

## Product

- **6-page public site**: Home, Services (What We're Brewing), Process (The Overtime Method), Work (Conversations We've Started), Insights (Tea Break Thoughts), Contact
- **Admin CMS** at `/admin` with 8 tabs: Global, Home, Services, Process, Work, Insights, Contact, Images
  - Images tab: logo upload (replaces navbar text), image library with copy URL / set-as-logo / delete
  - All content changes sync to DB and serve to the live site instantly

## User preferences

- Brand palette: Warm Cream #F6F1E8, Matte Black #121212, Coffee Brown #4B3124, Beige #D8C2A8, Olive #5E6B52, Gold #B88A44
- Fonts: Cormorant Garamond (serif/display) + Plus Jakarta Sans (body)
- No custom cursor, no About page
- Loading screen only on Home page
- Email: overtimeteaagency@gmail.com
- Admin credentials: admin / OvertimeTea@2025

## Gotchas

- Never `pnpm run dev` at workspace root — use `restart_workflow` or per-package filter
- After uploading images, use "Copy URL" in the Images tab to paste into any content field
- `defaultContent` must remain exported from ContentContext (Admin.tsx imports it for the Reset function)
- Static uploads served from `/api/uploads/*` — paths stored in DB use the full `/api/uploads/filename` format

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
