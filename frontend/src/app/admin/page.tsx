"use client";

import { useState, useEffect } from "react";
import { uploadImage, createPost, fetchAllPosts, updatePost, deletePost } from "@/lib/api";
import type { Post } from "@/lib/types";
import Image from "next/image";
import AdminLogin from "@/components/AdminLogin";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already authenticated
    const authenticated = sessionStorage.getItem("adminAuthenticated");
    if (authenticated === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadPosts();
    }
  }, [isAuthenticated]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const allPosts = await fetchAllPosts({});
      setPosts(allPosts);
    } catch (error) {
      console.error("Failed to load posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setDescription(post.description || "");
    setCategory(post.category || "");
    setScheduledAt(post.scheduledAt || "");
    setImagePreview(post.imageUrl || null);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    try {
      await deletePost(id);
      setMessage({ type: "success", text: "Post deleted successfully!" });
      loadPosts();
    } catch {
      setMessage({ type: "error", text: "Failed to delete post" });
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setCategory("");
    setScheduledAt("");
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setUploading(true);

    try {
      let imageUrl = imagePreview;

      if (imageFile) {
        console.log("Uploading image to Cloudinary...");
        const { url } = await uploadImage(imageFile);
        console.log("Image uploaded successfully:", url);
        imageUrl = url;
      }

      const payload = {
        title,
        description,
        imageUrl,
        category: category || null,
        scheduledAt: scheduledAt || null,
      };

      console.log(editingId ? "Updating post..." : "Creating post with data:", payload);
      
      if (editingId) {
        await updatePost(editingId, payload);
        setMessage({ type: "success", text: "Post updated successfully!" });
      } else {
        await createPost(payload);
        setMessage({ type: "success", text: "Post created successfully!" });
      }

      resetForm();
      loadPosts();
    } catch (error: unknown) {
      console.error("Error details:", error);
      const err = error as { response?: { data?: { error?: { message?: string } | string } }; message?: string };
      console.error("Response data:", err.response?.data);
      
      let errorMessage = "Failed to create post";
      if (err.response?.data) {
        const data = err.response.data;
        if (typeof data === 'string') {
          errorMessage = data;
        } else if (typeof data === 'object' && data.error) {
          if (typeof data.error === 'string') {
            errorMessage = data.error;
          } else if (typeof data.error === 'object' && data.error.message) {
            errorMessage = data.error.message;
          }
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuthenticated");
    setIsAuthenticated(false);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="max-w-[var(--app-max-width)] mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-heading font-bold text-ink">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
          >
            Logout
          </button>
        </div>

        {message && (
          <div
            className={`card-surface p-4 mb-6 ${
              message.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="card-surface p-8 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-ink mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 border border-brand/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 bg-surface"
              placeholder="Enter post title"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-ink mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 border border-brand/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 bg-surface resize-none"
              placeholder="Enter post description"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-ink mb-2">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-brand/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 bg-surface"
            >
              <option value="">Select a category</option>
              <option value="Science">Science</option>
              <option value="Technology">Technology</option>
              <option value="Nature">Nature</option>
              <option value="History">History</option>
              <option value="Health">Health</option>
              <option value="Space">Space</option>
            </select>
          </div>

          {/* Scheduled Date */}
          <div>
            <label htmlFor="scheduledAt" className="block text-sm font-medium text-ink mb-2">
              Schedule Post (Optional)
            </label>
            <div className="relative">
              <input
                id="scheduledAt"
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                className="w-full px-4 py-3 border border-brand/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 bg-surface cursor-pointer"
                placeholder="Click to select date and time"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-ink-muted">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-ink-muted mt-2">
              📅 Click to select date & time. Leave empty to publish immediately.
            </p>
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-ink mb-2">
              Upload Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-3 border border-brand/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 bg-surface file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand/10 file:text-brand hover:file:bg-brand/20"
            />
            {imagePreview && (
              <div className="mt-4 relative h-64 rounded-lg overflow-hidden border border-brand/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={uploading || !title}
              className="flex-1 bg-brand text-white py-3 px-6 rounded-lg font-medium hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {uploading ? (editingId ? "Updating..." : "Publishing...") : (editingId ? "Update Post" : "Publish Post")}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 border border-brand/20 text-ink rounded-lg font-medium hover:bg-surface-muted transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Post History */}
        <div className="mt-12">
          <h2 className="text-2xl font-heading font-bold text-ink mb-6">Post History</h2>
          
          {loading ? (
            <LoadingSpinner />
          ) : posts.length === 0 ? (
            <div className="card-surface p-12 text-center">
              <p className="text-ink-muted">No posts yet. Create your first post above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="card-surface p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-6">
                    {/* Thumbnail */}
                    {post.imageUrl && (
                      <div className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-accent/20">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-heading font-bold text-ink mb-1 truncate">
                            {post.title}
                          </h3>
                          {post.description && (
                            <p className="text-sm text-ink-lighter line-clamp-2 mb-2">
                              {post.description}
                            </p>
                          )}
                          <div className="flex items-center gap-3 text-xs text-ink-muted">
                            {post.category && (
                              <span className="pill text-xs">{post.category}</span>
                            )}
                            <span>{post.status === "published" ? "Published" : "Scheduled"}</span>
                            <span>•</span>
                            <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "N/A"}</span>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleEdit(post)}
                            className="px-4 py-2 text-sm font-medium text-brand hover:bg-brand/10 rounded-lg transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
