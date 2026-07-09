# Current Work

## Status

Item 1 of PLAN.md — create ticket form. **Complete and committed** (`c43324e`, plus follow-up refactors `e89eba6`, `b67da83`).

- `client/src/lib/api.ts` — `createTicket()` fixed to POST `/api/tickets` with `project_id` in the body (was 404ing against a route that never existed).
- `client/src/components/post-card/post-card.tsx` — date bug fixed; takes `createdAt` and derives the display string with `new Date(createdAt).toLocaleDateString()`.
- `client/src/components/create-task-form/create-task-form.tsx` + `.module.css` — built and styled per DESIGN.md (white surface, `border-strong` inputs, status-colored focus ring reused from `post-column.module.css`, violet Save button). Placeholder contrast fixed (was browser-default gray, now `--color-text-tertiary`). Added a `prefers-reduced-motion`-gated fade/translateY entrance via `@starting-style`. `title`/`description` are now controlled state; Save button `onSave({ title, description })` is disabled (and guarded) when `title.trim()` is empty, with a `:disabled` dimmed style.
- `client/src/components/post-column/post-column.tsx` — dead `showForm` toggle replaced with real `CreateTaskForm` render; `showForm`/`onOpenForm`/`onCloseForm` come in as props (state lifted to board). `handleSave` calls `createTicket({ title, description, status, project_id: 1 })` and forwards the server's response via `onTaskCreated`, then closes the form.
- `client/src/pages/board.tsx` — `activeForm: string | null` state added; only one column's form can be open at a time. `handleTaskCreated(task)` appends the server-returned ticket to `tasks` state so the new card renders without a reload.

End-to-end flow (new task button → fill in → Save → card appears → reload → persisted) manually verified working.

### Bug fix (not in PLAN.md): drag-onto-card didn't persist

Dropping a task onto empty column space (`isOverColumn` branch in `board.tsx`'s `handleDragOver`) called `updateTicketStatus`, but dropping onto an *existing card* in another column (`isOverTask` branch) only updated local state — the move looked right on screen but reverted on reload. Fixed by deriving the target status from the task being dropped onto (`overTask.status`) and calling `updateTicketStatus(Number(activeId), newStatus)` in that branch too. Verified live: dragging a card onto another card in a different column now fires `PATCH /api/tickets/:id/status` with the correct status. Not yet committed.

## Next up

Item 2 of PLAN.md — column persistence (not started).

## How we're working

Teaching mode (see CLAUDE.md) — guide step by step, let the user write the implementation code, only write it directly when asked or when they're stuck.

## Deferred

- Column persistence (Item 2 of PLAN.md)
- Ticket detail view (Item 3 of PLAN.md)
- Authentication (explicitly out of scope this cycle, see PLAN.md)
