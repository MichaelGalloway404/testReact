import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  const sql = neon(process.env.DATABASE_URL);

  if (req.method === "POST") {
    const { name, phrase } = req.body; // Node style
    await sql`
      INSERT INTO phrases (name, phrase)
      VALUES (${name}, ${phrase})
    `;
    return res.status(200).json({ ok: true });
  }

  if (req.method === "GET") {
    const rows = await sql`
      SELECT name, phrase
      FROM phrases
      ORDER BY id DESC
    `;
    return res.status(200).json(rows);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
