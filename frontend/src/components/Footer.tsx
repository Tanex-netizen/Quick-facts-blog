export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-surface-muted border-t border-brand/10">
      <div className="max-w-[var(--app-max-width)] mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-ink-muted">
            &copy; {currentYear} Quick Facts Blog. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="/about"
              className="text-sm text-ink-muted hover:text-brand transition-colors"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-sm text-ink-muted hover:text-brand transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
