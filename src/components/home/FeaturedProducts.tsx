"use client";

import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number | null;
  category: string;
  images: string;
}

export default function FeaturedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-light text-primary mb-3">
            Featured Products
          </h2>
          <p className="text-sm text-text-muted tracking-wide">
            Handpicked favorites our customers love
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => {
            let images: string[] = [];
            try { images = JSON.parse(product.images); } catch {}
            const hasImage = images.length > 0 && images[0];

            return (
              <Link key={product.id} href={`/products/${product.slug}`} className="group block">
                <div className="bg-white overflow-hidden">
                  <div className="relative aspect-[3/4] bg-bg-alt overflow-hidden">
                    {hasImage ? (
                      <Image
                        src={images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-4xl bg-bg-alt">
                        {product.category === "Skincare" && "✨"}
                        {product.category === "Makeup" && "💄"}
                        {product.category === "Fragrances" && "🌸"}
                      </div>
                    )}
                  </div>
                  <div className="pt-3 pb-1">
                    <h3 className="text-sm font-normal text-primary group-hover:text-text-light transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    {product.price && (
                      <p className="mt-1.5 text-sm font-medium text-primary">
                        Rs. {product.price.toLocaleString("en-IN")}.00
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-block px-10 py-3 border border-primary text-primary text-xs tracking-widest uppercase hover:bg-primary hover:text-white transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
