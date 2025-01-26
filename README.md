<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>


## setup project
clone git  
node -v 23.5.0  
nest -v 10.4.9  
ติดตั้ง npm install  

## Run
สร้างไฟล์ .env  หรือ เปลียน env.example เป็น .env  ข้อมูลที่ต้องใช้อยู่ใน env.example
npm run start  
port ของ backend:3001  ต้อง 3001 เท่านั้น

## api
api login  
api สมัครสมาชิก  
api getprofile  
api แสดงกระทู้
api create กระทู้  
api update กระทู้  
api delete กระทู้  
api แสดง comment
api create comment  


## libraries หรือ packagesต่างๆที่ใช้
mongoose : ใช้ในการสร้าง schema database mongo  
jwt : ใช้การในสร้าง token เพื่อส่งกลับไปยังหน้าบ้าน  
dotenv : ใช้เรียก file .env  
bcrypt : ใช้ในการ has รหัสผ่าน
cookie-parser : เพื่อความปลดภัย และ เมือรับ request จากหน้าบ้าน เพราะหน้าบ้านเก็บ data userlog ไว้ใน cookie เหมือนกัน
passport: ใช้ในการยืนยันตัวตนผู้ login

## feature
สร้าง token เพื่อส่งไปยัง หน้าบ้าน  
สามารถยืนยันตัวตนเมื่อ login แล้ว   