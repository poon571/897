"use client";
import { useEffect } from "react";
import Script from "next/script";

export default function GamePage() {
  useEffect(() => {
    // Attempt to initialize game engine once the script is loaded and DOM is ready
    const initGame = () => {
      if (window.TerraQuestSuperEngine) {
        if (window.gameEngine && window.gameEngine.quizInterval) {
          clearInterval(window.gameEngine.quizInterval);
        }
        window.gameEngine = new window.TerraQuestSuperEngine();
      } else {
        setTimeout(initGame, 100);
      }
    };
    initGame();

    return () => {
      if (window.gameEngine && window.gameEngine.quizInterval) {
        clearInterval(window.gameEngine.quizInterval);
      }
      window.gameEngine = null;
    };
  }, []);
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;600;700&family=Kanit:wght@400;500;600;700&family=Press+Start+2P&family=Prompt:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/css/style.css" />
      <link rel="stylesheet" href="/css/undertale.css" />

      <div id="game-viewport-wrapper">
        <canvas id="gameCanvas" width="960" height="540"></canvas>
        <div id="scanline-overlay"></div>

        <div id="ui-layer">
          {/* FLOATING NAMETAGS & NOTIFICATION LAYER (100% Crisp Vector HTML) */}
          <div id="floating-tags-container"></div>
          <div id="hud-notification-banner" className="hud-notification-banner hidden">
            <span id="hud-notification-text"></span>
          </div>

          {/* MAIN MENU OVERLAY */}
          <div id="main-menu-overlay">
            <div className="menu-title-area">
              <h1 className="menu-game-title">HARVEST FRONTIER</h1>
              <p className="menu-game-subtitle">ผจญภัยสู่โลกเกษตรกรรมแห่งอนาคต</p>
              <p className="menu-version-tag">v1.0 — BY KORON</p>
            </div>
            <div className="menu-buttons-area">
              <button id="btn-menu-start" className="menu-btn menu-btn-primary">
                🎮 เริ่มเกม
              </button>
              <button id="btn-menu-settings" className="menu-btn">
                ⚙️ ตั้งค่า
              </button>
              <button id="btn-menu-exit" className="menu-btn menu-btn-danger">
                🚪 ออก
              </button>
            </div>
            <div className="menu-controls-hint">
              PRESS ENTER OR CLICK TO START
            </div>
          </div>

          {/* TOP HUD */}
          <div id="hud-top" className="hidden">
            <div className="hud-player-profile">
              <span
                id="hud-player-name"
                style={{ color: "var(--gold-highlight)", fontWeight: 700 }}
              >
                ผู้กล้า
              </span>
            </div>
            <div className="hud-quest-tracker">
              <span>📜 เควสต์: </span>
              <span id="hud-quest-text">ไปพบปราชญ์อาวุโส</span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button id="btn-open-map" className="retro-btn-sm" style={{ background: "linear-gradient(180deg, #1e3c72, #2a5298)", borderColor: "#4facfe" }}>
                🗺️ แผนที่โลก [M]
              </button>
              <button id="btn-open-codex" className="retro-btn-sm">
                📖 บันทึกปัญญา [B]
              </button>
              <button id="btn-open-settings" className="retro-btn-sm" style={{ background: "linear-gradient(180deg, #2a2c3a, #1a1c28)", borderColor: "#8892b0" }}>
                ⚙️ ตั้งค่า [O]
              </button>
              <button id="btn-hud-menu" className="retro-btn-sm" style={{ background: "linear-gradient(180deg, #3d1c24, #240d13)", borderColor: "#e71d36", color: "#ff8597" }} title="บันทึกและกลับสู่หน้าเมนูหลัก">
                🏠 เมนูหลัก
              </button>
            </div>
          </div>

          {/* BOTTOM RIGHT HUD */}
          <div id="hud-bottom-right" className="hidden">
            <div className="hud-island-box">
              <span id="hud-island-name">
                เกาะแห่งพืชพรรณและปฐพี
              </span>
            </div>
          </div>

          {/* MODAL: SAVE SLOTS (3 SLOTS) */}
          <div id="modal-save-slots" className="modal-backdrop hidden" style={{ zIndex: 550 }}>
            <div className="retro-window save-slots-window">
              <div className="window-header-ribbon" style={{ position: "relative", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", boxSizing: "border-box" }}>
                <span className="ribbon-text">💾 เลือกช่องบันทึกข้อมูล (SELECT SAVE SLOT)</span>
                <button id="btn-close-save-slots-x" className="retro-btn-close" title="ปิดหน้าต่าง">✕</button>
              </div>

              <div id="save-slots-container" className="save-slots-grid">
                {/* Dynamically populated by TerraQuestSuperEngine */}
              </div>

              <div style={{ marginTop: "18px", display: "flex", justifyContent: "center" }}>
                <button id="btn-back-from-save-slots" className="retro-btn-sm" style={{ padding: "8px 24px", fontSize: "12px" }}>
                  ⬅️ กลับสู่หน้าเมนูหลัก
                </button>
              </div>
            </div>
          </div>

          {/* MODAL: SETTINGS */}
          <div id="modal-settings" className="modal-backdrop hidden">
            <div className="retro-window settings-window">
              <div className="window-header-ribbon" style={{ position: "relative", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", boxSizing: "border-box" }}>
                <span className="ribbon-text">⚙️ ตั้งค่าระบบ (GAME SETTINGS)</span>
                <button id="btn-close-settings-x" className="retro-btn-close" title="ปิดหน้าต่าง">✕</button>
              </div>

              {/* AUDIO SECTION */}
              <div className="settings-section">
                <div className="settings-section-title">
                  <span>🔊</span> ระบบเสียง (Audio)
                </div>

                <div className="settings-row">
                  <div className="settings-label-group">
                    <div className="settings-label">เสียงหลัก (Master Volume)</div>
                    <div className="settings-desc">ควบคุมระดับเสียงทั้งหมดของเกม</div>
                  </div>
                  <div className="settings-control-group">
                    <input type="range" id="slider-vol-master" className="settings-slider" min="0" max="100" defaultValue="100" />
                    <span id="val-vol-master" className="settings-val-badge">100%</span>
                  </div>
                </div>

                <div className="settings-row">
                  <div className="settings-label-group">
                    <div className="settings-label">เสียงดนตรี (Music BGM)</div>
                    <div className="settings-desc">ระดับเสียงเพลงประกอบ 8-bit</div>
                  </div>
                  <div className="settings-control-group">
                    <input type="range" id="slider-vol-bgm" className="settings-slider" min="0" max="100" defaultValue="60" />
                    <span id="val-vol-bgm" className="settings-val-badge">60%</span>
                  </div>
                </div>

                <div className="settings-row">
                  <div className="settings-label-group">
                    <div className="settings-label">เสียงเอฟเฟกต์ (Sound Effects)</div>
                    <div className="settings-desc">เสียงกระโดด โจมตี ตอบคำถาม ไอเทม</div>
                  </div>
                  <div className="settings-control-group">
                    <button id="btn-test-sfx" className="btn-test-sfx">🔔 ทดสอบ</button>
                    <input type="range" id="slider-vol-sfx" className="settings-slider" min="0" max="100" defaultValue="80" />
                    <span id="val-vol-sfx" className="settings-val-badge">80%</span>
                  </div>
                </div>
              </div>

              {/* DISPLAY & EFFECTS SECTION */}
              <div className="settings-section">
                <div className="settings-section-title">
                  <span>📺</span> กราฟิกและเอฟเฟกต์หน้าจอ (Display & FX)
                </div>

                <div className="settings-row">
                  <div className="settings-label-group">
                    <div className="settings-label">เส้นลายจอเรโทร (CRT Scanlines)</div>
                    <div className="settings-desc">เปิด/ปิดเอฟเฟกต์เส้นสแกนตู้เกมเรโทรบนหน้าจอ</div>
                  </div>
                  <div className="settings-control-group">
                    <label className="switch-toggle">
                      <input type="checkbox" id="toggle-scanlines" defaultChecked />
                      <span className="switch-slider"></span>
                    </label>
                  </div>
                </div>

                <div className="settings-row">
                  <div className="settings-label-group">
                    <div className="settings-label">ละอองอนุภาค (Particle FX)</div>
                    <div className="settings-desc">แสดงประกายแสง ฝุ่นวิ่ง และเอฟเฟกต์บรรยากาศ</div>
                  </div>
                  <div className="settings-control-group">
                    <label className="switch-toggle">
                      <input type="checkbox" id="toggle-particles" defaultChecked />
                      <span className="switch-slider"></span>
                    </label>
                  </div>
                </div>

                <div className="settings-row">
                  <div className="settings-label-group">
                    <div className="settings-label">เงาขอบมืด (Vignette Lighting)</div>
                    <div className="settings-desc">เพิ่มมิติแสงเงาและความมืดรอบขอบจอ</div>
                  </div>
                  <div className="settings-control-group">
                    <label className="switch-toggle">
                      <input type="checkbox" id="toggle-vignette" defaultChecked />
                      <span className="switch-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="settings-footer">
                <button id="btn-save-settings" className="retro-btn-action" style={{ flex: 2 }}>
                  💾 บันทึกและปิด
                </button>
                <button id="btn-reset-settings" className="retro-btn-sm" style={{ flex: 1, padding: "10px" }}>
                  🔄 คืนค่าเริ่มต้น
                </button>
              </div>
            </div>
          </div>

          {/* MODAL 1: NAMING (UNDERTALE STYLE) */}
          <div id="modal-char-creation" className="undertale-naming-bg hidden">
            <div className="undertale-naming-content">
              <h1 className="undertale-title">เด็กแห่งโชคชะตา</h1>
              <p className="undertale-subtitle">(จงตั้งชื่อผู้กล้า)</p>

              <div className="undertale-name-display">
                <span id="player-name-display"></span>
              </div>

              <div id="undertale-keyboard-container" className="undertale-keyboard"></div>

              <div style={{ marginTop: "24px", fontSize: "12px", color: "#64748b", letterSpacing: "1px" }}>
                <span>🎮 ขยับ: [W][A][S][D] / [ลูกศร] &nbsp;|&nbsp; ยืนยัน: [X] / [ENTER]</span>
              </div>

              <div id="undertale-confirm-box" className="hidden">
                <p style={{ fontSize: "16px", marginBottom: "16px" }}>ยืนยันชื่อนี้หรือไม่?</p>
                <div className="undertale-choices">
                  <span
                    className="undertale-choice active"
                    id="btn-confirm-yes"
                  >
                    ใช่ (Yes)
                  </span>
                  <span className="undertale-choice" id="btn-confirm-no">
                    ไม่ (No)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CHARACTER CUSTOMIZATION OVERLAY */}
          <div id="customization-ui-overlay" className="hidden">
            <div className="customization-card">
              <div className="window-header-ribbon" style={{ margin: "-22px auto 10px auto", padding: "4px 16px" }}>
                <span className="ribbon-text">🪞 แต่งตัวละคร (DRESSING ROOM)</span>
              </div>

              {/* TABS */}
              <div className="custom-nav-tabs">
                <button id="tab-custom-head" className="custom-tab-btn active" data-tab="head">
                  👑 ส่วนหัว
                </button>
                <button id="tab-custom-body" className="custom-tab-btn" data-tab="body">
                  👕 ส่วนตัว
                </button>
                <button id="tab-custom-bottom" className="custom-tab-btn" data-tab="bottom">
                  👖 ส่วนล่าง
                </button>
                <button id="tab-custom-costume" className="custom-tab-btn" data-tab="costume">
                  🎭 คอสตูม
                </button>
              </div>

              {/* TAB 1: HEAD */}
              <div id="pane-custom-head" className="custom-tab-pane">
                {/* Hats & Accessories (14 styles) */}
                <div className="custom-subgroup">
                  <div className="custom-subgroup-title">🎩 หมวก & เครื่องประดับ (14 แบบ)</div>
                  <div className="custom-options-grid" id="grid-opt-hat">
                    <button className="custom-opt-btn active" data-hat="none">ไม่มี (None)</button>
                    <button className="custom-opt-btn" data-hat="straw">หมวกฟาง</button>
                    <button className="custom-opt-btn" data-hat="bandana">ผ้าโพกหัว</button>
                    <button className="custom-opt-btn" data-hat="crown">มงกุฎดอกไม้</button>
                    <button className="custom-opt-btn" data-hat="beret">หมวกเบเร่ต์</button>
                    <button className="custom-opt-btn" data-hat="circlet">ที่คาดทอง</button>
                    <button className="custom-opt-btn" data-hat="witch">หมวกแม่มด</button>
                    <button className="custom-opt-btn" data-hat="knight">หมวกอัศวิน</button>
                    <button className="custom-opt-btn" data-hat="king">มงกุฎราชา</button>
                    <button className="custom-opt-btn" data-hat="cowboy">หมวกคาวบอย</button>
                    <button className="custom-opt-btn" data-hat="catears">หูแมวเหมียว</button>
                    <button className="custom-opt-btn" data-hat="pirate">หมวกโจรสลัด</button>
                    <button className="custom-opt-btn" data-hat="glasses">แว่นกันแดด</button>
                    <button className="custom-opt-btn" data-hat="santa">หมวกซานต้า</button>
                  </div>
                </div>

                {/* Hairstyles (20 styles) */}
                <div className="custom-subgroup">
                  <div className="custom-subgroup-title">💇 ทรงผม (20 รูปแบบ)</div>
                  <div className="custom-options-grid" id="grid-opt-hair">
                    <button className="custom-opt-btn active" data-hair="short">1. ผมสั้น</button>
                    <button className="custom-opt-btn" data-hair="long">2. ผมยาวตรง</button>
                    <button className="custom-opt-btn" data-hair="spiky">3. สไปกี้ตั้ง</button>
                    <button className="custom-opt-btn" data-hair="ponytail">4. โพนี่เทล</button>
                    <button className="custom-opt-btn" data-hair="bob">5. บ๊อบสั้น</button>
                    <button className="custom-opt-btn" data-hair="bun">6. มัดจุกเดี่ยว</button>
                    <button className="custom-opt-btn" data-hair="twintail">7. ทวินเทล</button>
                    <button className="custom-opt-btn" data-hair="afro">8. แอฟโฟร</button>
                    <button className="custom-opt-btn" data-hair="undercut">9. อันเดอร์คัต</button>
                    <button className="custom-opt-btn" data-hair="wavy">10. ดัดลอน</button>
                    <button className="custom-opt-btn" data-hair="mohawk">11. โมฮอว์ก</button>
                    <button className="custom-opt-btn" data-hair="sidebraid">12. ถักเปีย</button>
                    <button className="custom-opt-btn" data-hair="hime">13. เจ้าหญิงฮิเมะ</button>
                    <button className="custom-opt-btn" data-hair="buzz">14. สกินเฮด</button>
                    <button className="custom-opt-btn" data-hair="bald">15. หัวล้านเงา</button>
                    <button className="custom-opt-btn" data-hair="emo">16. ปรกตาเดียว</button>
                    <button className="custom-opt-btn" data-hair="ultra">17. ยาวลากพื้น</button>
                    <button className="custom-opt-btn" data-hair="odango">18. จุกคู่ดังโงะ</button>
                    <button className="custom-opt-btn" data-hair="slick">19. เสยสลิค</button>
                    <button className="custom-opt-btn" data-hair="messy">20. ยุ่งเซอร์</button>
                  </div>
                </div>

                {/* Hair Colors (Color Wheel + Presets) */}
                <div className="custom-subgroup">
                  <div className="custom-subgroup-title">🎨 สีผม (เลือกอิสระ / วงล้อสี)</div>

                  {/* Custom Color Wheel Picker */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", background: "#111827", padding: "6px 10px", borderRadius: "4px" }}>
                    <input type="color" id="hair-color-picker" defaultValue="#e17055" className="retro-color-picker" title="คลิกเพื่อเลือกสีผมแบบอิสระ" />
                    <div>
                      <div style={{ fontSize: "11px", fontWeight: "bold", color: "var(--gold-highlight)" }}>🎡 วงล้อสีอิสระ (Color Wheel)</div>
                      <div style={{ fontSize: "10px", color: "#94a3b8" }}>คลิกกล่องสีเพื่อเลือกเฉดสีใดก็ได้ในโลก!</div>
                    </div>
                  </div>

                  {/* Preset Swatches */}
                  <div className="custom-colors-grid" id="grid-color-hair">
                    <div className="custom-color-swatch active" style={{ backgroundColor: "#e17055" }} data-color="#e17055" title="น้ำตาลทอง"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#2d3436" }} data-color="#2d3436" title="ดำสนิท"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#ffd166" }} data-color="#ffd166" title="บลอนด์ทอง"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#ff4d6d" }} data-color="#ff4d6d" title="แดงเพลิง"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#00f5d4" }} data-color="#00f5d4" title="ฟ้ามานา"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#9d4edd" }} data-color="#9d4edd" title="ม่วงเวทมนตร์"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#ff758f" }} data-color="#ff758f" title="ชมพูหวาน"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#52b788" }} data-color="#52b788" title="เขียวเอเมอรัลด์"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#f8f9fa" }} data-color="#f8f9fa" title="เงิน/ขาวประกาย"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#2563eb" }} data-color="#2563eb" title="น้ำเงินโคบอลต์"></div>
                  </div>
                </div>
              </div>

              {/* TAB 2: BODY (WITH SKIN COLOR) */}
              <div id="pane-custom-body" className="custom-tab-pane hidden">
                {/* Skin Color / Tone */}
                <div className="custom-subgroup">
                  <div className="custom-subgroup-title">👤 สีผิวตัวละคร (Skin Tone)</div>

                  {/* Skin Color Wheel */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", background: "#111827", padding: "6px 10px", borderRadius: "4px" }}>
                    <input type="color" id="skin-color-picker" defaultValue="#ffeaa7" className="retro-color-picker" title="คลิกเพื่อเลือกสีผิวอิสระ" />
                    <div>
                      <div style={{ fontSize: "11px", fontWeight: "bold", color: "var(--gold-highlight)" }}>🎡 วงล้อสีผิวอิสระ</div>
                      <div style={{ fontSize: "10px", color: "#94a3b8" }}>ปรับสีผิว มนุษย์ เอลฟ์ ออร์ค ปีศาจ</div>
                    </div>
                  </div>

                  {/* Preset Skin Swatches */}
                  <div className="custom-colors-grid" id="grid-color-skin">
                    <div className="custom-color-swatch active" style={{ backgroundColor: "#ffeaa7" }} data-color="#ffeaa7" title="ผิวขาวเหลือง (Peach)"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#ffdfba" }} data-color="#ffdfba" title="ผิวขาวอมชมพู (Fair Rose)"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#e0a96d" }} data-color="#e0a96d" title="ผิวน้ำผึ้ง (Honey Tan)"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#b87333" }} data-color="#b87333" title="ผิวแทนเข้ม (Bronze)"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#6b4226" }} data-color="#6b4226" title="ผิวช็อกโกแลต (Dark)"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#d0e1fd" }} data-color="#d0e1fd" title="เอลฟ์จันทรา (Moon Elf)"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#86efac" }} data-color="#86efac" title="ออร์คเขียว (Orc)"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#fca5a5" }} data-color="#fca5a5" title="ปีศาจแดง (Demon)"></div>
                  </div>
                </div>

                {/* Outfit Type */}
                <div className="custom-subgroup">
                  <div className="custom-subgroup-title">🧥 แบบเสื้อผ้า</div>
                  <div className="custom-options-grid" id="grid-opt-shirt">
                    <button className="custom-opt-btn active" data-shirt="overalls">ชุดเอี๊ยมสวน</button>
                    <button className="custom-opt-btn" data-shirt="plaid">เชิ้ตลายสก็อต</button>
                    <button className="custom-opt-btn" data-shirt="tunic">ชุดคลุมยาว</button>
                    <button className="custom-opt-btn" data-shirt="armor">เกราะหนังเบา</button>
                    <button className="custom-opt-btn" data-shirt="vest">เสื้อกิลด์</button>
                  </div>
                </div>

                {/* Outfit Color */}
                <div className="custom-subgroup">
                  <div className="custom-subgroup-title">🎨 สีเสื้อผ้า</div>

                  {/* Shirt Color Wheel */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", background: "#111827", padding: "4px 8px", borderRadius: "4px" }}>
                    <input type="color" id="shirt-color-picker" defaultValue="#2a5298" className="retro-color-picker" style={{ width: "28px", height: "28px" }} title="เลือกสีเสื้ออิสระ" />
                    <span style={{ fontSize: "11px", color: "#cbd5e1" }}>วงล้อสีเสื้อผ้าอิสระ</span>
                  </div>

                  <div className="custom-colors-grid" id="grid-color-shirt">
                    <div className="custom-color-swatch active" style={{ backgroundColor: "#2a5298" }} data-color="#2a5298" title="น้ำเงินกรม"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#2d6a4f" }} data-color="#2d6a4f" title="เขียวป่าไม้"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#d90429" }} data-color="#d90429" title="แดงทับทิม"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#6b21a8" }} data-color="#6b21a8" title="ม่วงคราม"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#e85d04" }} data-color="#e85d04" title="ส้มอิฐ"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#212529" }} data-color="#212529" title="ดำออบซิเดียน"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#f8f9fa" }} data-color="#f8f9fa" title="ขาวบริสุทธิ์"></div>
                  </div>
                </div>
              </div>

              {/* TAB 3: BOTTOM */}
              <div id="pane-custom-bottom" className="custom-tab-pane hidden">
                <div className="custom-subgroup">
                  <div className="custom-subgroup-title">👖 แบบกางเกง / กระโปรง</div>
                  <div className="custom-options-grid" id="grid-opt-pants">
                    <button className="custom-opt-btn active" data-pants="jeans">ยีนส์ขายาว</button>
                    <button className="custom-opt-btn" data-pants="shorts">ขาสั้นชาวสวน</button>
                    <button className="custom-opt-btn" data-pants="cargo">กางเกงคาร์โก้</button>
                    <button className="custom-opt-btn" data-pants="skirt">กระโปรงผจญภัย</button>
                  </div>
                </div>

                <div className="custom-subgroup">
                  <div className="custom-subgroup-title">🎨 สีกางเกง</div>
                  <div className="custom-colors-grid" id="grid-color-pants">
                    <div className="custom-color-swatch active" style={{ backgroundColor: "#1a252c" }} data-color="#1a252c" title="ยีนส์คลาสสิก"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#0f172a" }} data-color="#0f172a" title="ดำมิดไนท์"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#8b5a2b" }} data-color="#8b5a2b" title="น้ำตาลกากี"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#386641" }} data-color="#386641" title="เขียวทหาร"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#e2e8f0" }} data-color="#e2e8f0" title="ขาวครีม"></div>
                    <div className="custom-color-swatch" style={{ backgroundColor: "#780000" }} data-color="#780000" title="แดงเข้ม"></div>
                  </div>
                </div>
              </div>

              {/* TAB 4: COSTUMES (FULL BODY SETS) */}
              <div id="pane-custom-costume" className="custom-tab-pane hidden">
                <div className="custom-subgroup">
                  <div className="custom-subgroup-title">
                    <span>✨ ชุดเซ็ตพิเศษ (Full Costumes)</span>
                    <span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "normal", marginLeft: "auto" }}>
                      *สวมทั้งชุด
                    </span>
                  </div>
                  <div className="custom-options-grid" id="grid-opt-costume" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                    <button className="custom-opt-btn active" data-costume="none">
                      ❌ ไม่ใส่ (ชุดปกติ)
                    </button>
                    <button className="custom-opt-btn" data-costume="banana">
                      🍌 ชุดกล้วยจอมกวน
                    </button>
                    <button className="custom-opt-btn" data-costume="kirito">
                      ⚔️ คิริโตะ (นักดาบดำ)
                    </button>
                    <button className="custom-opt-btn" data-costume="naruto">
                      🍜 นารูโตะ (นินจาส้ม)
                    </button>
                    <button className="custom-opt-btn" data-costume="luffy">
                      👒 ลูฟี่ (ราชาโจรสลัด)
                    </button>
                    <button className="custom-opt-btn" data-costume="goku">
                      ⚡ โกคู (ซูเปอร์ไซย่า)
                    </button>
                    <button className="custom-opt-btn" data-costume="dino">
                      🦖 ก๊อตจิไดโนเขียว
                    </button>
                    <button className="custom-opt-btn" data-costume="cyber">
                      🤖 หุ่นรบไซเบอร์
                    </button>
                  </div>
                </div>
              </div>

              {/* BOTTOM ACTIONS */}
              <div className="custom-bottom-actions">
                <button id="btn-custom-random" className="retro-btn-sm" style={{ flex: 1, padding: "10px" }} title="สุ่มเครื่องแต่งกาย">
                  🎲 สุ่มชุด
                </button>
                <button id="btn-custom-turn" className="retro-btn-sm" style={{ flex: 1, padding: "10px" }} title="หมุนตัวละคร">
                  🔄 หมุนตัว
                </button>
                <button id="btn-custom-confirm" className="retro-btn-action" style={{ flex: 2 }}>
                  🌟 เข้าสู่การผจญภัย
                </button>
              </div>
            </div>
          </div>

          {/* MODAL 2: DIALOGUE BOX */}
          <div
            id="dialogue-box"
            className="retro-window dialogue-container hidden"
          >
            <div
              className="dialogue-portrait-wrapper"
              id="dialogue-portrait-icon"
            >
              👴
            </div>
            <div className="dialogue-body">
              <div className="dialogue-speaker-tag">
                <span id="dialogue-speaker-name">ปราชญ์อาวุโส</span>
              </div>
              <div id="dialogue-text-stream" className="dialogue-text"></div>
              <div className="bouncing-cursor">▼ กด [E] หรือคลิกเพื่อไปต่อ</div>
            </div>
          </div>

          {/* KNOWLEDGE CARD OVERLAY */}
          <div id="modal-knowledge-card" className="knowledge-card-backdrop hidden">
            <div className="knowledge-card">
              <div className="kc-header">
                <span className="kc-icon" id="kc-icon">📖</span>
                <div className="kc-header-text">
                  <h3 id="kc-title">ความรู้ใหม่!</h3>
                  <div className="kc-category" id="kc-category">เกษตรกรรม</div>
                </div>
              </div>
              <div className="kc-body" id="kc-body">
                <div className="kc-fact">กำลังโหลดข้อมูล...</div>
              </div>
              <div className="kc-footer">
                <button id="btn-kc-ok" className="kc-btn-ok">เข้าใจแล้ว! ✨ ไปเล่นมินิเกมกัน</button>
              </div>
            </div>
          </div>

          {/* MINIGAME RESULT OVERLAY */}
          <div id="modal-minigame-result" className="minigame-result-backdrop hidden">
            <div className="minigame-result-card">
              <div className="mr-title success" id="mr-title">🎉 สุดยอด!</div>
              <div className="mr-subtitle" id="mr-subtitle">คุณผ่านมินิเกมนี้แล้ว</div>
              <div className="mr-stars" id="mr-stars">
                <span className="mr-star lit glow">⭐</span>
                <span className="mr-star lit glow">⭐</span>
                <span className="mr-star dim">⭐</span>
              </div>
              <div className="mr-knowledge-box">
                <h4>📖 สิ่งที่เรียนรู้</h4>
                <p id="mr-knowledge-text">สรุปความรู้ที่ได้รับ</p>
              </div>
              <button id="btn-mr-continue" className="mr-btn-continue">
                ✨ ไปต่อเลย!
              </button>
            </div>
          </div>

          {/* MODAL: MINIGAME 0 — NURSERY SEEDLING LAB (Arcade Simulator) */}
          <div id="modal-minigame-nursery" className="modal-backdrop hidden">
            <div className="retro-window minigame-window-lg">
              <div className="window-header-ribbon">
                <span className="ribbon-text">
                  🌱 ระบบจำลองการเพาะกล้า Aeroponics อัจฉริยะ
                </span>
              </div>
              <p style={{ fontSize: "14px", marginBottom: "6px" }}>
                ดูแลต้นกล้าให้รอดภายใน <b style={{ color: "var(--hp-green)" }}>30 วินาที</b>! 
                กดปุ่มเพื่อคุมเกจ 3 อย่างให้อยู่ใน <b style={{color: "#2ec4b6"}}>โซนสีเขียว</b> และ<b style={{color: "#ffdf6d"}}>เอาเมาส์ชี้เก็บละอองอาหาร</b>ที่ลอยขึ้นมา!
              </p>

              <div className="minigame-box nursery-sim-container">
                {/* HUD: Timer & Growth */}
                <div className="nursery-hud">
                  <div className="nursery-timer" id="nursery-sim-timer">⏳ 30s</div>
                  <div className="nursery-growth-bar-container">
                    <span style={{fontSize: "12px", fontWeight: "bold"}}>🌱 การเติบโต: </span>
                    <div className="nursery-growth-bar">
                      <div className="nursery-growth-fill" id="nursery-sim-growth"></div>
                    </div>
                  </div>
                </div>

                {/* Central Play Area: Seedling & Mist */}
                <div className="nursery-play-area" id="nursery-play-area">
                  <div className="nursery-seedling-stage" id="nursery-sim-seedling">
                    <span className="seedling-sprite">🫘</span>
                  </div>
                  {/* Warning Overlay */}
                  <div className="nursery-warning-overlay hidden" id="nursery-sim-warning">
                    ⚠️ ระวัง: ขาดแสงทำให้ต้นกล้ายืดตัว (Etiolation)!
                  </div>
                </div>

                {/* Control Panel: 3 Gauges */}
                <div className="nursery-control-panel">
                  
                  {/* Moisture */}
                  <div className="nursery-control-group">
                    <div className="nursery-gauge-label">💧 ความชื้น</div>
                    <div className="nursery-gauge-container">
                      <div className="nursery-gauge-target"></div>
                      <div className="nursery-gauge-fill" id="nursery-gauge-moisture"></div>
                    </div>
                    <button className="nursery-action-btn" id="btn-nursery-water">รดน้ำ (+)</button>
                  </div>

                  {/* Temperature */}
                  <div className="nursery-control-group">
                    <div className="nursery-gauge-label">🌡️ อุณหภูมิ</div>
                    <div className="nursery-gauge-container">
                      <div className="nursery-gauge-target"></div>
                      <div className="nursery-gauge-fill" id="nursery-gauge-temp"></div>
                    </div>
                    <button className="nursery-action-btn" id="btn-nursery-heat">เพิ่มความร้อน (+)</button>
                  </div>

                  {/* Light */}
                  <div className="nursery-control-group">
                    <div className="nursery-gauge-label">💡 แสงสว่าง</div>
                    <div className="nursery-gauge-container">
                      <div className="nursery-gauge-target"></div>
                      <div className="nursery-gauge-fill" id="nursery-gauge-light"></div>
                    </div>
                    <button className="nursery-action-btn" id="btn-nursery-light">เปิดแสง (+)</button>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* MODAL 3: MINIGAME 1 — pH MIXER LAB (Enhanced) */}
          <div id="modal-minigame-soil" className="modal-backdrop hidden">
            <div className="retro-window minigame-window-lg">
              <div className="window-header-ribbon">
                <span className="ribbon-text">
                  🧪 ห้องทดลอง : ผสมสารปรับสมดุล pH ดิน
                </span>
              </div>
              <p style={{ fontSize: "14px", marginBottom: "6px" }}>
                แปลงดินนี้มีความเป็นกรดจัด (pH 4.2) — จงเลือกวัสดุปรับดินที่เหมาะสม แล้วค่อยๆ เติมให้ค่า pH อยู่ในช่วง <b style={{ color: "var(--hp-green)" }}>6.0 - 7.0</b>
              </p>
              <div className="minigame-box mixer-lab-container">
                <div className="mixer-beaker" id="mixer-beaker">
                  <div className="mixer-beaker-liquid" id="mixer-liquid" style={{ height: "40%", background: "linear-gradient(180deg, rgba(204,68,68,0.5), rgba(204,68,68,0.85))" }}></div>
                  <div className="mixer-beaker-bubbles" id="mixer-bubbles"></div>
                  <span id="soil-status-text" style={{ position: "relative", zIndex: 3, fontSize: "13px", fontWeight: 700, textShadow: "1px 1px 3px #000" }}>
                    ดินเป็นกรดจัด! (พืชใบเหลือง รากเน่า)
                  </span>
                </div>

                <div className="mixer-materials">
                  <div className="mixer-material-btn" data-material="lime" id="mixer-lime">
                    <span className="mixer-material-icon">⚪</span>
                    <span className="mixer-material-name">ปูนขาว</span>
                    <span className="mixer-material-desc">เพิ่ม pH +0.5 ต่อครั้ง</span>
                  </div>
                  <div className="mixer-material-btn" data-material="dolomite" id="mixer-dolomite">
                    <span className="mixer-material-icon">🪨</span>
                    <span className="mixer-material-name">โดโลไมท์</span>
                    <span className="mixer-material-desc">เพิ่ม pH +0.3 ต่อครั้ง</span>
                  </div>
                  <div className="mixer-material-btn" data-material="sulfur" id="mixer-sulfur">
                    <span className="mixer-material-icon">🟡</span>
                    <span className="mixer-material-name">กำมะถัน</span>
                    <span className="mixer-material-desc">ลด pH -0.4 ต่อครั้ง</span>
                  </div>
                </div>

                <div className="mixer-ph-display">
                  <span className="mixer-ph-label">ค่า pH ปัจจุบัน:</span>
                  <span className="mixer-ph-value" id="ph-val-display" style={{ color: "#ff5555" }}>4.2</span>
                </div>
              </div>
              <button id="btn-submit-soil" className="retro-btn-action" style={{ marginTop: "12px" }}>
                ✨ ยืนยันผลการปรับดิน
              </button>
            </div>
          </div>

          {/* MODAL 4: MINIGAME 2 — CROP PLANTING GRID (Enhanced) */}
          <div id="modal-minigame-season" className="modal-backdrop hidden">
            <div className="retro-window minigame-window-lg">
              <div className="window-header-ribbon">
                <span className="ribbon-text">
                  🌾 มินิเกม : จัดสรรพืชให้ตรงกับฤดูร้อนแล้ง
                </span>
              </div>
              <p style={{ fontSize: "14px", marginBottom: "6px" }}>
                แปลงแห่งนี้เผชิญภัยแล้งจัด! เลือกพืชจากชั้นวาง แล้ว<b style={{ color: "var(--gold-highlight)" }}>กดเพื่อปลูกลงแปลง</b> ให้ครบ 2 ช่อง
              </p>
              <div className="minigame-box crop-planting-area">
                <div className="crop-fields" id="crop-fields">
                  <div className="crop-field-slot" id="crop-slot-0" data-slot="0">
                    <span className="field-label">แปลง 1 (ว่าง)</span>
                    <span className="field-crop" id="crop-slot-icon-0"></span>
                  </div>
                  <div className="crop-field-slot" id="crop-slot-1" data-slot="1">
                    <span className="field-label">แปลง 2 (ว่าง)</span>
                    <span className="field-crop" id="crop-slot-icon-1"></span>
                  </div>
                </div>
                <div className="crop-shelf" id="crop-shelf">
                  <div className="crop-item" data-crop="corn">
                    <span className="crop-item-icon">🌽</span>
                    <span className="crop-item-name">ข้าวโพด</span>
                  </div>
                  <div className="crop-item" data-crop="lettuce">
                    <span className="crop-item-icon">🥬</span>
                    <span className="crop-item-name">ผักกาดหอม</span>
                  </div>
                  <div className="crop-item" data-crop="cassava">
                    <span className="crop-item-icon">🥔</span>
                    <span className="crop-item-name">มันสำปะหลัง</span>
                  </div>
                  <div className="crop-item" data-crop="strawberry">
                    <span className="crop-item-icon">🍓</span>
                    <span className="crop-item-name">สตรอว์เบอร์รี</span>
                  </div>
                </div>
              </div>
              <button id="btn-submit-season" className="retro-btn-action" style={{ marginTop: "10px" }}>
                ✨ ยืนยันการปลูก
              </button>
            </div>
          </div>

          {/* MODAL 5: MINIGAME 3 — BUG DEFENDER (Enhanced) */}
          <div id="modal-minigame-pest" className="modal-backdrop hidden">
            <div className="retro-window minigame-window-lg">
              <div className="window-header-ribbon">
                <span className="ribbon-text">
                  🐛 มินิเกม : ปกป้องแปลงจากศัตรูพืช
                </span>
              </div>
              <p style={{ fontSize: "14px", marginBottom: "6px" }}>
                แปลงมะเขือเทศถูกเพลี้ยอ่อนและหนอนบุก! จงเลือก<b style={{ color: "var(--hp-green)" }}>วิธีชีววิธี 2 อย่าง</b>ที่ปลอดภัยและถูกต้อง
              </p>
              <div className="minigame-box bug-defender-area">
                <div className="bug-field-visual" id="bug-field">
                  <span className="bug-field-plant">🍅</span>
                  <span className="bug-enemy" style={{ left: "15%", top: "30%", animationDelay: "0s" }}>🐛</span>
                  <span className="bug-enemy" style={{ left: "60%", top: "50%", animationDelay: "1s" }}>🐛</span>
                  <span className="bug-enemy" style={{ left: "35%", top: "65%", animationDelay: "0.5s" }}>🦗</span>
                </div>
                <div className="bug-weapons" id="bug-weapons">
                  <div className="bug-weapon-btn" data-pest="ladybug">
                    <span className="bug-weapon-badge safe">🛡️ ชีววิธี</span>
                    <span className="bug-weapon-icon">🐞</span>
                    <span className="bug-weapon-name">ปล่อยแมลงเต่าทอง</span>
                    <span className="bug-weapon-desc">ตัวห้ำกินเพลี้ยอ่อน</span>
                  </div>
                  <div className="bug-weapon-btn" data-pest="chemical">
                    <span className="bug-weapon-badge danger">⚠️ สารเคมี</span>
                    <span className="bug-weapon-icon">☠️</span>
                    <span className="bug-weapon-name">พ่นสารเคมีรุนแรง</span>
                    <span className="bug-weapon-desc">ฆ่าทุกอย่างรวมสัตว์ดี</span>
                  </div>
                  <div className="bug-weapon-btn" data-pest="neem">
                    <span className="bug-weapon-badge safe">🌿 สมุนไพร</span>
                    <span className="bug-weapon-icon">🌿</span>
                    <span className="bug-weapon-name">น้ำหมักสะเดา</span>
                    <span className="bug-weapon-desc">ขับไล่หนอนอย่างปลอดภัย</span>
                  </div>
                  <div className="bug-weapon-btn" data-pest="salt">
                    <span className="bug-weapon-badge danger">⚠️ อันตราย</span>
                    <span className="bug-weapon-icon">🧂</span>
                    <span className="bug-weapon-name">โรยเกลือแกง</span>
                    <span className="bug-weapon-desc">ทำดินเค็ม พืชตาย!</span>
                  </div>
                </div>
              </div>
              <button id="btn-submit-pest" className="retro-btn-action" style={{ marginTop: "10px" }}>
                ✨ ใช้งานชีววิธีพิทักษ์แปลง
              </button>
            </div>
          </div>

          {/* MODAL: MINIGAME 4 — KNOWLEDGE JIGSAW (Matching) */}
          <div id="modal-minigame-jigsaw" className="modal-backdrop hidden">
            <div className="retro-window minigame-window-lg">
              <div className="window-header-ribbon">
                <span className="ribbon-text">
                  🧩 มินิเกม : จับคู่ปัญหากับวิธีแก้
                </span>
              </div>
              <p style={{ fontSize: "14px", marginBottom: "6px" }}>
                เลือก<b style={{ color: "var(--gold-highlight)" }}>ปัญหาด้านซ้าย</b>แล้วเลือก<b style={{ color: "var(--hp-green)" }}>วิธีแก้ด้านขวา</b>ที่ตรงกัน จับคู่ให้ครบ!
              </p>
              <div className="minigame-box jigsaw-area">
                <div className="jigsaw-columns" id="jigsaw-grid">
                  <div className="jigsaw-col" id="jigsaw-problems"></div>
                  <div className="jigsaw-arrows" id="jigsaw-arrows"></div>
                  <div className="jigsaw-col" id="jigsaw-solutions"></div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                  <span className="jigsaw-score" id="jigsaw-score">คะแนน: 0 / 4</span>
                  <span className="jigsaw-timer" id="jigsaw-timer">⏳ 30</span>
                </div>
              </div>
            </div>
          </div>

          {/* MODAL: MINIGAME 5 — SORT IT RIGHT (Ordering) */}
          <div id="modal-minigame-sort" className="modal-backdrop hidden">
            <div className="retro-window minigame-window-lg">
              <div className="window-header-ribbon">
                <span className="ribbon-text">
                  🔀 มินิเกม : เรียงลำดับขั้นตอนให้ถูกต้อง
                </span>
              </div>
              <p style={{ fontSize: "14px", marginBottom: "6px" }}>
                จัดเรียงขั้นตอนการเตรียมแปลงปลูกให้ถูกต้อง โดย<b style={{ color: "var(--gold-highlight)" }}>กดปุ่มลูกศรเพื่อย้ายตำแหน่ง</b>
              </p>
              <div className="minigame-box sort-area">
                <div className="sort-list" id="sort-list"></div>
              </div>
              <button id="btn-submit-sort" className="retro-btn-action" style={{ marginTop: "10px" }}>
                ✨ ยืนยันลำดับ
              </button>
            </div>
          </div>

          {/* MODAL: MINIGAME 6 — SPEED QUIZ BLITZ (True/False) */}
          <div id="modal-minigame-speed" className="modal-backdrop hidden">
            <div className="retro-window minigame-window-lg">
              <div className="window-header-ribbon">
                <span className="ribbon-text">
                  ⚡ Speed Quiz Blitz: ถูกหรือผิด?
                </span>
              </div>
              <div className="minigame-box speed-quiz-area">
                <div className="speed-quiz-hud">
                  <span className="speed-quiz-timer" id="speed-timer">⏳ 5s</span>
                  <span className="speed-quiz-combo" id="speed-combo">🔥 Combo: 0</span>
                </div>
                <div className="speed-quiz-statement" id="speed-statement">
                  คำถามกำลังโหลด...
                </div>
                <div className="speed-quiz-buttons">
                  <button className="speed-quiz-btn btn-true" id="btn-speed-true">
                    ✅ ถูกต้อง
                  </button>
                  <button className="speed-quiz-btn btn-false" id="btn-speed-false">
                    ❌ ผิด
                  </button>
                </div>
                <div className="speed-quiz-progress" id="speed-progress"></div>
              </div>
            </div>
          </div>



          {/* MODAL 6: BOSS QUIZ ARENA */}
          <div id="modal-boss-quiz" className="modal-backdrop hidden">
            <div className="boss-arena-hud">
              <div className="boss-header-card">
                <div className="boss-nameplate">
                  <span id="boss-name-label">ร่างจำแลง : ปีศาจปฐพีแปรปรวน</span>
                </div>
                <div className="pixel-bar-container">
                  <div
                    id="boss-hp-ghost"
                    className="pixel-bar-fill hp-ghost"
                    style={{ width: "100%" }}
                  ></div>
                  <div
                    id="boss-hp-fill"
                    className="pixel-bar-fill boss-hp"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>
              <div className="retro-window quiz-question-window">
                <div className="question-meta-bar">
                  <span id="quiz-question-index">ข้อที่ 1 / 10</span>
                  <span id="quiz-timer-counter">⏳ 20 วินาที</span>
                </div>
                <div id="quiz-question-text" className="quiz-question-content">
                  คำถามกำลังโหลด...
                </div>
              </div>
              <div className="quiz-choices-grid">
                <button className="choice-btn" data-index="0">
                  <span className="choice-tag">A</span>{" "}
                  <span className="choice-label">-</span>
                </button>
                <button className="choice-btn" data-index="1">
                  <span className="choice-tag">B</span>{" "}
                  <span className="choice-label">-</span>
                </button>
                <button className="choice-btn" data-index="2">
                  <span className="choice-tag">C</span>{" "}
                  <span className="choice-label">-</span>
                </button>
                <button className="choice-btn" data-index="3">
                  <span className="choice-tag">D</span>{" "}
                  <span className="choice-label">-</span>
                </button>
              </div>
              <div
                id="quiz-feedback-box"
                className="quiz-feedback-banner hidden"
              >
                <div id="feedback-explanation">คำอธิบายความรู้เกษตร</div>
              </div>
            </div>
          </div>

          {/* MODAL: ALTAR KNOWLEDGE TRIAL */}
          <div id="modal-altar-trial" className="modal-backdrop hidden">
            <div className="retro-window altar-trial-window" style={{ maxWidth: "520px", width: "90%" }}>
              <div className="window-header-ribbon">
                <span className="ribbon-text" id="altar-trial-title">
                  🌱 แท่นพฤกษาเวหา (Genesis Sky Altar)
                </span>
                <button id="btn-close-altar-trial" className="retro-btn-close">
                  ✖
                </button>
              </div>
              
              <div className="altar-trial-content" style={{ padding: "12px 6px" }}>
                <div className="altar-trial-header" style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px", background: "rgba(0,0,0,0.3)", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <span className="altar-trial-icon" id="altar-trial-icon" style={{ fontSize: "36px" }}>🌱</span>
                  <div>
                    <h3 id="altar-trial-name" style={{ color: "var(--gold-highlight)", margin: "0 0 4px 0", fontSize: "16px" }}>แท่นบูชาประจำเกาะ</h3>
                    <div id="altar-trial-topic" style={{ fontSize: "12px", color: "var(--mana-cyan)" }}>หัวข้อ: การเพาะเมล็ดพันธุ์และต้นกล้าแอโรโปนิกส์</div>
                  </div>
                </div>

                <div className="altar-trial-desc" id="altar-trial-desc" style={{ fontSize: "13px", color: "#e2e8f0", margin: "14px 0", lineHeight: "1.5", background: "rgba(15, 23, 42, 0.6)", padding: "12px", borderRadius: "6px", borderLeft: "3px solid var(--gold-highlight)" }}>
                  แท่นศักดิ์สิทธิ์ประจำเกาะลอยฟ้าแห่งนี้ บันทึกภูมิปัญญาเกษตรกรรมอันล้ำค่าเอาไว้...
                </div>

                <div className="altar-trial-actions" style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                  <button id="btn-altar-rest" className="retro-btn-action" style={{ flex: 1, padding: "12px", fontSize: "14px" }}>
                    🕯️ พักผ่อนและเซฟจุดเกิด
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MODAL 7: CODEX */}
          <div id="modal-codex" className="modal-backdrop hidden">
            <div className="retro-window codex-window" style={{ maxWidth: "680px", width: "95%" }}>
              <div className="window-header-ribbon">
                <span className="ribbon-text">
                  📖 มหาบันทึกปัญญาเกษตร 12 เกาะลอยฟ้า (Sky Codex)
                </span>
                <button id="btn-close-codex" className="retro-btn-close">
                  ✖
                </button>
              </div>
              <div id="codex-content-pane" className="codex-body-scrollable" style={{ maxHeight: "420px", overflowY: "auto", padding: "10px" }}>
                <h4 style={{ color: "var(--gold-highlight)" }}>
                  🌱 1. เกาะเรือนเพาะชำลอยฟ้า (Sky Nursery Island)
                </h4>
                <p>• การเพาะเมล็ดพันธุ์และระบบแอโรโปนิกส์ (Aeroponics) พ่นละอองหมอกสารอาหารตรงสู่ราก</p>
                <p>• ปัจจัยการงอกของเมล็ด: ความชื้น อุณหภูมิพอเหมาะ และออกซิเจน</p>
                <br />

                <h4 style={{ color: "var(--gold-highlight)" }}>
                  🧪 2. เกาะทุ่งกสิกรรมฟื้นฟูดิน (Restored Farmland Island)
                </h4>
                <p>• ดินที่เหมาะกับการปลูกพืชทั่วไปมีค่า pH 6.0 - 7.0 หาก pH &lt; 5.5 เป็นดินกรด (แก้ไขด้วยปูนขาว/โดโลไมท์)</p>
                <p>• สัดส่วนดินร่วนสมบูรณ์: แร่ธาตุ 45%, น้ำ 25%, อากาศ 25%, อินทรียวัตถุ (ฮิวมัส) 5%</p>
                <br />

                <h4 style={{ color: "var(--gold-highlight)" }}>
                  💧 3. เกาะสวนผลไม้และน้ำตกเวหา (Sky Orchard & Waterfalls)
                </h4>
                <p>• ฤดูร้อนแล้ง: ปลูกพืชทนแล้งรากลึก (ข้าวโพด, มันสำปะหลัง) คลุมหน้าดินด้วยฟางข้าวลดการระเหยน้ำ</p>
                <p>• รดน้ำไม้ผลเช้าตรู่ (06:00 - 08:00 น.) เพื่อลดการสูญเสียน้ำและตัดวงจรโรครากเน่า</p>
                <br />

                <h4 style={{ color: "var(--gold-highlight)" }}>
                  🌿 4. เกาะพฤกษศาสตร์สมุนไพรลอยฟ้า (Floating Botanical Sanctuary)
                </h4>
                <p>• การเตรียมดินมาตรฐาน: ไถดะตากดิน 7-14 วัน เพื่อฆ่าเชื้อโรคและไข่แมลง</p>
                <p>• สารสกัดสะเดา (Azadirachtin) ยับยั้งหนอน และรากดาวเรืองช่วยไล่ไส้เดือนฝอยศัตรูพืช</p>
                <br />

                <h4 style={{ color: "var(--gold-highlight)" }}>
                  🍄 5. เกาะห้องทดลองรากพืชใต้พิภพ (Sub-Island Rhizosphere)
                </h4>
                <p>• ชีววิธี (Biological Control): ใช้แมลงเต่าทอง (ตัวห้ำ) กินเพลี้ยอ่อน และแตนเบียนคุมหนอน</p>
                <p>• เชื้อราไมคอร์ไรซา (Mycorrhizae) ช่วยรากพืชดูดซับฟอสฟอรัสและน้ำอย่างมีประสิทธิภาพ</p>
                <br />

                <h4 style={{ color: "var(--gold-highlight)" }}>
                  ☀️ 6. เกาะนครเกษตรอัจฉริยะลอยฟ้า (Solar AgriTech Sky City)
                </h4>
                <p>• การปลูกพืชแนวตั้ง (Vertical Farming) เพิ่มผลผลิตต่อพื้นที่และควบคุมสภาพแวดล้อมได้ 100%</p>
                <p>• เซนเซอร์ IoT วัดความชื้น ค่า pH และ EC เพื่อจ่ายปุ๋ยและน้ำแบบแม่นยำ (Precision Farming)</p>
                <br />

                <h4 style={{ color: "var(--gold-highlight)" }}>
                  🪷 7. เกาะบึงน้ำลอยฟ้าอควาโปนิกส์ (Celestial Aquaponics Island)
                </h4>
                <p>• ระบบอควาโปนิกส์ (Aquaponics): จุลินทรีย์เปลี่ยนมูลปลาเป็นไนเตรตให้พืชดูดซึม ประหยัดน้ำ 90%</p>
                <p>• พืชน้ำ (กก, บัว) ช่วยดูดซับของเสียและเพิ่มออกซิเจนบริสุทธิ์ในระบบนิเวศแหล่งน้ำ</p>
                <br />

                <h4 style={{ color: "var(--gold-highlight)" }}>
                  🌾 8. เกาะนาขั้นบันไดเสียดฟ้า (Skyward Terrace Rice Island)
                </h4>
                <p>• นาขั้นบันไดช่วยชะลอการไหลบ่าของน้ำ ลดการชะล้างพังทลายของหน้าดินบนพื้นที่ลาดชัน</p>
                <p>• ฝายชะลอน้ำช่วยกักเก็บความชุ่มชื้นและดักจับตะกอนดินหล่อเลี้ยงต้นข้าว</p>
                <br />

                <h4 style={{ color: "var(--gold-highlight)" }}>
                  🌳 9. เกาะสะวันนาลอยฟ้าพืชทนแล้ง (Floating Savanna & Agroforestry)
                </h4>
                <p>• วนเกษตร (Agroforestry): ปลูกไม้ยืนต้นให้ร่มเงาควบคู่กับพืชเกษตรและปศุสัตว์</p>
                <p>• หญ้าแฝกมีรากหยั่งลึกเป็นแนวกำแพงธรรมชาติ ป้องกันขอบหน้าผาดินพังทลาย</p>
                <br />

                <h4 style={{ color: "var(--gold-highlight)" }}>
                  🧬 10. เกาะคลังพันธุกรรมเมล็ดพันธุ์เวหา (Global Sky Seed Vault)
                </h4>
                <p>• คลังเมล็ดพันธุ์ควบคุมอุณหภูมิติดลบและความชื้นต่ำเพื่อรักษาความหลากหลายทางพันธุกรรม</p>
                <p>• การเพาะเลี้ยงเนื้อเยื่อ (Tissue Culture) ช่วยขยายพันธุ์พืชปลอดโรคได้ปริมาณมหาศาล</p>
                <br />

                <h4 style={{ color: "var(--gold-highlight)" }}>
                  👑 11. เกาะทุ่งรวงทองแห่งสวรรค์ (Golden Harvest Sky Sanctuary)
                </h4>
                <p>• การประมวลองค์ความรู้เกษตรกรรมครบวงจร สู่การเก็บเกี่ยวผลผลิตที่มั่งคั่งและยั่งยืน</p>
                <br />

                <h4 style={{ color: "var(--gold-highlight)" }}>
                  🌙 12. เกาะพฤกษาจันทราลอยฟ้า (Celestial Tree of Life Island)
                </h4>
                <p>• ความสมดุลแห่งธรรมชาติและการเกษตรอินทรีย์ที่สืบทอดสู่อนาคตนิรันดร์</p>
              </div>
            </div>
          </div>

          {/* MODAL 8: TROPHY PODIUM */}
          <div id="modal-trophy-podium" className="modal-backdrop hidden">
            <div className="retro-window trophy-window">
              <div className="trophy-grand-icon" id="trophy-display-art">
                🏆
              </div>
              <h1
                id="trophy-tier-title"
                style={{ color: "var(--gold-highlight)", fontSize: "20px" }}
              >
                ถ้วยรางวัลทองคำบริสุทธิ์
              </h1>
              <h3
                id="trophy-rank-name"
                style={{
                  color: "var(--mana-cyan)",
                  fontSize: "15px",
                  marginBottom: "12px",
                }}
              >
                มหาปราชญ์แห่งปฐพี
              </h3>
              <div className="score-breakdown-card">
                <div className="score-row">
                  <span>คะแนนตอบคำถามสู้บอสทั้งหมด:</span>
                  <span
                    id="score-total-text"
                    style={{ color: "var(--gold-highlight)", fontWeight: 700 }}
                  >
                    35 / 35
                  </span>
                </div>
                <div className="score-row">
                  <span>อัตราความแม่นยำทางวิชาการ:</span>
                  <span
                    id="score-accuracy-text"
                    style={{ color: "var(--gold-highlight)", fontWeight: 700 }}
                  >
                    100%
                  </span>
                </div>
                <div className="score-row">
                  <span>ภารกิจช่วยเหลือชาวบ้าน (เควสต์ย่อย):</span>
                  <span>สำเร็จครบทุกเกาะ</span>
                </div>
              </div>
              <p
                style={{
                  fontSize: "13px",
                  color: "#c0c6d0",
                  lineHeight: 1.4,
                  marginBottom: "16px",
                }}
              >
                ยินดีด้วย! คุณได้พิสูจน์ภูมิปัญญาเกษตรกรรมและลบล้างคำสาปปีศาจ
                ฟื้นฟูดินแดนทั้ง 4 เกาะให้กลับมาเขียวขจีอย่างยั่งยืน!
              </p>
              <button id="btn-restart-game" className="retro-btn-action">
                🔄 เริ่มต้นการผจญภัยใหม่
              </button>
            </div>
          </div>
        </div>

        {/* END CREDITS OVERLAY */}
        <div id="end-credits-overlay" className="hidden" style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'black', color: 'white', zIndex: 9999,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          fontFamily: '"Press Start 2P", "Chakra Petch", sans-serif',
          textAlign: 'center'
        }}>
          <div id="credits-content" style={{ opacity: 0, transition: 'opacity 2s ease-in-out', transform: 'translateY(50px)' }}>
            <h1 style={{ color: 'var(--gold-highlight)', marginBottom: '20px' }}>CONGRATULATIONS</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '40px', lineHeight: '2' }}>
              ผู้กล้า... เจ้าได้ปลดปล่อยเกาะเกษตรกรรม<br />
              จากปีศาจแห่งความไม่รู้ได้สำเร็จ!<br />
              การเดินทางของเจ้าเพิ่งเริ่มต้นขึ้นเท่านั้น...
            </p>
            <h3 style={{ color: '#38bdf8', marginTop: '50px' }}>PROJECT HARVEST FRONTIER</h3>
            <p style={{ marginTop: '20px', color: '#94a3b8' }}>MANAGED BY</p>
            <h2 style={{ letterSpacing: '5px', color: '#f8fafc' }}>KORON</h2>
            <div style={{ marginTop: '50px' }}>
              <p id="credits-saving-text" style={{ color: 'var(--mana-cyan)', fontSize: '0.8rem' }}>กำลังบันทึกคะแนน...</p>
              <button id="btn-return-admin" className="retro-btn mt-3 hidden" onClick={() => window.location.href = '/admin'}>
                📊 ดูตารางคะแนน (Admin)
              </button>
              <button id="btn-return-home" className="retro-btn-secondary mt-3 hidden" onClick={() => window.location.href = '/'} style={{ marginLeft: '10px' }}>
                🏠 กลับหน้าหลัก
              </button>
            </div>
          </div>
        </div>
      </div>

      <Script src="/js/main.js?v=1.4.4" strategy="afterInteractive" />
    </>
  );
}
