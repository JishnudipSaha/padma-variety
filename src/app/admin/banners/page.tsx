"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, GripVertical, Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { showToast } from "@/components/ui/Toast";

interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image: string;
  active: boolean;
  sortOrder: number;
}

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", subtitle: "", image: "" });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    const res = await fetch("/api/banners");
    const data = await res.json();
    setBanners(data);
    setLoading(false);
  };

  const openAddModal = () => {
    setEditingBanner(null);
    setForm({ title: "", subtitle: "", image: "" });
    setShowModal(true);
  };

  const openEditModal = (banner: Banner) => {
    setEditingBanner(banner);
    setForm({ title: banner.title, subtitle: banner.subtitle || "", image: banner.image });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBanner(null);
    setForm({ title: "", subtitle: "", image: "" });
  };

  const handleSave = async () => {
    if (!form.title) return;

    if (editingBanner) {
      const res = await fetch(`/api/banners/${editingBanner.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) showToast("success", "Banner updated!");
    } else {
      const res = await fetch("/api/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sortOrder: banners.length + 1 }),
      });
      if (res.ok) showToast("success", "Banner created!");
    }

    closeModal();
    fetchBanners();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/banners/${deleteId}`, { method: "DELETE" });
    showToast("success", "Banner deleted!");
    setBanners(banners.filter((b) => b.id !== deleteId));
    setDeleteId(null);
  };

  const toggleActive = async (banner: Banner) => {
    await fetch(`/api/banners/${banner.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !banner.active }),
    });
    fetchBanners();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary">Hero Banners</h2>
          <p className="text-sm text-text-muted">Manage your homepage slider</p>
        </div>
        <Button onClick={openAddModal}>
          <Plus size={16} className="mr-2" />
          Add Banner
        </Button>
      </div>

      {/* Banner list */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-8 text-text-muted">Loading...</div>
        ) : banners.length === 0 ? (
          <div className="text-center py-8 text-text-muted bg-white rounded-lg border border-border">
            No banners yet. Add your first hero banner!
          </div>
        ) : (
          banners.map((banner) => (
            <div key={banner.id} className="bg-white rounded-lg p-4 border border-border flex items-center gap-4">
              <GripVertical size={18} className="text-text-muted cursor-grab" />
              <div className="w-20 h-12 bg-bg-alt rounded flex items-center justify-center text-xs text-text-muted">
                {banner.image ? "🖼️" : "No image"}
              </div>
              <div className="flex-1">
                <p className="font-medium text-primary">{banner.title}</p>
                {banner.subtitle && <p className="text-sm text-text-muted">{banner.subtitle}</p>}
              </div>
              <button onClick={() => toggleActive(banner)} className="p-2 rounded hover:bg-bg-alt transition-colors">
                {banner.active ? <Eye size={16} className="text-green-500" /> : <EyeOff size={16} className="text-text-muted" />}
              </button>
              <button onClick={() => openEditModal(banner)} className="p-2 rounded hover:bg-bg-alt transition-colors text-text-muted hover:text-primary">
                <Edit size={16} />
              </button>
              <button onClick={() => setDeleteId(banner.id)} className="p-2 rounded hover:bg-red-50 transition-colors text-text-muted hover:text-red-500">
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={showModal} onClose={closeModal} title={editingBanner ? "Edit Banner" : "Add Banner"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">Title *</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-md border border-border bg-white text-primary focus:outline-none focus:border-primary" placeholder="Banner title" />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">Subtitle</label>
            <input type="text" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="w-full px-4 py-2.5 rounded-md border border-border bg-white text-primary focus:outline-none focus:border-primary" placeholder="Banner subtitle" />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">Image URL</label>
            <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-4 py-2.5 rounded-md border border-border bg-white text-primary focus:outline-none focus:border-primary" placeholder="/uploads/banner.jpg or URL" />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" onClick={closeModal}>Cancel</Button>
            <Button onClick={handleSave}>{editingBanner ? "Update" : "Create"}</Button>
          </div>
        </div>
      </Modal>

      {/* Delete confirmation */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Banner">
        <p className="text-text-muted mb-6">Are you sure you want to delete this banner?</p>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
