import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <>
      {/* Header Banner Ad - Desktop (hidden until real AdSense credentials) */}
      {/* <div className="hidden lg:block bg-surface-muted border-b border-brand/5">
        <div className="max-w-[var(--app-max-width)] mx-auto px-4 py-2">
          <AdBanner slot="1234567890" format="auto" className="text-center" />
        </div>
      </div> */}

      <header className="fixed top-0 left-0 right-0 z-50 bg-surface backdrop-blur-md border-b border-brand/10 shadow-md">
        <div className="max-w-[var(--app-max-width)] mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
              <Image src="/logo.jpg" alt="Quick Facts" fill className="object-cover rounded-full" priority />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-heading font-bold text-brand">Quick Facts</h1>
              <p className="text-xs text-ink-muted -mt-1 hidden sm:block">Bite-sized insights</p>
            </div>
          </Link>

          <nav className="flex items-center gap-3 md:gap-6">
            <Link href="/" className="text-xs md:text-sm font-medium hover:text-brand transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-xs md:text-sm font-medium hover:text-brand transition-colors hidden sm:inline">
              About
            </Link>
            <Link href="/contact" className="text-xs md:text-sm font-medium hover:text-brand transition-colors hidden sm:inline">
              Contact
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
