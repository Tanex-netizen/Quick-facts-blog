import type { Post } from "./types";

export function pickNextPost(
  allPosts: Post[],
  currentPostId: string,
  categoryBias = 0.7
): Post | null {
  const current = allPosts.find((p) => p.id === currentPostId);

  const filtered = allPosts.filter((p) => p.id !== currentPostId && p.status === "published");

  if (filtered.length === 0) {
    return null;
  }

  if (!current?.category) {
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  const sameCategoryPosts = filtered.filter((p) => p.category === current.category);
  const otherPosts = filtered.filter((p) => p.category !== current.category);

  if (sameCategoryPosts.length === 0) {
    return otherPosts[Math.floor(Math.random() * otherPosts.length)];
  }

  if (otherPosts.length === 0) {
    return sameCategoryPosts[Math.floor(Math.random() * sameCategoryPosts.length)];
  }

  const useCategory = Math.random() < categoryBias;
  const candidatePool = useCategory ? sameCategoryPosts : otherPosts;

  return candidatePool[Math.floor(Math.random() * candidatePool.length)];
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/\-+/g, "-")
    .replace(/^\-|\-$/g, "");
}

export function formatRelativeDate(isoDate: string | null): string {
  if (!isoDate) return "Date not set";

  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
