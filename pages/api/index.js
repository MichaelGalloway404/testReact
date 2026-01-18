import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { name, phrase } = req.body;

      if (!name || !phrase) {
        return res.status(400).json({ error: "Missing name or phrase" });
      }

      const inserted = await sql`
        INSERT INTO phrases (name, phrase)
        VALUES (${name}, ${phrase})
        RETURNING id, name, phrase
      `;

      return res.status(200).json({ ok: true, inserted });
    }

    if (req.method === "GET") {
      const rows = await sql`
        SELECT id, name, phrase
        FROM phrases
        ORDER BY id DESC
      `;

      return res.status(200).json(rows);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
