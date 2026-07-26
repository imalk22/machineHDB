# Site background redesign — warm kitchen / ember

**Date:** 2026-07-26  
**Project:** Kottu Cutting Machine landing page  
**Status:** Implemented

## Goal

Replace the current navy + blue blueprint grid background with a single site-wide **warm kitchen / flame** atmosphere that matches the ad creative and orange CTAs, while keeping all existing section content and layout.

## Decisions

| Choice | Selection |
|--------|-----------|
| Mood | Warm kitchen / flame (charcoal + orange/amber) |
| Texture | Soft glow + subtle ember dots |
| Approach | Replace `BlueprintPattern` with a new fixed background layer |

## Out of scope

- Changing product copy, FAQ, videos, or section order
- Full-bleed photo backgrounds
- Recoloring every card/button (keep existing white text + orange CTA tokens)
- Light-mode theme

## Current state

- `app/page.tsx` and `app/layout.tsx` use `bg-navy` (`#0b1f3a`)
- `components/BlueprintPattern.tsx` draws blue radial orbs + a 60px blue grid at ~7% opacity
- Sections are mostly `bg-transparent` so the fixed pattern shows through

## Target design

### Base color

- Primary page/body background: charcoal `#0C0C0E` (existing `charcoal` token)
- Update `html` / `body` / main wrappers from navy flat fill to charcoal so no blue peeks through on overscroll

### Atmosphere layer (replaces BlueprintPattern)

Fixed, full-viewport, non-interactive layer (`pointer-events-none`, `z-0`):

1. **Soft flame glows**
   - Top-left: large soft radial using `flame` / orange (`rgba(255, 107, 26, ~0.28–0.35)`)
   - Bottom-right: smaller amber radial (`rgba(255, 179, 0, ~0.14–0.20)`)
   - Optional third weaker glow mid-page for depth (keep subtle)

2. **Ember dots**
   - Tiny low-opacity dots (`rgba(255, 179, 0, ~0.12–0.18)`), ~24–32px spacing
   - Sparse feel — atmosphere only, not a busy pattern

3. **No blue grid**
   - Remove the current `linear-gradient` blueprint lines entirely

### Content unchanged

- Keep section structure, Reveal animations, sticky CTA, floating call button
- Keep glass/card borders (`border-white/15`, `bg-white/10`) — they still read well on charcoal
- Keep brand CTA orange (`#FF6B00` / `brand-cta`)

## Implementation outline

1. Rewrite `components/BlueprintPattern.tsx` (or rename to `SiteBackground.tsx` and update imports) to render the warm glow + ember pattern
2. Set `html` / `body` / `main` background to charcoal instead of navy where the page canvas shows
3. Spot-check mobile: pattern must remain fixed, low cost (CSS only, no images), and not hurt text contrast
4. No new dependencies

## Success criteria

- Blue grid / blue glow orbs are gone site-wide
- Background reads as warm charcoal with soft orange/amber light and faint ember dots
- Page content, videos, and ad banner remain unchanged and readable
- Works on mobile and desktop without extra asset downloads

## Risks

- Over-strong orange glow can wash out white text → keep glow opacity moderate
- Dense ember dots can look noisy → keep spacing large and opacity low
