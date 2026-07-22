import Link from "next/link";
import styles from "../../styles/chapters.module.css";

export default function Chapter2() {
  return (
    <div className={`${styles.chapterContainer} ${styles.chapter2}`}>
      <div className={styles.particles}></div>
      <div className={styles.contentBox}>
        <h1 className={styles.chapterTitle}>บทที่ 2</h1>
        <h2 className={styles.chapterSubtitle}>🌿 เกาะพืชพรรณ</h2>
        <p className={styles.chapterDesc}>
          ก้าวเข้าสู่ดินแดนแห่งพืชพรรณที่อุดมสมบูรณ์
          เรียนรู้วิธีการบำรุงรักษาต้นไม้ การใช้ปุ๋ยอินทรีย์
          และการป้องกันโรคพืชแบบธรรมชาติ เพื่อให้ผลผลิตงอกงามที่สุด
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
