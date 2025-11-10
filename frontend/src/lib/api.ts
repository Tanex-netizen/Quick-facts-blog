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

export async function createPost(payload: CreatePostPayload): Promise<Post> {
  const response = await client.post<Post>("/api/posts", payload);
  return response.data;
}

export async function fetchAllPosts(params?: {
  category?: string;
  status?: "published" | "scheduled";
}): Promise<Post[]> {
  const response = await client.get<Post[]>("/api/posts", { params });
  return response.data;
}

export async function fetchPostById(id: string): Promise<Post> {
  const response = await client.get<Post>(`/api/posts/${id}`);
  return response.data;
}

export async function fetchPostsByCategory(category: string): Promise<Post[]> {
  const response = await client.get<Post[]>(`/api/posts/category/${category}`);
  return response.data;
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
  const response = await client.put<Post>(`/api/posts/${id}`, payload);
  return response.data;
}

export async function deletePost(id: string): Promise<void> {
  await client.delete(`/api/posts/${id}`);
}
