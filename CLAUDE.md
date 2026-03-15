# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Start development server
bun run build    # Production build
bun run check    # TypeScript + Svelte type checking
bun run lint     # Prettier + ESLint checks
bun run format   # Auto-format with Prettier
```

## Architecture

**漢字テスト創作ツール** is a static, client-side SvelteKit app for creating printable Japanese kanji practice tests. All state lives in URL query parameters — no backend, no database.

### Core data model

```typescript
interface Vocab {
	front: string; // kanji (漢字)
	back: string; // reading (読み)
}
```

Vocab pairs are stored as URL query params (`?front1=...&back1=...&front2=...`), encoded with `encodeURIComponent`. State updates use `window.history.pushState()`.

### Routing

| Route           | Purpose                                                    |
| --------------- | ---------------------------------------------------------- |
| `/`             | Main creation UI — input vocab, import CSV, generate links |
| `/front`        | Test sheet: show kanji, blank for readings                 |
| `/front/answer` | Answer sheet: kanji + readings in red                      |
| `/back`         | Test sheet: show readings, blank for kanji                 |
| `/back/answer`  | Answer sheet: readings + kanji in red                      |

All routes are pre-rendered static HTML (`prerender = true`, `ssr = false`). The static adapter outputs files suitable for CDN/static hosting.

### Key files

- `src/routes/+page.svelte` — main creation interface with dynamic form fields, CSV import, random selection
- `src/lib/DownloadSection.svelte` — reusable component that generates test/answer links from the current vocab list
- `src/lib/types.ts` — `Vocab` interface
- `src/routes/front/` and `src/routes/back/` — test display pages, designed for print/PDF export

### Patterns

- **Main page** uses polished Tailwind styling (indigo header, white cards, styled inputs/buttons)
- **Test/answer pages** use minimal, print-first styling — plain table borders only, no decorative layout. Answer text uses `text-red-600`.
- Tailwind v4 is configured via the `@tailwindcss/vite` Vite plugin (not PostCSS). `app.css` uses `@import "tailwindcss"`.
- ESLint uses flat config (`eslint.config.js`); `.eslintrc.cjs` and `.eslintignore` are legacy files superseded by the flat config (`.eslintignore` produces a harmless warning but cannot be deleted). `svelte/no-navigation-without-resolve` and `svelte/require-each-key` are disabled — links use full absolute URLs with `target="_blank"`, and vocab lists have no stable keys.
- The project uses **bun** as the package manager (`bun.lock` lockfile). CI uses `oven-sh/setup-bun@v2` and deploys to GitHub Pages via `.github/workflows/build-and-deploy.yml`.
- Svelte 5 (legacy-mode syntax used throughout — `$:`, `export let`, `on:event`). Layout uses `$props()` / `{@render children()}`.
- CSV import expects semicolon-delimited `front;back` pairs, one per line.
- Random selection uses Fisher-Yates shuffle, capped at 20 items.
