'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import StickyCTABar from '@/components/StickyCTABar';
import GalleryPlaceholder from '@/components/GalleryPlaceholder';
import { Check, ArrowRight, PhoneCall } from 'lucide-react';

export default function ReRoofingPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#0F2C59] selection:text-white flex flex-col">
      <Navbar onOpenQuoteModal={() => setIsQuoteOpen(true)} />

      <main className="flex-1 pt-12 pb-24">
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="glass-panel p-10 md:p-14 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
            <div className="max-w-3xl">
              <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
                Full Roof Refurbishments & <span className="text-[#0F2C59]">Upgrades</span>
              </h1>

              <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-8">
                A complete roof refurbishment by Sample Roofing extends your property's structural lifespan significantly. We replace worn sheets, treat structural rust, upgrade timber battens, and restore your building envelope to like-new condition.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="px-8 py-4 rounded-xl bg-[#0F2C59] text-white font-bold text-sm hover:bg-[#1E3E62] transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <span>Request Re-Roofing Inspection</span>
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

        {/* Refurbishment Capabilities */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-heading text-3xl font-extrabold text-slate-900">
                Complete Roof & Structural Restoration
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed">
                Rather than constant temporary patching, full re-roofing replaces deteriorated materials with long-lasting SABS-approved roofing systems.
              </p>

              <div className="space-y-3">
                {[
                  "Complete roof sheet replacement & anti-corrosion rust treatment",
                  "Fastener & protective storm cap upgrades",
                  "Fascia board, eave & timber batten refurbishment",
                  "Ceiling repair, skimming & interior/exterior painting",
                  "Ridge re-bedding & pointing for tiled roofs",
                  "Written 2-year workmanship guarantee on all refurbishments"
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
                id="RR-05"
                title="Complete Factory Roof Refurbishment & Batten Upgrade"
                category="Re-Roofing"
                location="Western Cape"
                specs="Truss Erection, Chromadek Sheeting & Battens"
                year="2026 Completed"
                aspectRatio="16/9"
                imageSrc="/real_images/reroofing_real.jpeg"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenQuoteModal={() => setIsQuoteOpen(true)} />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} defaultService="Complete Re-Roofing" />
      <StickyCTABar onOpenQuote={() => setIsQuoteOpen(true)} />
    </div>
  );
}
