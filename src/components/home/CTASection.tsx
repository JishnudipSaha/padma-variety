"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { MapPin, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 px-4 bg-gradient-rose relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-sans)] text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Glow?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
            Visit us today and discover your perfect beauty routine. Our experts are waiting to help you find exactly what you need.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2 text-white/90">
              <MapPin size={18} />
              <span className="text-sm">Barasat, Kolkata</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/50" />
            <div className="flex items-center gap-2 text-white/90">
              <Phone size={18} />
              <span className="text-sm">+91 98308 67228</span>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Get Directions
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-rose-gold-dark">
                Browse Products
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
