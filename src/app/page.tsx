'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import InlineQuoteForm from '@/components/InlineQuoteForm';
import AnimatedCounter from '@/components/AnimatedCounter';
import StickyCTABar from '@/components/StickyCTABar';
import {
  ShieldCheck,
  Award,
  Clock,
  Wrench,
  Building2,
  Factory,
  Home as HomeIcon,
  Layers,
  ChevronRight,
  Check,
  Star,
  ArrowRight
} from 'lucide-react';

const FRAME_NAMES = [
  'frame_000.jpg',
  'frame_001.jpg',
  'frame_002.jpg',
  'frame_003.jpg',
  'frame_004.jpg'
];

// Below this viewport width we load the ~50KB mobile-sized frame set
// instead of the ~700KB desktop originals.
const MOBILE_FRAME_BREAKPOINT = 768;
const FRAME_PATHS = FRAME_NAMES.map((name) => `/frames/${name}`);
const MOBILE_FRAME_PATHS = FRAME_NAMES.map((name) => `/frames/mobile/${name}`);

// Hero scroll phases: frames assemble over the first ASSEMBLY_END of the
// track, then headline text reveals over the TEXT_REVEAL window.
const ASSEMBLY_END = 0.65;
const TEXT_REVEAL_START = 0.60;
const TEXT_REVEAL_DURATION = 0.30;

const SERVICES = [
  {
    icon: Building2,
    title: "Commercial Roofing",
    image: "/real_images/commercial_real.jpg",
    desc: "Engineered commercial roof sheet installations, box gutter relining, and membrane waterproofing for office parks, retail centers, and commercial facilities.",
    bullets: ["Flat & Low-Slope Roof Systems", "Custom Metal & Box Gutters", "Protective Membrane Coatings", "Minimal Operational Downtime"],
    link: "/commercial"
  },
  {
    icon: Factory,
    title: "Industrial Roofing",
    image: "/real_images/industrial_real.jpg",
    desc: "Heavy-duty IBR and corrugated steel roof sheeting, structural over-roofing, and OHS safety-compliant maintenance designed for warehouses and factories.",
    bullets: ["Heavy Gauge Metal Sheeting", "Over-Roofing & Insulation", "Fall Protection & Skylights", "Structural Load Engineering"],
    link: "/industrial"
  },
  {
    icon: HomeIcon,
    title: "Domestic & Residential",
    image: "/real_images/domestic_real.jpg",
    desc: "Premium residential roofing solutions including standing seam metal, tile, slate, shingles, and custom architectural timber/steel framing.",
    bullets: ["Complete Re-Roofing", "Truss Erection & Battens", "Ceiling & Insulation Upgrades", "Storm Damage Leak Repairs"],
    link: "/domestic"
  },
  {
    icon: Layers,
    title: "Advanced Waterproofing",
    image: "/real_images/waterproofing_real.jpeg",
    desc: "Certified waterproofing for concrete flat roofs, balconies, parking decks, parapet walls, and box gutters using 4mm heat-fused torch-on membranes.",
    bullets: ["4mm Torch-On Malthoid Systems", "Parapet Wall & Chimney Sealing", "Box Gutter Relining", "Written Workmanship Guarantee"],
    link: "/waterproofing"
  },
  {
    icon: Wrench,
    title: "Full Roof Refurbishments",
    image: "/real_images/reroofing_real.jpeg",
    desc: "Full roof sheet replacement, anti-corrosion rust treatment, fastener upgrades, and complete eave and fascia board refurbishment.",
    bullets: ["Roof Modifications & Extensions", "Truss Supply & Erection", "Fascia & Gutter Upgrades", "Ceiling Repair & Skimming"],
    link: "/re-roofing"
  },
  {
    icon: ShieldCheck,
    title: "Asbestos Roof Encapsulation",
    image: "/real_images/asbestos_real.jpeg",
    desc: "Certified asbestos encapsulation that binds unstable fibers permanently, eliminating health risk with a 10-year guarantee — no expensive shutdown required.",
    bullets: ["Permanent Fiber Encapsulation", "No Costly Shutdown Needed", "OHS & Environmental Compliant", "10-Year Written Guarantee"],
    link: "/asbestos-removal"
  }
];

export default function Home() {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawnFrameRef = useRef(-1);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  // scrollYProgress is 0 at the moment the track's top edge reaches the
  // viewport top, and 1 once its bottom edge reaches the viewport bottom —
  // exactly the span the sticky child is pinned for. framer-motion updates
  // this value on its own rAF-batched scheduler, outside React's render
  // cycle, so nothing here re-renders just because the user scrolled.
  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ['start start', 'end end']
  });

  // Preload Animation Frames — mobile viewports get the ~50KB variants
  // instead of the ~700KB desktop originals.
  useEffect(() => {
    const framePaths = window.innerWidth < MOBILE_FRAME_BREAKPOINT ? MOBILE_FRAME_PATHS : FRAME_PATHS;
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    framePaths.forEach((path, idx) => {
      const img = new Image();
      img.src = path;
      const onLoaded = () => {
        loadedCount++;
        if (loadedCount === framePaths.length) {
          setImagesLoaded(true);
        }
      };

      if (img.complete) {
        onLoaded();
      } else {
        img.onload = onLoaded;
      }
      imgArray[idx] = img;
    });

    imagesRef.current = imgArray;
  }, []);

  // Mac Retina Canvas Frame Renderer Fix
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;

    let renderW = width;
    let renderH = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderH = width / imgRatio;
      offsetY = (height - renderH) / 2;
    } else {
      renderW = height * imgRatio;
      offsetX = (width - renderW) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
  }, []);

  // Canvas is imperative (it isn't a DOM style, so motion values can't
  // drive it directly) — redraw it only when the target frame actually
  // changes, on framer-motion's own scroll tick.
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const assemblyProgress = Math.min(1, latest / ASSEMBLY_END);
    const frameIdx = Math.min(
      FRAME_NAMES.length - 1,
      Math.floor(assemblyProgress * FRAME_NAMES.length)
    );
    if (frameIdx !== lastDrawnFrameRef.current) {
      lastDrawnFrameRef.current = frameIdx;
      drawFrame(frameIdx);
    }
  });

  useEffect(() => {
    if (imagesLoaded) {
      lastDrawnFrameRef.current = 0;
      drawFrame(0);
    }
  }, [imagesLoaded, drawFrame]);

  useEffect(() => {
    const handleResize = () => drawFrame(Math.max(0, lastDrawnFrameRef.current));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Phase 2 Animation — plain DOM style updates via motion values, no
  // React re-render involved.
  const textRevealRange: [number, number] = [TEXT_REVEAL_START, TEXT_REVEAL_START + TEXT_REVEAL_DURATION];
  const textOpacity = useTransform(scrollYProgress, textRevealRange, [0, 1]);
  const textScale = useTransform(scrollYProgress, textRevealRange, [0.9, 1]);
  const textY = useTransform(scrollYProgress, textRevealRange, [40, 0]);
  const vignetteOpacity = useTransform(scrollYProgress, textRevealRange, [0, 0.75]);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#0F2C59] selection:text-white flex flex-col">
      <Navbar onOpenQuoteModal={() => setIsQuoteOpen(true)} />

      {/* Hero Interactive 3-Phase Animation Track */}
      <section id="assembly" ref={scrollTrackRef} className="relative h-[280vh] w-full bg-slate-950">
        <div className="sticky top-[95px] h-[calc(100vh-95px)] w-full overflow-hidden">
          
          {/* Scroll-Scrubbed Project Frame Sequence */}
          <div className="absolute inset-0 z-0 bg-slate-950">
            {!imagesLoaded ? (
              <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950">
                <div className="w-10 h-10 border-4 border-[#0F2C59]/30 border-t-amber-400 rounded-full animate-spin mb-4" />
                <p className="text-slate-400 font-mono text-xs tracking-widest uppercase">
                  Loading Project Imagery...
                </p>
              </div>
            ) : (
              <canvas ref={canvasRef} className="w-full h-full object-cover" />
            )}
          </div>

          {/* Vignette Overlay */}
          <motion.div
            className="absolute inset-0 z-10 bg-radial from-slate-950/70 via-slate-950/50 to-slate-950/90 pointer-events-none"
            style={{ opacity: vignetteOpacity }}
          />

          {/* Headline + Inline Quote Form, settling in after the animation */}
          <motion.div
            className="absolute inset-0 z-20 flex items-center px-6 pointer-events-none"
            style={{ opacity: textOpacity, scale: textScale, y: textY }}
          >
            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14 items-center pointer-events-auto">
              <div>
                <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6 drop-shadow-2xl">
                  South Africa's Premier <span className="bg-gradient-to-r from-amber-300 via-white to-amber-200 bg-clip-text text-transparent">Roofing Specialists</span>
                </h1>

                <p className="text-slate-200 text-base md:text-xl max-w-2xl leading-relaxed mb-10 drop-shadow-lg font-medium">
                  Engineered Commercial, Industrial & Residential Roofing Systems. Free on-site property inspections and written guarantees across South Africa.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    onClick={() => setIsQuoteOpen(true)}
                    className="px-8 py-4 rounded-full bg-[#0F2C59] border border-white/20 text-white font-bold text-sm hover:bg-[#1E3E62] transition-all shadow-2xl flex items-center space-x-2 transform hover:scale-105 active:scale-[0.97]"
                  >
                    <span>Request Free Property Inspection</span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </button>
                  <a
                    href="/portfolio"
                    className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold text-sm hover:bg-white/20 transition-all shadow-lg"
                  >
                    Explore Portfolio
                  </a>
                </div>
              </div>

              <div className="hidden lg:block">
                <InlineQuoteForm />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Main Content Sections */}
      <main className="relative z-20 bg-white pt-16 pb-32 flex-1">
        
        {/* Experience Spotlight Section with Scroll-Triggered Metric Counters */}
        <section id="about" className="max-w-7xl mx-auto px-6 mb-32">
          <div className="glass-panel p-8 md:p-12 rounded-3xl border border-slate-200 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
                Trusted Local Roofing & Waterproofing <span className="text-[#0F2C59]">Specialists</span>
              </h2>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                <strong>Sample Roofing (Pty) Ltd</strong> delivers high-performance roofing and waterproofing systems built to withstand extreme weather conditions. From coastal winds to heavy rains, our engineered installations provide long-term structural protection.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                We work across all roof types: Chromadek metal sheeting, standing seam lock, concrete tiles, slate, fibre cement, and bituminous malthoid flat roof waterproofing. Every project is executed by on-site supervised, OHS-compliant teams.
              </p>

              {/* Animated Counters */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <AnimatedCounter end={100} suffix="%" className="text-3xl font-extrabold font-mono text-[#0F2C59] block mb-1" />
                  <span className="text-xs text-slate-900 font-bold block">Written Guarantee</span>
                  <span className="text-[11px] text-slate-500">Workmanship Protection</span>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <AnimatedCounter end={10} suffix="-Yr" className="text-3xl font-extrabold font-mono text-[#0F2C59] block mb-1" />
                  <span className="text-xs text-slate-900 font-bold block">Asbestos Guarantee</span>
                  <span className="text-[11px] text-slate-500">Certified Encapsulation</span>
                </div>
              </div>

              <button
                onClick={() => setIsQuoteOpen(true)}
                className="px-8 py-4 rounded-xl bg-[#0F2C59] text-white font-bold text-sm hover:bg-[#1E3E62] active:scale-[0.97] transition-all shadow-md flex items-center space-x-2"
              >
                <span>Request Free Property Inspection</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-lg relative">
                <img
                  src="/real_images/commercial_real.jpg"
                  alt="Sample Roofing Commercial Project"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <h4 className="font-heading text-lg font-bold text-white">Commercial Structural Roof Installation</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Services Pillars */}
        <section id="services" className="max-w-7xl mx-auto px-6 mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Comprehensive <span className="text-[#0F2C59]">Roofing Solutions</span>
            </h2>
            <p className="text-slate-600 text-base">
              From new roof sheet installations and truss erection to flat roof waterproofing and certified asbestos encapsulation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((srv, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-3xl border border-slate-200 hover:border-[#0F2C59] transition-all group flex flex-col justify-between overflow-hidden shadow-sm"
              >
                <div className="aspect-video w-full overflow-hidden relative border-b border-slate-200">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-[#0F2C59] text-white flex items-center justify-center shadow-md">
                    <srv.icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-8 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">{srv.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">{srv.desc}</p>

                    <ul className="space-y-2 mb-8">
                      {srv.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-center space-x-2 text-xs text-slate-700 font-medium">
                          <Check className="w-4 h-4 text-[#0F2C59]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={srv.link}
                    className="w-full py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 font-bold text-xs hover:bg-[#0F2C59] hover:text-white transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Explore {srv.title}</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Waterproofing & Energy Efficiency Section */}
        <section id="waterproofing" className="max-w-7xl mx-auto px-6 mb-32">
          <div className="glass-panel p-8 md:p-12 rounded-3xl border border-slate-200 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                  Complete Waterproofing for <span className="text-[#0F2C59]">Flat Roofs & Decks</span>
                </h2>
                <p className="text-slate-700 text-sm leading-relaxed mb-6">
                  Water leaks cause catastrophic structural damage. Sample Roofing delivers certified 4mm heat-fused malthoid waterproofing, liquid acrylic coatings, and box gutter relining.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    "Concrete Flat Roofs, Balconies & Parking Decks",
                    "Box Gutters, Parapets & Side Flashing Waterproofing",
                    "Thermal Sisalation & Energy-Efficient Roof Insulation",
                    "Rust-Resistant Aluminium Seamless Gutter Systems"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3 text-xs text-slate-800 font-semibold">
                      <div className="w-5 h-5 rounded-full bg-[#0F2C59]/10 text-[#0F2C59] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="px-6 py-3.5 rounded-xl bg-[#0F2C59] text-white font-bold text-sm hover:bg-[#1E3E62] transition-all flex items-center space-x-2 shadow-md"
                >
                  <span>Schedule Waterproofing Inspection</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <Clock className="w-8 h-8 text-[#0F2C59] mx-auto mb-3" />
                  <h4 className="font-heading font-bold text-slate-900 text-base">Free Inspections</h4>
                  <p className="text-xs text-slate-500 mt-1">Same-Day Written Quotes</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <ShieldCheck className="w-8 h-8 text-[#0F2C59] mx-auto mb-3" />
                  <h4 className="font-heading font-bold text-slate-900 text-base">Workmanship Guarantee</h4>
                  <p className="text-xs text-slate-500 mt-1">Written Warranty Protection</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <Factory className="w-8 h-8 text-[#0F2C59] mx-auto mb-3" />
                  <h4 className="font-heading font-bold text-slate-900 text-base">Asbestos Certified</h4>
                  <p className="text-xs text-slate-500 mt-1">10-Year Guarantee Encapsulation</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <Award className="w-8 h-8 text-[#0F2C59] mx-auto mb-3" />
                  <h4 className="font-heading font-bold text-slate-900 text-base">10-Yr Corrosion</h4>
                  <p className="text-xs text-slate-500 mt-1">On Aluminium Guttering Systems</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section id="testimonials" className="max-w-7xl mx-auto px-6 mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              5-Star Client <span className="text-[#0F2C59]">Reviews</span>
            </h2>
            <p className="text-slate-600 text-base">
              Trusted by homeowners, estate developers, commercial property managers, and industrial plants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Sample Roofing fixed a persistent leak that two other contractors couldn't solve. Professional, fast and the guarantee gave us total peace of mind.",
                author: "Johan V.",
                location: "Residential Client"
              },
              {
                quote: "We used Sample Roofing for our commercial warehouse roof. The team was on-site supervised, finished ahead of schedule and the quality is outstanding.",
                author: "Marinda S.",
                location: "Industrial Park Manager"
              },
              {
                quote: "The asbestos encapsulation service is brilliant — no shutdown, no expensive removal, and we have a 10-year guarantee. Highly recommend.",
                author: "Deon K.",
                location: "Factory Owner"
              }
            ].map((t, idx) => (
              <div key={idx} className="glass-panel p-8 rounded-3xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <p className="text-slate-700 text-xs leading-relaxed italic mb-6">"{t.quote}"</p>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="font-heading font-bold text-slate-900 text-sm">{t.author}</h4>
                  <span className="text-[11px] text-slate-500">{t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="glass-panel-navy p-10 rounded-3xl text-center relative overflow-hidden shadow-lg">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4">
              Need a Roofing or Waterproofing Specialist?
            </h2>
            <p className="text-slate-200 text-sm max-w-2xl mx-auto mb-8">
              Call Sample Roofing today on 082 503 5394 for a free on-site property inspection and same-day written quote.
            </p>
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="px-8 py-4 rounded-xl bg-white text-[#0F2C59] font-bold text-sm hover:bg-slate-100 transition-all shadow-md"
            >
              Get Your Free Quote Now
            </button>
          </div>
        </section>
      </main>

      <Footer onOpenQuoteModal={() => setIsQuoteOpen(true)} />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      <StickyCTABar onOpenQuote={() => setIsQuoteOpen(true)} />
    </div>
  );
}
