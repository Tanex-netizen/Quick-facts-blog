import axios from "axios";
import { appConfig } from "./config";

import type { Post, CreatePostPayload } from "./types";

const client = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Mock data for when backend is not available
const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Welcome to Quick Facts Blog',
    description: 'Discover bite-sized insights across science, technology, nature, history, health, and space. Configure your backend to add real posts!',
    imageUrl: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=800',
    category: 'Technology',
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    scheduledAt: null,
    status: 'published',
  },
  {
    id: '2',
    title: 'Amazing Space Facts You Need to Know',
    description: 'The universe is full of wonders. From black holes to distant galaxies, explore the mysteries of space and expand your cosmic knowledge.',
    imageUrl: 'https://images.unsplash.com/photo-1446776858070-78d87d557b9e?w=800',
    category: 'Space',
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    scheduledAt: null,
    status: 'published',
  },
  {
    id: '3',
    title: 'Essential Health Tips for Daily Life',
    description: 'Simple, science-backed health tips that can make a big difference in your daily routine. Start living healthier today!',
    imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
    category: 'Health',
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    scheduledAt: null,
    status: 'published',
  },
  {
    id: '4',
    title: 'The Wonders of Nature',
    description: 'From the depths of the ocean to the peaks of mountains, nature never ceases to amaze us with its beauty and complexity.',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    category: 'Nature',
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    scheduledAt: null,
    status: 'published',
  },
  {
    id: '5',
    title: 'Historical Moments That Changed the World',
    description: 'Journey through time and discover the pivotal moments that shaped our modern world and continue to influence us today.',
    imageUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800',
    category: 'History',
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    scheduledAt: null,
    status: 'published',
  },
  {
    id: '6',
    title: 'Breakthrough Scientific Discoveries',
    description: 'Science continues to push the boundaries of what we know. Explore the latest discoveries that are changing our understanding of the world.',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
    category: 'Science',
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    scheduledAt: null,
    status: 'published',
  },
];

export async function createPost(payload: CreatePostPayload): Promise<Post> {
  try {
    const response = await client.post<Post>("/api/posts", payload);
    return response.data;
  } catch (error) {
    console.error('Failed to create post:', error);
    throw new Error('Backend unavailable. Please configure your backend service or Supabase credentials.');
  }
}

export async function fetchAllPosts(params?: {
  category?: string;
  status?: "published" | "scheduled";
}): Promise<Post[]> {
  try {
    const response = await client.get<Post[]>("/api/posts", { params });
    return response.data;
  } catch (error) {
    // If backend is not available, return mock data
    console.warn('Backend not available, using mock data:', error instanceof Error ? error.message : 'Unknown error');
    let posts = MOCK_POSTS;
    if (params?.category) {
      posts = posts.filter(p => p.category?.toLowerCase() === params.category.toLowerCase());
    }
    return posts;
  }
}

export async function fetchPostById(id: string): Promise<Post> {
  try {
    const response = await client.get<Post>(`/api/posts/${id}`);
    return response.data;
  } catch (error) {
    // If backend is not available, return mock data
    console.warn('Backend not available, using mock data');
    const post = MOCK_POSTS.find(p => p.id === id);
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  }
}

export async function fetchPostsByCategory(category: string): Promise<Post[]> {
  try {
    const response = await client.get<Post[]>(`/api/posts/category/${category}`);
    return response.data;
  } catch (error) {
    // If backend is not available, return mock data
    console.warn('Backend not available, using mock data');
    return MOCK_POSTS.filter(p => p.category?.toLowerCase() === category.toLowerCase());
  }
}

export async function uploadImage(file: File): Promise<{ url: string; publicId: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", appConfig.cloudinary.preset);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${appConfig.cloudinary.cloudName}/image/upload`,
    formData
  );

  return {
    url: response.data.secure_url,
    publicId: response.data.public_id,
  };
}

export async function updatePost(id: string, payload: CreatePostPayload): Promise<Post> {
  try {
    const response = await client.put<Post>(`/api/posts/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Failed to update post:', error);
    throw new Error('Backend unavailable. Please configure your backend service or Supabase credentials.');
  }
}

export async function deletePost(id: string): Promise<void> {
  try {
    await client.delete(`/api/posts/${id}`);
  } catch (error) {
    console.error('Failed to delete post:', error);
    throw new Error('Backend unavailable. Please configure your backend service or Supabase credentials.');
  }
}
