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

async function addRoleColumn() {
  const client = await db.connect();
  try {
    // Add role column if not exists
    await client.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS role VARCHAR(50) NOT NULL DEFAULT 'user'
    `);
    console.log('✅ เพิ่ม column "role" สำเร็จ (หรือมีอยู่แล้ว)');

    // Set koron as admin
    const result = await client.query(
      `UPDATE users SET role = 'admin' WHERE username = $1 RETURNING id, username, role`,
      ['koron']
    );

    if (result.rows.length > 0) {
      console.log(`✅ อัปเดต role เป็น "admin" สำเร็จ`);
      console.log(`👤 Username : ${result.rows[0].username}`);
      console.log(`🛡️  Role     : ${result.rows[0].role}`);
    } else {
      console.log('❌ ไม่พบ user "koron" ในระบบ');
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    client.release();
  }
}

addRoleColumn();
