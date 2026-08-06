import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EAR Vehicle Checker",
  description: "ตรวจสอบ CONTAINER NUMBER, SEAL NO และ BOOKING ระหว่างเอกสาร 2 ไฟล์",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
