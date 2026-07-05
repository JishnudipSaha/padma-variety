"use client";

import Link from "next/link";
import Image from "next/image";
import ScaleOnHover from "@/components/animations/ScaleOnHover";
import { ArrowLeft, ShoppingBag, Star } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number | null;
  category: string;
  images: string;
  description: string | null;
  inStock: boolean;
}

export default function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  let images: string[] = [];
  try {
    images = JSON.parse(product.images);
  } catch {}
  const hasImage = images.length > 0 && images[0];

  return (
    <>
      <Link href="/products" className="inline-flex items-center gap-2 text-rose-gold hover:text-rose-gold-dark mb-6 transition-colors">
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back to Products</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div className="aspect-square bg-cream rounded-2xl overflow-hidden relative">
          {hasImage ? (
            <Image
              src={images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-rose-gold/10 to-gold/10 flex items-center justify-center">
              <span className="text-8xl">
                {product.category === "Skincare" && "✨"}
                {product.category === "Makeup" && "💄"}
                {product.category === "Fragrances" && "🌸"}
              </span>
            </div>
          )}
          <div className="absolute top-4 left-4 px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-rose-gold">
            {product.category}
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="font-[family-name:var(--font-sans)] text-3xl font-bold text-dark-brown mb-2">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} className="fill-gold text-gold" />
              ))}
            </div>
            <span className="text-sm text-dark-brown/50">(5.0)</span>
          </div>

          {product.price && (
            <p className="text-3xl font-bold text-rose-gold mb-4">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
          )}

          <div className="flex items-center gap-2 mb-6">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {product.description && (
            <div className="prose prose-sm text-dark-brown/70 mb-6">
              <p className="leading-relaxed whitespace-pre-line">{product.description}</p>
            </div>
          )}

          <button className="flex items-center gap-2 px-8 py-3 bg-rose-gold text-white rounded-full font-medium hover:bg-rose-gold-dark transition-colors shadow-rose">
            <ShoppingBag size={18} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="font-[family-name:var(--font-sans)] text-2xl font-bold text-dark-brown mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => {
              let relImages: string[] = [];
              try { relImages = JSON.parse(p.images); } catch {}
              const relHasImage = relImages.length > 0 && relImages[0];
              return (
                <ScaleOnHover key={p.id}>
                  <Link href={`/products/${p.slug}`} className="group block">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-rose border border-cream-dark/50">
                      <div className="aspect-square bg-cream relative overflow-hidden">
                        {relHasImage ? (
                          <Image
                            src={relImages[0]}
                            alt={p.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="25vw"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-4xl">🛍️</div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-dark-brown group-hover:text-rose-gold transition-colors">
                          {p.name}
                        </h3>
                        {p.price && (
                          <p className="mt-1 font-bold text-rose-gold">₹{p.price.toLocaleString("en-IN")}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </ScaleOnHover>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
