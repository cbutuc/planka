-- Someone has to read it and send it to PostgreSQL. In our case — Node.js will do that when the server starts. That's what we're setting up next

CREATE TABLE IF NOT EXISTS users (
  id         SERIAL PRIMARY KEY,
  username   VARCHAR(50) UNIQUE NOT NULL,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(255) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,
  avatar     VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  owner_id    INTEGER NOT NULL,
  created_at  TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (owner_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS tickets (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  status      VARCHAR(50) NOT NULL,
  project_id  INTEGER NOT NULL,
  assignee_id INTEGER,
  reporter_id INTEGER,
  created_at  TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (assignee_id) REFERENCES users(id),
  FOREIGN KEY (reporter_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS boards (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  project_id  INTEGER NOT NULL,
  created_at  TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS board_tickets (
  board_id   INTEGER NOT NULL,
  ticket_id  INTEGER NOT NULL,
  PRIMARY KEY (board_id, ticket_id),
  FOREIGN KEY (board_id) REFERENCES boards(id),
  FOREIGN KEY (ticket_id) REFERENCES tickets(id)
);