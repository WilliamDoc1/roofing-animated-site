'use client';

import React from 'react';
import Link from 'next/link';
import { PhoneCall, ShieldCheck, Award, MapPin, Mail } from 'lucide-react';

export default function Footer({ onOpenQuoteModal }: { onOpenQuoteModal?: () => void }) {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Col 1: Brand Info */}
        <div>
          <div className="mb-4">
            <img
              src="/logo.png"
              alt="Sample Roofing"
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Sample Roofing (Pty) Ltd is South Africa's premier roofing, waterproofing, and building envelope specialist. Over a decade of excellence in residential, commercial, and industrial roofing with written guarantees.
            </p>
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <Award className="w-4 h-4 text-amber-400" />
            <span>OVER A DECADE OF EXCELLENCE</span>
          </div>
        </div>
        </div>

        {/* Col 2: Services */}
        <div>
          <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">Specialized Services</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><Link href="/commercial" className="hover:text-white transition-colors">Commercial Roofing</Link></li>
            <li><Link href="/industrial" className="hover:text-white transition-colors">Industrial Roofing</Link></li>
            <li><Link href="/domestic" className="hover:text-white transition-colors">Domestic & Residential</Link></li>
            <li><Link href="/waterproofing" className="hover:text-white transition-colors">Advanced Waterproofing</Link></li>
            <li><Link href="/re-roofing" className="hover:text-white transition-colors">Full Roof Refurbishments</Link></li>
            <li><Link href="/asbestos-removal" className="hover:text-white transition-colors">Licensed Asbestos Removal</Link></li>
          </ul>
        </div>

        {/* Col 3: Regional Hubs */}
        <div>
          <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">Service Regions</h4>
          <ul className="space-y-3 text-xs text-slate-400">
            <li className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Cape Town & Western Cape Division</span>
            </li>
            <li className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>West Coast & Boland Division</span>
            </li>
            <li className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Nationwide Commercial Projects</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Contact & Dispatch */}
        <div>
          <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">Inspection Dispatch</h4>
          <div className="space-y-3 text-xs text-slate-400 mb-6">
            <a href="tel:+27825035394" className="flex items-center space-x-2 text-white font-mono font-bold hover:text-amber-400 transition-colors">
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>082 503 5394</span>
            </a>
            <a href="mailto:info@sampleroofing.co.za" className="flex items-center space-x-2 hover:text-amber-400 transition-colors font-mono">
              <Mail className="w-4 h-4 text-amber-400" />
              <span>info@sampleroofing.co.za</span>
            </a>
          </div>
          <button
            onClick={onOpenQuoteModal}
            className="w-full py-3 rounded-xl bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 active:scale-[0.97] transition-all shadow-md"
          >
            Schedule Free Inspection
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 font-mono">
        <p>© 2026 Sample Roofing (Pty) Ltd. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/about" className="hover:text-amber-400">About Us</Link>
          <Link href="/contact" className="hover:text-amber-400">Contact</Link>
          <a href="#" className="hover:text-amber-400">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
