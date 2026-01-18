const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// GET all phrases
app.get("/api/phrases", async (req, res) => {
  try {
    const result = await pool.query("SELECT name, phrase FROM phrases ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// POST a phrase
app.post("/api/phrases", async (req, res) => {
  const { name, phrase } = req.body;
  try {
    await pool.query("INSERT INTO phrases (name, phrase) VALUES ($1, $2)", [name, phrase]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
