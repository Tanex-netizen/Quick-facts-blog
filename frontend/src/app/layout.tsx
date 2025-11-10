import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LayoutContent from "@/components/LayoutContent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quick Facts Blog",
  description: "Bite-sized insights across science, tech, nature, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-XXXXXXXXXXXXXXXX";
  
  return (
    <html lang="en">
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} bg-background text-ink font-sans`}>
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
