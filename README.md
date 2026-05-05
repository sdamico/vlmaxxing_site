# vlmaxxing_site

Landing site for codec-through — training-free anti-recomputation for video VLMs.

Companion to the paper repo at <https://github.com/jfbastien/codec-through>.

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
(`headlineStats`, `cells`). When the paper updates the n=21 medians or extends
to 64f / 128f, edit those arrays in one commit.
