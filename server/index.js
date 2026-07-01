import express from "express";
import { query, initDB } from "./db/index.js";

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const result = await query("SELECT NOW()");
    res.json({ message: "Database connected! 🎉", time: result.rows[0] });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const result = await query("SELECT * FROM users");

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    // PostgreSQL only understands SQL — it doesn't know anything about your JavaScript variables.
    const result = await query(
      "INSERT INTO users (username, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, name, email, password],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query("SELECT * FROM users WHERE id = $1 ", [id]);

    if (!result.rows[0]) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/projects", async (req, res) => {
  try {
    const result = await query("SELECT * FROM projects");

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/projects", async (req, res) => {
  try {
    const { title, description, owner_id } = req.body;
    const result = await query(
      "INSERT INTO projects (title, description, owner_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, owner_id],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query("SELECT * FROM projects WHERE id=$1", [id]);

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/projects/:projectId/tickets", async (req, res) => {
  try {
    const { projectId } = req.params;
    const result = await query("SELECT * FROM tickets WHERE project_id =$1", [
      projectId,
    ]);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/projects/:projectId/tickets", async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, status } = req.body;
    const result = await query(
      "INSERT INTO tickets (title, description, status, project_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, status, projectId],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/api/tickets/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await query(
      "UPDATE tickets SET status = $1 WHERE id = $2 RETURNING *",
      [status, id],
    );

    if (!result.rows[0]) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/tickets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      "DELETE FROM tickets WHERE id = $1 RETURNING *",
      [id],
    );

    if (!result.rows[0]) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json({ message: "Ticket deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, async () => {
  console.log("Server is running on port 3000");
  await initDB();
});
