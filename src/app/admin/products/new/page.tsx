"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { showToast } from "@/components/ui/Toast";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "Skincare",
    featured: false,
    inStock: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const slug = form.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-");

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        slug,
        price: form.price ? parseFloat(form.price) : null,
      }),
    });

    if (res.ok) {
      showToast("success", "Product created successfully!");
      router.push("/admin/products");
    } else {
      showToast("error", "Failed to create product");
    }
    setLoading(false);
  };

  return (
    <div>
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-primary hover:text-primary mb-6 transition-colors">
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back to Products</span>
      </Link>

      <div className="bg-white rounded-lg p-8 border border-border max-w-2xl">
        <h2 className="text-2xl font-bold text-primary mb-6">Add New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">Product Name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-md border border-border bg-white text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
              placeholder="e.g., Rose Glow Serum"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">Description</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-md border border-border bg-white text-primary placeholder:text-text-muted focus:outline-none focus:border-primary resize-y"
              placeholder="Describe the product..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Price (₹)</label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-4 py-2.5 rounded-md border border-border bg-white text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Category *</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-md border border-border bg-white text-primary focus:outline-none focus:border-primary"
              >
                <option value="Skincare">Skincare</option>
                <option value="Makeup">Makeup</option>
                <option value="Fragrances">Fragrances</option>
                <option value="Haircare">Haircare</option>
                <option value="Personal Care">Personal Care</option>
              </select>
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-primary">Featured on homepage</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.inStock}
                onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-primary">In Stock</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Link href="/admin/products">
              <Button variant="ghost" type="button">Cancel</Button>
            </Link>
            <Button type="submit" loading={loading}>
              <Save size={16} className="mr-2" />
              Create Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
