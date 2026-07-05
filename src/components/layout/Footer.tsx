"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Globe, Camera } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-brown text-cream">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-[family-name:var(--font-sans)] text-xl font-bold text-white mb-3">
              Padma Variety Stores
            </h3>
            <p className="text-cream/70 text-sm leading-relaxed">
              Your trusted destination for premium beauty and cosmetic products in the heart of Kolkata.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-[family-name:var(--font-sans)] text-lg font-semibold text-white mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/products", label: "Products" },
                { href: "/about", label: "About Us" },
                { href: "/reviews", label: "Reviews" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-cream/70 hover:text-rose-gold-light transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-[family-name:var(--font-sans)] text-lg font-semibold text-white mb-3">
              Visit Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-cream/70">
                <MapPin size={16} className="mt-0.5 shrink-0 text-rose-gold-light" />
                PFG8+XM7, Colony more, Kol4, Nabapally, Barasat, West Bengal 700126
              </li>
              <li className="flex items-center gap-2 text-cream/70">
                <Phone size={16} className="shrink-0 text-rose-gold-light" />
                +91 98308 67228
              </li>
              <li className="flex items-center gap-2 text-cream/70">
                <Mail size={16} className="shrink-0 text-rose-gold-light" />
                contact@padmastore.com
              </li>
              <li className="flex items-center gap-2 text-cream/70">
                <Clock size={16} className="shrink-0 text-rose-gold-light" />
                Mon-Sat: 10AM - 9PM
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-rose-gold transition-colors">
                <Globe size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-rose-gold transition-colors">
                <Camera size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-sm text-cream/50">
          &copy; {new Date().getFullYear()} Padma Variety Stores. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
