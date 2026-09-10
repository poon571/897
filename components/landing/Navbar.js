"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../styles/landing.module.css";
import UserAvatar from "../auth/UserAvatar";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.landingNav} ${scrolled ? styles.scrolled : ""}`}>
      {/* LEFT: Logo */}
      <Link href="/" className={styles.navLogo}>
        <span className={styles.logoIcon}>🌾</span>
        <span>Harvest Frontier</span>
      </Link>

      {/* CENTER: Nav links */}
      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
        <li><a href="#about" onClick={() => setMenuOpen(false)}>เกี่ยวกับ</a></li>
        <li><a href="#features" onClick={() => setMenuOpen(false)}>จุดเด่น</a></li>
        <li><a href="#cta" onClick={() => setMenuOpen(false)}>เริ่มเลย</a></li>
      </ul>

      {/* RIGHT: Avatar */}
      <div className={styles.navRight}>
        <UserAvatar />
      </div>

      {/* Mobile toggle */}
      <button
        className={styles.navToggle}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        <span className={menuOpen ? styles.bar1Open : ""}></span>
        <span className={menuOpen ? styles.bar2Open : ""}></span>
        <span className={menuOpen ? styles.bar3Open : ""}></span>
      </button>
    </nav>
  );
}
