# EAR Vehicle Checker

Web App สำหรับเปรียบเทียบข้อมูลระหว่างใบ EAR และแบบฟอร์มควบคุมรถ จำนวน 3 หัวข้อ:

- CONTAINER NUMBER
- SEAL NO
- BOOKING

## รองรับไฟล์

- PDF ที่มีข้อความให้เลือกได้
- Excel `.xlsx` และ `.xls`
- CSV
- TXT

> PDF สแกนและรูปภาพยังไม่รองรับ OCR

## วิธีนำขึ้น GitHub โดยไม่ติดตั้งโปรแกรม

1. สร้าง Repository ใหม่ใน GitHub
2. ดาวน์โหลดและแตกไฟล์ ZIP นี้
3. ในหน้า Repository เลือก **Add file → Upload files**
4. ลากไฟล์และโฟลเดอร์ทั้งหมดเข้าไป
5. กด **Commit changes**

## วิธี Deploy ด้วย Vercel

1. เข้าสู่ Vercel ด้วยบัญชี GitHub
2. เลือก **Add New → Project**
3. Import Repository นี้
4. Framework จะตรวจพบเป็น Next.js อัตโนมัติ
5. กด **Deploy**
6. รอจนสถานะเป็น Ready แล้วเปิด URL ที่ Vercel สร้างให้

Vercel จะติดตั้ง dependencies และ build โปรเจกต์ให้อัตโนมัติ
ไม่ต้องติดตั้ง Node.js หรือโปรแกรมอื่นในเครื่อง

## ความเป็นส่วนตัว

การอ่านไฟล์เกิดขึ้นใน Browser ของผู้ใช้ และไม่มี API สำหรับอัปโหลดไฟล์ไปเก็บบน Server
