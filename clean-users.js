const { db } = require('@vercel/postgres');
const fs = require('fs');
const path = require('path');

async function cleanUsers() {
  console.log("Connecting to PostgreSQL database...");
  const client = await db.connect();

  try {
    // 1. Fetch current data for backup
    const usersRes = await client.query('SELECT * FROM users');
    const scoresRes = await client.query('SELECT * FROM player_scores');

    const backupData = {
      timestamp: new Date().toISOString(),
      usersCount: usersRes.rows.length,
      scoresCount: scoresRes.rows.length,
      users: usersRes.rows,
      player_scores: scoresRes.rows
    };

    const backupDir = path.join(__dirname, '_backup');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    const backupFilePath = path.join(backupDir, `users_backup_${Date.now()}.json`);
    fs.writeFileSync(backupFilePath, JSON.stringify(backupData, null, 2), 'utf-8');
    console.log(`[Backup] Saved ${usersRes.rows.length} users and ${scoresRes.rows.length} scores to: ${backupFilePath}`);

    // 2. Truncate tables and restart ID sequence
    console.log("Truncating player_scores and users tables...");
    await client.query('TRUNCATE TABLE player_scores, users RESTART IDENTITY CASCADE;');

    // 3. Verify emptiness
    const checkUsers = await client.query('SELECT count(*) FROM users');
    const checkScores = await client.query('SELECT count(*) FROM player_scores');

    console.log(`[Verified] Remaining users count: ${checkUsers.rows[0].count}`);
    console.log(`[Verified] Remaining player_scores count: ${checkScores.rows[0].count}`);
    console.log("Database user reset completed successfully!");

  } catch (err) {
    console.error("Error resetting database:", err);
  } finally {
    client.release();
  }
}

cleanUsers();
