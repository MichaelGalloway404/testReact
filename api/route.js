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

// export async function POST(req) {
//   const { name, phrase } = await req.json();
//   const sql = neon(process.env.DATABASE_URL);

//   await sql`
//     INSERT INTO phrases (name, phrase)
//     VALUES (${name}, ${phrase})
//   `;

//   return Response.json({ ok: true });
// }


export async function POST(req) {
  const { name, phrase } = await req.json();
  console.log("POST data:", { name, phrase }); // log

  const sql = neon(process.env.DATABASE_URL);

  const result = await sql`
    INSERT INTO phrases (name, phrase)
    VALUES (${name}, ${phrase})
    RETURNING *;
  `;

  console.log("Insert result:", result); // log
  return Response.json({ ok: true, result });
}

export async function GET() {
  const sql = neon(process.env.DATABASE_URL);

  const rows = await sql`
    SELECT name, phrase
    FROM phrases
    ORDER BY id DESC
  `;

  console.log("GET rows:", rows); // log
  return Response.json(rows);
}
