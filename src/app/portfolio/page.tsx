'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import StickyCTABar from '@/components/StickyCTABar';
import GalleryPlaceholder from '@/components/GalleryPlaceholder';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { ArrowRight } from 'lucide-react';

const PORTFOLIO_ASSETS = [
  {
    id: "01",
    title: "Umhlanga Ridge Commercial HQ",
    category: "Commercial" as const,
    location: "Umhlanga, KZN",
    specs: "Standing Seam RAL 9005 Black Steel",
    year: "2026 Completed",
    aspectRatio: "16/9" as const,
    imageSrc: "/real_images/commercial_real.jpg"
  },
  {
    id: "02",
    title: "Durban Logistics Industrial Facility",
    category: "Industrial" as const,
    location: "Durban South, KZN",
    specs: "Heavy Gauge Metal Over-Sheeting",
    year: "2025 Completed",
    aspectRatio: "4/3" as const,
    imageSrc: "/real_images/industrial_real.jpg"
  },
  {
    id: "03",
    title: "Zimbali Coastal Luxury Villa",
    category: "Domestic" as const,
    location: "Ballito, KZN",
    specs: "Custom Timber Trusses & Slate Roof",
    year: "2026 Completed",
    aspectRatio: "16/9" as const,
    imageSrc: "/real_images/domestic_real.jpg"
  },
  {
    id: "04",
    title: "Sandton Office Park Concrete Flat Roof",
    category: "Waterproofing" as const,
    location: "Sandton, Gauteng",
    specs: "4mm Torch-On Membrane & Silver Coat",
    year: "2025 Completed",
    aspectRatio: "4/3" as const,
    imageSrc: "/real_images/waterproofing_real.jpeg"
  },
  {
    id: "05",
    title: "Pinetown Factory Re-Roofing & Battens",
    category: "Re-Roofing" as const,
    location: "Pinetown, KZN",
    specs: "Structural Truss Erection & Chromadek",
    year: "2026 Completed",
    aspectRatio: "16/9" as const,
    imageSrc: "/real_images/reroofing_real.jpeg"
  },
  {
    id: "06",
    title: "Midrand Industrial Plant Asbestos Removal",
    category: "Asbestos Removal" as const,
    location: "Midrand, Gauteng",
    specs: "Licensed Safe Abatement & Over-Sheeting",
    year: "2026 Completed",
    aspectRatio: "16/9" as const,
    imageSrc: "/real_images/asbestos_real.jpeg"
  }
];

export default function PortfolioPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredAssets = activeCategory === 'All'
    ? PORTFOLIO_ASSETS
    : PORTFOLIO_ASSETS.filter(a => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#0F2C59] selection:text-white">
      <Navbar onOpenQuoteModal={() => setIsQuoteOpen(true)} />

      <main className="pt-12 pb-24">
        {/* Gallery Hero Banner */}
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="glass-panel p-10 md:p-14 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 text-center relative overflow-hidden">
            <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Our Architectural <span className="text-[#0F2C59]">Art Gallery</span>
            </h1>

            <p className="text-slate-700 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-8">
              Explore over a decade of structural roofing mastery across residential, commercial, and industrial sectors.
            </p>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
              {['All', 'Commercial', 'Industrial', 'Domestic', 'Waterproofing', 'Re-Roofing', 'Asbestos Removal'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                    activeCategory === cat
                      ? 'bg-[#0F2C59] text-amber-400 shadow-md scale-105'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {cat === 'All' ? 'All Portfolio Assets' : cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Pixel-Locked Before / After Renovation Drag Slider (Same Building Frame 0 vs Frame 4) */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <BeforeAfterSlider
            beforeImage="/frames/frame_000.jpg"
            afterImage="/frames/frame_004.jpg"
            beforeLabel="BEFORE: BARE STEEL TRUSSES"
            afterLabel="AFTER: SEALED STANDING SEAM ROOF"
            title="Architectural Standing Seam Roof Transformation"
            subtitle="Drag the slider below across the exact same building to reveal the complete roof installation."
          />
        </section>

        {/* Selected Projects Clean Showcase Grid */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl font-extrabold text-slate-900">
              Completed Sample Roofing Assets
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAssets.map((asset) => (
              <GalleryPlaceholder
                key={asset.id}
                id={asset.id}
                title={asset.title}
                category={asset.category}
                location={asset.location}
                specs={asset.specs}
                year={asset.year}
                aspectRatio={asset.aspectRatio}
                imageSrc={asset.imageSrc}
              />
            ))}
          </div>
        </section>

        {/* Gallery CTA Strip */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="glass-panel-navy p-10 rounded-3xl text-center relative overflow-hidden shadow-lg">
            <h2 className="font-heading text-3xl font-extrabold text-white mb-3">
              Have a Similar Roofing Project in Mind?
            </h2>
            <p className="text-slate-200 text-sm max-w-2xl mx-auto mb-8">
              Contact our technical team today for a free on-site survey and tailored quote.
            </p>
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="px-8 py-4 rounded-xl bg-amber-500 text-black font-bold text-sm hover:bg-amber-400 active:scale-[0.97] transition-all shadow-md inline-flex items-center space-x-2"
            >
              <span>Schedule Free Site Inspection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      <Footer onOpenQuoteModal={() => setIsQuoteOpen(true)} />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} defaultService="Commercial Roofing" />
      <StickyCTABar onOpenQuote={() => setIsQuoteOpen(true)} />
    </div>
  );
}
