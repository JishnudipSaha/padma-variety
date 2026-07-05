"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import { showToast } from "@/components/ui/Toast";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    showToast("success", "Message sent successfully! We will get back to you soon.");
    setForm({ name: "", email: "", phone: "", message: "" });
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20 px-4 bg-bg-alt">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-light text-primary mb-4">
                Get In Touch
              </h1>
              <p className="text-sm text-text-muted tracking-wide">
                We&apos;d love to hear from you. Reach out to us anytime.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <ScrollReveal>
                <div className="border border-border p-8">
                  <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium text-primary mb-6">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">Your Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 border border-border bg-white text-primary placeholder:text-text-muted focus:outline-none focus:border-primary text-sm"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 border border-border bg-white text-primary placeholder:text-text-muted focus:outline-none focus:border-primary text-sm"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-border bg-white text-primary placeholder:text-text-muted focus:outline-none focus:border-primary text-sm"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">Message</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 border border-border bg-white text-primary placeholder:text-text-muted focus:outline-none focus:border-primary text-sm resize-y"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white text-xs tracking-widest uppercase hover:bg-primary-light transition-colors disabled:opacity-50"
                    >
                      <Send size={14} strokeWidth={1.5} />
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="space-y-6">
                  <div className="border border-border p-6 space-y-4">
                    <h3 className="text-xs tracking-widest uppercase text-text-muted">
                      Contact Information
                    </h3>
                    {[
                      { icon: MapPin, label: "Address", value: "PFG8+XM7, Colony more, Kol4, Nabapally, Barasat, West Bengal 700126" },
                      { icon: Phone, label: "Phone", value: "+91 98308 67228" },
                      { icon: Mail, label: "Email", value: "contact@padmastore.com" },
                      { icon: Clock, label: "Hours", value: "Mon-Sat: 10AM - 9PM | Sun: 11AM - 7PM" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-3">
                        <item.icon size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-text-muted" />
                        <div>
                          <p className="text-xs text-text-muted uppercase tracking-wider mb-0.5">{item.label}</p>
                          <p className="text-sm text-primary">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border border-border overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.5!2d88.3639!3d22.5852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM1JzA2LjciTiA4OMKwMjEnNTAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title="Store Location"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
