# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ZenoxBlog — a Vue 3 blog frontend built with Vite, TypeScript, Pinia, and Vue Router.

## Commands

```sh
npm run dev          # Start dev server with HMR
npm run build        # Type-check then production build
npm run preview      # Preview production build locally
npm run test:unit    # Run Vitest unit tests
npm run type-check   # Run vue-tsc type checking only
npm run format       # Format src/ with Prettier
```

## Architecture

**Entry point:** `src/main.ts` — creates the Vue app, installs Pinia and Vue Router, mounts to `#app`.

```
src/
  main.ts              # App bootstrap
  App.vue              # Root component
  router/index.ts      # Vue Router (createWebHistory, routes currently empty)
  stores/              # Pinia stores (setup-function syntax)
  __tests__/           # Vitest specs co-located by convention
```

- **Path alias:** `@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`).
- **State management:** Pinia with setup-function store syntax (see `src/stores/counter.ts` for the pattern).
- **Testing:** Vitest + jsdom + `@vue/test-utils`. Test config extends the Vite config so the `@` alias works in tests too.
- **Formatting:** Prettier with `semi: false`, `singleQuote: true`, `printWidth: 100`.

## TypeScript Config

The root `tsconfig.json` uses project references to three tsconfigs:
- `tsconfig.app.json` — app source (extends `@vue/tsconfig/tsconfig.dom.json`, `noUncheckedIndexedAccess: true`)
- `tsconfig.node.json` — Vite/Vitest config files
- `tsconfig.vitest.json` — test files, extends `tsconfig.app.json` but overrides `include`/`exclude` and adds `node` + `jsdom` types

An `env.d.ts` file in the project root (or `src/`) is expected for Vite client-side type declarations (e.g., `/// <reference types="vite/client" />`).

## Other Notes

- **Node version:** `^20.19.0 || >=22.12.0` (per `engines` in package.json).
- **Dev server** includes `vite-plugin-vue-devtools` for Vue DevTools integration.
- **Vitest config** (`vitest.config.ts`) merges the Vite config so the `@` alias is available in tests. Test environment is `jsdom`.
- **Build script** uses `npm-run-all2` to run type-check and vite build in parallel.
