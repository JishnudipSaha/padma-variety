"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { showToast } from "@/components/ui/Toast";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1000));
    showToast("success", "Message sent successfully! We will get back to you soon.");
    setForm({ name: "", email: "", phone: "", message: "" });
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-cream">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h1 className="font-[family-name:var(--font-sans)] text-4xl md:text-5xl font-bold text-dark-brown mb-4">
                Get In Touch
              </h1>
              <div className="w-20 h-1 bg-gradient-rose mx-auto rounded-full mb-6" />
              <p className="text-lg text-dark-brown/70">
                We&apos;d love to hear from you. Reach out to us anytime.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Contact Form */}
              <ScrollReveal>
                <div className="bg-white rounded-2xl p-8 shadow-rose border border-cream-dark/50">
                  <h2 className="font-[family-name:var(--font-sans)] text-2xl font-bold text-dark-brown mb-6">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-brown mb-1.5">Your Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-white text-dark-brown placeholder:text-dark-brown/40 focus:outline-none focus:ring-2 focus:ring-rose-gold/30 focus:border-rose-gold"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-brown mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-white text-dark-brown placeholder:text-dark-brown/40 focus:outline-none focus:ring-2 focus:ring-rose-gold/30 focus:border-rose-gold"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-brown mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-white text-dark-brown placeholder:text-dark-brown/40 focus:outline-none focus:ring-2 focus:ring-rose-gold/30 focus:border-rose-gold"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-brown mb-1.5">Message</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-white text-dark-brown placeholder:text-dark-brown/40 focus:outline-none focus:ring-2 focus:ring-rose-gold/30 focus:border-rose-gold resize-y"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <Button type="submit" loading={loading} size="lg" className="w-full">
                      <Send size={16} className="mr-2" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </ScrollReveal>

              {/* Contact Info + Map */}
              <ScrollReveal delay={0.1}>
                <div className="space-y-6">
                  {/* Contact cards */}
                  <div className="bg-white rounded-2xl p-6 shadow-rose border border-cream-dark/50 space-y-4">
                    <h3 className="font-[family-name:var(--font-sans)] text-xl font-bold text-dark-brown">
                      Contact Information
                    </h3>
                    {[
                      { icon: MapPin, label: "Address", value: "PFG8+XM7, Colony more, Kol4, Nabapally, Barasat, West Bengal 700126" },
                      { icon: Phone, label: "Phone", value: "+91 98308 67228" },
                      { icon: Mail, label: "Email", value: "contact@padmastore.com" },
                      { icon: Clock, label: "Hours", value: "Mon-Sat: 10AM - 9PM | Sun: 11AM - 7PM" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-rose-gold/10 flex items-center justify-center shrink-0">
                          <item.icon size={18} className="text-rose-gold" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-dark-brown/50 uppercase tracking-wider">{item.label}</p>
                          <p className="text-sm text-dark-brown">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Map */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-rose border border-cream-dark/50">
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
