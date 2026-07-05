"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Search, Star } from "lucide-react";
import Button from "@/components/ui/Button";
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
          <h2 className="text-2xl font-bold text-dark-brown">Products</h2>
          <p className="text-sm text-dark-brown/50">{products.length} products total</p>
        </div>
        <Link href="/admin/products/new">
          <Button>
            <Plus size={16} className="mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-brown/40" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-cream-dark bg-white text-dark-brown placeholder:text-dark-brown/40 focus:outline-none focus:ring-2 focus:ring-rose-gold/30 focus:border-rose-gold"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-rose border border-cream-dark/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-cream/50 border-b border-cream-dark">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-dark-brown">Name</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-dark-brown">Category</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-dark-brown">Price</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-dark-brown">Status</th>
              <th className="text-right px-4 py-3 text-sm font-medium text-dark-brown">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-dark">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-dark-brown/50">Loading...</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-dark-brown/50">No products found</td>
              </tr>
            ) : (
              filtered.map((product) => (
                <tr key={product.id} className="hover:bg-cream/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-dark-brown">{product.name}</span>
                      {product.featured && <Star size={14} className="fill-gold text-gold" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-dark-brown/60">{product.category}</td>
                  <td className="px-4 py-3 text-sm font-medium text-rose-gold">
                    {product.price ? `₹${product.price.toLocaleString("en-IN")}` : "-"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-2 rounded-lg hover:bg-cream text-dark-brown/50 hover:text-rose-gold transition-all"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => setDeleteId(product.id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-dark-brown/50 hover:text-red-500 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete confirmation */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Product">
        <p className="text-dark-brown/70 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
