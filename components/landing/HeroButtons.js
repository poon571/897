"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../../styles/landing.module.css";

export default function HeroButtons() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = () => {
    fetch("/api/me")
      .then((r) => r.json())
      .then((data) => {
        setUser(data.user || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchUser();
    // Sync with logout/login events from UserAvatar
    const onAuthChange = () => {
      setLoading(true);
      fetchUser();
    };
    window.addEventListener("harvest:auth-change", onAuthChange);
    return () => window.removeEventListener("harvest:auth-change", onAuthChange);
  }, []);

  if (loading) {
    return (
      <div className={styles.heroButtons}>
        <div className={styles.btnSkeleton} />
        <div className={styles.btnSkeletonSecondary} />
      </div>
    );
  }

  if (user) {
    return (
      <div className={styles.heroButtons}>
        <Link href="/game" className={styles.btnPlay} id="start-game-btn">
          <span className={styles.btnPlayIcon}>🎮</span>
          <span>เริ่มเล่นเกม</span>
          <span className={styles.btnPlayArrow}>→</span>
        </Link>
        <a href="#about" className={styles.btnSecondary}>
          📖 เรียนรู้เพิ่มเติม
        </a>
      </div>
    );
  }

  return (
    <div className={styles.heroButtons}>
      <Link href="/auth/register" className={styles.btnPrimary} id="hero-register-btn">
        🚀 เริ่มต้นผจญภัย
      </Link>
      <a href="#about" className={styles.btnSecondary}>
        📖 เรียนรู้เพิ่มเติม
      </a>
    </div>
  );
}
