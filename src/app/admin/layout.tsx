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

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-text-muted text-xs tracking-wide">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-[family-name:var(--font-display)] font-medium text-primary mb-2">Authentication Required</h2>
          <p className="text-text-muted text-sm mb-4">Please sign in to access the admin dashboard.</p>
          <a
            href="/admin/login"
            className="inline-flex items-center px-6 py-2.5 bg-primary text-white text-xs tracking-wider uppercase hover:bg-primary-light transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-alt">
      <AdminSidebar user={user} />
      <div className="ml-64 max-md:ml-0">
        <AdminHeader user={user} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
