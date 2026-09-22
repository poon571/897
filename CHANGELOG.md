# 📜 Project Harvest Frontier — Changelog & Version History

เอกสารบันทึกประวัติเวอร์ชันและการแก้ไขปรับปรุงของโปรเจกต์ Harvest Frontier

## [v1.6.3] - 2026-09-22
### 🔒 ป้องกันบั๊ก redirect_uri_mismatch ด้วย Canonical Domain บน Cloud
- **Root Cause:** เมื่อกดเปิดเว็บจากปุ่ม Deployment บน Vercel Dashboard บัญชีเบราว์เซอร์จะเปิดผ่านโดเมนพรีวิวชั่วคราว (`https://897-njp59jvih-harvestfrontiergame.vercel.app`) ทำให้ Redirect URI ที่ส่งไป Google ไม่ตรงกับที่ลงทะเบียนไว้ใน Google Cloud Console
- **Fix Applied:**
  - ปรับปรุง [app/api/auth/google/route.js](file:///c:/Users/MILD2/Documents/%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%99%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%9D%E0%B8%B6%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99/Project%20harvest%20frontier/app/api/auth/google/route.js) และ [app/api/auth/callback/google/route.js](file:///c:/Users/MILD2/Documents/%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%99%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%9D%E0%B8%B6%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99/Project%20harvest%20frontier/app/api/auth/callback/google/route.js) ให้ล็อกใช้ Canonical Domain `https://897-three.vercel.app/api/auth/callback/google` เสมอเมื่อรันบน Cloud
  - ส่งผลให้ไม่ว่าจะเปิดเว็บผ่านโดเมนใด หรือพรีวิวตัวไหนของ Vercel ระบบจะวิ่งเข้า Google OAuth ได้อย่างถูกต้อง 100% เสมอ
- **Backup Snapshot:** `_backup/versions/v1.6.3-fix-oauth-canonical-redirect/`

---

## [v1.6.2] - 2026-09-22
### 🧹 รีเซ็ตข้อมูลผู้ใช้ทั้งหมดในฐานข้อมูล (Database User Clean Reset)
- **Data Backup:** สำรองข้อมูลผู้ใช้เดิมทั้งหมด (6 บัญชี) ลงใน `_backup/users_backup_1790047821809.json` เพื่อความปลอดภัย
- **Truncate & Identity Restart:** ทำการ Truncate ตาราง `users` และ `player_scores` พร้อม Restart Auto-Increment Sequence (เริ่มนับ ID ใหม่จาก 1)
- **Verification:** ตรวจสอบยอดคงเหลือ `users = 0`, `player_scores = 0` พร้อมสำหรับการทดสอบสมัครสมาชิกใหม่ทั้งแบบปกติและผ่าน Google
- **Utility Script:** เพิ่มสคริปต์ [clean-users.js](file:///c:/Users/MILD2/Documents/%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%99%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%9D%E0%B8%B6%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99/Project%20harvest%20frontier/clean-users.js) สำหรับการบำรุงรักษาในอนาคต

---

## [v1.6.1] - 2026-09-22
### 🛠️ แก้ไขข้อผิดพลาด Turbopack Font Rewrite ตอน Build บน Vercel
- **Root Cause:** แท็ก `<link href="https://fonts.googleapis.com/css2?...">` ในหน้า HTML สำรองของ `/api/auth/google` ถูกระบบ Turbopack ของ Next.js พยายามแปลงเป็น Font Asset ทำให้ติดเงื่อนไข Assertion `next/font/google queries have exactly one entry`
- **Fix Applied:**
  - นำแท็ก `<link>` ของ Google Fonts ภายนอกออกจาก Route Handler และสลับมาใช้ System Font Stack ที่เบาและปลอดภัย
- **Verification:** ผ่านการทดสอบ `next build` ผ่านฉลุย 100% (Compiled successfully in 5.5s, 23 routes)

---

## [v1.6.0] - 2026-09-22
### 🔑 เพิ่มระบบเชื่อมต่อ Google OAuth (Sign in & Sign up with Google)
- **Google Social Authentication Button & UI:**
  - เพิ่มปุ่ม "เข้าสู่ระบบด้วย Google" ในหน้า `/auth/login` และ "สมัครสมาชิกด้วย Google" ในหน้า `/auth/register` พร้อมโลโก้ SVG Google ตามมาตรฐาน
  - เพิ่มเส้นแบ่งโมเดิร์น "หรือ" ใน `styles/auth.module.css`
- **Backend OAuth Engine:**
  - สร้าง Endpoint `/api/auth/google`: นำทางไปยัง Google OAuth Consent Screen พร้อมหน้าแนะนำการตั้งค่าในกรณีที่ยังไม่ได้ใส่ Client ID
  - สร้าง Endpoint `/api/auth/callback/google`: รับ Authorization Code แลก Token ดึงโปรไฟล์ผู้ใช้ เชื่อมโยงบัญชีอัตโนมัติในฐานข้อมูล PostgreSQL และสร้าง Session Cookie เข้าเล่นเกมทันที
- **Backup Snapshot:** `_backup/versions/v1.6.0-google-oauth-integration/`

---

## [v1.5.1] - 2026-09-22
### 🐛 แก้ไขบั๊กหน้าสมัครสมาชิก (/auth/register) รีเฟรชตัวเองไม่หยุด (Infinite Reload Loop Fix)
- **Root Cause:** Next.js 16 Dev Server รันด้วย Turbopack และเกิดข้อผิดพลาดระดับ Fatal Panic ใน Windows (`Failed to write app endpoint /auth/register/page: Next.js package not found`) เมื่อ HMR แครชจึงสั่งให้ไคลเอนต์เบราว์เซอร์ทำ Hard Reload วนลูปไม่สิ้นสุด
- **Fix Applied:**
  - ล้างไฟล์แคชเก่าตกค้าง `.next` ที่ติดมาจากการย้ายเครื่อง
  - สลับโหมด Dev Server เป็น `--webpack` เพื่อเสถียรภาพสูงสุดบน Windows
- **Verification:** ผ่านการทดสอบด้วย Browser Subagent: หน้าเว็บนิ่ง 100%, กรอก Username, Email, Password ได้ราบรื่น
- **Files Modified:**
  - `package.json` — อัปเดตสคริปต์ `"dev": "next dev --webpack"`
- **Backup Snapshot:** `_backup/versions/v1.5.1-fix-register-reload-loop/`

---

## [v1.5.0] - 2026-09-16
### 🌱 เพิ่มมินิเกม "ห้องเพาะกล้าลอยฟ้า" — เรือนเพาะชำ (เกาะ 1 ด่าน 1) ให้ความรู้ควบคู่การเล่น
- **Nursery Seedling Lab Minigame (ห้องเพาะกล้า):**
  - ผู้เล่นเลือกสภาวะ 3 ด้าน (ความชื้น, อุณหภูมิ, แสง) เพื่อเพาะเมล็ดพันธุ์ให้งอกสำเร็จ
  - คำตอบที่ถูกต้อง: ชุ่มชื้นพอดี + อบอุ่น 25-30°C + แสงเพียงพอ
  - แสดง Visual Feedback แบบ Real-time: เมล็ดงอก ✨ หรือเหี่ยว 🥀 ตามสภาวะ
  - ตอบผิดจะบอกสภาวะที่ไม่ถูกต้อง + ให้ลองใหม่ ตอบถูกจะสรุปความรู้ 3 ปัจจัย + Aeroponics
- **Knowledge Card ก่อนเข้ามินิเกม:**
  - แสดงเนื้อหาเรื่อง Germination, Etiolation, Aeroponics ให้ผู้เล่นอ่านก่อนเริ่มเล่น
- **อัปเดต NPC Vendetta:** ปรับ dialogue ให้แนะนำผู้เล่นไปเล่นมินิเกมก่อนออกเกาะ
- **Entity Layout:** เพิ่ม minigame_nursery entity ที่ x:550, ขยับ altar ไป x:900 และ item ไป x:1250
- **Files Modified:**
  - `public/js/main.js` — เพิ่ม nursery state, entity, handleInteraction handler, startNurseryLab, submitNurseryLab
  - `app/game/page.js` — เพิ่ม modal HTML ห้องเพาะกล้า
  - `public/css/style.css` — เพิ่ม nursery minigame CSS styles + animations
- **Backup Snapshot:** `_backup/versions/v_nursery_minigame/`

---

## [v1.4.4] - 2026-09-10
### 🎭 ปรับระบบคอสตูม NPC: สุ่มเพียง 1 ชุดพิเศษให้กับ NPC เพียง 1 ตัวในทั้งเกม (Single Lucky NPC Costume Easter Egg)
- **Single Lucky NPC Costume System (1 เกม มี NPC ใส่ชุดคอสตูมพิเศษเพียง 1 ตัวเท่านั้น):**
  - ปรับตรรกะ `randomizeAllNpcAppearances` จากเดิมที่กระจายคอสตูมทั้ง 7 ชุดให้กับ 7 NPC เป็นการสุ่มคอสตูม 1 ชุด (จาก กล้วย, คิริโตะ, นารูโตะ, ลูฟี่, โกคู, ไดโนเสาร์, ไซเบอร์) ให้กับ NPC ผู้โชคดีเพียง **1 ตัวเดียวในทั้งเกม** จากบรรดา NPC ทุกเกาะ
  - NPC ตัวอื่นๆ ที่เหลือทั้งหมดในทั้ง 12 เกาะ จะสวมใส่เสื้อผ้า เครื่องแต่งกาย ทรงผม หมวก และสีสันที่สุ่มตามปกติในธีมชาวสวน/ชาวบ้านทั่วไป
  - เพิ่มระบบตรวจจับและปรับแก้ Save Slot เดิม (Sanitization) หากผู้เล่นโหลดเซฟเก่าที่มี NPC สวมคอสตูมหลายตัว ระบบจะคงไว้เพียง 1 ตัวแบบสุ่ม และรีเซ็ตตัวที่เหลือให้เป็นชุดปกติทันที
- **Browser Cache Buster:**
  - อัปเดตพารามิเตอร์ `?v=1.4.4` ใน `page.js`
- **Files Modified:**
  - `app/game/page.js`
  - `public/js/main.js`
- **Backup Snapshot:** `_backup/versions/v1.4.4-single-npc-costume/`

---

## [v1.4.3] - 2026-09-10
### 🏷️ คืนชีพและอัปเกรดป้ายชื่อลอยเหนือหัวระดับ Vector คมชัด 100% (Ultra-Crisp HTML Overhead Badges & HUD Notification)
- **100% Vector HTML Overhead Nametags (ป้ายชื่อและข้อความลอยเหนือหัวคมชัดเทียบเท่า UI):**
  - ย้ายการแสดงผลชื่อผู้กล้า (`👑 ผู้กล้า`), ชื่อ NPC (`พฤกษากร Vendetta`), แท่นศักดิ์สิทธิ์ (`🌱 แท่นพฤกษาเวหา`), กล่องไอเทม, ซุ้มประตูมิติ, และข้อความปฏิสัมพันธ์ (`💬 กด [E]`) จาก 540p Canvas มาเป็น HTML DOM Element แบบ Vector
  - แก้ไขจุดที่ทำให้ป้ายชื่อไม่ขึ้นในหน้าจอ (เชื่อมต่อ `updateFloatingTags()` ใน Game Render Loop พร้อมรองรับทั้งโหมด `PLAYING` และ `DIALOGUE`)
  - ตรวจจับชื่อผู้กล้าพร้อม Fallback อัตโนมัติ (หากยังไม่ได้ตั้งชื่อจะแสดง "ผู้กล้า" อย่างสวยงาม ไม่เป็นค่าว่างหรือขีด)
  - ดีไซน์กรอบป้ายชื่อแบบ Modern Fantasy RPG: ขอบมน โทนสีตามประเภทเอนทิตี เงาละมุน (Soft Shadow) และไม่เกิดอาการเบลอเมื่อขยายหน้าจอเป็น Full HD / 2K / 4K
- **Crisp HUD Top Notification Banner:**
  - อัปเกรดแถบแจ้งเตือนด้านบน (`✨ ได้รับไอเทม...`, `📍 เข้าสู่...`) เป็น Vector HTML Animation แบนเนอร์ลอยเด่นชัดสวยงาม
  - ปรับตำแหน่งลงมาที่ `top: 60px` เพื่อไม่ให้ทับซ้อนกับ Top HUD Tracker และปุ่มเมนู
- **Zero-Distortion 16:9 Viewport Sync:**
  - ปรับสมดุล `#game-viewport-wrapper`, `#gameCanvas`, และ `#floating-tags-container` ให้ล็อกอัตราส่วน 16:9 ตรงกันอย่างสมบูรณ์แบบ
- **Browser Cache Buster:**
  - เพิ่มเวอร์ชันพารามิเตอร์ `?v=1.4.3` ใน Script Tag เพื่อให้เบราว์เซอร์โหลดไฟล์สคริปต์ตัวใหม่ทันที
- **Files Modified:**
  - `app/game/page.js`
  - `public/css/style.css`
  - `public/js/main.js`
- **Backup Snapshot:** `_backup/versions/v1.4.3-crisp-html-overhead-nametags/`

---

## [v1.4.2] - 2026-09-10
### 💎 แก้ไขตัวอักษรแตก/เบลอ ปรับใช้ฟอนต์ Prompt & Kanit พร้อมระบบ Smooth Anti-Aliasing และ Text Outline
- **Crystal-Clear Typography (เปลี่ยนฟอนต์หลักให้อ่านง่าย คมกริบ ไม่แตก ไม่เบลอ):**
  - นำเข้า Google Fonts **`Prompt`** และ **`Kanit`** เสริมทัพด้วย `Chakra Petch`
  - แก้ปัญหาฟอนต์เดิมที่มีการตัดมุมแบบเหลี่ยม 45 องศา (Octagonal Matrix) ที่ทำให้ตัวหนังสือภาษาไทยดูเหมือนมีรอยหยัก/แตกเป็นเม็ดพิกเซล
  - ฟอนต์ `Prompt` และ `Kanit` ให้เส้นโค้งและสระภาษาไทยที่กลมมน คมชัด สวยงามและอ่านง่ายในทุกขนาด
- **High-Quality Vector & Canvas Anti-Aliasing:**
  - เปลี่ยนจาก `image-rendering: pixelated` เป็น `image-rendering: auto` และ `-webkit-optimize-contrast` เพื่อให้การขยายภาพบนหน้าจอ Full HD / 2K มีความสมูท ไม่แตกเป็นก้อนพิกเซล
  - เปิดใช้งาน `ctx.imageSmoothingEnabled = true` และ `ctx.imageSmoothingQuality = "high"` ใน Game Canvas
  - เพิ่ม `-webkit-font-smoothing: antialiased` และ `text-rendering: optimizeLegibility` ใน CSS
- **High-Contrast Text Outlines & Shadows (ขอบตัวหนังสือคมชัดทุกสภาพแวดล้อม):**
  - เพิ่มเส้นขอบมืด `ctx.strokeText` ความหนา 3px ให้กับชื่อตัวละคร (`👑 ปุณณ์`), NPC (`พฤกษากร Vendetta`), แท่นบูชา, ไอเทม, ซุ้มประตูวาร์ป และป้ายบอกทาง
  - ป้องกันปัญหาตัวหนังสือสีกลืนกับฉากหลังสว่างของเรือนกระจกหรือทุ่งหญ้า
- **Scanline Softening:**
  - ปรับความเข้มของเส้นสแกน CRT (`#scanline-overlay`) ให้อ่อนลง เพื่อไม่ให้มีแถบดำพาดตัดตัวหนังสือจนอ่านยาก
- **Files Modified:**
  - `app/game/page.js`
  - `public/css/style.css`
  - `public/css/undertale.css`
  - `public/js/main.js`
- **Backup Snapshot:** `_backup/versions/v1.4.2-crystal-clear-fonts/`

---

## [v1.4.1] - 2026-09-02
### 🗺️ แก้ไข UI แผนที่โลก: เลื่อนแมพได้, เปิด-ปิดคำอธิบายได้, และแก้ชื่อแมพเกินช่อง (Pannable Map & Toggleable Detail Panel)
- **Collapsible / Toggleable Inspection Sidebar:**
  - เพิ่มปุ่มเปิด-ปิดแผงคำอธิบายเกาะด้านขวา `[ 📖 ข้อมูลเกาะ [Tab] ]` / `[ ✕ ซ่อนข้อมูล [Tab] ]` ที่มุมขวาบนของแผนที่ และปุ่ม `[ ✕ ]` บนแถบหัวข้อแผงคำอธิบาย
  - ค่าเริ่มต้นแผงคำอธิบายจะไม่บังแมพ ทำให้สามารถมองเห็นและคลิกวาร์ปไปยังทั้ง 12 เกาะได้อย่างอิสระ 100%
  - รองรับปุ่มคีย์ลัด `Tab` หรือ `I` เพื่อสลับเปิด-ปิดแผงคำอธิบายได้อย่างรวดเร็ว
- **Smooth Map Panning & Dragging (ระบบลากเลื่อนแผนที่):**
  - สามารถคลิกลากเมาส์ (Mouse Drag) เพื่อเลื่อนดูแมพได้อย่างอิสระ
  - รองรับการหมุนล้อเลื่อนเมาส์ (Mouse Wheel) และปุ่มลูกศร / WASD ในการเลื่อนมุมมองแผนที่
  - เพิ่มปุ่ม `[ 🔄 รีเซ็ตมุม [R] ]` เพื่อรีเซ็ตตำแหน่งกลับมาที่กึ่งกลาง
- **Zero-Overflow Node Box & Name Fitting (จัดขนาดกล่องและชื่อเกาะ):**
  - ขยายขนาดกล่องโหนดเป็น `94x48px` พร้อมจัดวางข้อความเป็น 3 บรรทัดพอดีกรอบ: (1) ไอคอน + ชื่อไทยย่อ, (2) ชื่ออังกฤษย่อ, (3) ป้ายสถานะ `🕯️ ⚔️ 📦 💀`
  - ปรับปรุงแถบหัวข้อแผงคำอธิบายให้แบ่งบรรทัดชื่อภาษาอังกฤษและไทยอย่างสวยงาม ไม่ล้นขอบ 280px อีกต่อไป
  - จัดระยะห่างพิกัด (`mapX, mapY`) ของทั้ง 12 เกาะลอยฟ้าใหม่ให้มีช่องว่างห่างกันอย่างน้อย 120-140px ไม่มีกล่องซ้อนทับกัน
- **Warp & Double Click Integration:**
  - สามารถดับเบิลคลิกที่โหนดเกาะใดก็ได้เพื่อวาร์ปทันที หรือกด `T / Enter`
- **Fix Runtime Error `saveGameSlot`:**
  - แก้ไขข้อผิดพลาด `this.saveGameSlot is not a function` โดยเพิ่มฟังก์ชัน `saveGameSlot` และเชื่อมเข้ากับ `saveCurrentSlot` อย่างปลอดภัย
- **Files Modified:**
  - `public/js/main.js`
  - `public/css/style.css`
- **Backup Snapshot:** `_backup/versions/v1.4.1-map-scroll-and-sidebar-toggle/`

---

## [v1.4.0] - 2026-09-02
### 🎯 ปรับคำถาม มินิเกม แท่นบูชา และสภาพแวดล้อมให้ตรงกันครบทั้ง 12 เกาะ (Stage-Matched Environment & Quizzes)
- **12-Room Stage Knowledge Matrix:** ออกแบบและจับคู่เนื้อหาคำถาม บททดสอบ และมินิเกม ให้สอดคล้องกับสภาพแวดล้อมและธีมของเกาะลอยฟ้าทั้ง 12 แห่งโดยเฉพาะ:
  1. *เกาะเรือนเพาะชำลอยฟ้า:* การเพาะเมล็ดพันธุ์, ระบบแอโรโปนิกส์ (Aeroponics), การดูแลต้นกล้า
  2. *เกาะทุ่งกสิกรรมฟื้นฟูดิน:* ค่า pH ดิน (6.0 - 7.0), การแก้ดินกรดด้วยปูนขาว/โดโลไมท์, มินิเกม Mixer Lab
  3. *เกาะสวนผลไม้และน้ำตกเวหา:* การจัดการน้ำในฤดูแล้ง, พืชทนแล้งรากลึก (ข้าวโพด/มันสำปะหลัง), มินิเกม Crop Planting
  4. *เกาะพฤกษศาสตร์สมุนไพร:* ลำดับการเตรียมแปลงดิน (ไถดะตากดิน), สารสกัดสะเดา, มินิเกม Sort It Right
  5. *เกาะห้องทดลองรากพืชใต้พิภพ:* ชีววิทยาของราก, เชื้อราไมคอร์ไรซา, แมลงเต่าทองกินเพลี้ย, มินิเกม Bug Defender
  6. *เกาะนครเกษตรอัจฉริยะ:* การปลูกพืชแนวตั้ง (Vertical Farming), เซนเซอร์ IoT, โดรนเกษตร, มินิเกม Knowledge Jigsaw
  7. *เกาะบึงน้ำลอยฟ้าอควาโปนิกส์:* ระบบอควาโปนิกส์ (มูลปลาสู่ไนเตรต), การบำบัดน้ำด้วยพืชน้ำ, มินิเกม Speed Quiz Blitz
  8. *เกาะนาขั้นบันไดเสียดฟ้า:* นาขั้นบันไดลดการชะล้างหน้าดิน, หอยเชอรี่, ฝายชะลอน้ำ
  9. *เกาะสะวันนาลอยฟ้าพืชทนแล้ง:* ศาสตร์วนเกษตร (Agroforestry), การปลูกหญ้าแฝกยึดดินตามแนวพระราชดำริ
  10. *เกาะคลังพันธุกรรมเมล็ดพันธุ์:* การอนุรักษ์พันธุกรรมพืช (Seed Vault), การเพาะเลี้ยงเนื้อเยื่อ (Tissue Culture)
  11. *เกาะทุ่งรวงทองแห่งสวรรค์:* ประมวลความรู้มหากสิกรรมครบวงจร + ศึกประลองปัญญาบอส 10 ข้อ
  12. *เกาะพฤกษาจันทราลอยฟ้า:* เกษตรกรรมยั่งยืนนิรันดร์, เศรษฐกิจหมุนเวียน (Circular Agriculture)
- **Interactive Altar Knowledge Trials:** เพิ่มระบบแท่นบูชาประจำเกาะ (`modal-altar-trial`) ให้ผู้เล่นสามารถเลือกทำ "บททดสอบปัญญาประจำเกาะ" เพื่อรับดาวปัญญา ⭐ หรือเลือก "พักผ่อนเซฟจุดเกิด"
- **12-Islands Sky Codex:** ปรับปรุงมหาบันทึกปัญญา (กด B) ให้อัปเดตเนื้อหาสรุปความรู้ครบถ้วนทั้ง 12 เกาะ
- **Grand Boss Battle Integration:** บอสวิหารรวงทองใช้ข้อสอบสังเคราะห์องค์ความรู้รวม 10 ข้อจากทุกเกาะ
- **Files Modified:**
  - `public/js/main.js`
  - `app/game/page.js`
- **Backup Snapshot:** `_backup/versions/v1.4.0-stage-matched-quizzes/`

---

## [v1.3.1] - 2026-09-02
### 🎨 เชื่อมต่อพื้นดินและฉากหลังให้เนียนสนิทไร้รอยต่อ (Seamless Ground & Scenery Blending)
- **Mathematical Anchor Alignment:** ผูกพิกัดตำแหน่งขององค์ประกอบฉากทั้งหมด (ทุ่งข้าวสาลี, แปลงลาเวนเดอร์, รั้วไม้ฟาร์ม, ต้นไม้ผล, กังหันลม, โดมเรือนกระจก, หอปลูกพืชแนวตั้ง, ซุ้มสมุนไพร) ให้ปักหลักแนบสนิทลงบนระดับพื้นดิน `this.groundY = 440` โดยตรง แก้ปัญหาฉากลอยเคว้งหรือขาดช่วง
- **Backdrop Ridge & Horizon Slopes:** เพิ่มเนินเขาและแนวหลังคา/พื้นผิวในเลเยอร์ Backdrop ให้ลาดเอียงลงมาบรรจบกับผืนดินอย่างนุ่มนวล
- **Soft Horizon Shadow & Multi-Layer Soil:** เพิ่มเงาเบลอขอบเส้นขอบฟ้า (`Soft Horizon Gradient`) และชั้นดินฮิวมัส-หินดินดานพร้อมรากไม้ห้อยเวหาและหมอกเมฆใต้เกาะ
- **Upper Sky Island Floating Perspective:** ปรับระดับเกาะลอยฟ้าและสิ่งก่อสร้างเวหาในฉากหลังให้อยู่บนท้องฟ้าชั้นบน (y=100–160) พร้อมไอหมอกละอองเมฆ สร้างมิติความลึก (Depth of Field) ชัดเจน
- **Files Modified:**
  - `public/js/main.js`
- **Backup Snapshot:** `_backup/versions/v1.3.1-seamless-ground-scenery/`

---

## [v1.3.0] - 2026-09-02
### ☁️ ปรับธีมโลกและฉากทั้งหมดเป็น "12 หมู่เกาะลอยฟ้าการเกษตร" (Agricultural Floating Sky Islands)
- **Procedural Floating Island Engine:** พัฒนาฟังก์ชัน `drawFloatingIsland()` วาดเกาะลอยฟ้าที่มีหน้าผาหินใต้เกาะ รากไม้ห้อยเวหา น้ำตกจากเกาะลอยฟ้า และกังหันลม
- **Thematic Parallax Scenery:** ปรับปรุงฉากหลังและท้องฟ้าของทั้ง 12 ธีมให้เป็นหมู่เกาะลอยฟ้าในชั้นบรรยากาศ (เกาะเรือนเพาะชำลอยฟ้า, เกาะทุ่งกสิกรรมฟื้นฟู, เกาะสวนผลไม้น้ำตกเวหา, เกาะสมุนไพรลอยฟ้า, เกาะนครเกษตรอัจฉริยะ ฯลฯ) พร้อมบอลลูนตรวจสภาพอากาศ โดรนเกษตร และสายรุ้งละอองเมฆ
- **Floating Island Terrain & Cliff Bottom:** ปรับปรุง `drawThematicGround()` ให้แสดงผืนดินเกาะลอยฟ้า ชั้นดินฮิวมัส หน้าผาหินใต้เกาะ และรากไม้ห้อยไกวในสายลมเวหา
- **World Map 12 Sky Islands:** ปรับชื่อเกาะ คำบรรยาย และบทสนทนา NPC ทั้ง 12 เกาะใน `defineWorldMap()` ให้เป็นเนื้อเรื่องกอบกู้ความอุดมสมบูรณ์ของหมู่เกาะลอยฟ้าการเกษตร
- **Files Modified:**
  - `public/js/main.js`
  - `public/css/style.css`
  - `app/game/page.js`
- **Backup Snapshot:** `_backup/versions/v1.3.0-sky-islands/`

---

## [v1.2.1] - 2026-09-02
### 🐛 แก้ไขบั๊กเสียงเอฟเฟกต์ (SoundFX Hotfix)
- **Fix Runtime TypeError:** เพิ่มเมธอด `playVictory()` ในคลาส `SoundFX` (`public/js/main.js`) เพื่อสร้างเสียงแฟนเฟร์แห่งชัยชนะแบบ Retro Fanfare (C5-E5-G5-C6) เมื่อผู้เล่นชนะมินิเกมหรือจบเควสต์
- **Files Modified:**
  - `public/js/main.js`
- **Backup Snapshot:** `_backup/versions/v1.2.1-fix-sound-victory/`

---

## [v1.2.0] - 2026-09-02
### 🌟 เพิ่มเติมและปรับปรุงระบบมินิเกมและการเรียนรู้ (Minigame & Educational Gameplay)
- **Knowledge Card System:** เพิ่มหน้าต่างปูพื้นฐานความรู้ก่อนเริ่มมินิเกม เพื่อให้ผู้เล่นเข้าใจปัญหาและหลักการเกษตร
- **Minigame Result System:** เพิ่มหน้าต่างสรุปผลคะแนน 1-3 ดาว (⭐) และกล่องสรุปความรู้ที่ได้รับ
- **In-Game Toast Notification:** กำจัด `alert()` ทั้งหมด เปลี่ยนเป็นระบบ Retro HUD Toast ลอยแจ้งเตือนแบบไม่ขัดจังหวะ
- **Minigame 1 (pH Mixer Lab):** พัฒนาห้องทดลองผสมสารปรับค่า pH ดินแบบ Interactive (ปูนขาว, โดโลไมท์, กำมะถัน) พร้อมบีกเกอร์แสดงผลสด
- **Minigame 2 (Crop Planting Grid):** แปลงจัดสรรพืชทนแล้งตามฤดูกาล (ข้าวโพด, มันสำปะหลัง)
- **Minigame 3 (Bug Defender):** แก้ไขบั๊ก Logic Flow และพัฒนาชีววิธีพิทักษ์แปลงมะเขือเทศ (แมลงเต่าทอง, น้ำหมักสะเดา)
- **Minigame 4 (Knowledge Jigsaw):** เพิ่มมินิเกมจับคู่ปัญหากับวิธีแก้ปัญหาเกษตร 4 รูปแบบ พร้อมระบบจับเวลา 30 วินาที
- **Minigame 5 (Sort It Right):** เพิ่มมินิเกมเรียงลำดับขั้นตอนเตรียมดินมาตรฐาน ด้วยปุ่มสลับขึ้น-ลง
- **Minigame 6 (Speed Quiz Blitz):** เพิ่มมินิเกมทบทวนความเร็ว ถูก/ผิด 5 วินาทีต่อข้อ พร้อมระบบ Combo Streak
- **Boss Quiz Arena Enhancement:** เพิ่มระบบ Combo Multiplier และโบนัสดาเมจ x1.2 - x2.0
- **World Map Distribution:** วางจุด Entity มินิเกมทั้ง 6 ลงในแต่ละห้องของแผนที่อย่างครบถ้วน
- **Files Modified:**
  - `public/js/main.js`
  - `public/css/style.css`
  - `app/game/page.js`

---

## [v1.1.0] - 2026-09-01
### 🏰 ระบบ World Map & Undertale UI Engine
- เพิ่มระบบ Naming Keyboard (TH/EN) สไตล์ Undertale
- เพิ่มระบบเลือกเพศและสร้างตัวละคร (Customization Scene)
- พัฒนาระบบแผนที่หลายห้อง (Multi-room RPG Map) และ Sprite Animation
- พัฒนาระบบ Boss Arena และระบบต่อสู้ตอบคำถามเกษตรกรรม
- **Files Modified:**
  - `public/js/main.js`
  - `public/css/undertale.css`
  - `app/game/page.js`

---

## [v1.0.0] - 2026-08-30
### 🚀 Initial Release
- โครงสร้างโปรเจกต์ Next.js + React
- ระบบ Authenticate (Login / Register / Profile)
- ระบบจัดการคะแนนและ Leaderboard
- ฐานข้อมูลคำถาม `questions.json`
