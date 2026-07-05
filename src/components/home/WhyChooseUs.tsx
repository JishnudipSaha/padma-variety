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
    <section className="py-16 lg:py-24 bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-light text-primary mb-3">
              Why Choose Us
            </h2>
            <p className="text-sm text-text-muted tracking-wide">
              Experience the difference of quality and care
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={i * 0.1}>
              <div className="text-center group">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-border group-hover:border-primary transition-colors">
                  <feature.icon size={20} strokeWidth={1.5} className="text-text-muted group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-sm font-medium text-primary mb-2 uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">{feature.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
