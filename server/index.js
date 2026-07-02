import express from "express";
import { initDB } from "./db/index.js";
import usersRouter from "./routes/users.js";
import projectsRouter from "./routes/projects.js";
import ticketsRouter from "./routes/tickets.js";

const app = express();
app.use(express.json());

// mount routers
app.use("/api/users", usersRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/tickets", ticketsRouter);

const PORT = 3000;

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await initDB();
});
