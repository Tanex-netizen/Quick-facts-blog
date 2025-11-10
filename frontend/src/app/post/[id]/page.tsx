import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchPostById, fetchAllPosts } from "@/lib/api";
import { pickNextPost, formatRelativeDate } from "@/lib/helpers";
import Sidebar from "@/components/Sidebar";
import AdBanner from "@/components/AdBanner";

export const dynamic = "force-dynamic";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const post = await fetchPostById(id);
    return {
      title: `${post.title} | Quick Facts Blog`,
      description: post.description || "Read this fascinating quick fact on our blog.",
      openGraph: {
        title: post.title,
        description: post.description || "",
        images: post.imageUrl ? [{ url: post.imageUrl }] : [],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description || "",
        images: post.imageUrl ? [post.imageUrl] : [],
      },
    };
  } catch {
    return {
      title: "Post Not Found | Quick Facts Blog",
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  let post;
  let nextPost = null;
  let error = null;

  try {
    post = await fetchPostById(id);

    const allPosts = await fetchAllPosts({ status: "published" });
    nextPost = pickNextPost(allPosts, id, 0.7);
  } catch (err) {
    error = err instanceof Error ? err.message : "Post not found";
  }

  if (error || !post) {
    notFound();
  }

  return (
    <div className="max-w-[var(--app-max-width)] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* Main Content */}
        <article className="max-w-3xl">
          {/* Hero Image */}
          {post.imageUrl && (
            <div className="relative h-96 rounded-2xl overflow-hidden mb-8 shadow-card">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          )}

        {/* Meta */}
        <div className="flex items-center gap-4 mb-6">
          {post.category && <span className="pill">{post.category}</span>}
          <span className="text-sm text-ink-muted">
            {formatRelativeDate(post.publishedAt || post.createdAt)}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-ink mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Description */}
        {post.description && (
          <div className="prose prose-lg max-w-none text-ink-lighter leading-relaxed mb-8">
            <p>{post.description}</p>
          </div>
        )}

        {/* Divider */}
        <hr className="border-brand/10 my-12" />

        {/* Bottom Ad - Responsive (All Devices) */}
        <div className="card-surface p-4 my-8">
          <p className="text-xs text-center text-ink-muted mb-3">Advertisement</p>
          <AdBanner slot="3344556677" format="auto" responsive={true} />
        </div>

        {/* Next Post CTA */}
        {nextPost && (
          <div className="card-surface p-6 mt-12">
            <h3 className="text-sm font-medium text-ink-muted mb-4">Next Post</h3>
            <Link
              href={`/post/${nextPost.id}`}
              className="block group"
            >
              <div className="flex gap-4 items-start">
                {nextPost.imageUrl && (
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={nextPost.imageUrl}
                      alt={nextPost.title}
                      fill
                      sizes="96px"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="text-lg font-heading font-bold text-ink group-hover:text-brand transition-colors line-clamp-2">
                    {nextPost.title}
                  </h4>
                  {nextPost.description && (
                    <p className="text-sm text-ink-lighter mt-1 line-clamp-2">
                      {nextPost.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-brand hover:text-brand-dark font-medium transition-colors"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to all posts
          </Link>
        </div>
      </article>

      {/* Sidebar */}
      <Sidebar />
      </div>
    </div>
  );
}
