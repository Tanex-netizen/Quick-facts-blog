export type PostStatus = "published" | "scheduled";

export interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  category: string | null;
  scheduledAt: string | null;
  publishedAt: string | null;
  createdAt: string | null;
  status: PostStatus;
}

export interface CategorySummary {
  name: string;
  count: number;
}

export interface CreatePostPayload {
  title: string;
  description: string;
  imageUrl?: string | null;
  category?: string | null;
  scheduledAt?: string | null;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}
