'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2 } from 'lucide-react';

export default function InlineQuoteForm({ defaultService = 'Commercial Roofing' }: { defaultService?: string }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: defaultService,
    address: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    confetti({ particleCount: 100, spread: 65, origin: { y: 0.6 } });
  };

  if (formSubmitted) {
    return (
      <div className="w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-2xl text-center">
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
        <h3 className="font-heading text-lg font-extrabold text-slate-900 mb-1.5">
          Quote Request Received!
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Thank you, {leadForm.name}. Our team will contact you shortly to confirm your free inspection.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200 p-7 shadow-2xl">
      <span className="px-3 py-1 rounded-full bg-slate-100 text-[#0F2C59] text-[10px] font-mono font-bold">
        Sample Roofing Quote Request
      </span>
      <h3 className="font-heading text-xl font-extrabold text-slate-900 mt-2 mb-1">
        Request Free Inspection &amp; Quote
      </h3>
      <p className="text-[11px] text-slate-500 mb-5">
        Written guarantees. Same-day inspection dispatch.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3 text-xs">
        <input
          required
          type="text"
          placeholder="Full Name"
          value={leadForm.name}
          onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#0F2C59]"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            required
            type="tel"
            placeholder="Phone Number"
            value={leadForm.phone}
            onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#0F2C59]"
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={leadForm.email}
            onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#0F2C59]"
          />
        </div>

        <select
          value={leadForm.service}
          onChange={(e) => setLeadForm({ ...leadForm, service: e.target.value })}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#0F2C59]"
        >
          <option>Commercial Roofing</option>
          <option>Industrial Roofing</option>
          <option>Domestic &amp; Residential Roofing</option>
          <option>Complete Re-Roofing &amp; Truss Erection</option>
          <option>Flat Roof &amp; Balcony Waterproofing</option>
          <option>Licensed Asbestos Removal</option>
        </select>

        <input
          required
          type="text"
          placeholder="Property Address / Region"
          value={leadForm.address}
          onChange={(e) => setLeadForm({ ...leadForm, address: e.target.value })}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#0F2C59]"
        />

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-[#0F2C59] text-white font-bold text-sm hover:bg-[#1E3E62] active:scale-[0.98] transition-all shadow-md mt-1"
        >
          Submit Quote Request
        </button>
      </form>
    </div>
  );
}
