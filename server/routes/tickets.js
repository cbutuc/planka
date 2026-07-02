import { Router } from "express";
import { query } from "../db/index.js";

const router = Router();

// POST create ticket
router.post("/", async (req, res) => {
  try {
    const { title, description, status, project_id } = req.body;
    const result = await query(
      "INSERT INTO tickets (title, description, status, project_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, status, project_id],
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH update ticket status
router.patch("/:id/status", async (req, res) => {
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

// DELETE ticket
router.delete("/:id", async (req, res) => {
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

export default router;
