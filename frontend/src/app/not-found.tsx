import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Quick Facts Blog",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-heading font-bold text-brand mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-ink-lighter mb-8">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white font-medium rounded-lg hover:bg-brand/90 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12a9 9 0 1 0 9-9m.464 4.95l.707-.707a1 1 0 0 0-1.414-1.414L9.172 7.172a1 1 0 0 0 0 1.414l.707.707a1 1 0 0 0 1.414-1.414L10.586 8.586z"
              />
            </svg>
            Back to Home
          </Link>

          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-brand/20 text-ink font-medium rounded-lg hover:bg-brand/5 transition-colors"
          >
            Learn About Us
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-brand/10">
          <p className="text-sm text-ink-muted mb-4">
            Still can't find what you're looking for?
          </p>
          <Link
            href="/contact"
            className="text-sm text-brand hover:text-brand-dark font-medium transition-colors"
          >
            Get in touch with us →
          </Link>
        </div>
      </div>
    </div>
  );
}
