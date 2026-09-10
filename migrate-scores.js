const { db } = require('@vercel/postgres');
const fs = require('fs');
const path = require('path');

// Load .env.local manually
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const idx = trimmed.indexOf('=');
  if (idx === -1) return;
  const key = trimmed.slice(0, idx).trim();
  const value = trimmed.slice(idx + 1).trim();
  if (!process.env[key]) process.env[key] = value;
});

async function migrate() {
  const client = await db.connect();
  try {
    // Ensure player_scores table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS player_scores (
        id SERIAL PRIMARY KEY,
        player_name VARCHAR(255) NOT NULL,
        score INTEGER NOT NULL,
        trophy VARCHAR(255) NOT NULL DEFAULT 'Novice',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ player_scores table ensured');

    // Add user_id column
    await client.query(`
      ALTER TABLE player_scores 
      ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE SET NULL
    `);
    console.log('✅ Added user_id column');

    // Add island_completed column
    await client.query(`
      ALTER TABLE player_scores 
      ADD COLUMN IF NOT EXISTS island_completed VARCHAR(100) DEFAULT 'island_1'
    `);
    console.log('✅ Added island_completed column');

    // Add total_questions column
    await client.query(`
      ALTER TABLE player_scores 
      ADD COLUMN IF NOT EXISTS total_questions INTEGER DEFAULT 10
    `);
    console.log('✅ Added total_questions column');

    // Add time_spent_seconds column
    await client.query(`
      ALTER TABLE player_scores 
      ADD COLUMN IF NOT EXISTS time_spent_seconds INTEGER DEFAULT 0
    `);
    console.log('✅ Added time_spent_seconds column');

    // Verify
    const result = await client.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'player_scores' ORDER BY ordinal_position`);
    console.log('\n📋 player_scores columns:');
    result.rows.forEach(r => console.log(`   - ${r.column_name} (${r.data_type})`));

    console.log('\n🎉 Migration complete!');
  } catch (err) {
    console.error('❌ Migration error:', err.message);
  } finally {
    client.release();
  }
}

migrate();
