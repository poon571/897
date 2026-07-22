"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../../../styles/auth.module.css";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username_email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (res.ok) {
        router.push("/game");
      } else {
        setError(data.error || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
      }
    } catch (err) {
      setError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.bgOrbs}>
        <div className={`${styles.orb} ${styles.orb1}`}></div>
        <div className={`${styles.orb} ${styles.orb2}`}></div>
        <div className={`${styles.orb} ${styles.orb3}`}></div>
      </div>

      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h1 className={styles.authTitle}>เข้าสู่ระบบ <span>Harvest Frontier</span></h1>
          <p className={styles.authSubtitle}>ยินดีต้อนรับกลับสู่โลกแห่งการเกษตร</p>
        </div>

        {error && <div className={`${styles.alert} ${styles.error}`}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>ชื่อผู้ใช้ หรือ อีเมล</label>
            <div className={styles.formInputWrapper}>
              <span className={styles.inputIcon}>👤</span>
              <input
                type="text"
                className={styles.formControl}
                placeholder="กรอกชื่อผู้ใช้หรืออีเมล"
                value={formData.username_email}
                onChange={(e) => setFormData({ ...formData, username_email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>รหัสผ่าน</label>
            <div className={styles.formInputWrapper}>
              <span className={styles.inputIcon}>🔒</span>
              <input
                type={showPwd ? "text" : "password"}
                className={styles.formControl}
                placeholder="กรอกรหัสผ่านของคุณ"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                className={styles.btnTogglePwd}
                onClick={() => setShowPwd(!showPwd)}
              >
                {showPwd ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.btnSubmit} disabled={loading}>
            {loading ? <div className={styles.spinner}></div> : "เข้าสู่ระบบ"}
          </button>
        </form>

        <div className={styles.authFooter}>
          ยังไม่มีบัญชีใช่ไหม? <Link href="/auth/register" className={styles.authLink}>สมัครสมาชิกเลย</Link>
        </div>
      </div>
    </div>
  );
}
