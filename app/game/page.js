"use client";
import { useEffect } from "react";
import Script from "next/script";

export default function GamePage() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="/css/style.css" />

      <div id="game-container">
        <canvas id="gameCanvas"></canvas>

        <div id="escape-overlay" className="hidden"></div>

        <div id="hud-ui" className="overlay-ui hidden">
          <div className="hud-buttons">
            <button className="hud-btn" id="btn-journal">สมุดบันทึก (B)</button>
            <button className="hud-btn" id="btn-settings">⚙️ SETTINGS</button>
          </div>
        </div>

        <div id="main-menu-ui" className="ui-layer">
          <h1 id="game-title" className="game-title">HARVEST FRONTIER GAME</h1>
          <p id="game-subtitle" className="subtitle">The Ignorance Devourer</p>
          <div className="menu-buttons">
            <button className="menu-btn arcade-btn" id="btn-start">START GAME</button>
            <button className="menu-btn arcade-btn" id="btn-menu-settings">SETTINGS</button>
            <button className="menu-btn arcade-btn" id="btn-credits">CREDITS</button>
          </div>
        </div>

        <div id="settings-ui" className="ui-layer hidden">
          <div className="panel-box">
            <h2 id="settings-title" className="panel-title">SETTINGS</h2>
            <div className="settings-group">
              <label id="lbl-bgm">BGM VOLUME</label>
              <input type="range" id="bgm-slider" min="0" max="100" defaultValue="50" />
            </div>
            <div className="settings-group">
              <label id="lbl-sfx">SFX VOLUME</label>
              <input type="range" id="sfx-slider" min="0" max="100" defaultValue="50" />
            </div>
            <div className="settings-group" style={{ position: "relative" }}>
              <label id="lbl-language">LANGUAGE</label>
              <div className="vn-dropdown" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <button className="vn-dropdown-btn" id="btn-lang-toggle">TH ▼</button>
                <div className="vn-dropdown-menu" id="lang-dropdown-menu">
                  <button className="vn-lang-opt" id="btn-lang-th">ไทย (TH)</button>
                  <button className="vn-lang-opt" id="btn-lang-en">English (EN)</button>
                </div>
              </div>
            </div>
            <button className="menu-btn arcade-btn" id="btn-mute">MUTE AUDIO</button>
            <button className="menu-btn arcade-btn close-btn" id="btn-close-settings">BACK</button>
          </div>
        </div>

        <div id="quiz-ui" className="ui-layer hidden">
          <div className="panel-box quiz-panel boss-theme">
            <h2 id="quiz-title" className="boss-title">WARNING: BOSS APPROACHING</h2>
            <div id="quiz-timer" style={{ color: "#ff5252", fontSize: "14px", textAlign: "center", marginBottom: "10px" }}>
              เวลา: 15s
            </div>
            <p id="quiz-question">คำถาม: ...</p>
            <div className="quiz-options">
              <button className="quiz-btn arcade-btn" data-index="0">A. ตัวเลือก 1</button>
              <button className="quiz-btn arcade-btn" data-index="1">B. ตัวเลือก 2</button>
              <button className="quiz-btn arcade-btn" data-index="2">C. ตัวเลือก 3</button>
              <button className="quiz-btn arcade-btn" data-index="3">D. ตัวเลือก 4</button>
            </div>
            <div id="quiz-feedback" style={{ marginTop: "10px", fontSize: "12px", color: "#FFEB3B", textAlign: "center" }}></div>
          </div>
        </div>

        <div id="game-over-ui" className="ui-layer hidden">
          <div className="panel-box" style={{ textAlign: "center", maxWidth: "400px", margin: "0 auto" }}>
            <h2 style={{ color: "#FFD700", marginBottom: "20px" }}>🏆 ขอแสดงความยินดี 🏆</h2>
            <p>คุณนำปัญญากลับคืนสู่หมู่บ้านสำเร็จ!</p>
            <div style={{ margin: "20px 0", background: "rgba(0,0,0,0.5)", padding: "15px", borderRadius: "8px" }}>
              <p style={{ marginBottom: "10px" }}>คำตอบที่ถูก: <span id="ending-score" style={{ color: "#4CAF50", fontSize: "20px" }}>0 / 60</span> ข้อ</p>
              <p style={{ marginBottom: "10px" }}>คิดเป็น: <span id="ending-percent" style={{ color: "#03A9F4", fontSize: "20px" }}>0%</span></p>
              <h3 id="ending-trophy" style={{ fontSize: "28px", marginTop: "10px" }}>ถ้วยรางวัล: -</h3>
            </div>
            <p id="ending-message" style={{ marginBottom: "20px", fontSize: "12px" }}>กำลังบันทึกข้อมูล...</p>
            <button id="btn-restart" className="arcade-btn">เล่นอีกครั้ง</button>
          </div>
        </div>

        <div id="journal-ui" className="ui-layer hidden">
          <div className="panel-box journal-panel">
            <button id="btn-close-journal" className="journal-close-btn">X</button>
            <h2 className="journal-title">📖 สมุดบันทึกไร่แดนขอบฟ้า</h2>
            <div id="journal-content" className="journal-content">
              <p className="journal-empty">ยังไม่มีข้อมูล... ออกสำรวจเพื่อเก็บความรู้สิ!</p>
            </div>
          </div>
        </div>

        <div id="zone-select-ui" className="ui-layer hidden">
          <div className="panel-box">
            <h2 className="panel-title">SELECT DESTINATION</h2>
            <div className="menu-buttons" style={{ margin: "0 auto" }}>
              <button className="menu-btn arcade-btn" id="btn-zone-mountain">เกาะพืชพรรณ (2)</button>
              <button className="menu-btn arcade-btn" id="btn-zone-river">เกาะฤดูกาล (3)</button>
              <button className="menu-btn arcade-btn" id="btn-zone-village">เกาะศัตรูพืช (4)</button>
            </div>
          </div>
        </div>

        <div id="dialog-ui" className="ui-layer hidden" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="panel-box" style={{ position: "absolute", bottom: "20px", width: "90%" }}>
            <h2 id="dialog-name" style={{ textAlign: "left", color: "#4CAF50", marginBottom: "15px", fontSize: "16px" }}>NPC NAME</h2>
            <p id="dialog-text" style={{ textAlign: "left", fontSize: "12px", lineHeight: "1.8", color: "#fff" }}>NPC TEXT</p>
            <p style={{ textAlign: "right", fontSize: "10px", color: "#FFEB3B", marginTop: "15px", animation: "blink 1s infinite" }}>
              [ กด E เพื่อทำงานต่อ ]
            </p>
          </div>
        </div>
      </div>

      <Script src="/js/main.js" strategy="lazyOnload" />
    </>
  );
}
