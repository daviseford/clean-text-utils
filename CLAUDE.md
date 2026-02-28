# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Build:** `npm run build` (uses tsup, outputs CJS + ESM + .d.ts to `dist/`)
- **Test:** `npm test` (vitest, single run)
- **Test watch:** `npm run test:watch`
- **Run single test:** `npx vitest run -t "test name pattern"`

## Architecture

TypeScript library exposing four namespaced groups of text utilities: `get`, `is`, `strip`, `replace`.

**Entry point:** `src/index.ts` re-exports the namespaces from `src/module/clean-text-util.ts`.

**Module assembly:** `src/module/clean-text-util.ts` builds the public API object (`IModule`) by importing individual utility functions and wiring them into the namespace structure.

**Utility implementations** live in `src/util/`:
- `text-util.ts` — contains most string operations (strip, replace, capitalize, etc.) as an `ITextUtils` object
- Standalone utilities (`checksum.ts`, `diacritic.ts`, `emoji-regex.ts`, `reverse.ts`, `strip-bom.ts`, `strip-gutenberg.ts`) are imported individually

**Type definitions** in `src/definitions/`:
- `module.ts` — `IModule` interface defining the public API shape (get/is/strip/replace namespaces)
- `utils.ts` — `ITextUtils` interface for the internal text-util functions

**Tests:** Single test file at `src/__tests__/clean-text-utils.test.ts` using vitest. Tests import from the module assembly layer, not individual utils.

**Build:** tsup bundles `src/index.ts` into dual CJS/ESM with TypeScript declarations. Target is ES2020.
