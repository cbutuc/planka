# Architecture

## Stack

- Frontend: React + Vite + TypeScript → client/
- Backend: Node.js + Express → server/
- Database: PostgreSQL 16 in Docker

## Project Structure

- client/src/pages/ → page components
- client/src/components/ → reusable components
- client/src/lib/api.ts → all API calls
- server/routes/ → API route handlers
- server/db/index.js → PostgreSQL connection
- server/db/schema.sql → table definitions (auto-runs on startup)

## Running the project

1. docker-compose up -d
2. cd server && npm run dev
3. cd client && npm run dev
