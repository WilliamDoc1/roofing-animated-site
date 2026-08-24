'use client';

import React, { useRef } from 'react';
import { Camera, ChevronRight, Award, MapPin, Layers } from 'lucide-react';
import { useScrollProgress } from '@/hooks/useScrollProgress';

interface CaseStudyStep {
  id: string;
  stage: string;
  title: string;
  desc: string;
  image: string;
  location: string;
}

const CASE_STUDY_STEPS: CaseStudyStep[] = [
  {
    id: "01",
    stage: "STAGE 1 / ARCHITECTURAL SURVEY",
    title: "Structural Assessment & Truss Load Engineering",
    desc: "Site inspection of timber truss integrity, pitch calculations, and custom structural drawings prepared for KZN building compliance.",
    image: "/commercial.jpg",
    location: "Umhlanga Ridge, KZN"
  },
  {
    id: "02",
    stage: "STAGE 2 / ERECTION",
    title: "Pre-Engineered Truss Erection & Batten Fitment",
    desc: "Precision installation of SABS-certified treated timber trusses, heavy battens, and anti-borer protective underlayment.",
    image: "/reroofing.png",
    location: "Durban Industrial Hub"
  },
  {
    id: "03",
    stage: "STAGE 3 / CLADDING",
    title: "Standing Seam Lock Metal Panel Installation",
    desc: "Concealed fastener RAL 9005 black standing seam metal panels roll-formed on-site for seamless eave-to-ridge coverage.",
    image: "/domestic.png",
    location: "Zimbali Estate, Ballito"
  },
  {
    id: "04",
    stage: "STAGE 4 / WATERPROOFING",
    title: "Parapet Flashings & Torch-On Gutter Relining",
    desc: "Heat-fused 4mm bitumous waterproofing membrane applied to all box gutters, parapets, and rooftop skylights.",
    image: "/waterproofing.png",
    location: "Sandton Commercial Park"
  },
  {
    id: "05",
    stage: "STAGE 5 / HANDOVER",
    title: "Final Quality Audit & 10-Year Warranty Certification",
    desc: "Thermal imaging leak check, site clean-up, environmental asbestos safety report, and 10-year warranty issuance.",
    image: "/industrial.png",
    location: "Gauteng Logistics Hub"
  }
];

export default function HorizontalScrubber({ onOpenQuote }: { onOpenQuote?: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(trackRef);

  const totalSteps = CASE_STUDY_STEPS.length;
  const activeStepIdx = Math.min(totalSteps - 1, Math.floor(scrollProgress * totalSteps));
  const activeStep = CASE_STUDY_STEPS[activeStepIdx];

  return (
    <div ref={trackRef} className="relative h-[250vh] w-full">
      <div className="sticky top-[95px] h-[calc(100vh-95px)] w-full overflow-hidden bg-slate-900 text-white flex flex-col justify-between p-8 md:p-12">
        {/* Header Ribbon */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-bold mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>EDITORIAL ARCHITECTURAL CASE STUDY</span>
            </div>
            <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-white">
              Flagship Project <span className="text-amber-400">Execution Timeline</span>
            </h2>
          </div>

          <div className="hidden md:flex items-center space-x-4 text-xs font-mono text-slate-400">
            <span>Scroll vertically to scrub timeline</span>
            <span className="font-bold text-amber-400">{Math.round(scrollProgress * 100)}%</span>
          </div>
        </div>

        {/* Active Stage Showcase Panel */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center z-10 my-auto">
          <div className="aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
            <img
              src={activeStep.image}
              alt={activeStep.title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <div className="flex items-center space-x-2 text-xs text-slate-300 font-mono">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{activeStep.location}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold">
              {activeStep.stage}
            </span>

            <h3 className="font-heading text-3xl md:text-4xl font-extrabold text-white leading-tight">
              {activeStep.title}
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed">
              {activeStep.desc}
            </p>

            <button
              onClick={onOpenQuote}
              className="px-6 py-3.5 rounded-xl bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition-all shadow-lg flex items-center space-x-2"
            >
              <span>Request Inspection for Similar Spec</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Timeline Progress Bar */}
        <div className="max-w-7xl mx-auto w-full z-10">
          <div className="grid grid-cols-5 gap-2 mb-2">
            {CASE_STUDY_STEPS.map((s, idx) => (
              <div
                key={s.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeStepIdx === idx ? 'bg-amber-400' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>01 / Survey</span>
            <span>02 / Trusses</span>
            <span>03 / Standing Seam</span>
            <span>04 / Waterproofing</span>
            <span>05 / Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
}
