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

const siteUrl = "https://yernur-visuals.vercel.app/";
const pageTitle = "Фотограф, видеограф и монтажёр в Алматы | Yernur Visuals";
const description =
  "Фотограф и видеограф в Алматы. Портфолио Ернура: фото автомобилей и людей, съёмка и монтаж рилсов, рекламы и подкастов. Связаться в WhatsApp или Telegram.";
const socialImage = {
  url: `${siteUrl}videos/alikh-man-trendy.jpg`,
  width: 720,
  height: 540,
  alt: "Кадр из видеопортфолио Yernur Visuals",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}#author`,
      name: "Ернур",
      alternateName: "Yernur",
      url: siteUrl,
      jobTitle: "Фотограф, видеограф и монтажёр",
      homeLocation: {
        "@type": "City",
        name: "Алматы",
        containedInPlace: { "@type": "Country", name: "Казахстан" },
      },
      telephone: "+77474547235",
      email: "yernurcontact@gmail.com",
      sameAs: ["https://www.instagram.com/ernur_shots", "https://t.me/Kaorukooo0"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      url: siteUrl,
      name: "Yernur Visuals",
      inLanguage: "ru-KZ",
      publisher: { "@id": `${siteUrl}#author` },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}#webpage`,
      url: siteUrl,
      name: pageTitle,
      description,
      inLanguage: "ru-KZ",
      isPartOf: { "@id": `${siteUrl}#website` },
      about: { "@id": `${siteUrl}#author` },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: pageTitle,
  description,
  alternates: { canonical: siteUrl },
  authors: [{ name: "Ернур", url: siteUrl }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: pageTitle,
    description,
    url: siteUrl,
    siteName: "Yernur Visuals",
    images: [socialImage],
    type: "website",
    locale: "ru_KZ",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description,
    images: [socialImage],
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
        <script
          id="scroll-restoration"
          dangerouslySetInnerHTML={{
            __html: 'if ("scrollRestoration" in history) history.scrollRestoration = "manual";',
          }}
        />
        <link rel="preconnect" href="https://lh3.googleusercontent.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <a href="#work" className="skip-link">
          Перейти к работам
        </a>
        {children}
      </body>
    </html>
  );
}
