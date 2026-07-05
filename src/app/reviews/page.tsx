import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { prisma } from "@/lib/prisma";
import { Star } from "lucide-react";

export const metadata = {
  title: "Customer Reviews | Padma Variety Stores",
  description: "Read what our customers say about us",
};

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const reviews = await prisma.reviewCache.findMany({
    orderBy: { fetchedAt: "desc" },
  });

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  const ratingCounts = [5, 4, 3, 2, 1].map((r) => ({
    rating: r,
    count: reviews.filter((rev) => rev.rating === r).length,
  }));

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20 px-4 bg-bg-alt">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-light text-primary mb-4">
                Customer Reviews
              </h1>
              <p className="text-sm text-text-muted tracking-wide">See what our valued customers have to say</p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="border border-border p-8 mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="text-center">
                    <p className="text-5xl font-[family-name:var(--font-display)] font-light text-primary">{avgRating}</p>
                    <div className="flex justify-center gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={16} className="fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-xs text-text-muted mt-2 tracking-wide">{reviews.length} reviews</p>
                  </div>

                  <div className="space-y-2">
                    {ratingCounts.map((rc) => (
                      <div key={rc.rating} className="flex items-center gap-3">
                        <span className="text-xs text-text-muted w-12">{rc.rating} star</span>
                        <div className="flex-1 h-1.5 bg-border-light overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{
                              width: `${reviews.length ? (rc.count / reviews.length) * 100 : 0}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-text-muted w-8 text-right">{rc.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, i) => (
                <ScrollReveal key={review.id} delay={i * 0.05}>
                  <div className="border border-border p-6 h-full">
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
                      <p className="text-sm text-text-light leading-relaxed mb-6">
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

            {reviews.length === 0 && (
              <div className="text-center py-16">
                <p className="text-text-muted text-sm">No reviews yet. Be the first to review us!</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
