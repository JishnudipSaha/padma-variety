"use client";

import { useState } from "react";
import { ShoppingBag, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid email or password. Please try again.");
        setLoading(false);
      } else {
        window.location.href = "/admin";
      }
    } catch {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary mx-auto flex items-center justify-center mb-4">
            <ShoppingBag size={24} className="text-white" strokeWidth={1.5} />
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium text-primary">
            Admin Dashboard
          </h1>
          <p className="text-sm text-text-muted mt-1">Padma Variety Stores</p>
        </div>

        <div className="border border-border p-8">
          <h2 className="text-sm tracking-widest uppercase text-text-muted mb-6">Sign in to your account</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-border bg-white text-primary placeholder:text-text-muted focus:outline-none focus:border-primary text-sm"
                placeholder="admin@padmastore.com"
              />
            </div>

            <div>
              <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-10 border border-border bg-white text-primary placeholder:text-text-muted focus:outline-none focus:border-primary text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-3 bg-primary text-white text-xs tracking-widest uppercase hover:bg-primary-light transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-4 text-xs text-center text-text-muted">
            Default: admin@padmastore.com / PadmaStore@2026
          </p>
        </div>
      </div>
    </div>
  );
}
