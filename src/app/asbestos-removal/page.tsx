'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import StickyCTABar from '@/components/StickyCTABar';
import GalleryPlaceholder from '@/components/GalleryPlaceholder';
import { Check, ArrowRight, PhoneCall } from 'lucide-react';

export default function AsbestosPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#0F2C59] selection:text-white flex flex-col">
      <Navbar onOpenQuoteModal={() => setIsQuoteOpen(true)} />

      <main className="flex-1 pt-12 pb-24">
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="glass-panel p-10 md:p-14 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
            <div className="max-w-3xl">
              <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
                Asbestos Roof Refurbishments — <span className="text-[#0F2C59]">Safe & Guaranteed</span>
              </h1>

              <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-8">
                Asbestos doesn't have to mean expensive removal. Sample Roofing's certified asbestos encapsulation binds unstable fibers, eliminates health risk, and provides a 10-year written guarantee — without the downtime or cost of full removal.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="px-8 py-4 rounded-xl bg-[#0F2C59] text-white font-bold text-sm hover:bg-[#1E3E62] transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <span>Request Asbestos Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="tel:+27825035394"
                  className="px-8 py-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 font-bold text-sm hover:bg-slate-200 transition-all flex items-center justify-center space-x-2"
                >
                  <PhoneCall className="w-4 h-4 text-[#0F2C59]" />
                  <span>Call 082 503 5394</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Asbestos Encapsulation Capabilities */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-heading text-3xl font-extrabold text-slate-900">
                Certified Asbestos Encapsulation System
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed">
                Our specialized encapsulation membrane penetrates weathered asbestos sheeting, locking fibers permanently in place to eliminate environmental and health risks.
              </p>

              <div className="space-y-3">
                {[
                  "Binds & seals unstable asbestos fibers permanently",
                  "Prevents airborne fiber spread with zero health risk",
                  "No facility shutdown or costly operational downtime required",
                  "Fraction of the cost compared to complete asbestos removal",
                  "Installed by certified asbestos encapsulation specialists",
                  "Backed by a written 10-year guarantee"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-xs text-slate-800 font-semibold">
                    <div className="w-5 h-5 rounded-full bg-[#0F2C59]/10 text-[#0F2C59] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <GalleryPlaceholder
                id="AS-06"
                title="Industrial Warehouse Certified Asbestos Encapsulation"
                category="Asbestos Removal"
                location="Western Cape"
                specs="Certified Encapsulation & Over-Sheeting (10-Yr Guarantee)"
                year="2026 Completed"
                aspectRatio="16/9"
                imageSrc="/real_images/asbestos_real.jpeg"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenQuoteModal={() => setIsQuoteOpen(true)} />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} defaultService="Licensed Asbestos Removal" />
      <StickyCTABar onOpenQuote={() => setIsQuoteOpen(true)} />
    </div>
  );
}
