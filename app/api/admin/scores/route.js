import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';
import { getSession } from '../../../../lib/auth';

async function checkAdmin() {
  const session = await getSession();
  if (!session || !session.user || session.user.role !== 'admin') {
    return null;
  }
  return session.user;
}

export async function GET(req) {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');

    if (type === 'stats') {
      // Aggregate statistics
      const totalResult = await query(`SELECT COUNT(*) as total FROM player_scores`);
      const avgResult = await query(`SELECT COALESCE(AVG(score), 0) as avg_score FROM player_scores`);
      const maxResult = await query(`SELECT COALESCE(MAX(score), 0) as max_score FROM player_scores`);
      
      const trophyResult = await query(`
        SELECT trophy, COUNT(*) as count 
        FROM player_scores 
        GROUP BY trophy 
        ORDER BY count DESC
      `);

      const recentResult = await query(`
        SELECT COUNT(*) as count 
        FROM player_scores 
        WHERE created_at >= NOW() - INTERVAL '7 days'
      `);

      return NextResponse.json({
        stats: {
          totalPlayers: parseInt(totalResult.rows[0]?.total || 0),
          avgScore: parseFloat(avgResult.rows[0]?.avg_score || 0).toFixed(1),
          maxScore: parseInt(maxResult.rows[0]?.max_score || 0),
          trophyBreakdown: trophyResult.rows,
          recentWeek: parseInt(recentResult.rows[0]?.count || 0)
        }
      }, { status: 200 });
    }

    // Default: return all scores
    const result = await query(
      `SELECT ps.*, u.username 
       FROM player_scores ps 
       LEFT JOIN users u ON ps.user_id = u.id 
       ORDER BY ps.score DESC, ps.created_at DESC 
       LIMIT 200`
    );
    return NextResponse.json({ scores: result.rows }, { status: 200 });
  } catch (error) {
    console.error('Error fetching scores:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }
    await query(`DELETE FROM player_scores WHERE id = ?`, [id]);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting score:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
