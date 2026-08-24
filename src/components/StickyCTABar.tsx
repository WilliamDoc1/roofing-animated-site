'use client';

import React, { useState, useEffect } from 'react';
import { PhoneCall, MessageCircle, Calendar } from 'lucide-react';

const PHONE_DISPLAY = '082 503 5394';
const PHONE_TEL_HREF = 'tel:+27825035394';
const WHATSAPP_HREF = `https://wa.me/27825035394?text=${encodeURIComponent(
  "Hi, I'd like a free roofing inspection quote."
)}`;

export default function StickyCTABar({ onOpenQuote }: { onOpenQuote?: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 lg:inset-x-0 lg:bottom-6 z-50 flex justify-center animate-in slide-in-from-bottom duration-300 pointer-events-none">
      <div className="glass-panel-navy w-full lg:w-auto p-3 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-3 pointer-events-auto">
        <a
          href={PHONE_TEL_HREF}
          className="flex-1 lg:flex-none lg:px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs flex items-center justify-center space-x-2 active:scale-95 hover:bg-white/20 transition-all"
        >
          <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="hidden sm:inline">Call {PHONE_DISPLAY}</span>
          <span className="sm:hidden">Call</span>
        </a>

        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 lg:flex-none lg:px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs flex items-center justify-center space-x-2 active:scale-95 hover:bg-white/20 transition-all"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onOpenQuote}
          className="flex-1 lg:flex-none lg:px-6 py-3 rounded-xl bg-[#0F2C59] border border-amber-400/40 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg active:scale-95 hover:bg-[#1E3E62] transition-all"
        >
          <Calendar className="w-4 h-4 text-amber-300 shrink-0" />
          <span className="hidden sm:inline">Get Free Quote</span>
          <span className="sm:hidden">Quote</span>
        </button>
      </div>
    </div>
  );
}
