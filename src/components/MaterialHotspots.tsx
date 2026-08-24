'use client';

import React, { useState } from 'react';
import { Layers, ShieldCheck, Check, Sparkles } from 'lucide-react';

interface HotspotNode {
  id: string;
  x: number; // percentage X position
  y: number; // percentage Y position
  title: string;
  category: string;
  description: string;
  specs: string[];
}

interface MaterialHotspotsProps {
  imageSrc: string;
  title?: string;
  hotspots?: HotspotNode[];
  onSelectSpec?: (specTitle: string) => void;
  className?: string;
}

const DEFAULT_HOTSPOTS: HotspotNode[] = [
  {
    id: "01",
    x: 35,
    y: 30,
    title: "Standing Seam Steel Cladding",
    category: "ROOF COVERING",
    description: "Architectural concealed fastener standing seam panels engineered for 100% leak-proof reliability.",
    specs: ["RAL 9005 Jet Black Matte", "0.58mm Gauge Steel", "Concealed Fastener Lock"]
  },
  {
    id: "02",
    x: 65,
    y: 45,
    title: "SABS Engineered Trusses",
    category: "STRUCTURAL FRAMING",
    description: "Pre-fabricated timber and steel I-beam roof trusses designed for high wind load compliance.",
    specs: ["SABS H3 Treated Timber", "Pre-Engineered Load Spec", "Anti-Borer Infestation Coating"]
  },
  {
    id: "03",
    x: 50,
    y: 70,
    title: "Torch-On Membrane Waterproofing",
    category: "WATERPROOFING LAYER",
    description: "4mm heat-fused bituminous membrane sealed at parapet junctions with UV reflective silver coating.",
    specs: ["4mm Torch-On Bitumen", "Silver Reflective Top Coat", "10-Year Certified Guarantee"]
  }
];

export default function MaterialHotspots({
  imageSrc,
  title = "Architectural Material & Engineering Hotspot Inspector",
  hotspots = DEFAULT_HOTSPOTS,
  onSelectSpec,
  className = ""
}: MaterialHotspotsProps) {
  const [activeHotspot, setActiveHotspot] = useState<HotspotNode>(hotspots[0]);

  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      {title && (
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0F2C59]/10 text-[#0F2C59] text-xs font-mono font-bold mb-1">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>INTERACTIVE MATERIAL INSPECTOR</span>
          </div>
          <h3 className="font-heading text-2xl font-extrabold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-600 mt-0.5">Click any pulsing node on the roof to inspect technical specifications</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Image Frame */}
        <div className="lg:col-span-2 aspect-[16/10] relative rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-slate-900">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Pulsing Hotspot Markers */}
          {hotspots.map((spot) => {
            const isActive = activeHotspot.id === spot.id;
            return (
              <button
                key={spot.id}
                onClick={() => setActiveHotspot(spot)}
                style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group/spot"
              >
                <span className={`absolute -inset-2 rounded-full animate-ping opacity-75 ${isActive ? 'bg-amber-400' : 'bg-white'}`} />
                <div
                  className={`relative w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shadow-2xl transition-all ${
                    isActive
                      ? 'bg-[#0F2C59] text-amber-400 border-2 border-amber-400 scale-125'
                      : 'bg-white text-[#0F2C59] border-2 border-[#0F2C59] hover:scale-110'
                  }`}
                >
                  {spot.id}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Spec Inspector Card */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-[#0F2C59] text-amber-400 text-[10px] font-mono font-bold uppercase tracking-widest">
                SPEC NODE #{activeHotspot.id}
              </span>
              <span className="text-[10px] font-mono font-bold text-slate-400">
                {activeHotspot.category}
              </span>
            </div>

            <h4 className="font-heading text-xl font-bold text-slate-900 mb-2">
              {activeHotspot.title}
            </h4>

            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              {activeHotspot.description}
            </p>

            <div className="space-y-2 mb-6">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Technical Highlights
              </span>
              {activeHotspot.specs.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs text-slate-800 font-semibold">
                  <Check className="w-4 h-4 text-[#0F2C59] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onSelectSpec && onSelectSpec(activeHotspot.title)}
            className="w-full py-3 rounded-xl bg-[#0F2C59] text-white font-bold text-xs hover:bg-[#1E3E62] transition-all shadow-md flex items-center justify-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Request Quote for This Spec</span>
          </button>
        </div>
      </div>
    </div>
  );
}
