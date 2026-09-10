import Link from "next/link";
import styles from "./BackHomeButton.module.css";

export default function BackHomeButton() {
  return (
    <Link href="/" className={styles.backBtn} id="back-home-btn">
      <span className={styles.arrow}>←</span>
      <span>หน้าหลัก</span>
    </Link>
  );
}
