import { NextResponse } from "next/server";
import { query } from "../../../lib/db";

export async function POST(req) {
  try {
    const { player_name, score, trophy } = await req.json();

    if (!player_name || score === undefined || !trophy) {
      return NextResponse.json(
        { error: "ข้อมูลไม่ครบถ้วน" },
        { status: 400 }
      );
    }

    // Insert score
    await query(
      "INSERT INTO player_scores (player_name, score, trophy) VALUES (?, ?, ?)",
      [player_name, score, trophy]
    );

    return NextResponse.json(
      { message: "บันทึกข้อมูลสำเร็จ" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Save Game Error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" },
      { status: 500 }
    );
  }
}
