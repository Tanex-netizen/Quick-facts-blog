import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Quick Facts Blog",
  description: "Learn more about Quick Facts and our mission to share fascinating insights.",
};

export default function AboutPage() {
  return (
    <div className="max-w-[var(--app-max-width)] mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-ink mb-6">
          About Quick Facts
        </h1>

        <div className="prose prose-lg max-w-none space-y-6 text-ink-lighter leading-relaxed">
          <p>
            Welcome to <strong className="text-brand">Quick Facts</strong> — your go-to source for
            bite-sized, fascinating insights across science, technology, nature, history, health,
            and beyond.
          </p>

          <p>
            Our mission is simple: to make learning effortless and enjoyable. Each post is crafted
            to deliver meaningful knowledge in a quick, digestible format that fits into your busy
            life.
          </p>

          <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">What We Cover</h2>
          <ul className="space-y-2 text-ink-lighter">
            <li>🔬 Science discoveries and breakthroughs</li>
            <li>💻 Technology trends and innovations</li>
            <li>🌿 Nature and environmental wonders</li>
            <li>📜 Historical events and figures</li>
            <li>🏃 Health and wellness tips</li>
            <li>🚀 Space exploration and astronomy</li>
          </ul>

          <h2 className="text-2xl font-heading font-bold text-ink mt-8 mb-4">Why Quick Facts?</h2>
          <p>
            In today&apos;s fast-paced world, staying informed shouldn&apos;t require hours of research.
            Quick Facts distills complex topics into clear, engaging posts that spark curiosity and
            expand your horizons — one fact at a time.
          </p>

          <p className="text-center mt-12">
            <strong className="text-brand text-lg">Stay curious. Stay informed.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
