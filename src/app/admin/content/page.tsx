"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import Button from "@/components/ui/Button";
import { showToast } from "@/components/ui/Toast";

interface ContentItem {
  id: string;
  key: string;
  value: string;
  type: string;
}

export default function AdminContentPage() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const res = await fetch("/api/content");
    const data = await res.json();
    setContent(data);
    setLoading(false);
  };

  const updateValue = (key: string, value: string) => {
    setContent((prev) => prev.map((c) => (c.key === key ? { ...c, value } : c)));
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    if (res.ok) {
      showToast("success", "Content saved successfully!");
    } else {
      showToast("error", "Failed to save content");
    }
    setSaving(false);
  };

  const labelMap: Record<string, string> = {
    home_hero_title: "Homepage Hero Title",
    home_hero_subtitle: "Homepage Hero Subtitle",
    home_featured_title: "Featured Products Section Title",
    home_featured_subtitle: "Featured Products Section Subtitle",
    home_why_title: "Why Choose Us Title",
    home_why_subtitle: "Why Choose Us Subtitle",
    home_reviews_title: "Reviews Section Title",
    home_reviews_subtitle: "Reviews Section Subtitle",
    home_cta_title: "Call-to-Action Title",
    home_cta_subtitle: "Call-to-Action Subtitle",
    about_page_title: "About Page Title",
    about_page_content: "About Page Content",
    contact_page_title: "Contact Page Title",
    contact_page_subtitle: "Contact Page Subtitle",
  };

  if (loading) {
    return <div className="text-center py-8 text-dark-brown/50">Loading content...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-dark-brown">Site Content</h2>
          <p className="text-sm text-dark-brown/50">Edit all the text displayed on your website</p>
        </div>
        <Button onClick={handleSave} loading={saving}>
          <Save size={16} className="mr-2" />
          Save All Changes
        </Button>
      </div>

      <div className="space-y-4">
        {content.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-5 shadow-rose border border-cream-dark/50">
            <label className="block text-sm font-semibold text-dark-brown mb-2">
              {labelMap[item.key] || item.key}
            </label>
            <p className="text-xs text-dark-brown/40 mb-2 font-mono">{item.key}</p>
            {item.value.length > 100 ? (
              <textarea
                rows={5}
                value={item.value}
                onChange={(e) => updateValue(item.key, e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-white text-dark-brown text-sm focus:outline-none focus:ring-2 focus:ring-rose-gold/30 focus:border-rose-gold resize-y"
              />
            ) : (
              <input
                type="text"
                value={item.value}
                onChange={(e) => updateValue(item.key, e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-white text-dark-brown text-sm focus:outline-none focus:ring-2 focus:ring-rose-gold/30 focus:border-rose-gold"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
