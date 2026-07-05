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

export default function ProductCard({ product }: { product: Product }) {
  let images: string[] = [];
  try {
    images = JSON.parse(product.images);
  } catch {}

  const hasImage = images.length > 0 && images[0];

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="bg-white overflow-hidden">
        {/* Image */}
        <div className="relative aspect-[3/4] bg-bg-alt overflow-hidden">
          {hasImage ? (
            <Image
              src={images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-4xl bg-bg-alt">
              {product.category === "Skincare" && "✨"}
              {product.category === "Makeup" && "💄"}
              {product.category === "Fragrances" && "🌸"}
            </div>
          )}
        </div>

        {/* Info */}
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
}
