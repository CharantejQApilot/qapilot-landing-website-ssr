# Composition language (layout only)

Inspired by [Momentic](https://momentic.ai/). **Do not change colours, fonts, or content.**

---

## 1. What Momentic gets right (steal this)

| Mechanic | Layout meaning for us |
|---|---|
| Thesis hero | Two-column: claim left, product surface right. Two CTAs max in that band (keep existing labels). |
| Trust under hero | Single full-width logo rail, flush — no gap, no second/third marquee. |
| Telemetry ticker | Horizontal instrument strip; label + value pairs — not a metrics *card* grid. |
| Numbered process | Only when order is real (build → release). Horizontal rail desktop, stack mobile. |
| Feature splits | Copy \| media alternating sides; media is a framed product surface. |
| Capability grid | Shared outer border + internal hairlines (ledger), not independent shadowed cards. |
| Proof split | Quote column + outcomes column with a vertical hairline. |
| Evidence list | Dense rows (chip · title · impact) — when/if we already have that content. |
| Closing CTA | Centred, short, one primary button — same styles as current buttons. |

## 2. What we are not doing

- No new palette (no orange-as-system, no lavender, no Momentic warm paper).
- No new typefaces or mono “third voice.”
- No headline / body / CTA copy rewrites.
- No inventing metrics, logos, or bug stories.
- No forcing every band onto a new colour — reuse `section-full`, `section-cream`, `section-navy`, `bg-brand-dark` as they exist today.

## 3. Alignment rules

- **Container:** keep current marketing width utilities (`section-full` / existing max-widths). Prefer one consistent content column; avoid random `max-w-*` per section.
- **Band padding:** one vertical rhythm site-wide (use existing section padding; don’t mix tiny and huge bands without reason).
- **Hairline separators** between bands beat large empty gaps + drop shadows for structure.
- **12-col thinking:** hero ~6/6; feature split ~5/1/6 or mirror; proof ~7/5.
- **One job per band:** one heading (existing copy), one supporting line if it already exists, one media or ledger — don’t stuff stats + logos + CTAs into the same viewport as the hero.
- **Elevation:** prefer shared borders for grids; keep current shadows only on floating UI (header, dialogs).

## 4. Signature media (layout role, not new art direction)

Momentic repeats editor/terminal chrome. We already have product visuals (device frames, Core Advantage, graphs). **Reuse those objects** in the media column of splits/hero instead of abstract card icons. No requirement to build a new graph illustration in this pack — wire existing assets into the archetype slots.

## 5. Content policy

Leave strings alone. If an archetype expects fewer CTAs or one marquee, **hide/consolidate duplicates structurally** without rewriting marketing copy. If Evidence Ledger content doesn’t exist, skip that archetype.