'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import StickyCTABar from '@/components/StickyCTABar';
import GalleryPlaceholder from '@/components/GalleryPlaceholder';
import { Check, ShieldCheck, ArrowRight, Building2, PhoneCall } from 'lucide-react';

export default function CommercialPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#0F2C59] selection:text-white flex flex-col">
      <Navbar onOpenQuoteModal={() => setIsQuoteOpen(true)} />

      <main className="flex-1 pt-12 pb-24">
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="glass-panel p-10 md:p-14 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
            <div className="max-w-3xl">
              <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
                Commercial & Industrial <span className="text-[#0F2C59]">Roofing Specialists</span>
              </h1>

              <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-8">
                Sample Roofing (Pty) Ltd delivers engineered commercial and industrial roofing solutions. We work on office parks, retail centers, business parks, schools, and commercial facilities with minimal disruption to daily operations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="px-8 py-4 rounded-xl bg-[#0F2C59] text-white font-bold text-sm hover:bg-[#1E3E62] transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <span>Request Commercial Inspection</span>
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

        {/* Core Capabilities */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-heading text-3xl font-extrabold text-slate-900">
                Engineered Commercial Roofing Capabilities
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed">
                Commercial properties require large-span structural roof sheets, box gutter relining, and waterproofing that withstand heavy weather while maintaining strict OHS on-site compliance.
              </p>

              <div className="space-y-3">
                {[
                  "Large-span IBR & Chromadek box profile sheet installation",
                  "Industrial waterproofing & malthoid torch-on membrane systems",
                  "Factory & warehouse roof replacement with minimal downtime",
                  "Custom metal box gutters, downpipes & parapet flashing",
                  "OHS-compliant supervised teams with public liability cover",
                  "Written 2-year workmanship guarantee on all commercial projects"
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
                id="CR-01"
                title="Commercial Office Park Structural Roof Installation"
                category="Commercial"
                location="Western Cape"
                specs="Standing Seam RAL 9005 Black Steel Panels"
                year="2026 Completed"
                aspectRatio="16/9"
                imageSrc="/real_images/commercial_real.jpg"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenQuoteModal={() => setIsQuoteOpen(true)} />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} defaultService="Commercial Roofing" />
      <StickyCTABar onOpenQuote={() => setIsQuoteOpen(true)} />
    </div>
  );
}
