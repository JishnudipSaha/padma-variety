"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Package, Image, FileText, Settings, TrendingUp, Star } from "lucide-react";

export default function AdminDashboard() {
  const quickActions = [
    { label: "Add New Product", href: "/admin/products/new", icon: Package, color: "bg-blue-500" },
    { label: "Manage Banners", href: "/admin/banners", icon: Image, color: "bg-purple-500" },
    { label: "Edit Site Content", href: "/admin/content", icon: FileText, color: "bg-green-500" },
    { label: "Store Settings", href: "/admin/settings", icon: Settings, color: "bg-orange-500" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-dark-brown">Welcome back!</h2>
        <p className="text-dark-brown/50 mt-1">Here&apos;s what you can manage today</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="bg-white rounded-xl p-5 shadow-rose border border-cream-dark/50 hover:shadow-rose-lg transition-shadow group"
          >
            <div className="w-10 h-10 rounded-lg bg-rose-gold/10 flex items-center justify-center mb-3 group-hover:bg-rose-gold group-hover:text-white transition-all">
              <action.icon size={20} className="text-rose-gold group-hover:text-white" />
            </div>
            <h3 className="font-semibold text-dark-brown text-sm">{action.label}</h3>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-rose border border-cream-dark/50">
        <h3 className="font-[family-name:var(--font-sans)] text-lg font-bold text-dark-brown mb-4">
          Getting Started Guide
        </h3>
        <div className="space-y-3">
          {[
            { step: 1, text: "Add your products with images and descriptions" },
            { step: 2, text: "Set up hero banners for your homepage" },
            { step: 3, text: "Customize your store content and messaging" },
            { step: 4, text: "Update store settings (address, hours, contact)" },
          ].map((item) => (
            <div key={item.step} className="flex items-center gap-3 p-3 rounded-lg bg-cream/50">
              <div className="w-8 h-8 rounded-full bg-gradient-rose flex items-center justify-center text-white text-sm font-bold shrink-0">
                {item.step}
              </div>
              <p className="text-sm text-dark-brown">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
