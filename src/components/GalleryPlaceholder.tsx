'use client';

import React, { useState } from 'react';
import { Camera, Maximize2, Tag, Layers } from 'lucide-react';

interface GalleryPlaceholderProps {
  id: string;
  title: string;
  category: 'Commercial' | 'Industrial' | 'Domestic' | 'Waterproofing' | 'Re-Roofing' | 'Asbestos Removal';
  aspectRatio?: '16/9' | '4/3' | '1/1' | '21/9';
  location?: string;
  specs?: string;
  year?: string;
  imageSrc?: string;
  className?: string;
}

export default function GalleryPlaceholder({
  id,
  title,
  category,
  aspectRatio = '16/9',
  location = 'Western Cape',
  specs = 'Standing Seam Steel',
  year = '2026',
  imageSrc,
  className = ''
}: GalleryPlaceholderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const aspectClasses = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '21/9': 'aspect-[21/9]'
  }[aspectRatio];

  return (
    <div className={`flex flex-col group ${className}`}>
      {/* Architectural CAD Wireframe Image Container */}
      <div
        onClick={() => setIsModalOpen(true)}
        className={`relative w-full rounded-2xl border border-slate-200 bg-slate-100 overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#0F2C59] hover:shadow-2xl ${aspectClasses}`}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          /* Architectural Blueprint Grid Fallback */
          <div className="absolute inset-0 bg-slate-50 flex flex-col items-center justify-center p-6 transition-colors group-hover:bg-slate-100/80">
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-[#0F2C59] flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-[#0F2C59] group-hover:text-white transition-all mb-3">
              <Camera className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-900 transition-colors">
              Portfolio Image Asset #{id}
            </span>
          </div>
        )}

        {/* CAD Blueprint Wireframe Overlay on Hover (Architectural Precision Lines + Corner Crosshairs) */}
        <div className="absolute inset-0 z-10 bg-[#0F2C59]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-white/30 flex flex-col justify-between p-4">
          <div className="flex justify-between items-start text-white text-[10px] font-mono tracking-widest uppercase opacity-80">
            <span>+ CAD REF #{id}</span>
            <span>STRUCTURAL SPEC</span>
          </div>
          <div className="flex justify-between items-end text-white text-[10px] font-mono tracking-widest uppercase opacity-80">
            <span>SCALE: 1:50</span>
            <span>+ INSPECT SPEC</span>
          </div>
        </div>

        {/* Expand Icon */}
        <div className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
          <Maximize2 className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Clean External Meta Label Below Image */}
      <div className="pt-3 flex items-center justify-between">
        <div>
          <h4 className="font-heading font-bold text-sm text-slate-900 group-hover:text-[#0F2C59] transition-colors">
            {title}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            {category} · {location}
          </p>
        </div>
        <span className="text-[11px] font-bold text-[#0F2C59] bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200 shrink-0">
          {year}
        </span>
      </div>

      {/* Lightbox Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl relative">
            <div className="p-6 bg-[#0F2C59] text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-white/10 text-amber-400 flex items-center justify-center">
                  <Tag className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-amber-300 uppercase tracking-widest block font-bold">
                    PORTFOLIO SPECIFICATION · ASSET #{id}
                  </span>
                  <h3 className="font-heading text-lg font-extrabold text-white">{title}</h3>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(false);
                }}
                className="text-slate-300 hover:text-white text-xs font-bold px-3 py-1.5 rounded-lg bg-white/10"
              >
                Close ESC
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="aspect-[16/9] w-full rounded-2xl border border-slate-200 bg-slate-100 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                {imageSrc ? (
                  <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Camera className="w-10 h-10 text-[#0F2C59] mb-2" />
                    <h4 className="font-heading font-bold text-slate-900 text-sm mb-1">
                      Ready for Sample Roofing Portfolio Image
                    </h4>
                    <p className="text-xs text-slate-500">
                      Target Aspect Ratio: {aspectRatio}
                    </p>
                  </>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase">Sector</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">{category}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase">Location</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">{location}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase">Material Spec</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">{specs}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase">Warranty</span>
                  <span className="font-bold text-[#0F2C59] text-sm mt-0.5 block">10-Year Certified Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
