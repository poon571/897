import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { getSession } from '../../../lib/auth';

export async function POST(req) {
  try {
    const body = await req.json();
    const { player_name, score, trophy, island_completed, total_questions, time_spent_seconds } = body;

    if (!player_name || score === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get user_id from session if logged in
    let userId = null;
    try {
      const session = await getSession();
      if (session && session.user) {
        userId = session.user.id;
      }
    } catch (e) {
      // Not logged in, save without user_id
    }

    await query(
      `INSERT INTO player_scores (player_name, score, trophy, user_id, island_completed, total_questions, time_spent_seconds) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        player_name, 
        score, 
        trophy || 'Novice', 
        userId, 
        island_completed || 'island_1', 
        total_questions || 10,
        time_spent_seconds || 0
      ]
    );

    return NextResponse.json({ success: true, message: 'Score saved successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error saving score:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
