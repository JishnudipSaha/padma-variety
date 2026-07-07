"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Search, Star } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { showToast } from "@/components/ui/Toast";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number | null;
  category: string;
  featured: boolean;
  inStock: boolean;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/products/${deleteId}`, { method: "DELETE" });
    showToast("success", "Product deleted successfully");
    setProducts(products.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-[family-name:var(--font-display)] font-medium text-primary">Products</h2>
          <p className="text-sm text-text-muted">{products.length} products total</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-xs tracking-wider uppercase hover:bg-primary-light transition-colors"
        >
          <Plus size={14} strokeWidth={1.5} />
          Add Product
        </Link>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-border bg-white text-primary placeholder:text-text-muted focus:outline-none focus:border-primary text-sm"
          />
        </div>
      </div>

      <div className="bg-white border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-bg-alt border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 text-xs text-text-muted uppercase tracking-wider">Name</th>
              <th className="text-left px-4 py-3 text-xs text-text-muted uppercase tracking-wider">Category</th>
              <th className="text-left px-4 py-3 text-xs text-text-muted uppercase tracking-wider">Price</th>
              <th className="text-left px-4 py-3 text-xs text-text-muted uppercase tracking-wider">Status</th>
              <th className="text-right px-4 py-3 text-xs text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-text-muted text-sm">Loading...</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-text-muted text-sm">No products found</td>
              </tr>
            ) : (
              filtered.map((product) => (
                <tr key={product.id} className="hover:bg-bg-alt transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-primary">{product.name}</span>
                      {product.featured && <Star size={12} className="fill-accent text-accent" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-muted">{product.category}</td>
                  <td className="px-4 py-3 text-sm font-medium text-primary">
                    {product.price ? `₹${product.price.toLocaleString("en-IN")}` : "-"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs ${product.inStock ? "text-green-600" : "text-red-500"}`}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-2 text-text-muted hover:text-primary transition-colors"
                      >
                        <Edit size={16} strokeWidth={1.5} />
                      </Link>
                      <button
                        onClick={() => setDeleteId(product.id)}
                        className="p-2 text-text-muted hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Product">
        <p className="text-text-light text-sm mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setDeleteId(null)}
            className="px-4 py-2 text-xs tracking-wider uppercase border border-border text-primary hover:bg-bg-alt transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-xs tracking-wider uppercase bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
