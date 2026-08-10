# Adoption — remapping layouts only

**Do not** change colours, fonts, or marketing copy. Remap section **structure** to archetypes in `02-SECTION-ARCHETYPES.md`.

## Phase 0 — Layout utilities

1. Add `layout.css` (band/grid/ledger/split helpers that use **existing** CSS variables / Tailwind tokens only).
2. Import in `globals.css`.
3. No font loader changes. No palette edits in `:root`.

**Verify:** visual delta ≈ none until a section opts into the helpers.

## Phase 1 — Homepage shell rhythm

- Hero → **S01** two-column (existing `HomeHeroContent` + existing media).
- Trust → **S02** single marquee (remove duplicate marquees by structure).
- Keep CTA components (`HomeHeroCta`, etc.) untouched stylistically.

## Phase 2 — Metrics + product bands

- Metrics cards → **S03** strip alignment.
- Core Advantage / showcase → **S04** composition using existing dark section classes.

## Phase 3 — Ledgers + splits

- Feature card grids → **S06** shared-border ledger (same cell copy).
- Deep-dive sections → **S07** alternating splits.

## Phase 4 — Rest of marketing

- Pipeline → **S05**; frameworks → **S13**; integrations → **S12**; testimonials → **S09**; closing → **S14**.
- Compare → **S11** spacing/sticky only.

## Guardrails

- [ ] `globals.css` colour tokens unchanged
- [ ] `fonts.ts` unchanged
- [ ] No copy string edits in components/pages
- [ ] SEO: heading order, metadata, JSON-LD untouched
- [ ] CWV: no CLS from header/promo/logo; no new webfonts
- [ ] Sanity-check still green

## First PR

Phase 0 + S01/S02 on homepage only. Diff should be mostly class/structure, not new hex or font families.

---

## Implementation status (sitewide)

Shared primitives:

- `src/styles/signal/layout.css` (imported from `globals.css`)
- `MarketingThesisHero` — S01 left-aligned heroes
- `MarketingLedger` / `MarketingLedgerCell` — S06 grids
- `MarketingSectionHeader` — flush band headers
- `CompareHeroSection` — thesis hero

Rolled out across homepage, product/role/compare/alternatives, hubs, and book-demo. Listing content cards (blog tiles, etc.) stay as interaction containers.