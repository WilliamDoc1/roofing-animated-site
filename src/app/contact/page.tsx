'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import StickyCTABar from '@/components/StickyCTABar';
import { PhoneCall, Mail, MapPin, Send, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Commercial Roofing',
    address: '',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#0F2C59] selection:text-white">
      <Navbar onOpenQuoteModal={() => setIsQuoteOpen(true)} />

      <main className="pt-12 pb-24">
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Contact <span className="text-[#0F2C59]">Sample Roofing</span>
            </h1>

            <p className="text-slate-700 text-base md:text-lg leading-relaxed">
              Have a roofing, waterproofing, or asbestos question? Schedule a free on-site property inspection with our technical team today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Details */}
            <div className="space-y-6">
              <div className="glass-panel p-8 rounded-3xl border border-slate-200">
                <div className="w-12 h-12 rounded-2xl bg-[#0F2C59] text-amber-400 flex items-center justify-center mb-6 shadow-md">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">Direct Phone</h3>
                <p className="text-xs text-slate-500 mb-4">Call our team directly for immediate assistance</p>
                <a href="tel:+27825035394" className="text-lg font-mono font-extrabold text-[#0F2C59] hover:underline">
                  082 503 5394
                </a>
              </div>

              <div className="glass-panel p-8 rounded-3xl border border-slate-200">
                <div className="w-12 h-12 rounded-2xl bg-[#0F2C59] text-amber-400 flex items-center justify-center mb-6 shadow-md">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">Email Desk</h3>
                <p className="text-xs text-slate-500 mb-4">Send scope documents or drawings</p>
                <a href="mailto:info@sampleroofing.co.za" className="text-sm font-mono font-bold text-[#0F2C59] hover:underline">
                  info@sampleroofing.co.za
                </a>
              </div>

              <div className="glass-panel p-8 rounded-3xl border border-slate-200">
                <div className="w-12 h-12 rounded-2xl bg-[#0F2C59] text-amber-400 flex items-center justify-center mb-6 shadow-md">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">Regional Operations</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  Serving Residential, Commercial & Industrial Properties Nationwide & Regionally
                </p>
              </div>
            </div>

            {/* Direct Form */}
            <div className="lg:col-span-2 glass-panel p-8 md:p-12 rounded-3xl border border-slate-200 shadow-lg">
              {sent ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-slate-900">Message Dispatched!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, {formState.name}. A Sample Roofing technical estimator will reach out to schedule your free property inspection.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="font-heading text-2xl font-extrabold text-slate-900 mb-2">
                    Schedule Free On-Site Inspection
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">
                    Complete the form below and an estimator will contact you within 2 business hours.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Smith"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-[#0F2C59]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">Contact Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="082 123 4567"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-[#0F2C59]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@company.co.za"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-[#0F2C59]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">Service Required</label>
                      <select
                        value={formState.service}
                        onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-[#0F2C59]"
                      >
                        <option value="Commercial Roofing">Commercial Roofing</option>
                        <option value="Industrial Roofing">Industrial Roofing</option>
                        <option value="Domestic Roofing">Domestic & Residential</option>
                        <option value="Waterproofing">Advanced Waterproofing</option>
                        <option value="Full Re-Roofing">Full Roof Refurbishment</option>
                        <option value="Asbestos Removal">Asbestos Roof Encapsulation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">Property Address / Suburb *</label>
                    <input
                      type="text"
                      required
                      value={formState.address}
                      onChange={(e) => setFormState({ ...formState, address: e.target.value })}
                      placeholder="e.g. 15 Main Road, Sandton / Durbanville"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-[#0F2C59]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">Project Details / Roof Type</label>
                    <textarea
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Describe the issue (e.g. leaking box gutter, complete re-roofing quote, asbestos encapsulation requirement)..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-[#0F2C59]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#0F2C59] text-white font-bold text-sm hover:bg-[#1E3E62] transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>Submit Inspection Request</span>
                  </button>
                </form>
              )}
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
