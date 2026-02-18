import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMenu}>
            <div className="relative w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
              <Image src="/logo.jpg" alt="Quick Facts" fill className="object-cover rounded-full" priority />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-heading font-bold text-brand">Quick Facts</h1>
              <p className="text-xs text-ink-muted -mt-1 hidden sm:block">Bite-sized insights</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-brand transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-brand transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-brand transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="text-sm font-medium hover:text-brand transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm font-medium hover:text-brand transition-colors">
              Terms
            </Link>
          </nav>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-brand/5 rounded-lg transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className={`block w-5 h-0.5 bg-ink transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-ink transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-ink transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="md:hidden bg-surface border-t border-brand/10 px-4 py-3 space-y-2">
            <Link
              href="/"
              className="block px-4 py-2 text-sm font-medium hover:bg-brand/10 hover:text-brand rounded-lg transition-colors"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-sm font-medium hover:bg-brand/10 hover:text-brand rounded-lg transition-colors"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 text-sm font-medium hover:bg-brand/10 hover:text-brand rounded-lg transition-colors"
              onClick={closeMenu}
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="block px-4 py-2 text-sm font-medium hover:bg-brand/10 hover:text-brand rounded-lg transition-colors"
              onClick={closeMenu}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="block px-4 py-2 text-sm font-medium hover:bg-brand/10 hover:text-brand rounded-lg transition-colors"
              onClick={closeMenu}
            >
              Terms & Conditions
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
