import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yernur Visuals",
  description:
    "Портфолио фотографа, видеографа и монтажёра: рилсы, авто, портреты и коммерческие проекты.",
  openGraph: {
    title: "Yernur Visuals",
    description:
      "Фото, видео и монтаж от Ернура. Казахстан.",
    type: "website",
    locale: "ru_RU",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#10100f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://lh3.googleusercontent.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a href="#work" className="skip-link">
          Перейти к работам
        </a>
        {children}
      </body>
    </html>
  );
}
