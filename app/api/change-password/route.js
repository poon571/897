import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query } from "../../../lib/db";
import { getSession } from "../../../lib/auth";

export async function POST(req) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "กรุณาเข้าสู่ระบบก่อน" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" }, { status: 400 });
    }
    if (newPassword.length < 6) {
      return NextResponse.json({ error: "รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร" }, { status: 400 });
    }

    // Get current password hash
    const result = await query(
      "SELECT password_hash FROM users WHERE id = ?",
      [session.user.id]
    );
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "ไม่พบผู้ใช้" }, { status: 404 });
    }

    const valid = await bcrypt.compare(currentPassword, result.rows[0].password_hash);
    if (!valid) {
      return NextResponse.json({ error: "รหัสผ่านปัจจุบันไม่ถูกต้อง" }, { status: 401 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);

    await query(
      "UPDATE users SET password_hash = ? WHERE id = ?",
      [hashed, session.user.id]
    );

    return NextResponse.json({ message: "เปลี่ยนรหัสผ่านสำเร็จ" }, { status: 200 });
  } catch (error) {
    console.error("Change Password Error:", error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" }, { status: 500 });
  }
}
