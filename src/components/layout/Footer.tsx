"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand */}
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-xl font-medium tracking-wide mb-4">
              PADMA
            </h3>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Your trusted destination for premium beauty and cosmetic products in Kolkata.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-text-muted mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/products", label: "Shop" },
                { href: "/about", label: "About Us" },
                { href: "/reviews", label: "Reviews" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text hover:text-text-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-text-muted mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-text">
                <MapPin size={16} className="mt-0.5 shrink-0 text-text-muted" />
                <span>PFG8+XM7, Colony more, Kol4, Nabapally, Barasat, West Bengal 700126</span>
              </li>
              <li className="flex items-center gap-3 text-text">
                <Phone size={16} className="shrink-0 text-text-muted" />
                <span>+91 98308 67228</span>
              </li>
              <li className="flex items-center gap-3 text-text">
                <Mail size={16} className="shrink-0 text-text-muted" />
                <span>contact@padmastore.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-xs text-text-muted tracking-wide">
            &copy; {new Date().getFullYear()} Padma Variety Stores. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
