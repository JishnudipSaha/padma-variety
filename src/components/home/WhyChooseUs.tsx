"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import { Sparkles, Shield, Heart, Truck } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "Only authentic products from trusted brands reach our shelves",
  },
  {
    icon: Heart,
    title: "Expert Guidance",
    description: "Our beauty experts help you find the perfect products for your needs",
  },
  {
    icon: Shield,
    title: "Genuine Products",
    description: "100% genuine products with quality guarantee on every purchase",
  },
  {
    icon: Truck,
    title: "Wide Selection",
    description: "From skincare to fragrances, find everything in one beautiful place",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 px-4 bg-cream/50">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-sans)] text-3xl md:text-4xl font-bold text-dark-brown">
              Why Choose Us
            </h2>
            <p className="mt-2 text-dark-brown/60">Experience the difference of quality and care</p>
            <div className="mt-3 w-20 h-1 bg-gradient-rose mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-6 text-center shadow-rose border border-cream-dark/50 hover:shadow-rose-lg transition-shadow group">
                <div className="w-14 h-14 rounded-full bg-gradient-rose mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="font-[family-name:var(--font-sans)] font-semibold text-dark-brown mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-dark-brown/60 leading-relaxed">{feature.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
