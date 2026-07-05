"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import { MapPin } from "lucide-react";

export default function MapPreview() {
  return (
    <section className="py-16 px-4 bg-cream/50">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="font-[family-name:var(--font-sans)] text-3xl md:text-4xl font-bold text-dark-brown">
              Find Us
            </h2>
            <p className="mt-2 text-dark-brown/60">Visit our store in the heart of Kolkata</p>
            <div className="mt-3 w-20 h-1 bg-gradient-rose mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-white rounded-2xl overflow-hidden shadow-rose border border-cream-dark/50">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Map */}
              <div className="md:col-span-2 h-[350px] bg-cream">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.5!2d88.3639!3d22.5852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM1JzA2LjciTiA4OMKwMjEnNTAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Store Location"
                />
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col justify-center">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-rose-gold/10 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-rose-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-brown">Our Location</h3>
                    <p className="text-sm text-dark-brown/60 mt-1">
                      PFG8+XM7, Colony more, Kol4, Nabapally, Barasat, West Bengal 700126, India
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-dark-brown">Working Hours</p>
                    <p className="text-dark-brown/60">Mon-Sat: 10:00 AM - 9:00 PM</p>
                    <p className="text-dark-brown/60">Sunday: 11:00 AM - 7:00 PM</p>
                  </div>
                  <div>
                    <p className="font-medium text-dark-brown">Phone</p>
                    <p className="text-dark-brown/60">+91 98308 67228</p>
                  </div>
                </div>

                <a
                  href="https://share.google/yvdsIml1nkDz4PF1c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-rose-gold text-white rounded-lg text-sm font-medium hover:bg-rose-gold-dark transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
