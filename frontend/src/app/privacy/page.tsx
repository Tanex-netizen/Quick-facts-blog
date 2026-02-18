import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Quick Facts Blog",
  description: "Privacy policy for Quick Facts Blog. Learn how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-[var(--app-max-width)] mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-ink mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none space-y-6 text-ink-lighter leading-relaxed">
          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              1. Introduction
            </h2>
            <p>
              Quick Facts Blog ("we," "us," "our," or "Company") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
              you visit our website https://quickfacts.blog/ (the "Site").
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              2. Information We Collect
            </h2>
            <p>We may collect information about you in a variety of ways. The information we may collect on
              the Site includes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Data:</strong> If you contact us, we may collect your name, email address,
                phone number, and any message or content you provide.
              </li>
              <li>
                <strong>Device Information:</strong> We may automatically collect information about your device
                when you access the Site, including IP address, browser type, operating system, and pages visited.
              </li>
              <li>
                <strong>Cookies:</strong> We may use cookies to enhance your experience on our Site.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              3. Use of Information
            </h2>
            <p>We use the information we collect in the following ways:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To operate and maintain our Site</li>
              <li>To improve, personalize, and expand our Site</li>
              <li>To understand and analyze how you use our Site</li>
              <li>To respond to your comments, questions, and requests</li>
              <li>To send promotional communications (if you opt-in)</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              4. Disclosure of Information
            </h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. However, we may
              disclose information when required by law or when necessary to protect the rights, privacy,
              safety, or property of Quick Facts Blog, our users, or the public.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              5. Google AdSense
            </h2>
            <p>
              Quick Facts Blog uses Google AdSense for advertising. Google AdSense uses cookies to serve ads
              based on your prior visits to our website or other websites. You may opt out of personalized
              advertising by visiting Ads Settings at{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:text-brand-dark"
              >
                www.google.com/settings/ads
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              6. Third-Party Links
            </h2>
            <p>
              Our Site may contain links to third-party websites. We are not responsible for the privacy
              practices of other sites. We encourage you to review the privacy policies of all external sites
              before providing your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              7. Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
              over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              8. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Request restrictions on processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              9. Changes to This Privacy Policy
            </h2>
            <p>
              Quick Facts Blog may update this Privacy Policy from time to time. We will notify you of any changes
              by updating the "Last updated" date in this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              10. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please{" "}
              <Link href="/contact" className="text-brand hover:text-brand-dark font-medium">
                contact us
              </Link>
              .
            </p>
          </section>

          <div className="pt-8 border-t border-brand/10 mt-12">
            <p className="text-sm text-ink-muted">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
