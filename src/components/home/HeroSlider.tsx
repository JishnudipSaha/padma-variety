"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image: string;
  link: string | null;
}

export default function HeroSlider({ banners }: { banners: Banner[] }) {
  const [current, setCurrent] = useState(0);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, banners.length]);

  if (banners.length === 0) return null;

  const banner = banners[current];
  const hasImage = banner.image && !imgError[banner.id];

  return (
    <div className="relative h-[60vh] min-h-[400px] overflow-hidden bg-cream">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background image */}
          {hasImage ? (
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
              onError={() => setImgError((prev) => ({ ...prev, [banner.id]: true }))}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-rose-gold via-rose-gold-dark to-dark-brown" />
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark-brown/80 via-dark-brown/40 to-transparent z-10" />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="max-w-xl"
              >
                <h2 className="font-[family-name:var(--font-sans)] text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  {banner.title}
                </h2>
                {banner.subtitle && (
                  <p className="text-cream/90 text-lg md:text-xl mb-6">
                    {banner.subtitle}
                  </p>
                )}
                <Link href={banner.link || "/products"}>
                  <Button size="lg" variant="primary">
                    Explore Collection
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-rose-gold/20 blur-3xl" />
          <div className="absolute bottom-10 right-32 w-48 h-48 rounded-full bg-gold/20 blur-3xl" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === current ? "bg-white w-8" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
