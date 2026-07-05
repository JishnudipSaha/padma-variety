import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { prisma } from "@/lib/prisma";
import { Sparkles, Heart, Shield, Award } from "lucide-react";

export const metadata = {
  title: "About Us | Padma Variety Stores",
  description: "Learn about our story and mission to bring premium beauty products to Kolkata",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const aboutContent = await prisma.content.findUnique({ where: { key: "about_page_content" } });

  const values = [
    { icon: Sparkles, title: "Quality First", description: "We handpick every product to ensure only the best reaches our customers" },
    { icon: Heart, title: "Customer Care", description: "Your satisfaction is our top priority with personalized service" },
    { icon: Shield, title: "Authenticity", description: "Every product is 100% genuine with proper sourcing" },
    { icon: Award, title: "Expertise", description: "Our knowledgeable team helps you find the perfect products" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20 px-4 bg-bg-alt">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-light text-primary mb-4">
                About Padma Variety Stores
              </h1>
              <p className="text-sm text-text-muted tracking-wide">
                Your trusted destination for premium beauty and cosmetic products in the heart of Kolkata
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="border border-border p-8 md:p-12">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium text-primary mb-4">
                  Our Story
                </h2>
                <div className="text-sm text-text-light leading-relaxed whitespace-pre-line">
                  {aboutContent?.value || "Welcome to Padma Variety Stores, your trusted destination for premium beauty and cosmetic products in the heart of Kolkata."}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 px-4 bg-bg-alt">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="font-[family-name:var(--font-display)] text-3xl font-light text-primary">Our Values</h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <ScrollReveal key={v.title} delay={i * 0.1}>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-border">
                      <v.icon size={20} strokeWidth={1.5} className="text-text-muted" />
                    </div>
                    <h3 className="text-sm font-medium text-primary mb-2 uppercase tracking-wide">{v.title}</h3>
                    <p className="text-sm text-text-muted">{v.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
