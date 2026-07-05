"use client";

import { useState, useEffect } from "react";
import { Trash2, Image as ImageIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { showToast } from "@/components/ui/Toast";

export default function AdminMediaPage() {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteFile, setDeleteFile] = useState<string | null>(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await fetch("/api/upload");
      const data = await res.json();
      setFiles(data.files || []);
    } catch {
      setFiles([]);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-dark-brown">Media Library</h2>
        <p className="text-sm text-dark-brown/50">Manage uploaded images</p>
      </div>

      {loading ? (
        <div className="text-center py-8 text-dark-brown/50">Loading...</div>
      ) : files.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-cream-dark">
          <ImageIcon size={48} className="mx-auto text-dark-brown/20 mb-4" />
          <p className="text-dark-brown/50">No images uploaded yet</p>
          <p className="text-sm text-dark-brown/30 mt-1">Upload images when creating products or banners</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {files.map((file) => (
            <div key={file} className="group relative bg-white rounded-xl overflow-hidden shadow-rose border border-cream-dark/50">
              <div className="aspect-square bg-cream flex items-center justify-center">
                <img src={`/uploads/${file}`} alt={file} className="w-full h-full object-cover" />
              </div>
              <div className="p-2">
                <p className="text-xs text-dark-brown/60 truncate">{file}</p>
              </div>
              <button
                onClick={() => setDeleteFile(file)}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={!!deleteFile} onClose={() => setDeleteFile(null)} title="Delete Image">
        <p className="text-dark-brown/70 mb-6">Are you sure you want to delete this image?</p>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={() => setDeleteFile(null)}>Cancel</Button>
          <Button variant="danger" onClick={() => { showToast("success", "Image deleted"); setDeleteFile(null); }}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
