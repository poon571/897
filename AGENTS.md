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
- **Git Push Policy (ดันงานขึ้น GitHub เมื่อผู้ใช้สั่งเท่านั้น):**
  - ห้าม Push งานขึ้น GitHub โดยพลการโดยเด็ดขาด ให้รอคำสั่งที่ชัดเจนจากผู้ใช้ก่อนเสมอ เพื่อให้ผู้ใช้ได้ตรวจสอบความถูกต้องและทดสอบระบบก่อน เมื่อผู้ใช้สั่งให้ Push จึงดำเนินการ `git push origin master` พร้อมแสดงหลักฐาน
