# Planka: Finish the Core Kanban Flows

## Context

Planka currently has a working board that fetches real tickets and supports drag-and-drop status changes, but two everyday flows are dead ends: the "New task" button in each column toggles an icon and renders nothing, and the ticket-detail page is an unwired stub (`<div>Task Details Page</div>`). Separately, the `boards` table in the schema has never been used — column renames and deletions only live in frontend React state and vanish on reload.

Per PRODUCT.md, Planka is a single-builder learning tool with no team and no stakeholder pressure — the priority is "finishing real flows... over polishing surfaces nobody will use." Authentication is explicitly deferred (confirmed with the user) to a future cycle so this pass can focus on completing create → view → edit → delete for tickets, plus making column edits durable.

Exploration also surfaced a **real latent bug**: `createTicket()` in `client/src/lib/api.ts` POSTs to `/api/projects/${projectId}/tickets`, but no such route exists (only `GET /:projectId/tickets` does; ticket creation lives at `POST /api/tickets` in `server/routes/tickets.js`, expecting `project_id` in the body). This call would 404 today and must be fixed as part of Item 1. Also, `PostCard` is passed `date={task.date}`, but `Task` only has `created_at` — `date` is always `undefined` and must be derived properly so new/existing tickets show a real date.

Confirmed decisions (from user):
- **Columns**: persist title renames only to the `boards` table; keep the 3 fixed statuses (`todo`/`in_progress`/`done`) with their existing curated colors; remove the "Delete column" menu item (no defined behavior exists for what happens to its tickets).
- **Ticket detail view**: editable (title/description), not just read+delete.
- **Auth**: deferred — not part of this plan.

---

## Item 1: Create-ticket form UI

**Fix first:** `client/src/lib/api.ts` — `createTicket(projectId, data)` must POST to `/api/tickets` with body `{ title, description, status, project_id: projectId }`, matching the existing `server/routes/tickets.js` `POST /` route. No backend change needed.

**Fix the date bug:** `Task`/ticket rows only have `created_at`. Wherever tasks are set into state (`board.tsx` on fetch, and on create), derive a display value (e.g. `new Date(created_at).toLocaleDateString()`) instead of the nonexistent `task.date`, or compute it inline in `post-card.tsx` from `created_at`.

**New component:** `client/src/components/create-task-form/create-task-form.tsx` + `.module.css` — title input + description textarea + Save/Cancel buttons. Style per DESIGN.md: white surface, `border-strong` 1px / 6px radius inputs, focus ring using the column's status color (reuse the existing `.input.todo/.in_progress/.done:focus` pattern already in `post-column.module.css`), violet `#5b4fe0` primary action. Client-side guard against a blank title (server has no validation and `title` is `NOT NULL` — an empty submit would 500 today).

**Wire it up:**
- `client/src/components/post-column/post-column.tsx` — replace the dead `showForm` icon-toggle with actually rendering `<CreateTaskForm>`; add an `onCreate(task)` callback prop.
- `client/src/pages/board.tsx` — add `handleCreateTask` that calls `createTicket` and appends the result to `tasks` state; pass down to `PostColumn`. Project id stays hardcoded to `1` (no project switcher exists — out of scope).

**Verification:** Click "New task" → form appears → submit → card appears in the right column → reload page → ticket persisted (check `GET /api/projects/1/tickets` or the Network tab shows `POST /api/tickets` returning 200, not 404).

---

## Item 2: Column persistence (rename only)

**Migration** — append to `server/db/schema.sql` (idempotent; it reruns via `initDB()` on every boot):
```sql
ALTER TABLE boards ADD COLUMN IF NOT EXISTS status_key VARCHAR(50);
ALTER TABLE boards ADD COLUMN IF NOT EXISTS position INTEGER NOT NULL DEFAULT 0;
```
No `UNIQUE` constraint (Postgres has no clean `ADD CONSTRAINT IF NOT EXISTS`); enforce read-then-write uniqueness in application code, matching the codebase's existing plain-SQL style (no `ON CONFLICT` used anywhere today).

**Backend** — add to `server/routes/projects.js` (co-located, matching the existing `/:projectId/tickets` sub-resource pattern), same try/catch style as other routes:
- `GET /:projectId/boards` → merges DB overrides with the 3 hardcoded defaults, returns `[{status_key, title}, ...]`.
- `PATCH /:projectId/boards/:statusKey` → body `{ title }`; update if a row exists for `(project_id, status_key)`, else insert; returns the row.

**Frontend:**
- `client/src/lib/api.ts` — add `fetchBoards(projectId)`, `updateBoardTitle(projectId, statusKey, title)`.
- `client/src/pages/board.tsx` — fetch boards on mount alongside tickets; merge fetched titles into the existing `columns` state (keep `initialColumns` as the ordering/id source, override only `title`).
- `client/src/components/post-column/post-column.tsx` — wire the existing `isEditingTitle` blur/Enter commit to call `updateBoardTitle` and bubble a rename callback up to `board.tsx`. Remove the "Delete column" entry from the kebab `Menu` and its associated `deleteColumn` plumbing in `board.tsx`.

**Verification:** Rename "To Do" → "Backlog" → reload → title persists. Drag-and-drop between columns still works (keyed on `status_key`, unaffected by title). Restart the server twice → the `ALTER TABLE ... IF NOT EXISTS` statements are harmless no-ops the second time.

---

## Item 3: Ticket detail view (editable)

**Backend — `server/routes/tickets.js`:**
- Add `GET /:id` (currently missing) — `SELECT * FROM tickets WHERE id = $1`, 404 if absent, matching the exact pattern already used for `PATCH /:id/status` / `DELETE /:id`.
- Add `PATCH /:id` — body `{ title, description }` → `UPDATE tickets SET title=$1, description=$2 WHERE id=$3 RETURNING *`. Keep this **separate** from the existing `PATCH /:id/status` (used by drag-and-drop) so editing can't regress that flow.

**Frontend:**
- `client/src/lib/api.ts` — add `fetchTicket(id)` and `updateTicket(id, {title, description})`.
- `client/src/pages/task-details.tsx` — rebuild from the stub: `useParams` for `:id`, `useEffect` → `fetchTicket`; render title/description/status/created_at; click-to-edit title/description reusing the pattern already in `post-column.tsx`; a "Back to board" link; a Delete button wired to the already-existing-but-unused `deleteTicket()`, navigating to `/board` on success.
- `client/src/App.tsx` — uncomment the `Route path="task/:id"` (verify it points at the actual named export `TaskDetails`) and the catch-all `*` → `PageNotFound` route.
- `client/src/pages/page-not-found.tsx` — flesh out minimally (message + link back to `/board`), styled per design tokens.
- `client/src/components/post-card/post-card.tsx` — thread an `id` prop through from `post-column.tsx` and wrap the card in a `Link to={`/task/${id}`}`.
  - **Verify, don't assume:** `client/src/components/sortable-item.tsx` spreads dnd-kit's drag `listeners` onto the wrapping `<li>`, not a dedicated handle — a plain click on the nested `<Link>` may get intercepted as a drag start. If clicks feel unreliable when testing, add `activationConstraint: { distance: N }` to the `PointerSensor` config to distinguish click from drag.

**Verification:** Click a card → navigates to `/task/:id` with data matching `GET /api/tickets/:id` directly. Visit `/task/999` (nonexistent) → graceful not-found state, no crash. Edit title/description + save → board card reflects the change on return. Delete from detail view → ticket gone from the board. Visit a bogus path → renders `PageNotFound`, not a blank screen.

---

## Deferred (explicitly out of scope this cycle)

**Authentication** — confirmed deferred by the user. When picked up later, the earlier design pass already flagged: bcrypt/bcryptjs hashing (users.password is currently plaintext), JWT-in-httpOnly-cookie vs express-session, scope decision (single login gate vs. real per-user `owner_id` data isolation), and which routes to protect. Revisit as its own planning pass rather than folding it into this one.

---

## Critical files

- `client/src/lib/api.ts`
- `client/src/pages/board.tsx`
- `client/src/components/post-column/post-column.tsx`
- `client/src/components/post-card/post-card.tsx`
- `client/src/pages/task-details.tsx`
- `client/src/App.tsx`
- `server/routes/tickets.js`
- `server/routes/projects.js`
- `server/db/schema.sql`

## Suggested execution order

1. Item 1 (create-ticket form) — smallest, self-contained, fixes the 404 bug immediately.
2. Item 2 (column persistence) — touches the same files (`board.tsx`, `post-column.tsx`), doing it right after avoids a second pass.
3. Item 3 (ticket detail view) — largest, reuses the form styling from Item 1, completes the full create→view→edit→delete loop.
