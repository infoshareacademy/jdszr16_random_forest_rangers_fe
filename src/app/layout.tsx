"use client";
import localFont from "next/font/local";
import "./globals.css";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/page.module.css";

const { Header } = Layout;

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const items = [
    {
      key: "/",
      label: <Link href="/">Home</Link>,
    },
    {
      key: "/aplikacja",
      label: <Link href="/aplikacja">Aplikacja</Link>,
    },
  ];

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[pathname === "/" ? "/" : pathname]}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <div className={styles.page}>{children}</div>
      </body>
    </html>
  );
}
