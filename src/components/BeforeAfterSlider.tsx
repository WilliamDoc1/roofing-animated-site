'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "BEFORE: DILAPIDATED & LEAKING",
  afterLabel = "AFTER: STANDING SEAM STEEL (RAL 9005)",
  title = "Umhlanga Estate Renovation Transformation",
  subtitle = "Complete structural re-roofing & standing seam metal conversion",
  className = ""
}: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      {title && (
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading text-2xl font-extrabold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-600 mt-0.5">{subtitle}</p>
          </div>
        </div>
      )}

      {/* Interactive Drag Container */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchCancel={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-slate-200 shadow-lg select-none cursor-ew-resize bg-slate-900 touch-none"
      >
        {/* AFTER Image (Full background) */}
        <img
          src={afterImage}
          alt="After Renovation"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* AFTER Badge */}
        <div className="absolute top-4 right-4 z-10 bg-[#0F2C59] text-amber-400 font-mono text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md border border-white/10">
          {afterLabel}
        </div>

        {/* BEFORE Image (Clipped layer) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt="Before Renovation"
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          />

          {/* BEFORE Badge */}
          <div className="absolute top-4 left-4 z-10 bg-slate-900/90 text-white font-mono text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md border border-white/10">
            {beforeLabel}
          </div>
        </div>

        {/* Divider Handle Bar */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0F2C59] border-2 border-white text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
            <MoveHorizontal className="w-5 h-5 text-amber-400" />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-[11px] font-mono text-slate-500 px-2">
        <span>← Drag left for AFTER view</span>
        <span>Drag right for BEFORE view →</span>
      </div>
    </div>
  );
}
