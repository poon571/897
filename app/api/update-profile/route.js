import { NextResponse } from "next/server";
import { query } from "../../../lib/db";
import { getSession, setSession } from "../../../lib/auth";

export async function POST(req) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "กรุณาเข้าสู่ระบบก่อน" }, { status: 401 });
    }

    const { username, email, display_name } = await req.json();

    if (!username || !email) {
      return NextResponse.json({ error: "กรุณากรอกชื่อผู้ใช้และอีเมลให้ครบถ้วน" }, { status: 400 });
    }

    // Check if username or email is already taken by another user
    const checkDup = await query(
      "SELECT id, username, email FROM users WHERE (username = ? OR email = ?) AND id != ?",
      [username, email, session.user.id]
    );

    if (checkDup.rows.length > 0) {
      const existing = checkDup.rows[0];
      if (existing.username === username) {
        return NextResponse.json({ error: "ชื่อผู้ใช้นี้ถูกใช้งานแล้ว" }, { status: 400 });
      }
      if (existing.email === email) {
        return NextResponse.json({ error: "อีเมลนี้ถูกใช้งานแล้ว" }, { status: 400 });
      }
    }

    // Update user in DB
    await query(
      "UPDATE users SET username = ?, email = ?, display_name = ? WHERE id = ?",
      [username, email, display_name, session.user.id]
    );

    // Update session object
    const updatedUser = {
      ...session.user,
      username,
      email,
      display_name,
    };
    await setSession(updatedUser);

    return NextResponse.json(
      { message: "อัปเดตข้อมูลสำเร็จ! 🎉", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update Profile Error:", error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" }, { status: 500 });
  }
}
