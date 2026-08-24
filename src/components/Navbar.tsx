'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PhoneCall, Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onOpenQuoteModal?: () => void;
}

export default function Navbar({ onOpenQuoteModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-200">
      {/* Top Banner Contact Strip */}
      <div className="bg-[#0F2C59] text-white py-1.5 px-6 text-xs font-medium border-b border-white/10">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="tracking-wide font-bold">SOUTH AFRICA'S PREMIER ROOFING & WATERPROOFING SPECIALISTS</span>
            <span className="hidden lg:inline text-slate-300">
              | NATIONWIDE & REGIONAL DIVISIONS
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:+27825035394" className="hover:text-amber-300 transition-colors flex items-center space-x-1.5 font-bold">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>CALL: 082 503 5394</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <nav className="bg-white/95 backdrop-blur-md px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Sample Roofing Official Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <img
              src="/logo.png"
              alt="Sample Roofing (Pty) Ltd Logo"
              className="h-11 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </Link>

          {/* Header Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Link href="/" className="hover:text-[#0F2C59] transition-colors">
              Home
            </Link>

            <Link href="/portfolio" className="hover:text-[#0F2C59] transition-colors">
              Portfolio
            </Link>

            {/* Services Dropdown */}
            <div className="relative group" onMouseEnter={() => setServicesDropdown(true)} onMouseLeave={() => setServicesDropdown(false)}>
              <button className="flex items-center space-x-1 hover:text-[#0F2C59] transition-colors py-2">
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {servicesDropdown && (
                <div className="absolute top-full left-0 w-64 bg-white border border-slate-200 rounded-2xl shadow-lg p-3 space-y-1 font-normal text-xs normal-case tracking-normal z-50">
                  <Link href="/commercial" className="block px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-800 font-semibold">
                    Commercial Roofing
                  </Link>
                  <Link href="/industrial" className="block px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-800 font-semibold">
                    Industrial Roofing
                  </Link>
                  <Link href="/domestic" className="block px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-800 font-semibold">
                    Domestic Roofing
                  </Link>
                  <Link href="/waterproofing" className="block px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-800 font-semibold">
                    Waterproofing & Leak Repairs
                  </Link>
                  <Link href="/re-roofing" className="block px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-800 font-semibold">
                    Complete Re-Roofing
                  </Link>
                  <Link href="/asbestos-removal" className="block px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-800 font-semibold">
                    Licensed Asbestos Removal
                  </Link>
                </div>
              )}
            </div>

            <Link href="/commercial" className="hover:text-[#0F2C59] transition-colors">
              Commercial
            </Link>
            <Link href="/industrial" className="hover:text-[#0F2C59] transition-colors">
              Industrial
            </Link>
            <Link href="/domestic" className="hover:text-[#0F2C59] transition-colors">
              Domestic
            </Link>
            <Link href="/waterproofing" className="hover:text-[#0F2C59] transition-colors">
              Waterproofing
            </Link>
            <Link href="/about" className="hover:text-[#0F2C59] transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-[#0F2C59] transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            {/* Clean Get Free Quote Button (Zero Icons/Emojis) */}
            <button
              onClick={onOpenQuoteModal}
              className="px-6 py-2.5 rounded-xl bg-[#0F2C59] text-white font-bold text-xs hover:bg-[#1E3E62] transition-all transform hover:scale-[1.02] active:scale-[0.97] shadow-md"
            >
              Get Free Quote
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-800 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-6 px-4 space-y-2 border-t border-slate-200 mt-3 text-sm font-semibold text-slate-800">
            <Link href="/" className="block py-2 px-3 rounded-lg hover:bg-slate-100">Home</Link>
            <Link href="/portfolio" className="block py-2 px-3 rounded-lg hover:bg-slate-100 text-[#0F2C59] font-bold">Portfolio</Link>
            <Link href="/commercial" className="block py-2 px-3 rounded-lg hover:bg-slate-100">Commercial Roofing</Link>
            <Link href="/industrial" className="block py-2 px-3 rounded-lg hover:bg-slate-100">Industrial Roofing</Link>
            <Link href="/domestic" className="block py-2 px-3 rounded-lg hover:bg-slate-100">Domestic Roofing</Link>
            <Link href="/waterproofing" className="block py-2 px-3 rounded-lg hover:bg-slate-100">Waterproofing</Link>
            <Link href="/re-roofing" className="block py-2 px-3 rounded-lg hover:bg-slate-100">Complete Re-Roofing</Link>
            <Link href="/asbestos-removal" className="block py-2 px-3 rounded-lg hover:bg-slate-100">Asbestos Removal</Link>
            <Link href="/about" className="block py-2 px-3 rounded-lg hover:bg-slate-100">About Us</Link>
            <Link href="/contact" className="block py-2 px-3 rounded-lg hover:bg-slate-100">Contact Us</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
