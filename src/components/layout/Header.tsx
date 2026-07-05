"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-primary text-white text-center text-xs tracking-widest uppercase py-2">
        Free Shipping on Orders Above ₹3000
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 -ml-2"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <h1 className="font-[family-name:var(--font-display)] text-xl lg:text-2xl font-medium tracking-wide">
                PADMA
              </h1>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-xs tracking-widest uppercase transition-colors hover:text-text-light",
                    pathname === link.href
                      ? "text-primary"
                      : "text-text-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:text-text-light transition-colors">
                <Search size={20} strokeWidth={1.5} />
              </button>
              <button className="p-2 hover:text-text-light transition-colors hidden sm:block">
                <User size={20} strokeWidth={1.5} />
              </button>
              <Link href="/products" className="p-2 hover:text-text-light transition-colors relative">
                <ShoppingBag size={20} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-border"
            >
              <nav className="px-4 py-4 flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "py-3 text-xs tracking-widest uppercase border-b border-border-light transition-colors",
                      pathname === link.href
                        ? "text-primary"
                        : "text-text-muted hover:text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
