"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import Button from "@/components/ui/Button";
import { showToast } from "@/components/ui/Toast";

interface Setting {
  id: string;
  key: string;
  value: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const res = await fetch("/api/settings");
    const data = await res.json();
    setSettings(data);
    setLoading(false);
  };

  const updateValue = (key: string, value: string) => {
    setSettings((prev) => prev.map((s) => (s.key === key ? { ...s, value } : s)));
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    if (res.ok) {
      showToast("success", "Settings saved successfully!");
    } else {
      showToast("error", "Failed to save settings");
    }
    setSaving(false);
  };

  const labelMap: Record<string, string> = {
    storeName: "Store Name",
    storeTagline: "Store Tagline",
    address: "Store Address",
    phone: "Phone Number",
    email: "Email Address",
    hours: "Working Hours",
    facebook: "Facebook URL",
    instagram: "Instagram URL",
    whatsapp: "WhatsApp Number",
    aboutText: "Short About Text",
    aboutMission: "Mission Statement",
    heroTitle: "Default Hero Title",
    heroSubtitle: "Default Hero Subtitle",
  };

  if (loading) {
    return <div className="text-center py-8 text-dark-brown/50">Loading settings...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-dark-brown">Store Settings</h2>
          <p className="text-sm text-dark-brown/50">Update your store information</p>
        </div>
        <Button onClick={handleSave} loading={saving}>
          <Save size={16} className="mr-2" />
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {settings.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-5 shadow-rose border border-cream-dark/50">
            <label className="block text-sm font-semibold text-dark-brown mb-2">
              {labelMap[item.key] || item.key}
            </label>
            {item.value.length > 80 ? (
              <textarea
                rows={3}
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
