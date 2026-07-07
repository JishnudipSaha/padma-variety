"use client";

interface AdminHeaderProps {
  user: { name: string; email: string };
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6">
      <div>
        <h1 className="text-lg font-[family-name:var(--font-display)] font-medium text-primary">Dashboard</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-primary">{user.name}</p>
          <p className="text-xs text-text-muted">{user.email}</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm">
          {user.name[0].toUpperCase()}
        </div>
      </div>
    </header>
  );
}
