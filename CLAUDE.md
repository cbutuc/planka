# Planka

A Jira-like project management app with a Kanban board UI, Node.js backend, and PostgreSQL database.

## Project Setup / Verification

This is a Node.js + Postgres project. Standard verification flow: start Postgres, run the server, then hit the API endpoints to confirm they respond.

1. Start the database: `docker-compose up -d`
2. Start the backend: `cd server && npm run dev`
3. Verify tables created: look for `✅ Tables created successfully` in terminal
4. Hit an endpoint to confirm: `GET http://localhost:3000/api/users` should return `[]`

## Communication Style

Teaching mode: explain steps in a professor-style, walking through the 'why' behind each command, not just the 'what'.

## Stack

- **Frontend**: React + Vite (TypeScript) — lives in `client/`
- **Backend**: Node.js + Express — lives in `server/`
- **Database**: PostgreSQL 16 running in Docker
- **Package manager**: npm

## Project Structure

- `client/` — React frontend (Vite + TypeScript)
- `server/` — Node.js + Express API
- `server/db/index.js` — PostgreSQL connection (pg Pool)
- `server/db/schema.sql` — Table definitions, auto-runs on startup
- `server/index.js` — Express server and all routes
- `docs/erd.png` — Database diagram
- `docker-compose.yml` — PostgreSQL in Docker

## Database

PostgreSQL runs in Docker. Start it with:

- docker-compose up -d

Tables are created automatically when the server starts via initDB() in server/db/index.js.

Connection details:

- host: localhost
- port: 5432
- database: planka
- user: postgres
- password: postgres

## Running the project

- Start database: docker-compose up -d
- Start backend: cd server && npm run dev
- Start frontend: cd client && npm run dev

## API Endpoints

- GET /api/users get all users
- POST /api/users create a user
- GET /api/users/:id get one user
- GET /api/projects get all projects
- POST /api/projects create a project
- GET /api/projects/:id get one project

## Key conventions

- ES6 modules in server, type module in package.json
- SQL uses parameterized queries $1 $2, never string interpolation
- Always wrap DB calls in try/catch
- Return result.rows for lists, result.rows[0] for single items
