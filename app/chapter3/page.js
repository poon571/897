import Link from "next/link";
import styles from "../../styles/chapters.module.css";

export default function Chapter3() {
  return (
    <div className={`${styles.chapterContainer} ${styles.chapter3}`}>
      <div className={styles.particles}></div>
      <div className={styles.contentBox}>
        <h1 className={styles.chapterTitle}>บทที่ 3</h1>
        <h2 className={styles.chapterSubtitle}>🌦️ เกาะฤดูกาล</h2>
        <p className={styles.chapterDesc}>
          บททดสอบสุดท้ายที่ยากที่สุด!
          รับมือกับการเปลี่ยนแปลงของสภาพอากาศ การจัดการน้ำในหน้าแล้ง
          และปกป้องผลผลิตจากพายุฝน รวบรวมความรู้ทั้งหมดเพื่อพิชิตบอสใหญ่!
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
