// connect Node.js to PostgreSQL.

// pg is the package that knows how to talk to PostgreSQL. Pool is the specific tool inside it that manages connections.
//Pool is just how pg manages database connections — whether PostgreSQL is running in Docker, installed locally, or even on a remote server in the cloud.
import { Pool } from "pg";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// connect to PostgreSQL at localhost:5432, use the planka database, username is postgres, password is postgres
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "planka",
  user: "postgres",
  password: "postgres",
});

export const query = (text, params) => {
  return pool.query(text, params);
};

// 1. Find out where I am (current file path)
// 2. Find the folder I'm in
// 3. Read schema.sql from that folder
// 4. Send the SQL to PostgreSQL
// 5. Print success message
export const initDB = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const sql = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
  await pool.query(sql);
  console.log("✅ Tables created successfully");
};
