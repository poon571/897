<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Mandatory User Rules

- **Direct Execution (ลุยทันที ไม่ถามซ้ำซาก ห้ามขึ้น 4 ตัวเลือก):**
  - ห้ามใช้เครื่องมือ `ask_question` ที่เด้งหน้าต่าง 4 ตัวเลือก (Multiple-choice modal) มาให้ผู้ใช้เลือกโดยเด็ดขาด
  - เมื่อผู้ใช้แจ้งปัญหา สั่งงาน หรือบอกให้ "ลุย/ทำได้เลย" ให้สรุปสิ่งที่จะทำสั้นๆ กระชับ แล้วลงมือทำ (Execute) ทันที ห้ามหยุดรอการยืนยันซ้ำซาก
- **Versioning & Backups:**
  - ทุกครั้งที่มีการแก้ไข เปลี่ยนแปลง หรือเพิ่มฟีเจอร์ใหม่ ต้องทำเวอร์ชันและบันทึกประวัติการเปลี่ยนแปลง (Changelog / Version Backup ใน `_backup/versions/`) เสมอ เพื่อให้สามารถตรวจสอบและย้อนกลับได้อย่างปลอดภัย
- **Git Push Frequency (ดันงานขึ้น GitHub ทุกๆ 3 แชท):**
  - ดันงานขึ้น GitHub (`git push origin master`) ทุกๆ 3 ข้อความแชทของผู้ใช้ พร้อมแสดงหลักฐานการ Push ทุกครั้ง ห้ามดันก่อนหรือลืมดัน
