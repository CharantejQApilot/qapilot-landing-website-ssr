# QApilot — Section Archetypes (Momentic-inspired layout)

**Scope is layout only.** This pack describes how sections are *composed and aligned*, inspired by [Momentic](https://momentic.ai/).

| In scope | Out of scope |
|---|---|
| Section archetypes (columns, rhythm, order) | New colours |
| Alignment / grid / band spacing | New fonts (no Space Mono) |
| Hairline vs card elevation patterns | Copy / headline / CTA text changes |
| Reusing existing product UI as media | Palette, type scale, or brand voice rewrites |

Use the site’s current tokens, type, and content as-is. Swap **structure**, not skin.

## Files

| File | Purpose |
|---|---|
| [`01-DESIGN-LANGUAGE.md`](./01-DESIGN-LANGUAGE.md) | What to steal from Momentic (composition only) |
| [`02-SECTION-ARCHETYPES.md`](./02-SECTION-ARCHETYPES.md) | `S01`–`S15` layout recipes + homepage order |
| [`03-ADOPTION.md`](./03-ADOPTION.md) | Incremental remapping of existing sections |
| [`layout.css`](./layout.css) | Layout utilities (grid, band, ledger, split) — no colour system |
| [`reference.html`](./reference.html) | Alignment specimen using **existing** site colours/fonts |

## The layout moves (not a rebrand)

1. **Hero = copy column + product media column** (not a stacked marketing collage).
2. **Trust rail flush under the hero** — one logo row, not three.
3. **Telemetry as a full-bleed strip** under trust (metrics in a reading order, not card grids).
4. **Feature ledgers share hairlines** instead of floating soft cards.
5. **Feature splits alternate media side** (5/6 or 6/5), device/product frame as the media.
6. **Light bands for argument, existing navy/dark bands for “product running”** — only where the site already uses dark sections; don’t invent new hues.
7. **Closing band = one primary CTA** (same button styles as today).

Open `reference.html` in a browser to see alignments, not a new brand.