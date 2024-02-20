import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from './page.module.css'
import { Footer, Header } from '../../components';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amstemar - Медицинская компания",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
        <div className={styles.wrapper}>
          <Header className={styles.header} />
          <div className={styles.body}>
            body
            {children}
          </div>
          <Footer className={styles.footer} />
        </div>
      </body>
    </html>
  );
}