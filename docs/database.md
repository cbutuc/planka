# Database

## Connection

- host: localhost, port: 5432
- database: planka, user: postgres, password: postgres
- Tables auto-created on server start via initDB()

## Tables

- users → id, username, name, email, password, avatar, created_at
- projects → id, title, description, owner_id, created_at
- tickets → id, title, description, status, project_id, assignee_id, reporter_id, created_at
- boards → id, title, description, project_id, created_at
- board_tickets → board_id, ticket_id (linking table)
