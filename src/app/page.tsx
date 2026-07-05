import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/home/HeroSlider";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ReviewCarousel from "@/components/home/ReviewCarousel";
import MapPreview from "@/components/home/MapPreview";
import CTASection from "@/components/home/CTASection";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [banners, featuredProducts, reviews] = await Promise.all([
    prisma.banner.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" } }),
    prisma.product.findMany({ where: { featured: true }, orderBy: { sortOrder: "asc" }, take: 6 }),
    prisma.reviewCache.findMany({ orderBy: { fetchedAt: "desc" }, take: 8 }),
  ]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSlider banners={banners} />
        <FeaturedProducts products={featuredProducts} />
        <WhyChooseUs />
        <ReviewCarousel reviews={reviews} />
        <MapPreview />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
