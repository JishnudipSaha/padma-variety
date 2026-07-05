"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
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
        // Success — force full page reload so server picks up the new cookie
        window.location.href = "/admin";
      }
    } catch {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-rose mx-auto flex items-center justify-center mb-4 shadow-rose-lg">
            <ShoppingBag size={28} className="text-white" />
          </div>
          <h1 className="font-[family-name:var(--font-sans)] text-2xl font-bold text-dark-brown">
            Admin Dashboard
          </h1>
          <p className="text-sm text-dark-brown/50 mt-1">Padma Variety Stores</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-rose-lg border border-cream-dark/50">
          <h2 className="text-lg font-semibold text-dark-brown mb-6">Sign in to your account</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-white text-dark-brown placeholder:text-dark-brown/40 focus:outline-none focus:ring-2 focus:ring-rose-gold/30 focus:border-rose-gold"
                placeholder="admin@padmastore.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-brown mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 rounded-lg border border-cream-dark bg-white text-dark-brown placeholder:text-dark-brown/40 focus:outline-none focus:ring-2 focus:ring-rose-gold/30 focus:border-rose-gold"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-brown/40 hover:text-dark-brown"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Sign In
            </Button>
          </form>

          <p className="mt-4 text-xs text-center text-dark-brown/40">
            Default: admin@padmastore.com / PadmaStore@2026
          </p>
        </div>
      </div>
    </div>
  );
}
