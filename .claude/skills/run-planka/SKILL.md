---
name: run-planka
description: Build, run, and drive Planka (Kanban board app — React/Vite client, Express/Postgres server). Use when asked to start Planka, run the dev servers, take a screenshot of the board, verify a UI/color/style change renders correctly, or interact with the running app.
---

Planka is three pieces that must all run together to see anything: Postgres (Docker), the Express API (`server/`, port 3000), and the Vite React client (`client/`, port 5173 or the next free port). There is no `chromium-cli` on this machine, so the harness is a committed Playwright driver at `.claude/skills/run-planka/driver.mjs` — start the three pieces, then run the driver against whatever port Vite actually bound to.

All paths below are relative to the repo root (`C:\Users\Cristina\Github\planka`).

## Prerequisites

- Docker Desktop running (the Postgres container is defined in `docker-compose.yml`).
- Node.js (client and server both use ES modules; no version pin found in either `package.json`).
- No OS packages needed beyond that — Playwright's Chromium is installed into a shared cache (`~/AppData/Local/ms-playwright` on Windows / `~/.cache/ms-playwright` on Linux) the first time you install its dependency below, and is reused across projects.

## Setup

One-time, or whenever `node_modules` is missing:

```powershell
cd server; npm install
cd ..\client; npm install
cd ..\.claude\skills\run-planka; npm install
npx playwright install chromium   # only if browsers aren't already cached
```

The last two install the driver's own dependency (Playwright) — this is agent tooling, not part of the app, which is why it has its own `package.json` in this skill directory instead of living in `client/` or `server/`.

## Run (agent path)

1. **Start Postgres** (idempotent — no-ops if already running):

   ```powershell
   cd C:\Users\Cristina\Github\planka
   docker-compose up -d
   ```

   Don't pipe this through `2>&1` in PowerShell — Docker's compose plugin writes its normal "Container ... Running" status to stderr, and PowerShell 5.1 turns that into a `NativeCommandError` even on success. Just run it bare and read stdout/stderr as printed.

2. **Start the API** in the background and wait for it to actually answer. Launch `node index.js` **directly — not `npm run dev` (nodemon)** — see Gotchas:

   ```powershell
   $skillDir = "C:\Users\Cristina\Github\planka\.claude\skills\run-planka"
   cd C:\Users\Cristina\Github\planka\server
   Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "node index.js > `"$skillDir\logs\server.log`" 2>&1" -WindowStyle Hidden
   for ($i=0; $i -lt 20; $i++) {
     try {
       $r = Invoke-WebRequest -Uri "http://localhost:3000/api/users" -UseBasicParsing -TimeoutSec 2
       if ($r.StatusCode -eq 200) { break }
     } catch {}
     Start-Sleep -Seconds 1
   }
   ```

   Ready looks like `Server running on http://localhost:3000` + `✅ Tables created successfully` in `logs/server.log`, and it stays that way — unlike nodemon (see Gotchas), this doesn't crash a few seconds later.

3. **Start the client** in the background, then read the *actual* port out of its log — don't assume 5173:

   ```powershell
   cd C:\Users\Cristina\Github\planka\client
   Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "npm run dev > `"$skillDir\logs\client.log`" 2>&1" -WindowStyle Hidden
   $port = $null
   for ($i=0; $i -lt 20; $i++) {
     Start-Sleep -Seconds 1
     $raw = Get-Content "$skillDir\logs\client.log" -Raw -ErrorAction SilentlyContinue
     if ($raw) {
       $esc = [char]27
       $clean = $raw -replace "$esc\[[0-9;]*m", ""   # strip ANSI color codes first — see Gotchas
       if ($clean -match "localhost:(\d+)/") { $port = $matches[1]; break }
     }
   }
   ```

4. **Drive it and screenshot:**

   ```powershell
   cd "$skillDir"
   node driver.mjs "http://localhost:$port"
   ```

   Prints `CONSOLE_ERRORS: []` (or the list of errors — treat any non-empty list as a failure) and the screenshots directory. The app's only route is `/board` (see `client/src/App.tsx`) — the driver navigates straight there; `/` renders nothing.

Screenshots land in `.claude/skills/run-planka/screenshots/`:

| file | shows |
|---|---|
| `board-1-initial.png` | Board on load: three columns, seeded cards, resting palette |
| `board-2-newtask-hover.png` | "New task" button hovered — the accent color (`--color-accent`) in its one real UI application |
| `board-3-menu-open.png` | A column's "..." dropdown open (Edit/Delete) |

Logs land in `.claude/skills/run-planka/logs/` (`server.log`, `client.log`).

**Stop cleanly.** Background launches via `cmd.exe /c` orphan their child `node` processes, so the launcher's own PID is useless for stopping anything. Kill by port — this reliably catches whatever you actually just started, including a plain `node index.js` (see Gotchas for why command-line matching does *not* catch that case):

```powershell
$serverPid = (Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue).OwningProcess
$clientPid = (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue).OwningProcess
if ($serverPid) { Stop-Process -Id $serverPid -Force }
if ($clientPid) { Stop-Process -Id $clientPid -Force }
```

If you suspect stale zombies from earlier attempts (not currently listening — see Gotchas), also run the command-line sweep from that Gotcha; it catches `nodemon`/`npm` chains but not a plain `node index.js`.

Postgres is left running (`restart: always` in `docker-compose.yml`); stop it explicitly with `docker-compose down` only if you actually want it down.

## Run (human path)

```powershell
docker-compose up -d
cd server; npm run dev     # separate terminal, stays foregrounded
cd client; npm run dev     # separate terminal, stays foregrounded; open the printed Local URL + /board
```

`Ctrl-C` each terminal to stop.

## Test

No test suite exists yet — `server/package.json`'s `test` script is the default `"echo \"Error: no test specified\" && exit 1"` placeholder, and there's no test config in `client/`.

---

## Gotchas

- **`npm run dev` (nodemon) reliably crashes ~5-8s after startup when launched hidden/backgrounded via `Start-Process -FilePath cmd.exe -WindowStyle Hidden`.** It prints `Server running on http://localhost:3000` and `✅ Tables created successfully` — so a readiness poll can pass — then nodemon logs `app crashed - waiting for file changes before starting...` on its own, with no incoming request and no code change. Reproduced 3/3 times with `npm run dev`, including with stdin redirected from `NUL`; 0/3 times with plain `node index.js` in the same launch pattern, and 0/1 times with `npm run dev` run via `Start-Job` (a real foreground-style host). This points at nodemon's stdin/TTY handling under a hidden, non-interactive `cmd.exe` child — not the app. **Fix: launch `node index.js` directly for the agent path.** You lose hot-reload, which doesn't matter for a one-shot verification run anyway. Use `npm run dev` for the human path (a real terminal), where nodemon behaves normally.
- **Crashed nodemon processes don't hold their port, but don't exit either.** A `nodemon` that crashed (previous gotcha) drops out of `Listen` state, so `Get-NetTCPConnection -LocalPort 3000` stops seeing it — but the process itself is still resident, idling in "waiting for file changes." Left unchecked (this happened while developing this skill: three dead `nodemon` processes and one dead `npm run dev` cmd.exe chain accumulated from repeated attempts), a later attempt can fail to write its own log file because a zombie still holds the old file handle, making a *working* command look broken. Sweep stale zombies by command line — this catches `nodemon`/`npm` chains, whose command line includes the full path through `node_modules\...\nodemon\bin\nodemon.js` or `npm.cmd`:

  ```powershell
  Get-CimInstance Win32_Process -Filter "Name='node.exe' OR Name='cmd.exe'" |
    Where-Object { $_.CommandLine -match 'planka' } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
  ```

  **This sweep does NOT catch a plain `node index.js`** (the launch method this skill actually uses for the agent path, per the gotcha above) — its `CommandLine` as reported by `Win32_Process` is literally `node  index.js`, with no path and no "planka" substring at all (confirmed directly: `Get-CimInstance Win32_Process -Filter "ProcessId=<pid>"` on a live one showed exactly that). For the server/client you just started, kill by port (see "Stop cleanly" above); use this command-line sweep only for stale leftovers from *previous* attempts that already fell off their port.
- **Don't assume a process on a dev port is unrelated without checking.** Vite falling back past 5173 doesn't necessarily mean something *else* is using it — it's just as likely to be a previous, still-running Planka client from an earlier attempt in the same session. Since a plain `node`/Vite process's command line won't contain "planka" (previous gotcha), checking `CommandLine` isn't reliable here either — instead check `Get-Process -Id <owningProcess> | Select Path,StartTime`: a `node.exe` under this machine's normal Node install with a suspiciously recent `StartTime` is worth treating as your own leftover. Either way, never hardcode the client port — always parse it from the log (step 3 above), since which port you land on depends on what's already running.
- **Vite's log has ANSI color codes that break naive regexes.** The "Local:" line is literally `...localhost:` + `\x1b[1m` + `5174` + `\x1b[22m` + `/`, so a plain `localhost:(\d+)/` regex silently fails to match. Strip `\x1b\[[0-9;]*m` sequences first.
- **`` `e `` is not an escape sequence in Windows PowerShell 5.1** (it's a PowerShell 7+ feature) — it silently becomes literal `e`, not ESC (0x1B), which breaks the ANSI-stripping regex above in a way that produces no error, just a permanently-empty `$port`. Use `[char]27` instead.
- **`Stop-Process` on the `cmd.exe` launcher PID doesn't stop the app.** `Start-Process -FilePath cmd.exe -ArgumentList "/c", "npm run dev ..."` spawns `cmd.exe` → `npm` → `node`; killing the tracked `cmd.exe` PID leaves the real `node` process (nodemon's child, or Vite) running as an orphan still bound to its port. Find the real PID via `Get-NetTCPConnection -LocalPort <port>` and kill that (see "Stop cleanly" above).
- **`npm run lint` and `npm run build` fail in `client/` for reasons unrelated to runtime.** `npm run lint` throws inside `@eslint/config-helpers` (a broken `eslint.config.js` extends chain, pre-existing). `npm run build` fails `tsc -b` on two pre-existing type errors (`Task.date` doesn't exist on the `Task` type used in `post-column.tsx`; unused `StrictMode` import in `main.tsx`). Neither blocks `npm run dev` — the dev server compiles with esbuild/SWC and doesn't run `tsc` or ESLint. Don't treat these as caused by whatever change you're verifying unless you touched those exact lines.
- **No `chromium-cli` on this machine.** The driver uses the `playwright` npm package directly instead, installed as this skill's own dependency (see Setup) so it doesn't pollute `client/`'s or `server/`'s `package.json`.

## Troubleshooting

- **`docker-compose up -d` reports success but PowerShell shows a red `NativeCommandError`**: harmless — Docker Compose writes normal status to stderr; PowerShell 5.1 flags any stderr output from a native exe as an error even at exit code 0. Ignore it, or check `docker ps` to confirm `planka_db` is `Up`.
- **`Invoke-WebRequest http://localhost:<port>` "times out" instead of refusing the connection**: seen right after killing a process — takes a second or two for the port to actually free. Not a sign anything is still running; re-check with `Get-NetTCPConnection -LocalPort <port> -State Listen` (empty result = actually free).
- **Board page loads but shows all columns empty**: normal on a fresh Postgres volume — no seed data. The driver's screenshots and the "no console errors" check are still valid; you just won't see cards. Use `POST /api/projects/1/tickets` to add one if you need to see a card render.
