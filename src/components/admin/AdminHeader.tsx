"use client";

import { useRouter } from "next/navigation";

interface AdminHeaderProps {
  user: { name: string; email: string };
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-cream-dark flex items-center justify-between px-6">
      <div>
        <h1 className="text-lg font-semibold text-dark-brown">Dashboard</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-dark-brown">{user.name}</p>
          <p className="text-xs text-dark-brown/50">{user.email}</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-rose flex items-center justify-center text-white font-semibold text-sm">
          {user.name[0].toUpperCase()}
        </div>
      </div>
    </header>
  );
}
