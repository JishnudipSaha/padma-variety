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
        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-cream">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h1 className="font-[family-name:var(--font-sans)] text-4xl md:text-5xl font-bold text-dark-brown mb-4">
                About Padma Variety Stores
              </h1>
              <div className="w-20 h-1 bg-gradient-rose mx-auto rounded-full mb-6" />
              <p className="text-lg text-dark-brown/70 leading-relaxed">
                Your trusted destination for premium beauty and cosmetic products in the heart of Kolkata
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-rose border border-cream-dark/50">
                <h2 className="font-[family-name:var(--font-sans)] text-2xl font-bold text-dark-brown mb-4">
                  Our Story
                </h2>
                <div className="prose prose-lg text-dark-brown/70 leading-relaxed whitespace-pre-line">
                  {aboutContent?.value || "Welcome to Padma Variety Stores, your trusted destination for premium beauty and cosmetic products in the heart of Kolkata."}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 px-4 bg-cream/50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-10">
                <h2 className="font-[family-name:var(--font-sans)] text-3xl font-bold text-dark-brown">Our Values</h2>
                <div className="mt-3 w-20 h-1 bg-gradient-rose mx-auto rounded-full" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <ScrollReveal key={v.title} delay={i * 0.1}>
                  <div className="bg-white rounded-2xl p-6 text-center shadow-rose border border-cream-dark/50">
                    <div className="w-14 h-14 rounded-full bg-gradient-rose mx-auto flex items-center justify-center mb-4">
                      <v.icon size={24} className="text-white" />
                    </div>
                    <h3 className="font-[family-name:var(--font-sans)] font-semibold text-dark-brown mb-2">{v.title}</h3>
                    <p className="text-sm text-dark-brown/60">{v.description}</p>
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
