// WCAG AA contrast check for the "Serengeti sunset" palette.
// Run: npm run check:contrast   (exits 1 if any pair fails)
// Keep the hex values in step with the @theme block in src/styles/globals.css.

const palette = {
  cream: '#f4f1ec',
  sand: '#efe4d0',
  paper: '#fcfaf6',
  white: '#ffffff',
  ink: '#47475f',
  heading: '#1f1f2e',
  onGold: '#1a1a1a',
  slate: '#5c5348',
  teal: '#012f36',
  charcoal: '#2b2a27',
  footer: '#221f20',
  ivory: '#faf8f5',
  fieldLine: '#9c8452',
  error: '#b42318',
  tealSoft: '#0a4a52',
  action: '#a9542f',
  actionHover: '#8e4426',
  gold: '#e9a23b',
  goldInk: '#8a5a10',
};

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const toHex = (c) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
// Text at `alpha` opacity over `bg`: the colour the eye actually sees.
const over = (fg, alpha, bg) => toHex(rgb(fg).map((v, i) => v * alpha + rgb(bg)[i] * (1 - alpha)));
const luminance = (hex) =>
  rgb(hex)
    .map((v) => v / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    .reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const p = palette;
// [label, text, background, minimum]: 4.5 for normal text, 3 for large/bold text and UI shapes.
const pairs = [
  ['White on action, terracotta (booking buttons)', p.white, p.action, 4.5],
  ['White on action hover', p.white, p.actionHover, 4.5],
  ['On-gold text on gold (day badges, meals)', p.onGold, p.gold, 4.5],
  ['Cream on teal (footer, CTA panels)', p.cream, p.teal, 4.5],
  ['Cream 85% on teal (footer text)', over(p.cream, 0.85, p.teal), p.teal, 4.5],
  ['Cream 75% on teal (footer small print)', over(p.cream, 0.75, p.teal), p.teal, 4.5],
  ['Gold on teal (links on dark cards)', p.gold, p.teal, 4.5],
  ['Ink on cream (body text)', p.ink, p.cream, 4.5],
  ['Ink on sand (body text)', p.ink, p.sand, 4.5],
  ['Ink on white (cards)', p.ink, p.white, 4.5],
  ['Ink on paper (alternate sections)', p.ink, p.paper, 4.5],
  ['Heading on cream', p.heading, p.cream, 4.5],
  ['Heading on paper', p.heading, p.paper, 4.5],
  ['Ink on ivory (wizard body text)', p.ink, p.ivory, 4.5],
  ['Footer title gold on footer', '#d19f4d', p.footer, 4.5],
  ['Slate on paper (secondary text)', p.slate, p.paper, 4.5],
  ['Teal on paper (links, outline buttons)', p.teal, p.paper, 4.5],
  ['Gold-ink on paper (labels, hovers)', p.goldInk, p.paper, 4.5],
  ['Gold-ink focus ring on paper', p.goldInk, p.paper, 3],
  ['Slate on cream (secondary text)', p.slate, p.cream, 4.5],
  ['Slate on sand (secondary text)', p.slate, p.sand, 4.5],
  ['Teal on cream (links, outline buttons)', p.teal, p.cream, 4.5],
  ['Teal on sand (links, outline buttons)', p.teal, p.sand, 4.5],
  ['Gold-ink on cream (labels, hovers)', p.goldInk, p.cream, 4.5],
  ['Gold-ink on sand (labels, hovers)', p.goldInk, p.sand, 4.5],
  ['Gold-ink on white (menu, cards)', p.goldInk, p.white, 4.5],
  ['White on gold-ink (arrow button hover)', p.white, p.goldInk, 4.5],
  ['Gold-ink focus ring on cream', p.goldInk, p.cream, 3],
  ['Gold focus ring on teal', p.gold, p.teal, 3],
  ['Cream on charcoal (footer, CTA panel)', p.cream, p.charcoal, 4.5],
  ['Cream 85% on charcoal (footer, CTA text)', over(p.cream, 0.85, p.charcoal), p.charcoal, 4.5],
  ['Cream 75% on charcoal (footer small print)', over(p.cream, 0.75, p.charcoal), p.charcoal, 4.5],
  ['Gold on charcoal (footer link hover)', p.gold, p.charcoal, 4.5],
  ['Gold focus ring on charcoal', p.gold, p.charcoal, 3],
  ['White on footer (links)', p.white, p.footer, 4.5],
  ['White 60% on footer (link hover)', over(p.white, 0.6, p.footer), p.footer, 4.5],
  ['White 50% on footer (headings, copyright)', over(p.white, 0.5, p.footer), p.footer, 4.5],
  ['White 75% on footer (tagline)', over(p.white, 0.75, p.footer), p.footer, 4.5],
  ['Footer icon on 50% white circle', p.footer, over(p.white, 0.5, p.footer), 3],
  ['White 50% circle against footer (icon shape)', over(p.white, 0.5, p.footer), p.footer, 3],
  ['White focus ring on footer', p.white, p.footer, 3],
  ['Slate on ivory (wizard sub-text)', p.slate, p.ivory, 4.5],
  ['Gold-ink on ivory (wizard Previous, step count, chosen dot)', p.goldInk, p.ivory, 4.5],
  ['Field outline on ivory (wizard inputs)', p.fieldLine, p.ivory, 3],
  ['Error text on ivory (wizard)', p.error, p.ivory, 4.5],
  ['White on action (wizard Next step)', p.white, p.action, 4.5],
];

let failed = 0;
for (const [label, fg, bg, min] of pairs) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2).padStart(5)}:1  (needs ${min})  ${label}  ${fg} on ${bg}`);
}
console.log(failed ? `\n${failed} pair(s) fail WCAG AA.` : `\nAll ${pairs.length} pairs pass WCAG AA.`);
process.exit(failed ? 1 : 0);
