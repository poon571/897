"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../../../styles/auth.module.css";
import BackHomeButton from "../../../components/ui/BackHomeButton";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirm_password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [pwdStrength, setPwdStrength] = useState({ score: 0, text: "", color: "" });
  const router = useRouter();

  const checkPasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length > 5) score += 1;
    if (pwd.length > 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    let text = "";
    let color = "";

    if (pwd.length === 0) {
      score = 0; text = ""; color = "";
    } else if (score <= 2) {
      text = "อ่อนแอ (เพิ่มความยาวและตัวเลข)"; color = "#ef4444";
    } else if (score <= 4) {
      text = "ปานกลาง"; color = "#f59e0b";
    } else {
      text = "แข็งแรงมาก"; color = "#22c55e";
    }

    setPwdStrength({ score, text, color });
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setFormData({ ...formData, password: val });
    checkPasswordStrength(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirm_password) {
      setError("รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (res.ok) {
        router.push("/auth/login");
      } else {
        setError(data.error || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
      }
    } catch (err) {
      setError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <BackHomeButton />
      <div className={styles.bgOrbs}>
        <div className={`${styles.orb} ${styles.orb1}`}></div>
        <div className={`${styles.orb} ${styles.orb2}`}></div>
        <div className={`${styles.orb} ${styles.orb3}`}></div>
      </div>

      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h1 className={styles.authTitle}>สมัครสมาชิก <span>Harvest Frontier</span></h1>
          <p className={styles.authSubtitle}>สร้างบัญชีเพื่อเริ่มต้นการเดินทางของคุณ</p>
        </div>

        {error && <div className={`${styles.alert} ${styles.error}`}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>ชื่อผู้ใช้ (Username)</label>
            <div className={styles.formInputWrapper}>
              <span className={styles.inputIcon}>👤</span>
              <input
                type="text"
                className={styles.formControl}
                placeholder="ภาษาอังกฤษหรือตัวเลข"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>อีเมล (Email)</label>
            <div className={styles.formInputWrapper}>
              <span className={styles.inputIcon}>📧</span>
              <input
                type="email"
                className={styles.formControl}
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                placeholder="อย่างน้อย 6 ตัวอักษร"
                value={formData.password}
                onChange={handlePasswordChange}
                required
                minLength={6}
              />
              <button
                type="button"
                className={styles.btnTogglePwd}
                onClick={() => setShowPwd(!showPwd)}
              >
                {showPwd ? "👁️" : "🙈"}
              </button>
            </div>
            
            {formData.password.length > 0 && (
              <div className={styles.pwdStrength}>
                <div className={styles.strengthBars}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div 
                      key={num} 
                      className={styles.strengthBar} 
                      style={{ background: num <= pwdStrength.score ? pwdStrength.color : "rgba(255, 255, 255, 0.1)" }}
                    ></div>
                  ))}
                </div>
                <span className={styles.strengthText} style={{ color: pwdStrength.color }}>
                  {pwdStrength.text}
                </span>
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>ยืนยันรหัสผ่าน</label>
            <div className={styles.formInputWrapper}>
              <span className={styles.inputIcon}>🔐</span>
              <input
                type={showPwd ? "text" : "password"}
                className={styles.formControl}
                placeholder="กรอกรหัสผ่านอีกครั้ง"
                value={formData.confirm_password}
                onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                required
                minLength={6}
              />
            </div>
          </div>

          <button type="submit" className={styles.btnSubmit} disabled={loading}>
            {loading ? <div className={styles.spinner}></div> : "สร้างบัญชีผู้ใช้"}
          </button>
        </form>

        <div className={styles.authFooter}>
          มีบัญชีอยู่แล้ว? <Link href="/auth/login" className={styles.authLink}>เข้าสู่ระบบ</Link>
        </div>
      </div>
    </div>
  );
}
