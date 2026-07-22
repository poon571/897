const { db } = require('@vercel/postgres');

async function init() {
  const client = await db.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Users table created");

    await client.query(`
      CREATE TABLE IF NOT EXISTS player_scores (
        id SERIAL PRIMARY KEY,
        player_name VARCHAR(255) NOT NULL,
        score INTEGER NOT NULL,
        trophy VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Player_scores table created");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    client.release();
  }
}
init();
