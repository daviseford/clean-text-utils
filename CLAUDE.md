# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Build:** `npm run build` (uses tsup, outputs CJS + ESM + .d.ts to `dist/`)
- **Test:** `npm test` (vitest, single run)
- **Test watch:** `npm run test:watch`
- **Run single test:** `npx vitest run -t "test name pattern"`

## Architecture

TypeScript library exposing direct named functions and four backward-compatible namespaced groups: `get`, `is`,
`strip`, and `replace`.

**Entry points:** `src/index.ts` exposes the named, default, and namespace APIs. Thin files under `src/entries/`
produce tree-shakable package subpaths.

**Module assembly:** `src/module/clean-text-util.ts` builds the public API object (`IModule`) by importing individual utility functions and wiring them into the namespace structure.

**Utility implementations** live in `src/util/`:
- `text-util.ts` — contains most string operations (strip, replace, capitalize, etc.) as an `ITextUtils` object
- Standalone utilities (`checksum.ts`, `diacritic.ts`, `emoji-regex.ts`, `reverse.ts`, `strip-bom.ts`, `strip-gutenberg.ts`) are imported individually

**Type definitions** in `src/definitions/`:
- `module.ts` — `IModule` interface defining the public API shape (get/is/strip/replace namespaces)
- `utils.ts` — `ITextUtils` interface for the internal text-util functions

**Tests:** Vitest tests under `src/__tests__/` cover both the namespace behavior and direct exports. The package smoke
test validates built ESM/CJS root and subpath imports.

**Build:** tsup bundles the root and subpath entries into dual CJS/ESM with TypeScript declarations. Target is ES2022.

**Linting:** Biome handles linting and formatting for source, scripts, and the build config. Run `npm run lint` to
check, `npm run format` to auto-format.

**CI:** GitHub Actions runs lint, type checks, builds, package smoke tests, and unit tests on Node 18/20/22. A
separate Node 22 job validates the packed package, dependency audit, and consumer size budgets.
