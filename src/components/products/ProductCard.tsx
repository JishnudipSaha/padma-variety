"use client";

import Link from "next/link";
import Image from "next/image";
import ScaleOnHover from "@/components/animations/ScaleOnHover";
import { Star } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number | null;
  category: string;
  images: string;
}

export default function ProductCard({ product }: { product: Product }) {
  let images: string[] = [];
  try {
    images = JSON.parse(product.images);
  } catch {}

  const hasImage = images.length > 0 && images[0];

  return (
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
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-5xl">
                {product.category === "Skincare" && "✨"}
                {product.category === "Makeup" && "💄"}
                {product.category === "Fragrances" && "🌸"}
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
  );
}
