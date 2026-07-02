import { Router } from "express";
import { query } from "../db/index.js";

const router = Router();

// GET all projects
router.get("/", async (req, res) => {
  try {
    const result = await query("SELECT * FROM projects");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET project by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query("SELECT * FROM projects WHERE id = $1", [id]);
    if (!result.rows[0]) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create project
router.post("/", async (req, res) => {
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

// GET tickets for a project
router.get("/:projectId/tickets", async (req, res) => {
  try {
    const { projectId } = req.params;
    const result = await query("SELECT * FROM tickets WHERE project_id = $1", [
      projectId,
    ]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
