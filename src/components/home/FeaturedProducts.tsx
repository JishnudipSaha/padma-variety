"use client";

import Link from "next/link";
import Image from "next/image";
import ScaleOnHover from "@/components/animations/ScaleOnHover";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Star } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number | null;
  category: string;
  images: string;
}

function ProductCard({ product }: { product: Product }) {
  let images: string[] = [];
  try {
    images = JSON.parse(product.images);
  } catch {}

  const hasImage = images.length > 0 && images[0];

  return (
    <ScrollReveal>
      <ScaleOnHover>
        <Link href={`/products/${product.slug}`} className="group block">
          <div className="bg-white rounded-2xl overflow-hidden shadow-rose border border-cream-dark/50 hover:shadow-rose-lg transition-shadow">
            <div className="relative aspect-square bg-cream overflow-hidden">
              {hasImage ? (
                <Image
                  src={images[0]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-rose-gold/10 to-gold/10 flex items-center justify-center">
                  <span className="text-4xl">
                    {product.category === "Skincare" && "✨"}
                    {product.category === "Makeup" && "💄"}
                    {product.category === "Fragrances" && "🌸"}
                  </span>
                </div>
              )}
              <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-rose-gold">
                {product.category}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-[family-name:var(--font-sans)] font-semibold text-dark-brown group-hover:text-rose-gold transition-colors">
                {product.name}
              </h3>
              {product.price && (
                <p className="mt-1 text-lg font-bold text-rose-gold">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              )}
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={12} className="fill-gold text-gold" />
                ))}
              </div>
            </div>
          </div>
        </Link>
      </ScaleOnHover>
    </ScrollReveal>
  );
}

export default function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-sans)] text-3xl md:text-4xl font-bold text-dark-brown">
              Featured Products
            </h2>
            <p className="mt-2 text-dark-brown/60">Handpicked favorites our customers love</p>
            <div className="mt-3 w-20 h-1 bg-gradient-rose mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-10">
            <Link href="/products">
              <button className="px-8 py-3 rounded-full border-2 border-rose-gold text-rose-gold font-medium hover:bg-rose-gold hover:text-white transition-all">
                View All Products
              </button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
