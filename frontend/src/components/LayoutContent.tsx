"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  if (isAdminPage) {
    // Admin page without header/footer
    return <main className="min-h-screen">{children}</main>;
  }

  // Regular pages with header/footer
  return (
    <>
      <Header />
      
      {/* Spacer for fixed header */}
      <div className="h-[72px] md:h-[80px]"></div>
      
      {/* Header Ad Banner - Desktop (728x90 Leaderboard) */}
      <div className="hidden md:block bg-surface-muted border-b border-brand/5">
        <div className="max-w-[var(--app-max-width)] mx-auto px-4 py-3 flex items-center justify-center">
          <AdBanner slot="1234567890" format="auto" className="text-center" />
        </div>
      </div>
      
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
