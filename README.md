# vlmaxxing_site

Landing site for VLMaxxing — training-free anti-recomputation for video VLMs.

Companion to the paper repo at <https://github.com/jfbastien/VLMaxxing>.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind 4
- Static-rendered (no server runtime needed)
- Deploys to Vercel

## Local dev

```bash
npm install
npm run dev
# http://localhost:3000
```

## Build

```bash
npm run build
# pre-renders all routes as static HTML in .next/
```

## Deploy

Push to GitHub, import the repo in Vercel. No environment variables required.

## Editing the headline numbers

Stats and table cells live at the top of `src/app/page.tsx` as plain TS arrays
(`headlineStats`, `cells`). Keep teaser numbers tied to checked snapshots in
the VLMaxxing repo, especially `paper/arxiv/generated/data/headline_snapshot.json`
and `paper/arxiv/generated/data/scaleout_bundle_snapshot.json`.

## Updating videos

Hero and routing videos live under `public/videos/`, with posters under
`public/thumbs/`. The current hero teaser is `anchored_lure_cut`, and the
three routing cards use the `*_routing_audit` videos from the VLMaxxing
experiment artifacts.
