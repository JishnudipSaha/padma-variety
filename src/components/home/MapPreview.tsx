"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import { MapPin } from "lucide-react";

export default function MapPreview() {
  return (
    <section className="py-16 lg:py-24 bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-light text-primary mb-3">
              Find Us
            </h2>
            <p className="text-sm text-text-muted tracking-wide">
              Visit our store in the heart of Kolkata
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-white overflow-hidden border border-border">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="md:col-span-2 h-[350px] bg-bg-alt">
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

              <div className="p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-border">
                <div className="flex items-start gap-3 mb-6">
                  <MapPin size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-text-muted" />
                  <div>
                    <h3 className="text-sm font-medium text-primary mb-1">Our Location</h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      PFG8+XM7, Colony more, Kol4, Nabapally, Barasat, West Bengal 700126
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-sm mb-6">
                  <div>
                    <p className="font-medium text-primary mb-1">Working Hours</p>
                    <p className="text-text-muted">Mon-Sat: 10:00 AM - 9:00 PM</p>
                    <p className="text-text-muted">Sunday: 11:00 AM - 7:00 PM</p>
                  </div>
                  <div>
                    <p className="font-medium text-primary mb-1">Phone</p>
                    <p className="text-text-muted">+91 98308 67228</p>
                  </div>
                </div>

                <a
                  href="https://share.google/yvdsIml1nkDz4PF1c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-2.5 border border-primary text-primary text-xs tracking-widest uppercase hover:bg-primary hover:text-white transition-colors"
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
