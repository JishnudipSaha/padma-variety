"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import { Star, Quote } from "lucide-react";

interface Review {
  id: string;
  authorName: string;
  rating: number;
  text: string | null;
  time: string;
}

export default function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-sans)] text-3xl md:text-4xl font-bold text-dark-brown">
              What Our Customers Say
            </h2>
            <p className="mt-2 text-dark-brown/60">Real reviews from real people</p>
            <div className="mt-3 w-20 h-1 bg-gradient-rose mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.slice(0, 4).map((review, i) => (
            <ScrollReveal key={review.id} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-6 shadow-rose border border-cream-dark/50 relative">
                <Quote size={32} className="absolute top-4 right-4 text-rose-gold/20" />

                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      size={14}
                      className={s < review.rating ? "fill-gold text-gold" : "text-cream-dark"}
                    />
                  ))}
                </div>

                {/* Review text */}
                {review.text && (
                  <p className="text-sm text-dark-brown/70 leading-relaxed mb-4 line-clamp-4">
                    &ldquo;{review.text}&rdquo;
                  </p>
                )}

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-rose flex items-center justify-center text-white font-semibold text-sm">
                    {review.authorName[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dark-brown">{review.authorName}</p>
                    <p className="text-xs text-dark-brown/40">{review.time}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
