---
name: Planka
description: A light Kanban board with real card elevation, styled to match a Trello/Asana-style reference
colors:
  bg: "#f7f8fa"
  surface: "#ffffff"
  surface-raised: "#ffffff"
  surface-hover: "#f4f5f7"
  border: "#e4e7ec"
  border-strong: "#c7cdd6"
  text-primary: "#172b4d"
  text-secondary: "#5e6c84"
  text-tertiary: "#63707f"
  accent: "#5b4fe0"
  accent-hover: "#4a3dd9"
  accent-muted: "rgba(91, 79, 224, 0.12)"
  on-solid: "#ffffff"
  status-todo: "#1d4ed8"
  status-todo-bg: "rgba(29, 78, 216, 0.1)"
  status-progress: "#b45309"
  status-progress-bg: "rgba(180, 83, 9, 0.1)"
  status-done: "#15803d"
  status-done-bg: "rgba(21, 128, 61, 0.1)"
  danger: "#dc2626"
  danger-bg: "rgba(220, 38, 38, 0.1)"
  warning: "#b45309"
typography:
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, -apple-system, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  title:
    fontFamily: "Plus Jakarta Sans, system-ui, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, -apple-system, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1
rounded:
  sm: "6px"
  md: "10px"
  lg: "14px"
  full: "999px"
spacing:
  1: "0.25rem"
  2: "0.5rem"
  3: "0.75rem"
  4: "1rem"
  5: "1.5rem"
  6: "2rem"
  8: "3rem"
components:
  card:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "16px"
  card-hover:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-primary}"
  title-pill:
    backgroundColor: "{colors.status-todo-bg}"
    textColor: "{colors.status-todo}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  menu-item:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  menu-item-danger-hover:
    backgroundColor: "{colors.danger-bg}"
    textColor: "{colors.danger}"
    rounded: "{rounded.sm}"
---

# Design System: Planka

## 1. Overview

**Creative North Star: "The Familiar Desk"**

This is the fifth visual era the board has gone through in one day (2026-07-02): indigo-dark colorize → brass-gold-dark → structural Linear-elegance → `ui-ux-pro-max` flat light → **this one**, built to match two reference screenshots the user provided directly (Trello/Asana-style boards). Each era has been a clean break, not a reconciliation with the last — this document describes only the current, standing system.

The references show a familiar, well-worn project-management aesthetic: white cards that visibly lift off a light neutral-gray page via real shadow, generous rounded corners, colorful pill-shaped status labels, comment/attachment metadata, avatar stacks, and a dark sidebar. This app's actual data model (title/description/status/date, from the `tickets` table) is much simpler than the reference — no tags, comments, attachments, priority, or workspace/sidebar concept exist in the schema or routes. The user explicitly chose a **visual-style-only, real-data-only** scope: adopt the reference's card materiality and color language, but style only what the app actually has. No fabricated tags, avatars, counts, or sidebar shell.

**A real, previously-invisible bug got fixed during this pass**: the `in_progress` status value (snake_case, from the `Task` type) never matched the `inProgress` (camelCase) CSS modifier classes used since the very first redesign pass — `styles[status]` silently resolved to `undefined` for that one status, so the "In Progress" column never actually received its status-colored styling in *any* prior era. It went unnoticed because earlier designs used it for a small dot/wash that was easy to miss when absent; the new pill treatment made the missing color obvious immediately. Fixed by renaming the CSS classes to `.in_progress` to match the real data value.

**Key Characteristics:**

- Real elevation is back — shadows tinted toward the text-primary navy hue (not pure black), used for actual depth cues (card rest/hover, floating menu)
- Cards lift on hover (`translateY(-2px)` plus a deeper shadow) — a tactile, "picked up" feel matching the reference
- Column status is a colored pill (light wash background, saturated text) around the column title, not a wash on the whole column or a plain dot
- A neutral (non-colored) circular badge carries the task count, separate from the colored title pill — matching the reference's two-part header (colored label + plain count bubble)
- Radius is generous again (10-14px) — reversing the 0-4px Flat Design ceiling from the previous era
- One accent (violet, `#5b4fe0`) distinct from all three status hues (blue/orange/green), used for the primary "New task" action

## 2. Colors

A light neutral-gray canvas, white elevated cards, dark navy-ink text, one violet accent, and three status hues (blue/orange/green) that double as pill backgrounds (light wash + saturated text) and would work equally well as solid badge fills if ever needed.

### Primary

- **Violet Accent** (`#5b4fe0`): The single accent — "New task" hover text, focus rings. Distinct from `status-todo`'s blue so the two don't compete. 5.43:1 as text against `bg`. `accent-hover` (`#4a3dd9`) is a darkened step (not lightened — this is a text-color hover on a light background, so darkening preserves contrast rather than washing it out).

### Neutral

- **Page Background** (`#f7f8fa`): Light neutral gray — not tinted toward any brand hue, a deliberately generic "app canvas" matching the reference.
- **White Surface** (`#ffffff`): Cards, menus. Separated from the page via real shadow now, not primarily via border (unlike the immediately preceding era, where bg/surface contrast was too close and shadows were banned).
- **Hover Gray** (`#f4f5f7`): Reserved/lightly used; cards signal hover via shadow + lift, not a background shift.
- **Border** (`#e4e7ec`): A light, secondary hairline on cards — present but not load-bearing the way it was in the shadow-less era.
- **Border Strong** (`#c7cdd6`): Hover border state.
- **Text Primary** (`#172b4d`): Titles, body copy. 13.27:1 against bg.
- **Text Secondary** (`#5e6c84`): Descriptions, metadata. 5.00:1.
- **Text Tertiary** (`#63707f`): Dates, least-important labels. 4.76:1.
- **On-Solid** (`#ffffff`): Reserved for any future solid-fill badge/button that needs white text on top.

### Status (kanban semantics)

- **Todo Blue** (`#1d4ed8`, wash `rgba(29,78,216,0.1)`): "To Do" column title pill, input focus ring. 6.70:1 as pill text; would clear 6.70:1 as white-on-solid too if ever used as a fill.
- **Progress Amber** (`#b45309`, wash `rgba(180,83,9,0.1)`): "In Progress" column title pill, input focus ring. 5.02:1 both directions.
- **Done Green** (`#15803d`, wash `rgba(21,128,61,0.1)`): "Done" column title pill, input focus ring; doubles as the semantic success color. 5.02:1 both directions.

### Feedback

- **Danger** (`#dc2626`, wash `rgba(220,38,38,0.1)`): Destructive actions (delete column), danger hover states.
- **Warning** (`#b45309`): Reserved for warning states (shares a hex with progress-amber; no current UI collision since neither is used simultaneously in the same view).

### Named Rules

**The Pill-Not-Column Rule.** Status color lives on the column's title pill only — never on the column body or the task-count badge (which stays neutral gray). This matches the reference's two-part header: a colored label naming the status, and a plain count bubble next to it, visually distinct from each other.

## 3. Typography

**Body Font:** Plus Jakarta Sans (unchanged from the previous era — the reference screenshots don't show a strongly distinctive typeface, so there was no reason to churn this again).

### Hierarchy

- **Title** (700, 1.25rem, line-height 1): Card titles are bold — matches the reference's heavy card-title weight.
- **Pill Label** (700, `--text-xs`, uppercase, letter-spacing 0.03em): Column status pill text — small, bold, uppercase, tracked out, matching the reference's chip labels.
- **Body** (400, 0.9375rem, line-height 1.6): Default running text, card descriptions.
- **Label** (500, 0.8125rem, line-height 1): Dates, menu items.

### Named Rules

**The One-Family Rule.** Every text role uses Plus Jakarta Sans. Hierarchy comes from size, weight, and case (the pill label's uppercase treatment is the one deliberate exception to "no all-caps," earned because it's a small, deliberate chip label, not running text).

## 4. Elevation

Real elevation, reintroduced after the previous era's flat-design shadow ban. Cards carry a soft shadow at rest and a deeper one on hover, paired with a `translateY(-2px)` lift — the reference's cards visibly separate from the page and respond to interaction with a "picked up" feel, not just a color change.

### Shadow Vocabulary

- **`shadow-sm`** (`0 1px 2px rgba(23,43,77,0.08)`): Card resting state. Tinted toward the text-primary navy hue, not pure black — reads soft, not smudgy.
- **`shadow-md`** (`0 4px 12px rgba(23,43,77,0.1)`): Card hover, paired with the `translateY(-2px)` lift.
- **`shadow-lg`** (`0 10px 24px rgba(23,43,77,0.14)`): The dropdown menu — needs to read clearly as floating above everything else on the board.
- **`shadow-focus`** (`0 0 0 3px var(--color-accent-muted)`): Focus ring, unaffected by the elevation system either way.

### Named Rules

**The Shadow-Tint Rule.** Every shadow is tinted toward `text-primary`'s navy hue (`rgba(23,43,77,...)`), never pure black (`rgba(0,0,0,...)`). A navy-tinted shadow on a cool-neutral page reads as soft ambient depth; a pure-black shadow reads as a harsh cutout.

## 5. Components

### Buttons

- **Shape:** 6px radius for menu items and inputs; buttons are otherwise unstyled/ghost by default, taking color from context.
- **New-task button:** Full-width ghost button, secondary text color at rest, shifts to the violet accent on hover. Presses to `scale(0.98)` on `:active`.
- **Menu button (icon-only):** Hover gets `surface-hover` background plus a `scale(1.05)` micro-lift; presses to `scale(0.95)`.

### Cards

- **Corner Style:** 14px radius (`--radius-lg`) — generous, matching the reference's soft-rounded cards.
- **Background:** White, with real shadow doing most of the separation work; a light border (`#e4e7ec`) is present but secondary.
- **Shadow Strategy:** `shadow-sm` at rest → `shadow-md` on hover, paired with `translateY(-2px)` — the card visibly lifts, not just darkens its edge.
- **Title weight:** `h3` inside `.card` is `font-weight-semibold` (600).
- **Press feedback:** `translateY(-2px) scale(0.98)` on `:active` — stays lifted while pressed, doesn't snap back to flush.
- **Internal Padding:** 16px (`1rem`), content stacked with a 10px internal gap.

### Columns

- **No visible container** — carried forward from the structural redesign two eras ago; a header (colored title pill + neutral count badge + "..." menu) and a vertical stack of cards, sitting directly on the page background.
- **Title pill:** Colored wash background + saturated text, uppercase, small, bold, pill-radius — see the Pill-Not-Column Rule.
- **Count badge:** Neutral gray circle (`border` color background, `text-primary` text) — deliberately not status-colored, so it doesn't compete with the pill.
- **Column gutter:** 2rem gap between columns, unchanged.
- **Deletion:** Removing a column fades opacity to 0 and scales to 0.95 over 250ms before unmounting.

### Inputs / Fields

- **Style:** White background, `border-strong` 1px border, 6px radius, full width.
- **Focus:** Border and box-shadow shift to the active column's status color (blue/amber/green) — inputs borrow their column's semantic color. (Fixed alongside the title-pill bug: the `in_progress` focus-ring rule was equally affected by the class-name mismatch and is now correctly wired.)

### Menus (dropdown)

- **Style:** White background, light border, 10px radius, `shadow-lg`, positioned absolute below the trigger.
- **Open/close:** Opacity + `translateY(-6px → 0)` + `scale(0.96 → 1)` over 150ms — never an instant show/hide.
- **Transform origin:** `top right` — scales from its trigger's corner, not the CSS default of center.
- **Items:** 6px radius, hover gets `surface-hover` background, presses to `scale(0.97)`; the destructive item ("Delete") hovers into `danger` text on `danger-bg` wash.

## 6. Do's and Don'ts

### Do:

- **Do** use real shadow (tinted navy, per the Shadow-Tint Rule) for card and menu elevation — this era's system is built on it, unlike the immediately preceding flat-design era.
- **Do** keep status color on the title pill only, never the column body or the count badge (Pill-Not-Column Rule).
- **Do** lift cards on hover (`translateY` + deeper shadow) — the tactile "picked up" feel is part of matching the reference, not just a color change.
- **Do** keep the radius generous (10-14px) — this era deliberately reverses the previous 0-4px ceiling.
- **Do** style only real data (title, description, date, status). If a future ask references tags, avatars, comments, or a sidebar, treat that as a scope question (real feature vs. mock), not an automatic yes.

### Don't:

- **Don't** fabricate placeholder tags, avatar images, comment/attachment counts, or a sidebar shell to look more like the reference — the user explicitly chose real-data-only scope. Flag the gap instead of mocking it.
- **Don't** reintroduce the previous era's shadow ban or 0-4px radius ceiling — those belonged to the `ui-ux-pro-max` flat-design system, now superseded.
- **Don't** assume a status modifier class works just because it's spelled consistently elsewhere in the CSS — verify it actually matches the real data value. The `inProgress`/`in_progress` mismatch silently broke status styling for one column across four prior eras before this pass caught it.
- **Don't** color the task-count badge — it stays neutral so the colored title pill is the only status signal in the header.
- **Don't** make destructive actions (delete column) instant — the fade-and-scale-out stays load-bearing for a considered, non-jarring feel.
