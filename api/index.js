import { neon } from "@neondatabase/serverless";

export const runtime = "edge";

export async function GET() {
  const sql = neon(process.env.DATABASE_URL);

  const rows = await sql`
    SELECT name, phrase
    FROM phrases
    ORDER BY id DESC
  `;

  return Response.json(rows);
}

export async function POST(req) {
  const { name, phrase } = await req.json();
  const sql = neon(process.env.DATABASE_URL);

  await sql`
    INSERT INTO phrases (name, phrase)
    VALUES (${name}, ${phrase})
  `;

  return Response.json({ ok: true });
}
