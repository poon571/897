"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../styles/landing.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.landingNav} ${scrolled ? styles.scrolled : ""}`}>
      <Link href="/" className={styles.navLogo}>
        <span className={styles.logoIcon}>🌾</span>
        <span>Harvest Frontier</span>
      </Link>
      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
        <li><a href="#about" onClick={() => setMenuOpen(false)}>เกี่ยวกับ</a></li>
        <li><a href="#features" onClick={() => setMenuOpen(false)}>จุดเด่น</a></li>
        <li><a href="#cta" onClick={() => setMenuOpen(false)}>เริ่มเลย</a></li>
        <li><Link href="/auth/login" className={styles.navBtn}>เข้าสู่ระบบ</Link></li>
      </ul>
      <button 
        className={styles.navToggle} 
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}
