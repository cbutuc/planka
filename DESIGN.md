---
name: Planka
description: A calm, dark-mode Kanban board for tracking your own work
colors:
  bg: "#0b0f1a"
  surface: "#131826"
  surface-raised: "#1b2233"
  surface-hover: "#212940"
  border: "#262e42"
  border-strong: "#333d57"
  text-primary: "#f1f5f9"
  text-secondary: "#94a3b8"
  text-tertiary: "#64748b"
  accent: "#6366f1"
  accent-hover: "#818cf8"
  accent-muted: "rgba(99, 102, 241, 0.15)"
  status-todo: "#38bdf8"
  status-todo-bg: "rgba(56, 189, 248, 0.12)"
  status-progress: "#fb923c"
  status-progress-bg: "rgba(251, 146, 60, 0.12)"
  status-done: "#34d399"
  status-done-bg: "rgba(52, 211, 153, 0.12)"
  danger: "#f87171"
  danger-bg: "rgba(248, 113, 113, 0.12)"
  warning: "#fbbf24"
typography:
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  title:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1
  label:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
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
    rounded: "{rounded.md}"
    padding: "16px"
  card-hover:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-primary}"
  column:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "12.8px 9.6px"
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

**Creative North Star: "The Late Shift"**

Planka is the workspace open on your screen after everything else has gone quiet — a dim room, one task lamp, nothing competing for attention. The palette is dark by default not because dark mode is the safe AI choice, but because that's the honest condition of a late-night, solo, low-pressure tool: you're not presenting to anyone, you're just moving cards.

That said, this is a documented snapshot of the *current* system, and it carries an open tension worth naming plainly: the accent (`#6366f1` indigo) sitting on a near-black navy background (`#0b0f1a`) is close to the exact "generic AI-SaaS dark mode" pattern PRODUCT.md names as an anti-reference. It isn't wrong today, but it's a known rough edge, not a locked-in choice — a future `/impeccable colorize` pass should push the accent toward something more deliberately chosen rather than the indigo-on-navy default.

What keeps the system calm rather than corporate: soft layered surfaces instead of hard borders, gentle motion on every state change, and status color used sparingly — as a wash behind text, not a loud fill — so the three columns (To Do / In Progress / Done) read at a glance without shouting.

**Key Characteristics:**
- Dark-only, layered-surface depth (bg → surface → surface-raised → surface-hover)
- One accent color, used narrowly (focus rings, primary actions)
- Status color expressed as tinted backgrounds, not solid fills
- Soft, fast transitions (150–300ms) on every interactive state
- Generous internal padding; nothing feels cramped or table-dense

## 2. Colors

A cool, near-black navy base with a narrow indigo accent and three tinted status hues carrying the kanban semantics.

### Primary
- **Late-Shift Indigo** (`#6366f1`): The single accent — primary buttons, focus rings, links. Reserved for actions and state, never decoration. `accent-hover` (`#818cf8`) lightens on interaction; `accent-muted` (`rgba(99,102,241,0.15)`) is the focus-ring wash.

### Neutral
- **Near-Black Navy** (`#0b0f1a`): Page background — the darkest surface, the "room."
- **Panel Navy** (`#131826`): Column background, one step up from the page.
- **Raised Slate** (`#1b2233`): Cards, menus, inputs — the surface closest to the user's hand.
- **Hover Slate** (`#212940`): Interactive hover state on raised surfaces.
- **Hairline Border** (`#262e42`): Default card/column borders — barely-there separation.
- **Strong Border** (`#333d57`): Hover/focus border state, one step more visible.
- **Bright Fog** (`#f1f5f9`): Primary text — titles, body copy.
- **Mid Fog** (`#94a3b8`): Secondary text — descriptions, metadata.
- **Dim Fog** (`#64748b`): Tertiary text — dates, least-important labels.

### Status (kanban semantics)
- **Sky Todo** (`#38bdf8` on `rgba(56,189,248,0.12)` wash): "To Do" column badge and input focus ring.
- **Amber Progress** (`#fb923c` on `rgba(251,146,60,0.12)` wash): "In Progress" column badge and input focus ring.
- **Mint Done** (`#34d399` on `rgba(52,211,153,0.12)` wash): "Done" column badge and input focus ring; doubles as the semantic success color.

### Feedback
- **Coral Danger** (`#f87171` on `rgba(248,113,113,0.12)` wash): Destructive actions (delete column), danger hover states.
- **Amber Warning** (`#fbbf24`): Reserved for warning states.

### Named Rules
**The Wash-Not-Fill Rule.** Status and feedback colors appear as low-opacity background tints (12–15% alpha) behind their saturated counterpart, never as large solid fills. A column badge is a small solid dot; the column body itself only ever gets the wash.

## 3. Typography

**Body Font:** Inter (with system-ui, -apple-system, sans-serif fallback)

**Character:** A single, highly legible grotesque carries every role in the system — no display face, no mono. The calm comes from restraint (one family, four weights) rather than pairing.

### Hierarchy
- **Title** (700, 1.25rem / `--text-xl`, line-height 1): Column headers.
- **Headline** (600, 1.0625rem / `--text-md`, line-height 1): Card titles, menu section headers.
- **Body** (400, 0.9375rem / `--text-base`, line-height 1.6): Default running text, max 65ch per the global reset.
- **Label** (500, 0.8125rem / `--text-sm`, line-height 1): Card descriptions, dates, menu items, badges use an even smaller 0.5rem numeral.

### Named Rules
**The One-Family Rule.** Every text role uses Inter. Hierarchy comes from size and weight (400/500/600/700), never a second typeface.

## 4. Elevation

Soft layered depth: three background steps (`surface` → `surface-raised` → `surface-hover`) do most of the work, backed by low, diffuse shadows rather than hard drop shadows. Nothing sits on a stark white-style shadow; every shadow token is tuned darker and softer for the dark surface it sits on.

### Shadow Vocabulary
- **`shadow-sm`** (`0 1px 2px rgba(0,0,0,0.4)`): Resting state for cards.
- **`shadow-md`** (`0 4px 16px rgba(0,0,0,0.45)`): Card hover, elevated on interaction.
- **`shadow-lg`** (`0 16px 40px rgba(0,0,0,0.55)`): Popover/menu surfaces (the column's "..." menu).
- **`shadow-focus`** (`0 0 0 3px var(--color-accent-muted)`): Focus ring, replaces browser default outline entirely.

### Named Rules
**The Tone-Before-Shadow Rule.** Reach for the next surface tone (`surface` → `surface-raised` → `surface-hover`) before reaching for a heavier shadow. Shadows confirm depth that tone already implies; they don't create it alone.

## 5. Components

### Buttons
- **Shape:** 6px radius (`--radius-sm`) for menu items and inputs; buttons are otherwise unstyled/ghost by default (`background: none; border: none;` per the global reset), taking color from context.
- **New-task button:** Full-width ghost button, secondary text color at rest, shifts to primary text color on hover (`color var(--transition-fast)`); no background change.
- **Menu button (icon-only):** Hover gets `surface-hover` background plus a `scale(1.05)` micro-lift.
- **Hover / Focus:** All button state changes are color/background/transform only — never layout-shifting.

### Cards
- **Corner Style:** 10px radius (`--radius-md`).
- **Background:** `surface-raised` (`#1b2233`), one step brighter than the column it sits in.
- **Border:** 1px hairline (`#262e42`), shifts to `border-strong` (`#333d57`) on hover.
- **Shadow Strategy:** `shadow-sm` at rest → `shadow-md` on hover (see Elevation).
- **Internal Padding:** 16px (`--space-4`), content stacked in a column with 16px gaps.

### Columns
- **Corner Style:** 14px radius (`--radius-lg`), the largest radius in the system — columns are the outermost container.
- **Background:** `surface` (`#131826`), the middle tone between page and card.
- **Status tint:** Column accepts a `todo` / `inProgress` / `done` modifier class that colors its title-count badge solid and its input focus ring with the matching wash.
- **Deletion:** Removing a column fades opacity to 0 and scales to 0.95 over 300ms before unmounting — never an instant disappearance.

### Inputs / Fields
- **Style:** `surface-raised` background, `border-strong` 1px border, 6px radius, full width.
- **Focus:** Border and box-shadow shift to the active column's status color (sky/amber/mint), not the generic indigo accent — inputs borrow their column's semantic color.

### Menus (dropdown)
- **Style:** `surface-raised` background, hairline border, 10px radius, `shadow-lg`, positioned absolute below the trigger.
- **Open/close:** Opacity + `translateY(-6px → 0)` + `scale(0.96 → 1)` over `--transition-fast` (150ms) — never an instant show/hide.
- **Items:** 6px radius, hover gets `surface-hover` background; the destructive item ("Delete") hovers into `danger` text on `danger-bg` wash instead.

## 6. Do's and Don'ts

### Do:
- **Do** use the wash-not-fill pattern for every status/feedback color: a small saturated badge, a large low-opacity background.
- **Do** animate every state change (hover, open/close, delete) — a bare 150–300ms ease transition is the floor, not optional.
- **Do** let inputs and interactive elements inside a column borrow that column's status color for focus rings, rather than defaulting to the generic accent.
- **Do** keep one typeface (Inter) and build hierarchy from weight/size only.
- **Do** treat the three-step surface tone ladder (bg → surface → surface-raised → surface-hover) as the primary depth tool, before adding a shadow.

### Don't:
- **Don't** let this indigo-on-navy pairing calcify as "the brand" — PRODUCT.md names it directly as the generic AI-SaaS dark-mode pattern to move away from; treat the current palette as documented-but-open, not final.
- **Don't** add a second accent color without a clear semantic reason — the system currently earns its calm from a single accent plus three status hues, nothing more.
- **Don't** use `border-left`/`border-right` as a colored stripe accent anywhere (cards, list items, alerts); status is already carried by the badge + wash pattern.
- **Don't** make destructive actions (delete column) instant — the 300ms fade-and-scale-out is load-bearing for the "calm, not corporate" feel.
- **Don't** introduce a dense, form-heavy layout in future screens (task details, settings) — the padding and spacing scale here (12–16px internal, 16px+ between elements) should carry forward, not compress toward an enterprise-table density.
