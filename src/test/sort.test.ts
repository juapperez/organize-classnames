import { test } from 'node:test';
import assert from 'node:assert/strict';
import { classEdits, sortTokens } from '../sort';

test('sorts tokens and collapses whitespace', () => {
  assert.equal(sortTokens('p-4  flex mt-2'), 'flex mt-2 p-4');
});
test('is stable and keeps duplicates', () => {
  assert.equal(sortTokens('b a b'), 'a b b');
});
test('finds class and className with both quote styles', () => {
  const src = `<div class="z a"><span className='y x'></span></div>`;
  const out = apply(src, classEdits(src));
  assert.equal(out, `<div class="a z"><span className='x y'></span></div>`);
});
test('leaves sorted attributes and JSX expressions alone', () => {
  const src = `<div class="a b" className={clsx('z', 'a')}></div>`;
  assert.deepEqual(classEdits(src), []);
});
test('does not touch unrelated attributes', () => {
  const src = `<div data-class="z a" title="z a" class="z a"></div>`;
  assert.equal(apply(src, classEdits(src)), `<div data-class="z a" title="z a" class="a z"></div>`);
});
function apply(text: string, edits: { start: number; end: number; text: string }[]) {
  let out = text;
  for (const e of [...edits].sort((a, b) => b.start - a.start)) out = out.slice(0, e.start) + e.text + out.slice(e.end);
  return out;
}
