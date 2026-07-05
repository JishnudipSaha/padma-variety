import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductsList from "@/components/products/ProductsList";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Products | Padma Variety Stores",
  description: "Browse our collection of premium skincare, makeup, and fragrances",
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-[family-name:var(--font-sans)] text-4xl font-bold text-dark-brown">
              Our Products
            </h1>
            <p className="mt-2 text-dark-brown/60">Explore our curated collection</p>
            <div className="mt-3 w-20 h-1 bg-gradient-rose mx-auto rounded-full" />
          </div>
          <ProductsList products={products} categories={categories} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
