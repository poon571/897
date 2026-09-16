const { db } = require('@vercel/postgres');

async function alterDb() {
  const client = await db.connect();
  try {
    await client.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS display_name VARCHAR(255);
    `);
    console.log("Successfully added display_name column");
  } catch (err) {
    console.error("Error altering DB:", err);
  } finally {
    client.release();
  }
}
alterDb();
