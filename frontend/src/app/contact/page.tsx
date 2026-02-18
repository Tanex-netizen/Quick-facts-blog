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
                href="https://www.facebook.com/profile.php?id=61556817221012"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:text-brand-dark transition-colors"
                aria-label="Follow us on Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
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
