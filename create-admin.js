const { db } = require('@vercel/postgres');
const bcrypt = require('bcryptjs');
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

async function createAdmin() {
  const client = await db.connect();
  try {
    const username = 'koron';
    const email = 'koronhatoru@gmail.com';
    const password = 'koron1332009';
    const role = 'admin';

    // Check existing
    const existing = await client.query(
      'SELECT id FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (existing.rows.length > 0) {
      console.log('❌ ผู้ใช้นี้มีอยู่แล้วในระบบ');
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Try insert with role column first, fallback without
    try {
      await client.query(
        'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4)',
        [username, email, hashedPassword, role]
      );
      console.log('✅ สร้าง Admin account สำเร็จ (with role column)');
    } catch (err) {
      if (err.message.includes('column "role" of relation')) {
        // role column doesn't exist, insert without it
        await client.query(
          'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)',
          [username, email, hashedPassword]
        );
        console.log('✅ สร้าง account สำเร็จ (ไม่มี role column ในตาราง)');
      } else {
        throw err;
      }
    }

    console.log(`👤 Username : ${username}`);
    console.log(`📧 Email    : ${email}`);
    console.log(`🔑 Password : ${password} (hashed)`);
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    client.release();
  }
}

createAdmin();
