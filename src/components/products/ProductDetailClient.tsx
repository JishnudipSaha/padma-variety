"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShoppingBag } from "lucide-react";

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
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-primary">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-bg-alt overflow-hidden">
              {hasImage ? (
                <Image
                  src={images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl">
                    {product.category === "Skincare" && "✨"}
                    {product.category === "Makeup" && "💄"}
                    {product.category === "Fragrances" && "🌸"}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {images.map((img, i) => (
                  <div key={i} className="relative w-20 h-20 shrink-0 bg-bg-alt overflow-hidden">
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:py-4">
            <div className="sticky top-24">
              <h1 className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-medium text-primary mb-3">
                {product.name}
              </h1>

              {product.price && (
                <p className="text-2xl font-medium text-primary mb-4">
                  Rs. {product.price.toLocaleString("en-IN")}.00
                </p>
              )}

              <div className="flex items-center gap-2 mb-6">
                <span className={`text-xs tracking-wide uppercase ${product.inStock ? "text-green-600" : "text-red-500"}`}>
                  {product.inStock ? "Available: In stock" : "Out of Stock"}
                </span>
              </div>

              <div className="mb-6">
                <p className="text-xs text-text-muted mb-2 uppercase tracking-wide">Category: {product.category}</p>
              </div>

              {product.description && (
                <div className="mb-8">
                  <p className="text-sm text-text-light leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              <button
                className="w-full flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white text-sm tracking-wider uppercase hover:bg-primary-light transition-colors"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                Add to Bag
              </button>

              <p className="mt-4 text-center text-xs text-text-muted">
                Free Shipping over Rs. 3000
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
            <h2 className="font-[family-name:var(--font-display)] text-2xl lg:text-3xl font-medium text-center mb-10">
              Related Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {related.map((p) => {
                let relImages: string[] = [];
                try { relImages = JSON.parse(p.images); } catch {}
                const relHasImage = relImages.length > 0 && relImages[0];
                return (
                  <Link key={p.id} href={`/products/${p.slug}`} className="group block">
                    <div className="bg-white overflow-hidden">
                      <div className="relative aspect-[3/4] bg-bg-alt overflow-hidden">
                        {relHasImage ? (
                          <Image
                            src={relImages[0]}
                            alt={p.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            sizes="25vw"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-3xl">🛍️</div>
                        )}
                      </div>
                      <div className="pt-3 pb-1">
                        <h3 className="text-sm font-normal text-primary group-hover:text-text-light transition-colors line-clamp-2">
                          {p.name}
                        </h3>
                        {p.price && (
                          <p className="mt-1.5 text-sm font-medium text-primary">
                            Rs. {p.price.toLocaleString("en-IN")}.00
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
