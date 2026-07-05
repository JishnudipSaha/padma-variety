"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, banners.length]);

  if (banners.length === 0) return null;

  const banner = banners[current];
  const hasImage = banner.image && !imgError[banner.id];

  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden bg-bg-alt">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
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
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-text-light" />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="max-w-lg"
              >
                <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 leading-tight">
                  {banner.title}
                </h2>
                {banner.subtitle && (
                  <p className="text-white/80 text-base md:text-lg mb-8 font-light">
                    {banner.subtitle}
                  </p>
                )}
                <Link
                  href={banner.link || "/products"}
                  className="inline-block px-10 py-3 bg-white text-primary text-xs tracking-widest uppercase hover:bg-primary hover:text-white transition-colors"
                >
                  Shop Now
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft size={28} strokeWidth={1} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 text-white/70 hover:text-white transition-colors"
          >
            <ChevronRight size={28} strokeWidth={1} />
          </button>
        </>
      )}

      {/* Dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-[2px] transition-all ${
                i === current ? "bg-white w-8" : "bg-white/40 w-4"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
