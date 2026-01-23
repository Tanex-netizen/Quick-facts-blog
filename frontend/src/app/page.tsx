"use client";

import { Fragment, useState, useEffect } from "react";
import { fetchAllPosts } from "@/lib/api";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import AdBanner from "@/components/AdBanner";
import LoadingSpinner from "@/components/LoadingSpinner";
import type { Post } from "@/lib/types";

const POSTS_PER_PAGE = 15;

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const hasAdsenseClient = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "").startsWith("ca-pub-");
  const manualAdsEnabled = process.env.NEXT_PUBLIC_ADSENSE_MANUAL !== "false";
  const showManualAds = hasAdsenseClient && manualAdsEnabled;

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const data = await fetchAllPosts({ status: "published" });
        setPosts(data);
        setFilteredPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description?.toLowerCase().includes(query) ||
          post.category?.toLowerCase().includes(query)
      );
      setFilteredPosts(filtered);
    }
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchQuery, posts]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-[var(--app-max-width)] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* Main Content */}
        <div>
          <div className="mb-6">
            <h2 className="text-3xl font-heading font-bold text-ink mb-2">Latest Facts</h2>
            <p className="text-ink-lighter">Explore our collection of fascinating insights</p>
          </div>

          {/* Search Input */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts by title, description, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-brand/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 bg-surface text-ink"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-sm text-ink-muted mt-2">
                Found {filteredPosts.length} result{filteredPosts.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          {error && (
            <div className="card-surface p-6 bg-red-50 border-red-200 text-red-800">
              <p className="font-medium">Error loading posts</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}

          {!error && filteredPosts.length === 0 && (
            <div className="card-surface p-12 text-center">
              <p className="text-ink-muted">
                {searchQuery ? "No posts found matching your search." : "No posts available yet. Check back soon!"}
              </p>
            </div>
          )}

          <div className="space-y-6">
            {currentPosts.map((post, index) => (
              <Fragment key={post.id}>
                <PostCard post={post} priority={index === 0} />
                
                {/* Inline Ad - Desktop: every 5 posts, Mobile: every 3 posts */}
                {showManualAds && (((index + 1) % 5 === 0) || ((index + 1) % 3 === 0)) && (
                  <div
                    className={`card-surface p-4 flex items-center justify-center ${
                      (index + 1) % 5 === 0 ? "hidden lg:flex" : "lg:hidden"
                    }`}
                  >
                    <div className="w-full">
                      <p className="text-xs text-center text-ink-muted mb-2">Advertisement</p>
                      <AdBanner slot="1122334455" format="fluid" />
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg border border-brand/20 text-ink hover:bg-brand/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  disabled={page === '...'}
                  className={`min-w-[40px] px-3 py-2 rounded-lg border transition-colors ${
                    page === currentPage
                      ? 'bg-brand text-white border-brand'
                      : page === '...'
                      ? 'border-transparent cursor-default'
                      : 'border-brand/20 text-ink hover:bg-brand/10'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg border border-brand/20 text-ink hover:bg-brand/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Page info */}
          {totalPages > 1 && (
            <p className="text-center text-sm text-ink-muted mt-4">
              Page {currentPage} of {totalPages} ({filteredPosts.length} posts)
            </p>
          )}
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
}
