# Product

## Register

product

## Users

A single builder (the developer themselves) using Planka to track their own tasks and side-project work. This is a learning project first — there's no team, no onboarding funnel, no stakeholder demanding enterprise polish. The "user" opens the board, drags cards between To Do / In Progress / Done, and wants the tool to stay out of their way while they work.

## Product Purpose

Planka is a Jira-like Kanban board: projects contain tickets, tickets move across status columns via drag-and-drop. It exists to give the builder a real full-stack app (React + Vite + TS client, Express + Postgres server) to practice on, so success looks like a board that's genuinely pleasant to use day-to-day, not just functionally correct.

## Brand Personality

Calm and friendly, not sharp-and-serious or Linear-dense. The tool should feel low-pressure — soft edges, generous breathing room, nothing that feels like it's tracking OKRs. It should read as *intentionally* calm, not accidentally generic.

## Anti-references

Generic AI-SaaS dark mode: indigo accent on navy surfaces, the templated look every AI-scaffolded dashboard defaults to. The current tokens (`--color-accent: #6366f1` on `--color-bg: #0b0f1a`) sit squarely in this pattern and are a known rough edge to revisit, not a locked-in direction.

Also avoid the dense, form-heavy, enterprise-Jira feel — even though the app is "Jira-like" in function, it shouldn't look like it.

## Design Principles

- Calm over dense — favor breathing room and soft transitions over compressed, data-table density.
- Earn the dark mode — if dark stays, the palette should feel deliberately chosen (a real hue strategy), not the default indigo-on-navy scaffold.
- Status should read at a glance — the todo/progress/done column semantics are core to the product and deserve clear, distinct color treatment.
- Motion signals state, not decoration — drag, drop, column edits, and deletions should feel physically responsive (the codebase already reaches for this with `--transition-*` tokens and remove animations).
- Small and honest — this is a learning project; prefer finishing real flows (task details, column editing) over polishing surfaces nobody will use.

## Accessibility & Inclusion

Standard best practice: WCAG AA contrast (4.5:1 body text, 3:1 large text), full keyboard navigation for drag-and-drop and menus, visible focus states, and `prefers-reduced-motion` alternatives for all transitions/animations.
