import Link from "next/link";
import AdBox from "./AdBox";

const categories = [
  { name: "Science", slug: "science" },
  { name: "Technology", slug: "technology" },
  { name: "Nature", slug: "nature" },
  { name: "History", slug: "history" },
  { name: "Health", slug: "health" },
  { name: "Space", slug: "space" },
];

export default function Sidebar() {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      {/* Categories Widget */}
      <div className="card-surface p-6">
        <h3 className="text-lg font-heading font-bold text-ink mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/?category=${cat.slug}`}
                className="block py-2 px-3 rounded-lg text-sm text-ink-lighter hover:bg-brand/10 hover:text-brand transition-colors"
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Sidebar Ad Box - Desktop Only (300x250) */}
      <div className="hidden lg:block card-surface p-4">
        <p className="text-xs text-center text-ink-muted mb-3">Advertisement</p>
        <div className="flex justify-center">
          <AdBox slot="9876543210" width={300} height={250} />
        </div>
      </div>

      {/* Quick Info */}
      <div className="card-surface p-6">
        <h3 className="text-lg font-heading font-bold text-ink mb-4">About Quick Facts</h3>
        <p className="text-sm text-ink-lighter leading-relaxed">
          Discover fascinating facts across science, technology, nature, and more. Each post
          delivers bite-sized insights to expand your knowledge.
        </p>
      </div>
    </aside>
  );
}
