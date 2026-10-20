# Changelog

## 0.1.0 — 2026-10-20

- Rewritten around a pure, tested sorter (`src/sort.ts`).
- Handles `class` and `className` with double or single quotes; leaves JSX expressions (`className={…}`) alone.
- New command **Organize ClassNames: Sort class names in this file**.
- Settings: `organizeClassnames.onSave` (default on) and `organizeClassnames.languages` (default html, javascript, javascriptreact, typescript, typescriptreact, vue). Previously only html/javascript/typescript were handled and JSX/TSX files were skipped.
- Stable, locale-independent order.
- Packaged `.vsix` attached to the GitHub release.

## 0.0.1

- Initial version: sort on save in HTML, JavaScript and TypeScript.
