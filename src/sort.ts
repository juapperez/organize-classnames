/** Pure part of the extension: find class attributes and sort their tokens. No VS Code imports, so it is unit-testable. */
export type Edit = { start: number; end: number; text: string };

// class="…" / className='…' with either quote; the value must not contain the quote used.
const ATTR = /(?<![\w-])(class|className)\s*=\s*(["'])([^"'{}]*?)\2/g;

export function sortTokens(value: string): string {
  const tokens = value.split(/\s+/).filter(Boolean);
  const sorted = [...tokens].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)); // stable, byte order, deterministic across locales
  return sorted.join(' ');
}

/** Returns one edit per attribute whose token order changes. Offsets are into `text`. */
export function classEdits(text: string): Edit[] {
  const edits: Edit[] = [];
  for (const m of text.matchAll(ATTR)) {
    const value = m[3];
    const sorted = sortTokens(value);
    if (sorted === value) continue;
    const start = (m.index ?? 0) + m[0].length - 1 - value.length; // just after the opening quote
    edits.push({ start, end: start + value.length, text: sorted });
  }
  return edits;
}
