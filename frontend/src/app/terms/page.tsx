import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions | Quick Facts Blog",
  description: "Terms and conditions for using Quick Facts Blog.",
};

export default function TermsPage() {
  return (
    <div className="max-w-[var(--app-max-width)] mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-ink mb-8">
          Terms and Conditions
        </h1>

        <div className="prose prose-lg max-w-none space-y-6 text-ink-lighter leading-relaxed">
          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using Quick Facts Blog ("the Service"), you accept and agree to be bound
              by the terms and provision of this agreement. If you do not agree to abide by the above,
              please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              2. Use License
            </h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or
              software) on Quick Facts Blog for personal, non-commercial transitory viewing only. This
              is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on Quick Facts Blog</li>
              <li>Remove any copyright or proprietary notation from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              <li>Violate any applicable laws or regulations related to access to or use of the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              3. Disclaimer
            </h2>
            <p>
              The materials on Quick Facts Blog are provided on an 'as is' basis. Quick Facts makes no
              warranties, expressed or implied, and hereby disclaims and negates all other warranties
              including, without limitation, implied warranties or conditions of merchantability, fitness
              for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              4. Limitations
            </h2>
            <p>
              In no event shall Quick Facts or its suppliers be liable for any damages (including, without
              limitation, damages for loss of data or profit, or due to business interruption) arising out
              of the use or inability to use the materials on Quick Facts Blog.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              5. Accuracy of Materials
            </h2>
            <p>
              The materials appearing on Quick Facts Blog could include technical, typographical, or
              photographic errors. Quick Facts does not warrant that any of the materials on its website
              are accurate, complete, or current. Quick Facts may make changes to the materials contained
              on its website at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              6. Links
            </h2>
            <p>
              Quick Facts has not reviewed all of the sites linked to its website and is not responsible
              for the contents of any such linked site. The inclusion of any link does not imply endorsement
              by Quick Facts of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              7. Modifications
            </h2>
            <p>
              Quick Facts may revise these terms of service for its website at any time without notice.
              By using this website, you are agreeing to be bound by the then current version of these
              terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              8. Governing Law
            </h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of
              the jurisdiction in which Quick Facts operates, and you irrevocably submit to the exclusive
              jurisdiction of the courts located in that location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">
              9. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms and Conditions, please{" "}
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
