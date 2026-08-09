# Section archetypes — layout recipes

IDs (`S01`–`S15`) name **layouts**. Colours, fonts, and copy stay as on the live site.

Every band: one purpose. Map existing sections → an ID. Don’t invent new copy to fill a slot.

---

## S01 · Thesis Hero

```
|  copy (~6)     |  product media (~6)  |
|  eyebrow*      |  device / graph /    |
|  h1 (existing) |  existing showcase   |
|  lead*         |                      |
|  CTA group     |                      |
+------------------------------------------+
|  S02 trust rail (flush)                  |
```

\*Only if already present.  
CTAs: keep current buttons/styles; prefer the existing primary + secondary pair (drop extras by structure, not rewrite).

---

## S02 · Trust Rail

Full width under hero. Label (optional, existing) + **one** logo marquee. Collapse duplicate marquees into this slot.

---

## S03 · Telemetry Strip

Full-bleed strip (use existing dark/navy section styles if the site already does for metrics). Horizontal label→value items. Not a 3-column card grid.

---

## S04 · Product Surfaces

Wide band for “product running”: combine existing device / log / walkthrough into one composition (e.g. 3 | 5 | 4 or 4 | 8). Prefer existing navy/dark section classes.

---

## S05 · Pipeline Sequence

Build→release steps in one horizontal sequence (stack on mobile). **Only numbered layout** when the current content is already a sequence. Kill triple-clone carousels — one rail.

---

## S06 · Capability Ledger

```
┌──────┬──────┬──────┐
│ cell │ cell │ cell │
├──────┼──────┼──────┤
│ cell │ cell │ cell │
└──────┴──────┴──────┘
```

Shared outer border + internal 1px rules. Same card content as today — new **alignment**, not new design chrome (no icon circles required; keep icons if content already has them).

---

## S07 · Feature Split

```
| copy (~5) | gap | media (~6) |   or mirrored
```

Alternate media side across consecutive S07s. Media = existing framed image/video/device — not a new illustration language.

---

## S08 · AI / CoWork Panel

Single short band using existing dark/AI section styling. One heading + one surface (existing CoWork / self-heal media). Layout density over new colour.

---

## S09 · Proof Split

```
| quote (~7) | outcomes (~5) |
```

Vertical hairline between. Use existing testimonial + metric content.

---

## S10 · Evidence List

Dense row list (chip · title · detail · impact). **Only if content already exists.** Otherwise skip — do not invent bugs.

---

## S11 · Comparison Matrix

Keep real `<table>` markup. Sticky header / first column on small screens. Alignment and spacing cleanup only.

---

## S12 · Ecosystem Stack

Integrations grouped in a static grid (Planning / Comms / CI…) if groupings already exist or can be structural without new marketing copy. One grid — not triple marquees.

---

## S13 · Compatibility Row

Frameworks as equal cells in one ledger/row (existing framework section content).

---

## S14 · Closing CTA

Centred band, existing journey/CTA copy and button component. One primary control in the band.

---

## S15 · Interactive demo (optional, later)

Layout slot for an interactive product demo beside a graph/log. Ship only when product is ready — not part of colour/type work.

---

## Homepage remap (structure only)

| Order | Archetype | Typical current source |
|---|---|---|
| 1 | S01 | Hero |
| 2 | S02 | Logo / clients marquee (dedupe) |
| 3 | S03 | By The Numbers / metrics |
| 4 | S04 | Core Advantage / product showcase |
| 5 | S05 | Build → Release readiness |
| 6 | S06 | Feature / velocity cards |
| 7 | S07 × n | Platform / velocity deep dives |
| 8 | S08 | CoWork / AI teaser (if present) |
| 9 | S13 | Modern frameworks |
| 10 | S09 | Testimonials |
| 11 | S12 | Integrations |
| 12 | S14 | Closing CTA |
| — | S10 / S15 | Skip until content/product exists |

Compare pages → **S11**. Role pages → **S07** + **S06** + **S14**.