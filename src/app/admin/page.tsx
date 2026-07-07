"use client";

import Link from "next/link";
import { Package, Image, FileText, Settings } from "lucide-react";

export default function AdminDashboard() {
  const quickActions = [
    { label: "Add New Product", href: "/admin/products/new", icon: Package },
    { label: "Manage Banners", href: "/admin/banners", icon: Image },
    { label: "Edit Site Content", href: "/admin/content", icon: FileText },
    { label: "Store Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-[family-name:var(--font-display)] font-medium text-primary">Welcome back!</h2>
        <p className="text-text-muted text-sm mt-1">Here&apos;s what you can manage today</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="bg-white border border-border p-5 hover:border-primary transition-colors group"
          >
            <div className="w-10 h-10 border border-border flex items-center justify-center mb-3 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all">
              <action.icon size={20} strokeWidth={1.5} className="text-text-muted group-hover:text-white" />
            </div>
            <h3 className="text-sm font-medium text-primary">{action.label}</h3>
          </Link>
        ))}
      </div>

      <div className="bg-white border border-border p-6">
        <h3 className="text-xs tracking-widest uppercase text-text-muted mb-4">
          Getting Started Guide
        </h3>
        <div className="space-y-3">
          {[
            { step: 1, text: "Add your products with images and descriptions" },
            { step: 2, text: "Set up hero banners for your homepage" },
            { step: 3, text: "Customize your store content and messaging" },
            { step: 4, text: "Update store settings (address, hours, contact)" },
          ].map((item) => (
            <div key={item.step} className="flex items-center gap-3 p-3 bg-bg-alt">
              <div className="w-7 h-7 bg-primary flex items-center justify-center text-white text-xs font-medium shrink-0">
                {item.step}
              </div>
              <p className="text-sm text-primary">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
