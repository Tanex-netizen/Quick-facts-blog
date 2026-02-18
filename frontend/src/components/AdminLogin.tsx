"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Add noindex meta tag on mount
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Get credentials from environment variables
    // Fallback to hardcoded for development if env not set
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin";
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "quickfacts@12345";

    // Validate credentials
    if (email === adminEmail && password === adminPassword) {
      // Store authentication in sessionStorage (client-side only)
      sessionStorage.setItem("adminAuthenticated", "true");
      onLoginSuccess();
    } else {
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-surface rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-brand mb-2">Admin Login</h1>
          <p className="text-ink-muted">Sign in to access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
              Email / Username
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-brand/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand bg-surface text-ink"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-ink mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-brand/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand bg-surface text-ink"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand text-white py-2 px-4 rounded-md hover:bg-brand/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-brand hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
