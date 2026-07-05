"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [isLoginPage]);

  // Login page: no admin chrome
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Checking session
  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-4 border-rose-gold border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-dark-brown/50 text-sm">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-rose-gold/10 mx-auto flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-gold"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h2 className="text-xl font-semibold text-dark-brown mb-2">Authentication Required</h2>
          <p className="text-dark-brown/50 mb-4">Please sign in to access the admin dashboard.</p>
          <a
            href="/admin/login"
            className="inline-flex items-center px-6 py-2.5 bg-rose-gold text-white rounded-lg font-medium hover:bg-rose-gold-dark transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // Authenticated
  return (
    <div className="min-h-screen bg-cream">
      <AdminSidebar user={user} />
      <div className="ml-64 max-md:ml-0">
        <AdminHeader user={user} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
