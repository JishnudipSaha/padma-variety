"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import { Star } from "lucide-react";

interface Review {
  id: string;
  authorName: string;
  rating: number;
  text: string | null;
  time: string;
}

export default function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-light text-primary mb-3">
              What Our Customers Say
            </h2>
            <p className="text-sm text-text-muted tracking-wide">
              Real reviews from real people
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.slice(0, 4).map((review, i) => (
            <ScrollReveal key={review.id} delay={i * 0.1}>
              <div className="p-6 border border-border">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      size={12}
                      className={s < review.rating ? "fill-accent text-accent" : "text-border"}
                    />
                  ))}
                </div>

                {review.text && (
                  <p className="text-sm text-text-light leading-relaxed mb-6 line-clamp-4">
                    &ldquo;{review.text}&rdquo;
                  </p>
                )}

                <div>
                  <p className="text-sm font-medium text-primary">{review.authorName}</p>
                  <p className="text-xs text-text-muted mt-0.5">{review.time}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
