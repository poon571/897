import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query } from "../../../lib/db";
import { setSession } from "../../../lib/auth";

export async function POST(req) {
  try {
    const { username_email, password } = await req.json();

    if (!username_email || !password) {
      return NextResponse.json(
        { error: "กรุณากรอกข้อมูลให้ครบถ้วน" },
        { status: 400 }
      );
    }

    // Find user by username or email
    const users = await query(
      "SELECT id, username, email, password_hash, role FROM users WHERE username = ? OR email = ? LIMIT 1",
      [username_email, username_email]
    );

    if (users.rows.length === 0) {
      return NextResponse.json(
        { error: "ชื่อผู้ใช้/อีเมล หรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }

    const user = users.rows[0];

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return NextResponse.json(
        { error: "ชื่อผู้ใช้/อีเมล หรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }

    // Create session
    await setSession({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role || 'user',
    });

    return NextResponse.json(
      { message: "เข้าสู่ระบบสำเร็จ", user: { id: user.id, username: user.username, role: user.role || 'user' } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" },
      { status: 500 }
    );
  }
}
