import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { setSession } from "@/lib/auth";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error || !code) {
      return NextResponse.redirect(new URL("/auth/login?error=google_cancelled", req.nextUrl.origin));
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${req.nextUrl.origin}/api/auth/callback/google`;

    // 1. Exchange authorization code for access token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || !tokenData.access_token) {
      console.error("Google Token Exchange Failed:", tokenData);
      return NextResponse.redirect(new URL("/auth/login?error=google_auth_failed", req.nextUrl.origin));
    }

    // 2. Fetch Google User Profile
    const profileRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const googleUser = await profileRes.json();

    if (!googleUser || !googleUser.email) {
      return NextResponse.redirect(new URL("/auth/login?error=google_profile_failed", req.nextUrl.origin));
    }

    // 3. Find or Create User in PostgreSQL
    const existingUsers = await query(
      "SELECT id, username, email, display_name, role FROM users WHERE email = ? LIMIT 1",
      [googleUser.email]
    );

    let user;

    if (existingUsers.rows.length > 0) {
      user = existingUsers.rows[0];
    } else {
      // Create new user automatically
      let baseUsername = googleUser.email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "");
      if (!baseUsername || baseUsername.length < 3) baseUsername = "user";
      
      // Ensure username uniqueness
      let finalUsername = baseUsername;
      const checkUsername = await query(
        "SELECT id FROM users WHERE username = ? LIMIT 1",
        [finalUsername]
      );
      if (checkUsername.rows.length > 0) {
        finalUsername = `${baseUsername}_${Math.floor(1000 + Math.random() * 9000)}`;
      }

      await query(
        "INSERT INTO users (username, email, password_hash, display_name, role) VALUES (?, ?, 'OAUTH_GOOGLE', ?, 'user')",
        [finalUsername, googleUser.email, googleUser.name || finalUsername]
      );

      const createdUser = await query(
        "SELECT id, username, email, display_name, role FROM users WHERE email = ? LIMIT 1",
        [googleUser.email]
      );
      user = createdUser.rows[0];
    }

    // 4. Set Session Cookie
    await setSession({
      id: user.id,
      username: user.username,
      display_name: user.display_name || user.username,
      email: user.email,
      role: user.role || "user",
    });

    // 5. Redirect straight into the game!
    return NextResponse.redirect(new URL("/game", req.nextUrl.origin));
  } catch (err) {
    console.error("Google Auth Callback Error:", err);
    return NextResponse.redirect(new URL("/auth/login?error=server_error", req.nextUrl.origin));
  }
}
