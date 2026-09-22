"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BackHomeButton from "../../components/ui/BackHomeButton";
import styles from "../../styles/profile.module.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("info"); // "info" | "password"
  const [pwdForm, setPwdForm] = useState({ current: "", newPwd: "", confirm: "" });
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdError, setPwdError] = useState("");
  const [pwdSuccess, setPwdSuccess] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({ username: "", email: "", display_name: "" });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.user) {
          router.push("/auth/login");
          return;
        }
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => router.push("/auth/login"));
  }, []);

  const startEditProfile = () => {
    setProfileForm({ username: user.username, email: user.email || "", display_name: user.display_name || "" });
    setProfileError("");
    setProfileSuccess("");
    setIsEditing(true);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileError("");
    setProfileSuccess("");
    setProfileLoading(true);
    try {
      const res = await fetch("/api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForm),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setProfileSuccess("อัปเดตข้อมูลสำเร็จ! 🎉");
        setIsEditing(false);
        window.dispatchEvent(new Event("harvest:auth-change"));
      } else {
        setProfileError(data.error || "เกิดข้อผิดพลาด");
      }
    } catch {
      setProfileError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwdError("");
    setPwdSuccess("");
    if (pwdForm.newPwd !== pwdForm.confirm) {
      setPwdError("รหัสผ่านใหม่และการยืนยันไม่ตรงกัน");
      return;
    }
    if (pwdForm.newPwd.length < 6) {
      setPwdError("รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร");
      return;
    }
    setPwdLoading(true);
    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: pwdForm.current, newPassword: pwdForm.newPwd }),
      });
      const data = await res.json();
      if (res.ok) {
        setPwdSuccess("เปลี่ยนรหัสผ่านสำเร็จ! ✅");
        setPwdForm({ current: "", newPwd: "", confirm: "" });
      } else {
        setPwdError(data.error || "เกิดข้อผิดพลาด");
      }
    } catch {
      setPwdError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally {
      setPwdLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.dispatchEvent(new Event("harvest:auth-change"));
    router.push("/");
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loader}>
          <div className={styles.loaderSpinner} />
          <span>กำลังโหลด...</span>
        </div>
      </div>
    );
  }

  const initials = user.username?.slice(0, 2).toUpperCase() || "??";
  const isAdmin = user.role === "admin";

  return (
    <div className={styles.page}>
      <BackHomeButton />

      {/* Background orbs */}
      <div className={styles.bgOrbs}>
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
      </div>

      <div className={styles.container}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          {/* Avatar */}
          <div className={styles.sidebarAvatar}>
            <div className={`${styles.avatarCircle} ${isAdmin ? styles.adminCircle : ""}`}>
              {initials}
            </div>
            {isAdmin && <div className={styles.adminGlow} />}
          </div>
          <div className={styles.sidebarName}>{user.display_name || user.username}</div>
          {isAdmin && <div className={styles.adminBadge}>👑 Admin</div>}
          <div className={styles.sidebarEmail}>{user.email}</div>

          {/* Player stats box */}
          <div className={styles.statsBox}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>เกาะที่ผ่าน</span>
              <span className={styles.statValue}>{user.stats?.islandsCompleted || 0}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>คะแนนสูงสุด</span>
              <span className={styles.statValue}>{user.stats?.highestScore || 0}</span>
            </div>
          </div>

          <nav className={styles.sidebarNav}>
            <button
              className={`${styles.navItem} ${tab === "info" ? styles.navItemActive : ""}`}
              onClick={() => setTab("info")}
            >
              <span>👤</span> ข้อมูลบัญชี
            </button>
            <button
              className={`${styles.navItem} ${tab === "password" ? styles.navItemActive : ""}`}
              onClick={() => setTab("password")}
            >
              <span>🔒</span> เปลี่ยนรหัสผ่าน
            </button>
            <Link href="/game" className={styles.navItem}>
              <span>🎮</span> เล่นเกม
            </Link>
          </nav>

          <button className={styles.logoutBtn} onClick={handleLogout}>
            🚪 ออกจากระบบ
          </button>
        </aside>

        {/* Main content */}
        <main className={styles.main}>
          {tab === "info" && (
            <div className={styles.card}>
              <div className={styles.cardHeader} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h1 className={styles.cardTitle}>ข้อมูลบัญชีของฉัน</h1>
                  <p className={styles.cardSubtitle}>ข้อมูลส่วนตัวในระบบ Harvest Frontier</p>
                </div>
                {!isEditing && (
                  <button className={styles.editBtn} onClick={startEditProfile}>
                    ✏️ แก้ไขข้อมูล
                  </button>
                )}
              </div>

              {profileError && <div className={styles.alertError}>⚠️ {profileError}</div>}
              {profileSuccess && <div className={styles.alertSuccess}>{profileSuccess}</div>}

              {isEditing ? (
                <form onSubmit={handleUpdateProfile} className={styles.pwdForm} style={{ marginBottom: "28px" }}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>ชื่อที่แสดง (Display Name)</label>
                    <div className={styles.inputWrapper}>
                      <span className={styles.inputIcon}>🎮</span>
                      <input
                        type="text"
                        className={styles.formInput}
                        value={profileForm.display_name}
                        onChange={(e) => setProfileForm({ ...profileForm, display_name: e.target.value })}
                        placeholder="ชื่อตัวละครที่ใช้แสดงผล"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>ชื่อผู้ใช้ (Username)</label>
                    <div className={styles.inputWrapper}>
                      <span className={styles.inputIcon}>👤</span>
                      <input
                        type="text"
                        className={styles.formInput}
                        value={profileForm.username}
                        onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>อีเมล (Email)</label>
                    <div className={styles.inputWrapper}>
                      <span className={styles.inputIcon}>📧</span>
                      <input
                        type="email"
                        className={styles.formInput}
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                    <button type="submit" className={styles.submitBtn} style={{ flex: 1 }} disabled={profileLoading}>
                      {profileLoading ? <span className={styles.spinner} /> : "💾 บันทึกข้อมูล"}
                    </button>
                    <button
                      type="button"
                      className={styles.cancelBtn}
                      onClick={() => setIsEditing(false)}
                      disabled={profileLoading}
                    >
                      ❌ ยกเลิก
                    </button>
                  </div>
                </form>
              ) : (
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <label className={styles.infoLabel}>ชื่อที่แสดง</label>
                    <div className={styles.infoValue}>
                      <span className={styles.infoIcon}>🎮</span>
                      {user.display_name || "—"}
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <label className={styles.infoLabel}>ชื่อผู้ใช้</label>
                    <div className={styles.infoValue}>
                      <span className={styles.infoIcon}>👤</span>
                      {user.username}
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <label className={styles.infoLabel}>อีเมล</label>
                    <div className={styles.infoValue}>
                      <span className={styles.infoIcon}>📧</span>
                      {user.email || "—"}
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <label className={styles.infoLabel}>บทบาท</label>
                    <div className={styles.infoValue}>
                      {isAdmin ? (
                        <span className={styles.roleBadgeAdmin}>👑 Administrator</span>
                      ) : (
                        <span className={styles.roleBadgeUser}>🌱 ผู้เล่น</span>
                      )}
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <label className={styles.infoLabel}>รหัสผู้ใช้</label>
                    <div className={styles.infoValue}>
                      <span className={styles.infoIcon}>🆔</span>
                      <span className={styles.infoMuted}>#{user.id}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.statsRow}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>🏝️</div>
                  <div className={styles.statValue}>3</div>
                  <div className={styles.statLabel}>เกาะทั้งหมด</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>⚔️</div>
                  <div className={styles.statValue}>—</div>
                  <div className={styles.statLabel}>บอสที่ผ่าน</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>🏆</div>
                  <div className={styles.statValue}>—</div>
                  <div className={styles.statLabel}>คะแนนสูงสุด</div>
                </div>
              </div>
            </div>
          )}

          {tab === "password" && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h1 className={styles.cardTitle}>เปลี่ยนรหัสผ่าน</h1>
                <p className={styles.cardSubtitle}>อัปเดตรหัสผ่านเพื่อความปลอดภัยของบัญชี</p>
              </div>

              {pwdError && <div className={styles.alertError}>⚠️ {pwdError}</div>}
              {pwdSuccess && <div className={styles.alertSuccess}>{pwdSuccess}</div>}

              <form onSubmit={handleChangePassword} className={styles.pwdForm}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>รหัสผ่านปัจจุบัน</label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>🔑</span>
                    <input
                      type={showPwd ? "text" : "password"}
                      className={styles.formInput}
                      placeholder="กรอกรหัสผ่านปัจจุบัน"
                      value={pwdForm.current}
                      onChange={(e) => setPwdForm({ ...pwdForm, current: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>รหัสผ่านใหม่</label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>🔒</span>
                    <input
                      type={showPwd ? "text" : "password"}
                      className={styles.formInput}
                      placeholder="อย่างน้อย 6 ตัวอักษร"
                      value={pwdForm.newPwd}
                      onChange={(e) => setPwdForm({ ...pwdForm, newPwd: e.target.value })}
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>ยืนยันรหัสผ่านใหม่</label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>🔐</span>
                    <input
                      type={showPwd ? "text" : "password"}
                      className={styles.formInput}
                      placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
                      value={pwdForm.confirm}
                      onChange={(e) => setPwdForm({ ...pwdForm, confirm: e.target.value })}
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <div className={styles.showPwdRow}>
                  <input
                    type="checkbox"
                    id="show-pwd-toggle"
                    checked={showPwd}
                    onChange={() => setShowPwd(!showPwd)}
                  />
                  <label htmlFor="show-pwd-toggle">แสดงรหัสผ่าน</label>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={pwdLoading}>
                  {pwdLoading ? <span className={styles.spinner} /> : "บันทึกรหัสผ่านใหม่"}
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
