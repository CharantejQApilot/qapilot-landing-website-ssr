# QA Pilot Landing Website (SSR)

Next.js landing website for QA Pilot with server-side rendering.

## Prerequisites

- **Node.js** 18.x or later ([nodejs.org](https://nodejs.org))

## Get started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

### Supabase (CMS / blogs / news / careers / admin)

Copy [`.env.example`](.env.example) to `.env.local` and set:

- `NEXT_PUBLIC_SUPABASE_URL` — project URL (e.g. `https://xxxx.supabase.co`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anon public key from **Project Settings → API**

The app reads only these for data access; there is no hardcoded project ref in code. After moving to a new Supabase project, redeploy **Edge Functions** from [`supabase/functions`](supabase/functions) and configure their env vars in the Supabase dashboard.

**Public pages use the anon key (no login).** If content appears in **/admin** but not on the marketing site, add `TO anon, authenticated` on the relevant `SELECT` policies (see migrations under `supabase/migrations/` for blogs, news, `terms_content`, `faqs`, etc.).

### 3. (Optional) Build and run for production

```bash
npm run build
npm start
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command       | Description                    |
| ------------- | ------------------------------ |
| `npm run dev` | Start dev server (hot reload)  |
| `npm run build` | Build for production         |
| `npm start`   | Run production build locally   |
| `npm run lint` | Run ESLint                    |
