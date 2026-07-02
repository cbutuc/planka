// app is the whole Express application. But Router is like a mini version of app — it only handles routes, nothing else

import { Router } from "express";
import { query } from "../db/index.js";

const router = Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const result = await query(
      "SELECT id, username, name, email, avatar, created_at FROM users",
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET user by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      "SELECT id, username, name, email, avatar, created_at FROM users WHERE id = $1",
      [id],
    );

    if (!result.rows[0]) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create user
router.post("/", async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    const result = await query(
      "INSERT INTO users (username, name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, username, name, email, avatar, created_at",
      [username, name, email, password],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
