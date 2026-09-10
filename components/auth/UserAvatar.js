"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./UserAvatar.module.css";

export default function UserAvatar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

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
    // Listen for auth changes from other components
    const onAuthChange = () => fetchUser();
    window.addEventListener("harvest:auth-change", onAuthChange);
    return () => window.removeEventListener("harvest:auth-change", onAuthChange);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
    setOpen(false);
    // Notify all components that auth state changed
    window.dispatchEvent(new Event("harvest:auth-change"));
    router.refresh();
  };

  if (loading) return <div className={styles.avatarSkeleton} />;

  if (!user) {
    return (
      <Link href="/auth/login" className={styles.loginBtn}>
        เข้าสู่ระบบ
      </Link>
    );
  }

  const initials = user.username?.slice(0, 2).toUpperCase() || "??";
  const isAdmin = user.role === "admin";

  return (
    <div className={styles.avatarWrapper} ref={dropdownRef}>
      <button
        className={styles.avatarBtn}
        onClick={() => setOpen(!open)}
        aria-label="User menu"
        id="user-avatar-btn"
      >
        <div className={`${styles.avatarCircle} ${isAdmin ? styles.adminCircle : ""}`}>
          {initials}
        </div>
        {isAdmin && <span className={styles.adminBadge}>👑</span>}
        <div className={styles.avatarInfo}>
          <span className={styles.avatarName}>{user.username}</span>
          {isAdmin && <span className={styles.avatarRole}>Admin</span>}
        </div>
        <span className={`${styles.chevron} ${open ? styles.chevronUp : ""}`}>▾</span>
      </button>

      {open && (
        <div className={styles.dropdown} id="user-dropdown">
          <div className={styles.dropdownHeader}>
            <div className={`${styles.avatarCircleLg} ${isAdmin ? styles.adminCircle : ""}`}>
              {initials}
            </div>
            <div>
              <div className={styles.dropdownName}>{user.username}</div>
              <div className={styles.dropdownEmail}>{user.email || ""}</div>
              {isAdmin && (
                <span className={styles.dropdownRoleBadge}>👑 Admin</span>
              )}
            </div>
          </div>

          <div className={styles.dropdownDivider} />

          <Link href="/game" className={styles.dropdownItem} onClick={() => setOpen(false)}>
            🎮 เล่นเกม
          </Link>

          <Link href="/profile" className={styles.dropdownItem} onClick={() => setOpen(false)}>
            ⚙️ ตั้งค่าบัญชี
          </Link>

          <div className={styles.dropdownDivider} />

          <button
            className={`${styles.dropdownItem} ${styles.dropdownLogout}`}
            onClick={handleLogout}
            id="logout-btn"
          >
            🚪 ออกจากระบบ
          </button>
        </div>
      )}
    </div>
  );
}
