"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 lg:py-24 bg-primary">
      <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-light text-white mb-4">
            Ready to Glow?
          </h2>
          <p className="text-white/60 text-sm mb-8 max-w-lg mx-auto leading-relaxed">
            Visit us today and discover your perfect beauty routine. Our experts are waiting to help you find exactly what you need.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <div className="flex items-center gap-2 text-white/70">
              <MapPin size={16} strokeWidth={1.5} />
              <span className="text-xs tracking-wide">Barasat, Kolkata</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
            <div className="flex items-center gap-2 text-white/70">
              <Phone size={16} strokeWidth={1.5} />
              <span className="text-xs tracking-wide">+91 98308 67228</span>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-primary text-xs tracking-widest uppercase hover:bg-white/90 transition-colors"
            >
              Get Directions
            </Link>
            <Link
              href="/products"
              className="px-8 py-3 border border-white/30 text-white text-xs tracking-widest uppercase hover:bg-white/10 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
