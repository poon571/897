import { sql } from "@vercel/postgres";

export async function query(q, values = []) {
  try {
    // If we're not actually deployed on Vercel yet with postgres config,
    // this might fail. We should handle local dev somehow or assume Vercel Postgres is set up.
    // However, since we use @vercel/postgres SDK:
    if (values.length > 0) {
      // @vercel/postgres uses a tagged template literal approach usually (sql`...`)
      // But it also exposes a generic query method on the client/pool.
      // Since this is generic query wrapper, we can use the db object if imported:
      const { db } = require('@vercel/postgres');
      const client = await db.connect();
      try {
          // Mock generic query function since @vercel/postgres prefers tagged templates.
          // In actual usage, users of this helper must pass the exact query.
          // A safer way for raw queries in @vercel/postgres is via standard node-postgres (pg) if needed,
          // but for now, we will use the vercel/postgres driver directly.
          
          let index = 1;
          const text = q.replace(/\?/g, () => `$${index++}`);
          const res = await client.query(text, values);
          return { rows: res.rows };
      } finally {
          client.release();
      }
    } else {
       const { db } = require('@vercel/postgres');
       const client = await db.connect();
       try {
           const res = await client.query(q);
           return { rows: res.rows };
       } finally {
           client.release();
       }
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to execute query.");
  }
}
