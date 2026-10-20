# Organize ClassNames

A small VS Code extension that sorts the class names inside `class="..."` and `className="..."` attributes alphabetically every time you save an HTML, JavaScript or TypeScript file.

Why: on teams, class lists drift (`"p-4 flex mt-2 flex"` in one file, `"flex mt-2 p-4"` in the next). Sorting on save makes diffs smaller and reviews quieter, with no configuration.

## What it does

- Listens to `onWillSaveTextDocument` for the configured languages (HTML, JS, JSX, TS, TSX, Vue by default).
- Finds every `class="…"` / `className="…"` attribute (double or single quotes) with a regular expression, splits on whitespace, sorts, and writes the result back only when it changed. JSX expressions such as `className={clsx(…)}` are left alone.
- No settings, no network, no telemetry.

## Limits (by design, for now)

- Only static string attributes. Template literals and `clsx(...)` calls are left alone.
- Alphabetical order, not Tailwind's recommended order. If you want the Tailwind order, use Prettier with `prettier-plugin-tailwindcss`.

## Install

From the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=juapperez.organize-classnames), or:

```bash
code --install-extension juapperez.organize-classnames
```

A `.vsix` is also attached to each [GitHub release](https://github.com/juapperez/organize-classnames/releases).

## Settings

| Setting | Default | Meaning |
|---|---|---|
| `organizeClassnames.onSave` | `true` | Sort automatically on save. |
| `organizeClassnames.languages` | html, javascript, javascriptreact, typescript, typescriptreact, vue | Language ids the extension acts on. |

Command palette: **Organize ClassNames: Sort class names in this file**.

## Develop

```bash
npm install
npm test             # pure sorter tests (node:test)
npm run compile      # or: npm run watch; then F5 for an Extension Development Host
npx @vscode/vsce package
```

MIT.
