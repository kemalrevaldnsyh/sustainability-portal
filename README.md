# Sustainability Portal

Frontend sustainability portal built with React + Vite.

## Requirements
- Node.js 18+ (recommended: 20+)
- `pnpm` 8+

## Quick Start
```bash
pnpm install
pnpm dev
```

Local URL: `http://127.0.0.1:5173`

## Available Scripts
- `pnpm dev` - run local development server
- `pnpm build` - create production build in `dist/`
- `pnpm preview` - serve built app locally

## Project Structure
- `src/features/sustainability/SustainabilityPortal.jsx` - main portal UI and page state
- `src/features/sustainability/SustainabilityPortal.css` - centralized UI styles
- `src/App.jsx` - app entry component with lazy loading
- `src/main.jsx` - React bootstrap

## Deployment (Static Hosting)
Because this is a Vite SPA, deploy the `dist/` folder.

```bash
pnpm build
```

Upload `dist/` to your hosting provider (Netlify, Vercel static output, Nginx, S3 + CloudFront, etc).

For direct URL access in SPA routes, ensure fallback to `index.html` is enabled at hosting level.

## Vercel + Free Database Setup (Supabase)
This repository is now prepared for Vercel serverless API + Supabase.

### 1) Create Supabase project (free)
- Create a new project in [Supabase](https://supabase.com/).
- Open SQL Editor, run:
  - `db/schema.sql`
  - `db/seed.sql` (optional sample data)
- If you already created `documents` table earlier, run `db/schema.sql` again to add the newer optional columns used by category mapping.

### 2) Configure environment variables
Create `.env.local` for local development (do not commit):

```bash
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Optional:

```bash
VITE_DB_ONLY=true
```

- `VITE_DB_ONLY=true` forces UI to use DB data only (no static fallback).
- In production build, DB-only mode is enabled by default.

Template is available in `.env.example`.

### 3) API endpoint
Serverless API route is available at:
- `GET /api/documents`
- `GET /api/documents?category=policy-data`

Implementation file:
- `api/documents.js`

### 4) Deploy to Vercel
- Import repository in Vercel.
- Add env vars in **Project Settings -> Environment Variables**:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY` (preferred) **or** `SUPABASE_ANON_KEY`
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- Deploy.

## Team Conventions (Compact)
- Keep business/data config in constants and avoid repeating hardcoded UI blocks
- Keep styling in CSS classes (avoid inline style mutation in events)
- Use semantic elements (`button`, `input`) and basic `aria-label` for interactive controls
- Keep PRs small and focused: UI changes, refactor, and docs should be clear in commit message

## Troubleshooting
- **Port already used**: change port in `package.json` script or stop existing process.
- **`pnpm` not found**: install pnpm globally (`npm i -g pnpm`) or use Corepack.
- **Many `.md` files in project**: most come from `node_modules` dependencies (normal, not app code).
