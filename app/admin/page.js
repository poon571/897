"use client";
import { useEffect, useState } from 'react';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/scores');
      const data = await res.json();
      if (data.scores) {
        setScores(data.scores);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteScore = async (id) => {
    if (!confirm('ยืนยันการลบคะแนนนี้?')) return;
    try {
      const res = await fetch(`/api/admin/scores?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchScores();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const exportCSV = () => {
    if (scores.length === 0) {
      alert("ไม่มีข้อมูลสำหรับส่งออก");
      return;
    }
    const headers = ["อันดับ", "ชื่อผู้เล่น", "คะแนน", "ระดับ", "วันที่เล่น"];
    const rows = scores.map((s, idx) => [
      idx + 1,
      s.player_name,
      s.score,
      s.trophy,
      new Date(s.created_at).toLocaleString('th-TH')
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `harvest_frontier_scores_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>สรุปผลคะแนนผู้เล่น (Leaderboard)</h1>
        <p>ระบบจัดการหลังบ้าน Harvest Frontier - Managed by koron</p>
        <div className={styles.headerActions}>
          <button className={styles.refreshBtn} onClick={fetchScores}>รีเฟรชข้อมูล</button>
          <button className={styles.exportBtn} onClick={exportCSV}>ดาวน์โหลด CSV</button>
        </div>
      </header>
      
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statLabel}>จำนวนผู้เล่นทั้งหมด</div>
          <p className={styles.statNumber}>{scores.length}</p>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🏆</div>
          <div className={styles.statLabel}>คะแนนสูงสุด</div>
          <p className={styles.statNumber}>
            {scores.length > 0 ? Math.max(...scores.map(s => s.score)) : 0}
          </p>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📊</div>
          <div className={styles.statLabel}>คะแนนเฉลี่ย</div>
          <p className={styles.statNumber}>
            {scores.length > 0 ? Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length) : 0}
          </p>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🎯</div>
          <div className={styles.statLabel}>อัตราการจบเกม</div>
          <p className={styles.statNumber}>
            {scores.length > 0 ? Math.round((scores.filter(s => s.trophy !== 'Novice').length / scores.length) * 100) : 0}%
          </p>
          <p className={styles.statSub}>สัดส่วนผู้ที่ได้ถ้วยรางวัล</p>
        </div>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <p>กำลังโหลดข้อมูล...</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>อันดับ</th>
                <th>ชื่อผู้เล่น</th>
                <th>คะแนน</th>
                <th>ระดับ (Trophy)</th>
                <th>วันที่เล่น</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr key={score.id}>
                  <td>{index + 1}</td>
                  <td className={styles.playerName}>{score.player_name}</td>
                  <td className={styles.scoreVal}>{score.score}</td>
                  <td><span className={styles.badge}>{score.trophy}</span></td>
                  <td>{new Date(score.created_at).toLocaleString('th-TH')}</td>
                  <td>
                    <button 
                      className={styles.deleteBtn}
                      onClick={() => deleteScore(score.id)}
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
              {scores.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>ยังไม่มีข้อมูลผู้เล่น</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
