# Current Work

## Status

Item 1 of PLAN.md — create ticket form. Done so far:

- `client/src/lib/api.ts` — `createTicket()` fixed to POST `/api/tickets` with `project_id` in the body (was 404ing against a route that never existed).
- `client/src/components/post-card/post-card.tsx` — date bug fixed; takes `createdAt` and derives the display string with `new Date(createdAt).toLocaleDateString()`.
- `client/src/components/create-task-form/create-task-form.tsx` + `.module.css` — built and styled per DESIGN.md (white surface, `border-strong` inputs, status-colored focus ring reused from `post-column.module.css`, violet Save button). Placeholder contrast fixed (was browser-default gray, now `--color-text-tertiary`). Added a `prefers-reduced-motion`-gated fade/translateY entrance via `@starting-style`.
- `client/src/components/post-column/post-column.tsx` — dead `showForm` toggle replaced with real `CreateTaskForm` render; `showForm`/`onOpenForm`/`onCloseForm` now come in as props (state lifted, see next line).
- `client/src/pages/board.tsx` — `activeForm: string | null` state added; only one column's form can be open at a time (opening one closes any other).

All of the above is committed and pushed to `origin/main` (commits `6cd834d`..`c0307e2`).

## Next steps (Task 4 — not started)

1. `create-task-form.tsx` currently has **no controlled inputs** — the title/description fields don't track state yet. Add local `useState` for both.
2. `post-column.tsx`'s `handleSave` is still a no-op stub (`const handleSave = () => {}`). Wire it to actually call `createTicket()` with `{ title, description, status, project_id: 1 }` (project id is hardcoded app-wide, no project switcher exists).
3. Get the created ticket into `board.tsx`'s `tasks` state (append to the array) so the new card renders immediately without a reload.
4. Client-side guard against a blank title before submitting (server has no validation; `title` is `NOT NULL`, empty submit would 500 today).
5. Verify end-to-end: click "New task" → fill in → Save → card appears in the right column → reload → ticket persisted (check Network tab for `POST /api/tickets` → 200).

## How we're working

Teaching mode (see CLAUDE.md) — guide step by step, let the user write the implementation code, only write it directly when asked or when they're stuck. Task #4 above is where the next session should resume that pattern.

## Deferred

- Column persistence (Item 2 of PLAN.md)
- Ticket detail view (Item 3 of PLAN.md)
- Authentication (explicitly out of scope this cycle, see PLAN.md)
