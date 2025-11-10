import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Quick Facts Blog",
  description: "Get in touch with Quick Facts for questions, suggestions, or collaboration.",
};

export default function ContactPage() {
  return (
    <div className="max-w-[var(--app-max-width)] mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-ink mb-6">
          Get in Touch
        </h1>

        <p className="text-lg text-ink-lighter mb-8">
          Have a question, suggestion, or collaboration idea? We&apos;d love to hear from you!
        </p>

        <div className="card-surface p-8 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-ink-muted uppercase tracking-wide mb-2">
              Email
            </h3>
            <a
              href="mailto:contact@quickfacts.blog"
              className="text-lg font-medium text-brand hover:text-brand-dark transition-colors"
            >
              contact@quickfacts.blog
            </a>
          </div>

          <div>
            <h3 className="text-sm font-medium text-ink-muted uppercase tracking-wide mb-2">
              Social Media
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-brand hover:text-brand-dark transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-brand hover:text-brand-dark transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-brand/10">
            <p className="text-sm text-ink-muted">
              We typically respond within 24-48 hours. Thank you for your interest in Quick Facts!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
