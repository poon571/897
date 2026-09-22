# 📜 Project Harvest Frontier — Changelog & Version History

เอกสารบันทึกประวัติเวอร์ชันและการแก้ไขปรับปรุงของโปรเจกต์ Harvest Frontier

## [v1.7.4] - 2026-09-22
### 🌿 เกาะที่ 1 ครบทุกด่าน: 11 มินิเกมพืชพรรณ, ย้ายประตูบอสสู่พฤกษาจันทรา (โซนสุดท้าย), และมหาศึกบอส 10 ข้อ
- **1. เติมเต็มมินิเกมครบถ้วนทุกโซนในเกาะที่ 1 (Complete All Minigames for Island 1):**
  - เกาะที่ 1 มีทั้งหมด 12 เขต (12 Eco-Zones) โดยได้รับการออกแบบมินิเกมครบถ้วน 11 เขต และเขตสุดท้ายเป็นแดนพำนักศักดิ์สิทธิ์:
    - **Zone 1 (`holy_chapel` - เรือนเพาะชำ Sky Nursery):** มินิเกมจำลองเพาะกล้าอัจฉริยะ (Aeroponics Seedling Simulator) รักษาสมดุลความชื้น อุณหภูมิ และแสง ป้องกันต้นยืด (Etiolation)
    - **Zone 2 (`abandoned_village` - ทุ่งฟื้นฟูดิน Farmland):** มินิเกมห้องทดลองปรับปรุงค่า pH ของดิน (Soil pH Mixer Lab) เติมปูนขาว/โดโลไมท์ปรับสู่ 6.0 - 7.0
    - **Zone 3 (`drawbridge` - เตรียมแปลงปลูก Land Prep):** มินิเกมจัดเรียงขั้นตอนการเตรียมแปลงดิน (Sort It Right) ไถดะ -> ตากดิน -> ไถแปร -> ใส่ปุ๋ย/ปูนขาว -> ยกร่องคลุมดิน
    - **Zone 4 (`rodenia_chapel` - พฤกษาสมุนไพร Botanical):** [NEW] มินิเกมสกัดและจับคู่สมุนไพรอารักขาพืช (Herbal Bio-Extract Lab) — สะเดา (Neem) กำจัดหนอน/เพลี้ย, ตะไคร้หอมขับไล่แมลงบิน, ข่า/ขมิ้นชันยับยั้งเชื้อรา, ดาวเรืองกำจัดไส้เดือนฝอยรากปม
    - **Zone 5 (`buried_church` - รากพืชใต้พิภพ Rhizosphere):** มินิเกมชีววิธีพิทักษ์แปลง (Bug Defender) เลือกแมลงเต่าทอง (ตัวห้ำ) และสารสกัดสะเดา
    - **Zone 6 (`ghost_town` - เกษตรอัจฉริยะ AgriTech City):** มินิเกมจิ๊กซอว์จับคู่วิเคราะห์และแก้ปัญหาเกษตรอัจฉริยะ (Knowledge Jigsaw)
    - **Zone 7 (`sewers` - บึงอควาโปนิกส์ Aquaponics):** มินิเกมสปีดควิซระบบหมุนเวียนน้ำและระบบนิเวศปลา-พืช (Speed Quiz Blitz)
    - **Zone 8 (`canyon` - สะวันนาวนเกษตร Agroforestry):** มินิเกมจัดสรรพืชทนแล้งตามฤดูกาล (Drought Crop Selector) ปลูกข้าวโพดและมันสำปะหลังหยั่งรากลึก
    - **Zone 9 (`pilgrimage` - นาขั้นบันได Rice Terraces):** [NEW] มินิเกมควบคุมระบบผันน้ำนาขั้นบันไดและฝายชะลอน้ำ (Sky Rice Terraces Water Dam) ปรับวาล์ว 3 ขั้นสู่สภาวะ Slow & Store ดักตะกอนและป้องกันดินถล่ม
    - **Zone 10 (`laboratory` - คลังเมล็ดพันธุ์ Seed Vault):** [NEW] มินิเกมคาลิเบรตคลังเมล็ดพันธุ์ไครโอเจนิก (Cryogenic Seed Vault Calibrator) ปรับอุณหภูมิห้องเย็น -18°C และความชื้นเมล็ด 4% - 6% ตามมาตรฐาน Svalbard
    - **Zone 11 (`white_cathedral` - ทุ่งรวงทอง Golden Harvest):** [NEW] มินิเกมปรุงธาตุอาหารพืชหลักทองคำ N-P-K (N-P-K Golden Harvest Blender) ผสมสัดส่วน 1-2-3 เน้นโพแทสเซียม (K) สูงสุดในระยะออกรวงสะสมแป้งเมล็ดเต่ง
- **2. ย้ายประตูบอสสู่โซนสุดท้าย: 'พฤกษาจันทรานิรันดร์' (Zone 12 - Sacred Sanctuary):**
  - **Zone 12 (`lunar_gallery` - พฤกษาจันทรา Tree of Life):** เป็นโซนเดียวที่ **ไม่มีมินิเกม** ตามคำสั่งของผู้ใช้!
  - ภายในโซนทำหน้าที่เป็นแดนพำนักศักดิ์สิทธิ์สูงสุด (Sacred Final Haven):
    - จุดเซฟประจำโซน: แท่นพฤกษาใต้แสงจันทร์ (`altar_lunar`)
    - ตัวละคร Lore NPC: ผู้เฒ่าเทพีแห่งพฤกษาจันทรา (`The Moon Witch`) มอบคำอวยพรและเรื่องราว
    - ไอเทมล้ำค่า: กุญแจจันทรานิรันดร์ (`item_lunar_key`)
    - ประตูบอสสุดท้าย (`portal_boss`): ตรวจสอบความพร้อม หากผู้เล่นพิชิตมินิเกมครบทั้ง 11 เขตกสิกรรม มหาประตูจะปลดล็อคให้เข้าสู่ศึกประลองปัญหาสูงสุด
- **3. ยกระดับคำถามบอสเป็น 10 ข้อครอบคลุมทุกมินิเกมในเกาะที่ 1 (10 Comprehensive Boss Questions):**
  - ปรับปรุงข้อสอบบอสใน `MASTER_DATABASE.bossQuestions` ให้มี **10 ข้อตรงตามความรู้จริง** จากทั้ง 11 เขตของเกาะพืชพรรณ:
    1. ละอองสารอาหารและออกซิเจนในระบบ Aeroponics (Zone 1)
    2. การแก้ดินกรดด้วยปูนขาวและโดโลไมท์ pH 6.0 - 7.0 (Zone 2)
    3. ลำดับมาตรฐานการเตรียมแปลงปลูกและการไถตากดิน (Zone 3)
    4. สาร Azadirachtin ในสะเดาขัดขวางการลอกคราบหนอน (Zone 4)
    5. ชีววิธีโดยแมลงเต่าทองตัวห้ำกินเพลี้ยอ่อน (Zone 5)
    6. เซนเซอร์ความชื้นดินและระบบ Fertigation ใน Smart Farm (Zone 6)
    7. วงจรไนโตรเจนและแบคทีเรียไนตริฟายอิงใน Aquaponics (Zone 7)
    8. พืชทนแล้งรากลึกและการคลุมฟางรักษาความชื้น (Zone 8)
    9. การชะลอน้ำและดักตะกอนดินในนาขั้นบันไดและฝายชะลอน้ำ (Zone 9)
    10. อุณหภูมิ -18°C / ความชื้น 4-6% ในคลังเมล็ดพันธุ์ + บทบาทของโพแทสเซียม (K) ในการสร้างแป้งเมล็ดเต่ง (Zone 10 & 11)
- **4. Sub-map & UI Enhancement:**
  - แผนที่ย่อย Sub-map (กด M) เพิ่มแท็กไอคอน `🎮` บนโหนดที่มีมินิเกม และไอคอนกะโหลก `💀` บนเขตพฤกษาจันทราที่มีบอส
  - มินิเกมใหม่ทุกด่านมีปุ่ม `🚪 ออกจากมินิเกม`, ปุ่ม `✕`, และรองรับคีย์บอร์ด `Escape` ครบถ้วน
- **Backup Snapshot:** `_backup/versions/v1.7.4-complete-island1-minigames/`

---

## [v1.7.3] - 2026-09-22
### 💾 ยกเครื่องระบบเซฟ: ลบข้อมูลเกลี้ยง 100%, แยกช่องเซฟอิสระ, และแยกข้อมูลตามบัญชีผู้ใช้ (Save System Overhaul)
- **1. ตรวจสอบและแก้ไขการลบข้อมูลในเซฟ (Complete Wipe on Deletion):**
  - ลบข้อมูล JSON ออกจาก LocalStorage อย่างถาวร (`localStorage.removeItem`) ทั้งคีย์แบบระบุบัญชีและคีย์ Legacy เดิม
  - **แก้ปัญหาข้อมูลค้างในหน่วยความจำ (In-Memory Leak):** หากผู้เล่นลบช่องเซฟที่กำลังเล่นอยู่ ระบบจะเรียก `resetGameProgressState()` เพื่อล้างคะแนน (`totalScore = 0`), กระเป๋าไอเทม (`inventory = []`), มินิเกมที่ผ่านแล้ว (`minigamesCompleted = {}`), แผนที่ที่ค้นพบ, รูปร่าง NPC, และพิกัดตัวละครใน RAM ทันที พร้อมเซ็ต `currentSaveSlot = null` เพื่อป้องกันไม่ให้การ Auto-save นำข้อมูลเก่ามาเขียนทับช่องที่เพิ่งลบไป
- **2. แก้ปัญหาช่องเซฟปะปนกัน (100% Slot Isolation):**
  - เดิมทีเมื่อผู้เล่นกด "➕ เล่นเกมใหม่ (New Game)" ในช่องเซฟที่ 2 หรือ 3 ระบบไม่ได้รีเซ็ตตัวแปรเกมใน RAM ทำให้ตัวละครใหม่ใน Slot 2 ได้รับคะแนน, ไอเทม และมินิเกมที่ผ่านแล้วมาจาก Slot 1
  - เพิ่มการเรียก `resetGameProgressState()` ก่อนเริ่ม New Game และก่อนโหลด Continue Game ในทุกช่องเซฟ ทำให้ช่องเซฟ 1, 2, 3 แยกขาดจากกันโดยสิ้นเชิง ไม่มีการรั่วไหลของข้อมูลระหว่างช่อง
- **3. ระบบแยกช่องเซฟตามบัญชีผู้ใช้ (Account-Scoped Save Slots):**
  - เดิมทีใช้คีย์กลางร่วมกัน (`harvest_frontier_save_slot_X`) ทำให้ผู้ใช้ต่างคนบนคอมเครื่องเดียวกันมองเห็นและเล่นทับเซฟของกันและกัน
  - ปรับระบบคีย์ใหม่ให้ผูกกับ User ID:
    - สมาชิกที่ล็อกอิน: `harvest_frontier_u_{userId}_save_slot_{slotId}` (เช่น บัญชีคุณ mild จะมี 3 สล็อตของตัวเอง)
    - ผู้เล่นทั่วไป (Guest): `harvest_frontier_guest_save_slot_{slotId}`
  - **ระบบ Legacy Migration:** ตรวจสอบอัตโนมัติว่าหากผู้ใช้มีเซฟเดิมก่อนการปรับปรุง ระบบจะโอนย้ายข้อมูลเดิมเข้ามาผูกกับบัญชีปัจจุบันให้อัตโนมัติ โดยข้อมูลไม่สูญหาย
  - เพิ่มป้ายแสดงสถานะบัญชีบนหน้าต่างเลือกเซฟ (`#save-slots-account-badge`) ให้เห็นชัดเจนว่ากำลังเปิดดูเซฟของบัญชีใด
- **Backup Snapshot:** `_backup/versions/v1.7.3-save-isolation-account-scoping/`

---

## [v1.7.2] - 2026-09-22
### 🚪 เพิ่มปุ่มและช่องทางออกจากมินิเกมทุกด่าน (Minigame Exit & Close Overhaul)
- **Root Cause & Feedback:** ผู้เล่นเปิดมินิเกมจัดเรียงขั้นตอนการเตรียมแปลงปลูก (`🔀 มินิเกม : เรียงลำดับขั้นตอนให้ถูกต้อง`) แล้วจำเนื้อหาไม่ได้ หรือไม่รู้คำตอบ แต่เดิมทีมีเพียงปุ่ม `✨ ยืนยันลำดับ` เพียงปุ่มเดียว ทำให้ผู้เล่นติดอยู่ในมินิเกม (Trapped in Modal) ไม่สามารถปิดหน้าต่างเพื่อกลับไปอ่านความรู้กับ NPC หรือเดินสำรวจใหม่ได้
- **Comprehensive Solution:**
  - **1. ปุ่มกากบาทปิดหน้าต่าง (`✕`) ใน Ribbon หัวข้อ:** เพิ่มปุ่ม `.retro-btn-close` สีแดงคริมสันที่มุมบนขวาของริบบอนชื่อมินิเกมทุกด่าน
  - **2. ปุ่มออกจากมินิเกม (`🚪 ออกจากมินิเกม`):** เพิ่มปุ่มสไตล์ `.retro-btn-secondary` สีสเลทเข้มคมชัด ด้านข้างปุ่มยืนยันคำตอบอย่างลงตัว ไม่กินพื้นที่ และมองเห็นได้ชัดเจน
  - **3. คีย์ลัดแป้นพิมพ์ `Escape`:** อัปเดตคีย์บอร์ดอีเวนต์ให้กดปุ่ม `Escape` แล้วปิดมินิเกมใดๆ ที่เปิดอยู่ทันที พร้อมคืนค่าสถานะเกมสู่การเดินสำรวจ (`gameState = "PLAYING"`) และเล่นเสียงตอบสนอง
  - **4. ปรับใช้ครอบคลุมทุกมินิเกมของเกาะ:**
    - ด่านจัดเรียงขั้นตอนเตรียมดิน (`modal-minigame-sort`)
    - ด่านห้องทดลองผสมสารปรับ pH ดิน (`modal-minigame-soil`)
    - ด่านระบบจำลองเพาะกล้า Aeroponics (`modal-minigame-nursery`)
    - ด่านจัดสรรพืช (`modal-minigame-season`)
    - ด่านชีววิธีศัตรูพืช (`modal-minigame-pest`)
    - ด่านจับคู่ปัญหาเกษตร (`modal-minigame-jigsaw`)
    - ด่าน Speed Quiz (`modal-minigame-speed`)
    - หน้าต่างการ์ดความรู้ก่อนเริ่มมินิเกม (`modal-knowledge-card`)
- **Backup Snapshot:** `_backup/versions/v1.7.2-minigame-exit-buttons/`

---

## [v1.7.1] - 2026-09-22
### 🗑️ เพิ่มหน้าต่างยืนยันการลบเซฟแบบ Custom GUI สวยงาม (Custom Delete Save Slot Modal)
- **Root Cause & Feedback:** เดิมทีการกดปุ่มถังขยะสีแดงเพื่อลบช่องเซฟในหน้าเลือกเซฟ จะขึ้นกล่องข้อความเตือนของเบราว์เซอร์ (`window.confirm`) ซึ่งดูไม่สวยงามและขัดกับธีมเกมเรโทร-พิกเซลแฟนตาซี
- **Custom GUI Overhaul:**
  - สร้าง Modal ยืนยันการลบข้อมูล `#modal-confirm-delete-slot` สไตล์เรโทรแฟนตาซี พร้อมเอฟเฟกต์ไฟนีออนสีแดงเรืองแสงรอบขอบหน้าต่าง
  - ไอคอนถังขยะอนิเมชันสั่นเตือน `🗑️` พร้อมวงแสงออร่าสีแดงพัลส์ (Pulsing Red Aura)
  - กล่องพรีวิวข้อมูลเซฟที่จะลบ: แสดงหมายเลขช่องเซฟ, ชื่อตัวละคร, โลเคชันปัจจุบัน, คะแนนสะสม และวันเวลาที่บันทึก
  - กล่องข้อความแจ้งเตือนสีแดงเตือนความปลอดภัย: ระบุชัดเจนว่าข้อมูลจะสูญหายถาวร
  - ปุ่มกดยืนยันการลบ `🗑️ ยืนยันการลบข้อมูล` สีแดงไล่ระดับ และปุ่ม `❌ ยกเลิก` พร้อมรองรับการกดปุ่ม `Escape` บนคีย์บอร์ดเพื่อยกเลิกได้อย่างรวดเร็ว
- **Backup Snapshot:** `_backup/versions/v1.7.1-custom-delete-gui/`

---

## [v1.7.0] - 2026-09-22
### 🌾 ยกเครื่องระบบเกมตามข้อเสนอแนะการนำเสนอ (Presentation Feedback Overhaul)
- **1. ระบบล็อกประตูตามเงื่อนไขมินิเกม (Stage Minigame Gate Locking):**
  - ล็อกประตูทางผ่านทุกด่าน ไม่ให้ผู้เล่นเดินข้ามด่านได้โดยไม่ผ่านมินิเกมประจำด่านก่อน
  - ด่าน 1 (`holy_chapel`): ต้องผ่านห้องเพาะกล้าลอยฟ้า (`reqMinigame: "nursery"`) จึงจะเปิดประตูไปด่าน 2
  - ด่าน 2 (`abandoned_village`): ต้องผ่านแปลงทดสอบดินกรด pH 6.0-7.0 (`reqMinigame: "soil"`) จึงจะเปิดประตูไปด่าน 3
  - ด่าน 3 (`drawbridge`): ต้องผ่านแท่นจัดเรียงขั้นตอนเตรียมแปลงดิน (`reqMinigame: "sort"`) จึงจะเปิดประตูสู่มหาวิหารห้องบอส
  - แสดงป้ายชื่อประตูสีแดงเรืองแสง `tag-portal-locked` พร้อมไอคอน 🔒 และเรนเดอร์ม่านพลังศิลาพร้อมแม่กุญแจบน Canvas
  - เมื่อผู้เล่นพยายามกด [E] จะมีเสียงปฏิเสธพร้อมแจ้งเตือน Toast บอกเงื่อนไขที่ต้องทำอย่างชัดเจน
- **2. ระบบปรับขนาดตัวอักษรในหน้าตั้งค่า สำหรับฉายโปรเจกเตอร์ (Font Size & Accessibility):**
  - เพิ่มตัวเลือกปรับขนาดตัวอักษร 3 ระดับในหน้าตั้งค่า (กด Esc หรือกดปุ่มตั้งค่า): ปกติ (100%), ใหญ่ (120%), ใหญ่พิเศษ (138%)
  - ควบคุมผ่าน CSS Variable `--game-font-scale` และคลาสบน `body` (`font-scale-normal`, `font-scale-large`, `font-scale-xlarge`)
  - รองรับทั้งกล่องบทสนทนา NPC (`dialogue-text`), ข้อสอบบอส (`quiz-question-text`), ป้ายชื่อลอย (`floating-nametag`) โดยจัดวางเลย์เอาต์ยืดหยุ่น ป้องกันตัวหนังสือล้นจอ 100%
- **3. ปรับสมดุลและปรับเนื้อหาให้ตรงกับเกาะแห่งพืชพันธุ์ (Curriculum Alignment):**
  - เกาะที่ 1 เป็น **"เกาะแห่งพืชพันธุ์" (Plants & Soil)** โดยเฉพาะ: ลบมินิเกมและคำถามเกี่ยวกับภัยแล้ง/ศัตรูพืชออกจากเกาะ 1 เพื่อไม่ให้เนื้อหาข้ามไปทับเกาะ 2 (ฤดูกาล) และเกาะ 3 (ศัตรูพืช)
  - ปรับคำถามบอส 8 ข้อให้สะท้อนความรู้จากมินิเกม 3 ด่าน (การงอกของเมล็ดพันธุ์, แสงแดด, ดินกรดและปูนขาว/โดโลไมท์, การเตรียมดินไถดะตากดิน, ธาตุอาหาร N-P-K)
- **4. แก้ไขบั๊กทางเข้าห้องบอสสุดท้าย (Boss Room Entry Fix):**
  - แก้ไข `portal_boss` ในห้อง `white_cathedral` ให้ตรวจสอบเงื่อนไขมินิเกมครบทั้ง 3 ด่าน และเรียก `startBossBattle()` ได้อย่างสมบูรณ์
- **5. ระบบคะแนนต่อสู้บอสและแสดงผลในหน้าโปรไฟล์ (Boss Scoring & Profile Progress):**
  - การตอบคำถามบอสถูกแต่ละข้อจะได้รับคะแนนตามคอมโบ (100 แต้ม x Combo)
  - เมื่อพิชิตบอส คะแนนรวมจะถูกบันทึกลงฐานข้อมูล PostgreSQL ผ่าน `/api/scores` พร้อมชื่อผู้เล่น และถ้วยรางวัล "พิทักษ์พืชพันธุ์"
  - อัปเดต `/api/me` และ `/profile` ให้ดึงคะแนนและประวัติการเล่นจริง แสดงสถานะ "เกาะที่ 1: พืชพันธุ์และดิน - ผ่านแล้ว 🎉", คะแนนบอส, และถ้วยรางวัล
- **Backup Snapshot:** `_backup/versions/v1.7.0-presentation-feedback-overhaul/`

---

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
