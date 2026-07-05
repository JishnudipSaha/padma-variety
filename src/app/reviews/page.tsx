import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { prisma } from "@/lib/prisma";
import { Star, Quote } from "lucide-react";

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
        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-cream">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h1 className="font-[family-name:var(--font-sans)] text-4xl md:text-5xl font-bold text-dark-brown mb-4">
                Customer Reviews
              </h1>
              <div className="w-20 h-1 bg-gradient-rose mx-auto rounded-full mb-6" />
              <p className="text-lg text-dark-brown/70">See what our valued customers have to say</p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Rating summary */}
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-8 shadow-rose border border-cream-dark/50 mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-dark-brown">{avgRating}</p>
                    <div className="flex justify-center gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={20} className="fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="text-sm text-dark-brown/50 mt-2">{reviews.length} reviews</p>
                  </div>

                  <div className="space-y-2">
                    {ratingCounts.map((rc) => (
                      <div key={rc.rating} className="flex items-center gap-3">
                        <span className="text-sm text-dark-brown/60 w-12">{rc.rating} star</span>
                        <div className="flex-1 h-3 bg-cream rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-rose rounded-full transition-all"
                            style={{
                              width: `${reviews.length ? (rc.count / reviews.length) * 100 : 0}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-dark-brown/50 w-8 text-right">{rc.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Reviews grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, i) => (
                <ScrollReveal key={review.id} delay={i * 0.05}>
                  <div className="bg-white rounded-2xl p-6 shadow-rose border border-cream-dark/50 relative h-full">
                    <Quote size={32} className="absolute top-4 right-4 text-rose-gold/20" />

                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          size={14}
                          className={s < review.rating ? "fill-gold text-gold" : "text-cream-dark"}
                        />
                      ))}
                    </div>

                    {review.text && (
                      <p className="text-sm text-dark-brown/70 leading-relaxed mb-4">
                        &ldquo;{review.text}&rdquo;
                      </p>
                    )}

                    <div className="flex items-center gap-3 mt-auto">
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

            {reviews.length === 0 && (
              <div className="text-center py-16">
                <p className="text-dark-brown/50 text-lg">No reviews yet. Be the first to review us!</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
