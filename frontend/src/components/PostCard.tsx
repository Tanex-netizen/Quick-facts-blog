import Image from "next/image";
import Link from "next/link";
import { formatRelativeDate } from "@/lib/helpers";
import type { Post } from "@/lib/types";

interface PostCardProps {
  post: Post;
  priority?: boolean;
}

export default function PostCard({ post, priority = false }: PostCardProps) {
  return (
    <article className="card-surface overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-6">
        {/* Image */}
        {post.imageUrl && (
          <Link 
            href={`/post/${post.id}`} 
            className="block relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 bg-accent/20 overflow-hidden"
          >
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, 192px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        )}

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            {post.category && (
              <span className="pill">
                {post.category}
              </span>
            )}

            <Link href={`/post/${post.id}`}>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-ink group-hover:text-brand transition-colors">
                {post.title}
              </h3>
            </Link>

            {post.description && (
              <p className="text-ink-lighter text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
                {post.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 mt-4 border-t border-brand/5">
            <span className="text-xs text-ink-muted">
              {formatRelativeDate(post.publishedAt || post.createdAt)}
            </span>
            <Link
              href={`/post/${post.id}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-dark transition-colors"
            >
              Read More →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
