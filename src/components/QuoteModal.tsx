'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle2 } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function QuoteModal({ isOpen, onClose, defaultService = 'Commercial Roofing' }: QuoteModalProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: defaultService,
    address: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {!formSubmitted ? (
          <>
            <div className="mb-6">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-[#0F2C59] text-xs font-mono font-bold">
                Sample Roofing Quote Request
              </span>
              <h3 className="font-heading text-2xl font-extrabold text-slate-900 mt-2">
                Request Free Inspection & Quote
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Written guarantees on all projects. Same-day inspection dispatch.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-800 font-bold mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. William Doherty"
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#0F2C59]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-800 font-bold mb-1">Phone Number</label>
                  <input
                    required
                    type="tel"
                    placeholder="e.g. 082 123 4567"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#0F2C59]"
                  />
                </div>
                <div>
                  <label className="block text-slate-800 font-bold mb-1">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="name@example.com"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#0F2C59]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-800 font-bold mb-1">Service Required</label>
                <select
                  value={leadForm.service}
                  onChange={(e) => setLeadForm({ ...leadForm, service: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#0F2C59]"
                >
                  <option>Commercial Roofing</option>
                  <option>Industrial Roofing</option>
                  <option>Domestic & Residential Roofing</option>
                  <option>Complete Re-Roofing & Truss Erection</option>
                  <option>Flat Roof & Balcony Waterproofing</option>
                  <option>Licensed Asbestos Removal</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-800 font-bold mb-1">Property Address / Region</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Durban, Umhlanga, Sandton, Johannesburg"
                  value={leadForm.address}
                  onChange={(e) => setLeadForm({ ...leadForm, address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#0F2C59]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#0F2C59] text-white font-bold text-sm hover:bg-[#1E3E62] active:scale-[0.98] transition-all shadow-md mt-4"
              >
                Submit Quote Request
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
            <h3 className="font-heading text-2xl font-extrabold text-slate-900 mb-2">
              Quote Request Received!
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Thank you, {leadForm.name}. Our Sample Roofing technical team for {leadForm.address} will contact you shortly to confirm your free inspection.
            </p>
            <button
              onClick={() => {
                onClose();
                setFormSubmitted(false);
              }}
              className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
