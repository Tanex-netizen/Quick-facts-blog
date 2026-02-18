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
                <strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and similar
                tracking technologies to collect information about your browsing activities and preferences.
              </li>
              <li>
                <strong>Usage Data:</strong> We collect information about how you interact with our Site,
                including time spent, pages viewed, links clicked, and search queries.
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
              4. Third-Party Vendors and Service Providers
            </h2>
            <p>
              We work with third-party vendors and service providers to help us operate our Site and serve
              advertising. These third parties may collect, use, and process your information in connection
              with the services they provide to us, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Advertising Networks:</strong> Third-party ad networks and advertisers may place cookies
                on your device to track your browsing and serve targeted advertisements.
              </li>
              <li>
                <strong>Analytics Providers:</strong> We use analytics services to understand how visitors use
                our Site. These services may collect data about your device and usage patterns.
              </li>
              <li>
                <strong>Hosting Providers:</strong> Our Site is hosted on third-party servers that may collect
                technical information about your access.
              </li>
            </ul>
            <p className="mt-4">
              We do not sell, trade, or rent your personal information to third parties for their own marketing
              purposes. However, third-party vendors may process your data according to their own privacy policies,
              which we are not responsible for. We encourage you to review the privacy policies of all third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              5. Cookies and Tracking Technologies
            </h2>
            <p>
              Quick Facts Blog uses cookies and similar tracking technologies to enhance your experience,
              analyze Site usage, and serve personalized advertising. Here's what you need to know:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>What are Cookies?</strong> Cookies are small data files stored on your device that
                help us recognize you and improve your browsing experience.
              </li>
              <li>
                <strong>Types of Cookies:</strong> We use session cookies (temporary) and persistent cookies
                (remain on your device longer) to track preferences and behavior.
              </li>
              <li>
                <strong>First-Party Cookies:</strong> Cookies we place directly on your device to remember
                your preferences and Site settings.
              </li>
              <li>
                <strong>Third-Party Cookies:</strong> Cookies placed by Google AdSense and other advertising
                partners to serve targeted ads and track conversions.
              </li>
              <li>
                <strong>Cookie Management:</strong> You can disable cookies in your browser settings, though this
                may limit Site functionality. Please note that disabling cookies may affect your experience.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              6. Google AdSense and Advertising
            </h2>
            <p>
              Quick Facts Blog uses Google AdSense for serving advertisements on our Site. Google AdSense is
              an advertising program provided by Google, Inc. that displays ads targeted to you based on your
              interests and browsing history.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Data Collection:</strong> Google collects data about your online behavior, including
                your IP address, browser type, pages visited, and search queries, to serve personalized ads.
              </li>
              <li>
                <strong>Cookies:</strong> Google uses first-party and third-party cookies to track your activity
                across multiple websites and serve relevant advertisements.
              </li>
              <li>
                <strong>Interest-Based Advertising:</strong> Your data may be used to create a profile of your
                interests for targeted advertising purposes.
              </li>
              <li>
                <strong>Opt-Out:</strong> You can opt out of Google's personalized advertising by visiting Google
                Ads Settings at{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:text-brand-dark"
                >
                  www.google.com/settings/ads
                </a>
                . You can also use the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:text-brand-dark"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
                .
              </li>
            </ul>
            <p className="mt-4">
              For more information about Google's advertising practices, please visit Google's Privacy Policy at{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:text-brand-dark"
              >
                policies.google.com/privacy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              7. Third-Party Links
            </h2>
            <p>
              Our Site may contain links to third-party websites. We are not responsible for the privacy
              practices of other sites. We encourage you to review the privacy policies of all external sites
              before providing your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              8. Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
              over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              9. Your Rights
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
              10. Changes to This Privacy Policy
            </h2>
            <p>
              Quick Facts Blog may update this Privacy Policy from time to time. We will notify you of any changes
              by updating the "Last updated" date in this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              11. Contact Us
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
