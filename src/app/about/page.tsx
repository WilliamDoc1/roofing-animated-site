'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import StickyCTABar from '@/components/StickyCTABar';
import { ShieldCheck, CheckCircle2, Clock, Users, Building2, ChevronRight } from 'lucide-react';

export default function AboutPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#0F2C59] selection:text-white">
      <Navbar onOpenQuoteModal={() => setIsQuoteOpen(true)} />

      <main className="pt-12 pb-24">
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              About Sample Roofing <span className="text-[#0F2C59]">(Pty) Ltd</span>
            </h1>

            <p className="text-slate-700 text-base md:text-lg leading-relaxed">
              Sample Roofing (Pty) Ltd is South Africa's trusted specialist in commercial, industrial, and residential roofing, waterproofing, and building envelope protection.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="font-heading text-3xl font-extrabold text-slate-900">
                Engineered Roof Systems Built to Withstand South Africa's Climate
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed">
                From harsh coastal winds to torrential downpours and intense sun exposure, roof structures require precision engineering and high-performance materials. At Sample Roofing, we specialize in high-durability roofing installations, complete re-roofing, concrete deck waterproofing, seamless aluminium guttering, and certified asbestos encapsulation.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Every job is supervised on-site by experienced managers, backed by written workmanship guarantees, and executed according to strict OHS and SABS compliance standards.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-2xl font-mono font-extrabold text-[#0F2C59] block">100%</span>
                  <span className="text-xs font-bold text-slate-900 block mt-1">Written Guarantee</span>
                  <span className="text-[11px] text-slate-500">Workmanship Protection</span>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-2xl font-mono font-extrabold text-[#0F2C59] block">10-Year</span>
                  <span className="text-xs font-bold text-slate-900 block mt-1">Asbestos Guarantee</span>
                  <span className="text-[11px] text-slate-500">Certified Encapsulation</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
                <img
                  src="/real_images/commercial_real.jpg"
                  alt="Sample Roofing HQ Project"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenQuoteModal={() => setIsQuoteOpen(true)} />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      <StickyCTABar onOpenQuote={() => setIsQuoteOpen(true)} />
    </div>
  );
}
