"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Image,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/banners", label: "Banners", icon: Image },
  { href: "/admin/content", label: "Site Content", icon: FileText },
  { href: "/admin/settings", label: "Store Settings", icon: Settings },
];

interface AdminSidebarProps {
  user?: { name: string; email: string };
}

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-dark-brown text-white z-40 transition-all duration-300 flex flex-col",
        collapsed ? "w-[70px]" : "w-64"
      )}
    >
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        {!collapsed && (
          <div>
            <h2 className="font-[family-name:var(--font-sans)] font-bold text-sm">Admin Panel</h2>
            <p className="text-[10px] text-cream/50">Padma Variety Stores</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
        >
          <ChevronLeft
            size={18}
            className={cn("transition-transform", collapsed && "rotate-180")}
          />
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                isActive
                  ? "bg-rose-gold text-white"
                  : "text-cream/70 hover:bg-white/10 hover:text-white"
              )}
              title={collapsed ? link.label : undefined}
            >
              <link.icon size={18} />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-cream/70 hover:bg-white/10 hover:text-white transition-all"
          title={collapsed ? "View Site" : undefined}
        >
          <Home size={18} />
          {!collapsed && <span>View Site</span>}
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-cream/70 hover:bg-red-500/20 hover:text-red-400 transition-all"
          title={collapsed ? "Sign Out" : undefined}
        >
          <LogOut size={18} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
