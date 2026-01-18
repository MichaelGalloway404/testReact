export default async function handler(req, res) {
  try {
    console.log("Method:", req.method);
    console.log("Body:", req.body);

    const sql = neon(process.env.DATABASE_URL);

    if (req.method === "POST") {
      const { name, phrase } = req.body;
      console.log("Inserting:", { name, phrase });

      const inserted = await sql`
        INSERT INTO phrases (name, phrase)
        VALUES (${name}, ${phrase})
        RETURNING id, name, phrase
      `;

      console.log("Inserted:", inserted);

      return res.status(200).json({ ok: true, inserted });
    }

    if (req.method === "GET") {
      const rows = await sql`
        SELECT id, name, phrase
        FROM phrases
        ORDER BY id DESC
      `;
      console.log("Fetched rows:", rows);
      return res.status(200).json(rows);
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
