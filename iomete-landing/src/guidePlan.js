import { ZONES } from './data/content.js';

const EXTRA = [
  { id: 'pricing', label: 'Pricing & free plan', keys: ['price', 'pricing', 'cost', 'free', 'trial', 'license', 'plan', 'support'] },
  { id: 'compare', label: 'Compare with Snowflake, Databricks and DIY', keys: ['compare', 'versus', ' vs', 'snowflake', 'databricks', 'alternative', 'difference', 'better'] },
];

// Stops appended when a query only matches one or two sections, so every
// visitor gets a 3–4 step path that ends in a decision.
const PAD = [
  { id: 'compare', label: 'Compare and decide' },
  { id: 'pricing', label: 'Pricing & free plan' },
  { id: 'proof', label: 'Published proof' },
];

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Short keys ("ai", "bi", "ml") must match whole words, or "air" and "bill" misroute. */
function hit(q, key) {
  const k = key.trim().toLowerCase();
  if (k.length <= 3) return new RegExp(`(^|[^a-z0-9])${esc(k)}s?([^a-z0-9]|$)`).test(q);
  return q.includes(k);
}

/** Score each zone by keyword hits; return an ordered list of 3–4 stops, or null if nothing matched. */
export function planPath(text) {
  const q = ` ${text.toLowerCase()} `;
  const score = (keys) => keys.reduce((n, k) => (hit(q, k) ? n + 1 : n), 0);
  const scored = [
    ...ZONES.map((z) => ({ id: z.id, label: z.audience, s: score(z.keys) })),
    ...EXTRA.map((e) => ({ id: e.id, label: e.label, s: score(e.keys) * 0.8 })),
  ].filter((x) => x.s > 0).sort((a, b) => b.s - a.s);
  if (!scored.length) return null;
  const picks = scored.slice(0, 3).map(({ id, label }) => ({ id, label }));
  for (const p of PAD) {
    if (picks.length >= 3) break;
    if (!picks.some((x) => x.id === p.id)) picks.push(p);
  }
  if (!picks.some((p) => p.id === 'pricing' || p.id === 'compare')) picks.push(PAD[0]);
  return picks.slice(0, 4);
}
