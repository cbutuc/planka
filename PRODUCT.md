# Product

## Register

product

## Users

A single builder (the developer themselves) using Planka to track their own tasks and side-project work. This is a learning project first — there's no team, no onboarding funnel, no stakeholder demanding enterprise polish. The "user" opens the board, drags cards between To Do / In Progress / Done, and wants the tool to stay out of their way while they work.

## Product Purpose

Planka is a Jira-like Kanban board: projects contain tickets, tickets move across status columns via drag-and-drop. It exists to give the builder a real full-stack app (React + Vite + TS client, Express + Postgres server) to practice on, so success looks like a board that's genuinely pleasant to use day-to-day, not just functionally correct.

## Brand Personality

**Reset 2026-07-02 (second reset the same day).** The board has now had five visual eras in one day: indigo-dark colorize → brass-gold-dark → structural Linear-elegance → `ui-ux-pro-max` flat light (mint/orange, no shadows) → **the current one**, matching two reference screenshots the user provided directly (Trello/Asana-style boards: white cards with real shadows, generous rounded corners, colored status pills, a light neutral-gray canvas). Each reset is a clean break, not a reconciliation with what came before — treat only the current system (see DESIGN.md) as standing; earlier eras are history.

The board now reads as a **familiar, polished project-management tool**: light neutral-gray page, white cards that lift with real shadow, colored pill-shaped status labels on each column, a violet accent distinct from the blue/orange/green status hues. Scope was deliberately kept to a **visual restyle of real data only** — the reference screenshots show tag pills, avatar stacks, comment/attachment counts, priority badges, and a dark sidebar, none of which exist in this app's schema or routes. The user explicitly chose not to fabricate placeholder data or build a sidebar shell; only title/description/date/status (what the app actually has) are styled.

## Anti-references

Earlier anti-references (indigo-on-navy dark mode, the flat-design shadow ban) no longer apply — don't re-litigate prior resets' reasoning against the current system. Going forward from this reset:

- **Fabricated data.** Don't add tag pills, avatar images, comment/attachment counts, priority badges, or progress bars unless they're backed by real schema/API changes — the reference screenshots have all of these, but this app's `tickets` table doesn't, and the user explicitly chose real-data-only over mocking them.
- **A sidebar/workspace shell.** The reference screenshots show one; the user explicitly declined it — this app is a single board page, not a multi-project workspace.
- **Losing shadows again.** This is a shadow-based design now (real elevation, tinted navy not pure black) — don't reintroduce the flat-design shadow ban from the previous era.

## Design Principles

- Match the reference honestly — real elevation (shadows), generous rounded corners (10-14px), colored pill status labels, light neutral canvas.
- Don't invent data to fill out a richer reference. Style what exists; flag what doesn't rather than faking it.
- Status should read at a glance — the todo/in_progress/done column semantics are core to the product and deserve clear, distinct color treatment (blue/orange/green pills, verified ≥4.7:1 as text on their own wash).
- Motion signals state, not decoration — drag, drop, column edits, and deletions should feel physically responsive; card hover now lifts (`translateY`) in addition to deepening its shadow, matching the reference's tactile card feel.
- Small and honest — this is a learning project; prefer finishing real flows (task details, column editing) over polishing surfaces nobody will use.

## Accessibility & Inclusion

Standard best practice: WCAG AA contrast (4.5:1 body text, 3:1 large text), full keyboard navigation for drag-and-drop and menus, visible focus states, and `prefers-reduced-motion` alternatives for all transitions/animations.
