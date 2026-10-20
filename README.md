# Organize ClassNames

A small VS Code extension that sorts the class names inside `class="..."` and `className="..."` attributes alphabetically every time you save an HTML, JavaScript or TypeScript file.

Why: on teams, class lists drift (`"p-4 flex mt-2 flex"` in one file, `"flex mt-2 p-4"` in the next). Sorting on save makes diffs smaller and reviews quieter, with no configuration.

## What it does

- Listens to `onWillSaveTextDocument` for `html`, `javascript` and `typescript` documents.
- Finds every `class="…"` / `className="…"` attribute with a regular expression, splits on spaces, drops empties, sorts, and writes the result back only when it changed.
- No settings, no network, no telemetry.

## Limits (by design, for now)

- Only double-quoted static attributes. Template literals and `clsx(...)` calls are left alone.
- Alphabetical order, not Tailwind's recommended order. If you want the Tailwind order, use Prettier with `prettier-plugin-tailwindcss`.

## Run it from source

```bash
npm install
npm run compile      # or: npm run watch
```

Press F5 in VS Code to open an Extension Development Host, open an HTML/JSX file and save it.

MIT.
