import { NextResponse } from "next/server";

export async function GET(req) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  const origin = req.nextUrl.origin;
  const redirectUri = `${origin}/api/auth/callback/google`;

  // If Google OAuth credentials are not configured yet, show helpful instructions
  if (!clientId || !clientSecret || clientId === "your-google-client-id") {
    const html = `
      <!DOCTYPE html>
      <html lang="th">
      <head>
        <meta charset="UTF-8">
        <title>ตั้งค่า Google Sign-in — Harvest Frontier</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            background: linear-gradient(135deg, #0d1b2a, #1b263b);
            color: #f8fafc;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Prompt", "Kanit", sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
          }
          .card {
            background: rgba(30, 41, 59, 0.85);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 20px;
            padding: 40px;
            max-width: 600px;
            width: 100%;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
            text-align: center;
          }
          .icon { font-size: 50px; margin-bottom: 15px; }
          h1 { font-size: 1.8rem; color: #4ade80; margin-bottom: 10px; }
          p { color: #cbd5e1; font-size: 1rem; line-height: 1.6; margin-bottom: 20px; }
          .code-box {
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 16px;
            text-align: left;
            font-family: monospace;
            font-size: 0.9rem;
            color: #38bdf8;
            margin-bottom: 25px;
            word-break: break-all;
          }
          .btn-group { display: flex; gap: 12px; justify-content: center; }
          .btn {
            padding: 12px 24px;
            border-radius: 10px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s;
            display: inline-block;
          }
          .btn-primary { background: #22c55e; color: #0f172a; }
          .btn-primary:hover { background: #16a34a; }
          .btn-secondary { background: rgba(255, 255, 255, 0.1); color: #fff; border: 1px solid rgba(255, 255, 255, 0.2); }
          .btn-secondary:hover { background: rgba(255, 255, 255, 0.2); }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="icon">🔑</div>
          <h1>ระบบ Google Sign-in พร้อมใช้งาน</h1>
          <p>
            ปุ่มและระบบเชื่อมต่อถูกสร้างเสร็จเรียบร้อยแล้ว! เพื่อเปิดใช้งานการล็อกอินด้วยบัญชี Google จริง เพียงนำ <b>Client ID & Secret</b> จาก Google Cloud Console มาใส่ในไฟล์ <code>.env.local</code>:
          </p>
          <div class="code-box">
            # เพิ่มในไฟล์ .env.local<br>
            GOOGLE_CLIENT_ID=xxxxxxxx.apps.googleusercontent.com<br>
            GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxx<br><br>
            # Redirect URI ที่ต้องใส่ใน Google Cloud Console:<br>
            ${redirectUri}
          </div>
          <div class="btn-group">
            <a href="/auth/login" class="btn btn-primary">← กลับสู่หน้าเข้าสู่ระบบ</a>
            <a href="/auth/register" class="btn btn-secondary">ไปหน้าสมัครสมาชิก</a>
          </div>
        </div>
      </body>
      </html>
    `;
    return new NextResponse(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Redirect directly to Google OAuth Consent Page
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=select_account`;

  return NextResponse.redirect(googleAuthUrl);
}
