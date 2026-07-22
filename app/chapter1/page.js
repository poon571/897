import Link from "next/link";
import styles from "../../styles/chapters.module.css";

export default function Chapter1() {
  return (
    <div className={`${styles.chapterContainer} ${styles.chapter1}`}>
      <div className={styles.particles}></div>
      <div className={styles.contentBox}>
        <h1 className={styles.chapterTitle}>บทที่ 1</h1>
        <h2 className={styles.chapterSubtitle}>🏝️ เกาะเกษตรกรรม</h2>
        <p className={styles.chapterDesc}>
          ยินดีต้อนรับสู่เกาะแห่งแรก! ที่นี่คุณจะได้เรียนรู้พื้นฐานของดิน
          การเตรียมแปลงปลูก และการเลือกช่วงเวลาที่เหมาะสมในการเพาะปลูก
          พร้อมที่จะเผชิญหน้ากับปีศาจแห่งความไม่รู้แล้วหรือยัง?
        </p>
        <div className={styles.btnGroup}>
          <Link href="/game" className={`${styles.btnAction} ${styles.btnPrimary}`}>
            🎮 เข้าสู่เกม
          </Link>
          <Link href="/" className={`${styles.btnAction} ${styles.btnSecondary}`}>
            🏠 กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
}
