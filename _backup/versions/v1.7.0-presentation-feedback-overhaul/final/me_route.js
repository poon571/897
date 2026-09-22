import { NextResponse } from "next/server";
import { getSession } from "../../../lib/auth";
import { query } from "../../../lib/db";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    let stats = {
      highestScore: 0,
      islandsCompleted: 0,
      bossesDefeated: 0,
      island1Score: null,
      island1Trophy: null,
      history: []
    };

    try {
      const result = await query(
        `SELECT score, trophy, island_completed, created_at 
         FROM player_scores 
         WHERE user_id = ? 
         ORDER BY score DESC`,
        [session.user.id]
      );

      const rows = result?.rows || [];
      if (rows.length > 0) {
        stats.highestScore = Math.max(...rows.map((s) => Number(s.score) || 0));
        const island1Entries = rows.filter(
          (s) => s.island_completed === "island_1" || s.island_completed === "1"
        );
        if (island1Entries.length > 0) {
          stats.islandsCompleted = 1;
          stats.bossesDefeated = 1;
          stats.island1Score = island1Entries[0].score;
          stats.island1Trophy = island1Entries[0].trophy || "พิทักษ์พืชพันธุ์";
        }
        stats.history = rows.slice(0, 5);
      }
    } catch (dbErr) {
      console.warn("Could not query player_scores for user:", dbErr.message);
    }

    return NextResponse.json(
      {
        user: {
          ...session.user,
          stats
        }
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
