import { getDatabase } from "@netlify/database";

export default async () => {
  const db = getDatabase();
  const rows = await db.sql`SELECT 1 AS ok`;
  return Response.json({ ok: rows[0]?.ok === 1 });
};

export const config = { path: "/api/db-check" };
