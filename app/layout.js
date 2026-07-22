import { Noto_Sans_Thai, Outfit } from "next/font/google";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-noto-sans-thai",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "Harvest Frontier — เกมเรียนรู้เกษตรกรรมแห่งอนาคต",
  description: "Harvest Frontier เกมผจญภัยเรียนรู้เกษตรกรรม สนุก ท้าทาย พร้อมบอสคำถาม 3 เกาะ เรียนรู้เรื่องพืช ฤดูกาล และศัตรูพืชอย่างสนุกสนาน",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className={`${notoSansThai.variable} ${outfit.variable}`}>
        {children}
      </body>
    </html>
  );
}
