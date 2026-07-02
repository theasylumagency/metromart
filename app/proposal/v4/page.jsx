"use client";

import React, { useState, useEffect } from "react";

// Technical and commercial data from the DOCX file (Version 4.0)
const RATE = 2.67; // GEL/USD
const DISCOVERY_COST = 8000;
const DESIGN_COST = 12000;
const BUILD_COST = 50000;
const STABILIZATION_COST = 30000;
const PILOT_COST = 15000;
const SUPPORT_COST_MONTHLY = 5000;

export default function ProposalV4Page() {
  // --- STATE ---
  const [ccy, setCcy] = useState("USD");
  const [includeStabilization, setIncludeStabilization] = useState(false);
  const [includeSupport, setIncludeSupport] = useState(false);
  const [includeAIPilot, setIncludeAIPilot] = useState(false);
  
  const [activePhase, setActivePhase] = useState(0);
  const [scopeTab, setScopeTab] = useState("mvp");
  const [expectationTab, setExpectationTab] = useState("risk");
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animations on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // --- PRICING LOGIC ---
  const getBaseCost = () => {
    return DISCOVERY_COST + DESIGN_COST + BUILD_COST;
  };

  const getAddonsCost = () => {
    let total = 0;
    if (includeStabilization) total += STABILIZATION_COST;
    if (includeAIPilot) total += PILOT_COST;
    if (includeSupport) total += (SUPPORT_COST_MONTHLY * 6);
    return total;
  };

  const getTotalCost = () => {
    return getBaseCost() + getAddonsCost();
  };

  const formatCost = (val, isRange = false) => {
    const rate = ccy === "USD" ? 1 : RATE;
    const symbol = ccy === "USD" ? "$" : "₾";
    
    if (isRange) {
      const min = Math.round(val * 0.9 * rate / 1000) * 1000;
      const max = Math.round(val * 1.1 * rate / 1000) * 1000;
      return `${symbol}${min.toLocaleString()} – ${symbol}${max.toLocaleString()}`;
    }
    
    const formatted = Math.round(val * rate).toLocaleString();
    return `${symbol}${formatted}`;
  };

  const formatDirect = (val, currency, isRange = false) => {
    const rate = currency === "USD" ? 1 : RATE;
    const symbol = currency === "USD" ? "$" : "₾";
    
    if (isRange) {
      const min = Math.round(val * 0.9 * rate / 1000) * 1000;
      const max = Math.round(val * 1.1 * rate / 1000) * 1000;
      return `${symbol}${min.toLocaleString()} – ${symbol}${max.toLocaleString()}`;
    }
    
    const formatted = Math.round(val * rate).toLocaleString();
    return `${symbol}${formatted}`;
  };

  // --- DATA ---
  const phases = [
    {
      id: "P1",
      name: "Phase 1 — Discovery & Architecture",
      dur: "2–3 weeks",
      cost: DISCOVERY_COST,
      objectives: [
        "Objective: Turn the blueprint into a clear MVP scope, technical architecture, integration plan, and delivery structure.",
        "Analyze the MetroMart platform blueprint and separate MVP, Stabilization, Enterprise Roadmap, and Future AI scope.",
        "Review product catalog structure: category levels, brands, variants, SKU logic, attributes (~2K attributes / ~22K values).",
        "Map 1C/ERP stock API requirements, FTP paths, payment installment callback handlers, and third-party dependencies.",
        "Deliverables: Discovery summary, MVP scope definition, high-level architecture diagram, integration risk register, tech stack recommendation, and final MVP implementation plan."
      ]
    },
    {
      id: "P2",
      name: "Phase 2 — UX/UI Design & Functional Specification",
      dur: "4 weeks",
      cost: DESIGN_COST,
      objectives: [
        "Objective: Design the MVP user experience and prepare the functional specification needed for development.",
        "Establish UI design system and mobile-first reusable component library.",
        "Design Figma layouts for Homepage, listings (PLP), details (PDP), search/filter flows, checkout, user accounts, and admin dashboards.",
        "Document functional specification details: database dependencies, interface rules, API boundary validators, and error states.",
        "Deliverables: Interactive Figma prototypes (desktop and mobile), critical user flows, spec documents, and engineering handoffs."
      ]
    },
    {
      id: "P3",
      name: "Phase 3 — MVP Build & Public Launch",
      dur: "12–16 weeks",
      cost: BUILD_COST,
      objectives: [
        "Objective: Build and launch the commercially usable MVP version of the new MetroMart e-commerce platform.",
        "Full stack development of Next.js frontend storefront and customized admin panel interface.",
        "Setup catalog structure, variants, dynamic attribute filters, instant product search, cart, and linear checkout.",
        "Integration of priority payment and installment path (based on bank documentation and sandbox access).",
        "Implement basic 1C/ERP stock and price synchronization with log tracking and error visibility.",
        "Deliverables: Live production storefront, staging sandbox, QA testing log, UAT sign-off, and launch."
      ]
    },
    {
      id: "P4",
      name: "Phase 4 — Post-MVP Stabilization & Release 1 Acceptance",
      dur: "4–5 months (post-launch)",
      cost: STABILIZATION_COST,
      objectives: [
        "Objective: Move the platform from MVP launch to a stable, accepted Release 1 product based on real operational usage.",
        "Harden 1C/ERP sync routines, resolve real-data import bugs, and refine category/filter attribute displays.",
        "Address payment gateway callback edge-case webhook failures and checkout behavior bugs.",
        "Implement corrections based on User Acceptance Testing (UAT) and operational performance tuning.",
        "Deliverables: Clean database logs, optimized backend response times, and Release 1 acceptance documentation."
      ]
    },
    {
      id: "RET",
      name: "Post-Launch Operational Support",
      dur: "Recommended initial term: 6 months. Renewable after review.",
      cost: SUPPORT_COST_MONTHLY,
      isRetainer: true,
      objectives: [
        "Objective: Operational support service starting from public launch, covering monitoring and incident continuity.",
        "Up to 40 hours per month of bug fixes, production supervision, payment callbacks monitoring, and ERP sync status checking.",
        "Includes security and backup supervision, server performance checks, minor admin panel workflow adjustments, and technical reports.",
        "Excludes major new features, major redesign, database data entry cleanups, or 1C-side code development."
      ]
    },
    {
      id: "AI",
      name: "Optional — AI Intelligence Pilot",
      dur: "Post-Discovery kickoff",
      cost: PILOT_COST,
      objectives: [
        "Objective: Deliver one narrowly scoped AI direction based on data structures built AI-ready from day one.",
        "AI-Assisted Catalog Content: Product description writing assistance, SEO metadata writers, alt text generators, and comparison summaries.",
        "Internal Sales Intelligence Prototype: Dashboards tracking high-views but low-conversion items, underperforming categories, and lost sales from stock-outs.",
        "Limited Semantic Search Proof of Concept: Natural-language product search prototype, intent-based search logs, and alternative suggestions."
      ]
    }
  ];

  const pricingRows = [
    { name: "Phase 1 — Discovery & Architecture (Committed)", usd: DISCOVERY_COST, model: "100% advance" },
    { name: "Phase 2 — UX/UI Design & Functional Specification (Committed)", usd: DESIGN_COST, model: "60% start / 40% signoff" },
    { name: "Phase 3 — MVP Build & Public Launch (Committed)", usd: BUILD_COST, model: "Milestone schedule" },
    { name: "MVP Launch Total (Committed to Launch)", usd: DISCOVERY_COST + DESIGN_COST + BUILD_COST, model: "Committed budget", highlight: true },
    { name: "Phase 4 — Post-MVP Stabilization & Release 1 Acceptance", usd: STABILIZATION_COST, model: "Milestone/Monthly", sub: "Post-MVP stabilization & Release 1 acceptance" },
    { name: "Release 1 Full Cycle Total (MVP + Hardening)", usd: DISCOVERY_COST + DESIGN_COST + BUILD_COST + STABILIZATION_COST, model: "Full Cycle budget", highlight: true },
    { name: "Optional · AI Intelligence Pilot Module", usd: PILOT_COST, model: "Post-Discovery" },
    { name: "Post-Launch Operational Support", usd: SUPPORT_COST_MONTHLY, model: "Monthly billing", sub: "Up to 40 hours/month. Recommended initial term: 6 months. Renewable after review." }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-paper font-sans text-ink">
      {/* PRINT-ONLY HEADER */}
      <div className="hidden print:flex justify-between items-start border-b-2 border-deep pb-3 mb-6">
        <div>
          <span className="font-display font-bold text-lg text-ink">The Asylum Agency</span>
          <span className="text-muted-text mx-2">→</span>
          <span className="font-display font-medium text-lg text-ink">MetroMart</span>
        </div>
        <div className="text-right text-xs text-muted-text">
          <p className="font-bold">Commercial Proposal · Version 4.0</p>
          <p>theasylum.agency · hello@theasylum.agency</p>
        </div>
      </div>

      {/* NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 glass-nav no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-brand-amber shadow-[0_0_0_4px_rgba(232,161,58,0.18)] flex-shrink-0"></span>
            <span className="font-display font-bold text-xs sm:text-sm tracking-tight text-deep">The Asylum Agency</span>
            <span className="text-muted-text font-mono text-xs hidden xs:inline">→</span>
            <span className="font-display font-medium text-xs sm:text-sm text-muted-text hidden xs:inline">MetroMart MVP v4</span>
            <a 
              href="/" 
              className="ml-2 px-2.5 py-1 bg-white/80 hover:bg-white border border-border-line rounded-lg text-[11px] font-semibold text-deep transition-all flex items-center gap-1 shadow-xs"
            >
              ← Presentation Site
            </a>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wide uppercase text-muted-text">
            <a href="#approach" className="hover:text-ink transition-colors">Approach</a>
            <a href="#scope" className="hover:text-ink transition-colors">Scope Matrix</a>
            <a href="#phases" className="hover:text-ink transition-colors">Phases</a>
            <a href="#tech" className="hover:text-ink transition-colors">Tech Stack</a>
            <a href="#pricing" className="hover:text-ink transition-colors">Pricing Summary</a>
          </div>

          <div className="flex items-center gap-2">
            <a 
              href="/MetroMart_Proposal_v4.pdf" 
              download
              className="px-3 py-1.5 sm:px-4 sm:py-2 border border-border-line rounded-lg text-[10px] sm:text-xs font-semibold hover:border-ink transition-all flex items-center gap-1.5 bg-white text-ink shadow-sm"
            >
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Proposal PDF (v4.0)
            </a>
            <button 
              onClick={() => window.print()}
              className="hidden lg:block px-4 py-2 bg-deep text-white rounded-lg text-xs font-semibold hover:bg-deep-2 transition-all cursor-pointer"
            >
              Print Proposal
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative bg-gradient-to-br from-deep to-deep-2 text-white overflow-hidden py-12 lg:py-20 px-4 sm:px-6 no-print">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* Decorative ambient gradient */}
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-brand-blue opacity-20 blur-[60px] sm:blur-[100px] pointer-events-none"></div>

        <div className={`max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center reveal ${isVisible ? 'in' : ''}`}>
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <span className="inline-block px-3 py-1 bg-brand-amber/20 border border-brand-amber/30 rounded-full text-[10px] sm:text-xs font-mono tracking-widest text-brand-amber uppercase">
              Strategic MVP Launch  •  v4.0
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-6xl tracking-tight leading-tight sm:leading-none text-white">
              Launch fast.<br/>Stabilize on real data.
            </h1>
            <p className="text-brand-blue-soft text-sm sm:text-lg max-w-xl leading-relaxed">
              We recommend a phased delivery built around a commercially functional MVP storefront. Go live with a modern store quickly, harden details on real transaction data, and scale on a planned roadmap.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1 sm:pt-2">
              {["Responsive Storefront", "Product comparisons", "1C Stock & Price Sync", "Bank payment sandboxes"].map((badge, idx) => (
                <span key={idx} className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 border border-white/10 bg-white/5 rounded-full text-[10px] sm:text-xs font-mono text-brand-blue-soft">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* DYNAMIC MVP-FIRST CALCULATOR COMPONENT */}
          <div className="lg:col-span-5">
            <div className="glass-card-dark p-5 sm:p-8 rounded-2xl relative overflow-hidden text-white">
              <div className="flex justify-between items-center mb-5 sm:mb-6">
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-brand-amber">MVP Launch Cost</span>
                
                {/* Currency selector toggle */}
                <div className="flex border border-white/10 bg-black/40 rounded-lg p-0.5 font-mono text-[10px] sm:text-xs overflow-hidden">
                  <button 
                    onClick={() => setCcy("USD")} 
                    className={`px-2.5 py-1 rounded-md transition-all ${ccy === "USD" ? "bg-white text-deep font-bold" : "text-brand-blue-soft hover:text-white"}`}
                  >
                    USD
                  </button>
                  <button 
                    onClick={() => setCcy("GEL")} 
                    className={`px-2.5 py-1 rounded-md transition-all ${ccy === "GEL" ? "bg-white text-deep font-bold" : "text-brand-blue-soft hover:text-white"}`}
                  >
                    GEL
                  </button>
                </div>
              </div>

              {/* Dynamic main cost display (MVP Launch Focused) */}
              <div className="space-y-1 mb-5 sm:mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] sm:text-xs text-brand-blue-soft font-mono">MVP Investment:</span>
                  <span className="font-mono text-3xl sm:text-5xl font-bold tracking-tight text-white transition-all">
                    {formatCost(getTotalCost())}
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-brand-blue-soft">
                  {includeStabilization 
                    ? "Includes MVP ($70k) + Post-Launch Stabilization Phase ($30k)"
                    : "Primary cost to get storefront live and processing customer payments"}
                </p>
              </div>

              {/* Scope additions checkbox selectors */}
              <div className="border-t border-white/10 pt-4 mb-5 sm:mb-6 space-y-3.5 text-[11px] sm:text-xs">
                <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-brand-amber mb-1">Additional Project Phases</p>
                
                <label className="flex items-start gap-3 cursor-pointer text-brand-blue-soft hover:text-white transition-all select-none">
                  <input 
                    type="checkbox" 
                    checked={includeStabilization} 
                    onChange={(e) => setIncludeStabilization(e.target.checked)}
                    className="w-4 h-4 rounded accent-brand-amber cursor-pointer mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <span className="block font-semibold text-white">Stabilization & Hardening (Phase 4)</span>
                    <span className="block text-[10px] text-brand-blue-soft">Adds {formatCost(STABILIZATION_COST)} post-launch for real-data corrections</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer text-brand-blue-soft hover:text-white transition-all select-none">
                  <input 
                    type="checkbox" 
                    checked={includeSupport} 
                    onChange={(e) => setIncludeSupport(e.target.checked)}
                    className="w-4 h-4 rounded accent-brand-amber cursor-pointer mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <span className="block font-semibold text-white">Post-Launch Operational Support</span>
                    <span className="block text-[10px] text-brand-blue-soft">Adds {formatCost(SUPPORT_COST_MONTHLY)} / month (Recommended initial term: 6 months)</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer text-brand-blue-soft hover:text-white transition-all select-none">
                  <input 
                    type="checkbox" 
                    checked={includeAIPilot} 
                    onChange={(e) => setIncludeAIPilot(e.target.checked)}
                    className="w-4 h-4 rounded accent-brand-amber cursor-pointer mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <span className="block font-semibold text-white">Optional AI Intelligence Pilot</span>
                    <span className="block text-[10px] text-brand-blue-soft">Adds {formatCost(PILOT_COST)} for vectors search or descriptions automation</span>
                  </div>
                </label>
              </div>

              {/* Key summary stats */}
              <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden text-[10px] sm:text-xs">
                <div className="bg-deep-2/60 p-2.5 sm:p-3">
                  <span className="text-[9px] font-mono text-brand-blue-soft uppercase tracking-wider block">MVP Launch</span>
                  <span className="font-semibold text-brand-amber block mt-0.5 text-[11px] sm:text-xs">
                    {formatCost(70000)} (Phases 1-3)
                  </span>
                </div>
                <div className="bg-deep-2/60 p-2.5 sm:p-3">
                  <span className="text-[9px] font-mono text-brand-blue-soft uppercase tracking-wider block">MVP Timeline</span>
                  <span className="font-medium text-white block mt-0.5 text-[11px] sm:text-xs">
                    ~18–23 weeks to live
                  </span>
                </div>
                <div className="bg-deep-2/60 p-2.5 sm:p-3">
                  <span className="text-[9px] font-mono text-brand-blue-soft uppercase tracking-wider block">MVP Payment</span>
                  <span className="font-medium text-white block mt-0.5 text-[11px] sm:text-xs">
                    Staged Milestones
                  </span>
                </div>
                <div className="bg-deep-2/60 p-2.5 sm:p-3">
                  <span className="text-[9px] font-mono text-brand-blue-soft uppercase tracking-wider block">Target Output</span>
                  <span className="font-medium text-white block mt-0.5 text-[11px] sm:text-xs">
                    Production Storefront
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <a 
                href="#next" 
                className="mt-5 sm:mt-6 w-full block text-center py-3.5 bg-brand-amber hover:bg-brand-amber/90 text-deep-2 font-bold rounded-xl transition-all shadow-[0_4px_20px_rgba(232,161,58,0.3)] hover:-translate-y-0.5 text-xs sm:text-sm cursor-pointer"
              >
                Start with Discovery Phase — <span className="font-mono">{formatCost(DISCOVERY_COST)}</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16 space-y-16 lg:space-y-24 w-full">
        
        {/* PRINT ONLY HEADER BLOCK */}
        <div className="hidden print:block space-y-12">
          <div className="py-24 border-b border-border-line text-center">
            <h1 className="font-display font-bold text-4xl text-deep mb-4">Strategic & Commercial Proposal</h1>
            <h2 className="font-display text-2xl text-secondary mb-16">MetroMart E-Commerce Platform</h2>
            
            <div className="grid grid-cols-2 gap-8 text-left max-w-md mx-auto text-sm border border-border-line p-8 rounded-xl">
              <div>
                <p className="font-bold text-muted-text text-xs uppercase tracking-wider">Prepared For</p>
                <p className="font-display font-medium text-lg text-ink mt-1">MetroMart</p>
              </div>
              <div>
                <p className="font-bold text-muted-text text-xs uppercase tracking-wider">Prepared By</p>
                <p className="font-display font-medium text-lg text-ink mt-1">The Asylum Agency</p>
              </div>
              <div>
                <p className="font-bold text-muted-text text-xs uppercase tracking-wider">Date</p>
                <p className="font-display font-medium text-ink mt-1">22.06.2026</p>
              </div>
              <div>
                <p className="font-bold text-muted-text text-xs uppercase tracking-wider">Proposal Version</p>
                <p className="font-display font-medium text-ink mt-1">Version 4.0</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: EXECUTIVE SUMMARY */}
        <section id="approach" className={`reveal ${isVisible ? 'in' : ''} space-y-6 sm:space-y-8`}>
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-blue font-bold">1. Executive Summary</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-deep mt-2">
              Strategic execution built around a realistic MVP
            </h2>
            <p className="text-sm sm:text-base text-muted-text mt-3 sm:mt-4 leading-relaxed">
              We recommend a phased delivery model built around a market-realistic MVP launch, followed by structured post-launch stabilization, Release 1 acceptance, and a controlled enterprise roadmap. 
              Our goal is simple: <strong>Launch fast. Stabilize on real data. Scale with a controlled roadmap.</strong> 
              This allows MetroMart to go live with a modern, commercially functional e-commerce storefront within a realistic budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
            <div className="bg-white border border-border-line p-6 rounded-2xl relative overflow-hidden group hover:border-brand-amber transition-all shadow-sm">
              <span className="absolute top-4 right-4 bg-brand-amber/10 text-brand-amber font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold">
                Go-Live
              </span>
              <span className="font-mono text-xs text-muted-text">STAGE · 01</span>
              <h3 className="font-display font-bold text-base sm:text-lg text-deep mt-4 mb-2">MVP Launch</h3>
              <p className="text-xs text-muted-text leading-relaxed">
                Commercially usable first version focused on storefront, catalog display, checkout, priority payments, and core 1C stock synchronization.
              </p>
            </div>

            <div className="bg-white border border-border-line p-6 rounded-2xl relative overflow-hidden group hover:border-brand-green transition-all shadow-sm">
              <span className="absolute top-4 right-4 bg-brand-green-soft text-brand-green font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold">
                Committed
              </span>
              <span className="font-mono text-xs text-muted-text">STAGE · 02</span>
              <h3 className="font-display font-bold text-base sm:text-lg text-deep mt-4 mb-2">Stabilization & Hardening</h3>
              <p className="text-xs text-muted-text leading-relaxed">
                Structured post-launch phase to refine attributes, harden 1C callbacks, resolve real-data import bugs, and tune performance.
              </p>
            </div>

            <div className="bg-white border border-border-line p-6 rounded-2xl relative overflow-hidden group hover:border-brand-blue transition-all shadow-sm">
              <span className="absolute top-4 right-4 bg-brand-blue-soft text-brand-blue font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold">
                SOW Roadmap
              </span>
              <span className="font-mono text-xs text-muted-text">STAGE · 03</span>
              <h3 className="font-display font-bold text-base sm:text-lg text-deep mt-4 mb-2">Enterprise Roadmap</h3>
              <p className="text-xs text-muted-text leading-relaxed">
                Advanced modules planned separately: multiple payment gateways, automated refunds, CRM flows, returns, gift cards, and push/SMS.
              </p>
            </div>

            <div className="bg-white border border-border-line p-6 rounded-2xl relative overflow-hidden group hover:border-purple-600 transition-all shadow-sm">
              <span className="absolute top-4 right-4 bg-purple-100 text-purple-600 font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold">
                Optional
              </span>
              <span className="font-mono text-xs text-muted-text">STAGE · 04</span>
              <h3 className="font-display font-bold text-base sm:text-lg text-deep mt-4 mb-2">Ongoing Support</h3>
              <p className="text-xs text-muted-text leading-relaxed">
                Post-Launch Operational Support, covering server supervision, bug fixes, sync status checks, and up to 40 hours per month.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: SCOPE COMPARISON */}
        <section id="scope" className={`reveal ${isVisible ? 'in' : ''} space-y-6 sm:space-y-8`}>
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-blue font-bold">2. Scope Matrix</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-deep mt-2">
              Deliverables by stage
            </h2>
            <p className="text-sm sm:text-base text-muted-text mt-3 sm:mt-4 leading-relaxed">
              Check feature specifications mapped across MVP Launch, Stabilization, Enterprise Roadmap, and optional AI Pilot directions.
            </p>
          </div>

          {/* Scope Tab Headers */}
          <div className="flex overflow-x-auto scrollbar-none border-b border-border-line no-print -mx-4 px-4 sm:mx-0 sm:px-0 whitespace-nowrap flex-nowrap">
            <button 
              onClick={() => setScopeTab("mvp")} 
              className={`pb-4 px-5 sm:px-6 font-display text-xs sm:text-sm font-semibold tracking-tight border-b-2 transition-all flex-shrink-0 cursor-pointer ${scopeTab === "mvp" ? "border-brand-amber text-brand-amber font-bold" : "border-transparent text-muted-text hover:text-ink"}`}
            >
              MVP Launch (Committed to Launch)
            </button>
            <button 
              onClick={() => setScopeTab("stabilization")} 
              className={`pb-4 px-5 sm:px-6 font-display text-xs sm:text-sm font-semibold tracking-tight border-b-2 transition-all flex-shrink-0 cursor-pointer ${scopeTab === "stabilization" ? "border-brand-green text-brand-green font-bold" : "border-transparent text-muted-text hover:text-ink"}`}
            >
              Stabilization & Release 1 Acceptance
            </button>
            <button 
              onClick={() => setScopeTab("roadmap")} 
              className={`pb-4 px-5 sm:px-6 font-display text-xs sm:text-sm font-semibold tracking-tight border-b-2 transition-all flex-shrink-0 cursor-pointer ${scopeTab === "roadmap" ? "border-brand-blue text-brand-blue font-bold" : "border-transparent text-muted-text hover:text-ink"}`}
            >
              Enterprise Roadmap (Separated)
            </button>
            <button 
              onClick={() => setScopeTab("ai")} 
              className={`pb-4 px-5 sm:px-6 font-display text-xs sm:text-sm font-semibold tracking-tight border-b-2 transition-all flex-shrink-0 cursor-pointer ${scopeTab === "ai" ? "border-deep text-deep font-bold" : "border-transparent text-muted-text hover:text-ink"}`}
            >
              Optional AI Pilot Options
            </button>
          </div>

          {/* Tab content list */}
          <div className="bg-white border border-border-line rounded-2xl overflow-hidden p-5 sm:p-8 shadow-sm">
            {scopeTab === "mvp" && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 text-brand-amber">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-brand-amber flex-shrink-0"></span>
                  <h4 className="font-display font-bold text-sm sm:text-lg">Committed MVP Launch Deliverables</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    "Mobile-first responsive storefront: homepage, product listings, details page, category/brand layouts.",
                    "Core smart search and filtering with basic comparisons.",
                    "Checkout flow: unified user cart and linear checkout form.",
                    "Payments: One priority payment and installment path (sandbox credentials dependent).",
                    "Customer Portal: registration/login, address dashboard, saved wishlists, and order history.",
                    "Catalog Admin: backend panel managing variants, attributes, brands, and categories.",
                    "Data Tools: CSV/Excel product imports/exports, basic role-based access control (RBAC).",
                    "ERP Synchronization: Basic 1C stock & price sync (JSON/FTP) with sync log status checks.",
                    "SEO/Tracking: SEO basics, JSON-LD schema, GA4/GTM analytics, and Meta Pixel tags setup.",
                    "Launch: Staging sandbox, QA testing log, and production server setup."
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-2.5 sm:gap-3 text-xs sm:text-sm text-ink items-start leading-normal">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-amber mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {scopeTab === "stabilization" && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 text-brand-green">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-brand-green flex-shrink-0"></span>
                  <h4 className="font-display font-bold text-sm sm:text-lg">Phase 4: Post-Launch Stabilization & Release 1 Acceptance</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    "Catalog adjustments: Correcting real-data schema and category structural errors.",
                    "Product imports enhancements and filtering optimization.",
                    "1C/ERP stock sync hardening and webhook transaction logs checks.",
                    "Payment callback edge-case resolution and checkout behavior fixes.",
                    "Admin panel workflow improvements and database queries speed tuning.",
                    "Google indexing checks and page URL redirect mappings.",
                    "Implementation of feedback logged during UAT test windows.",
                    "Hand-over operational guides and Release 1 acceptance documentation preparation."
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-2.5 sm:gap-3 text-xs sm:text-sm text-ink items-start leading-normal">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-green mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {scopeTab === "roadmap" && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 text-brand-blue">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-brand-blue flex-shrink-0"></span>
                  <h4 className="font-display font-bold text-sm sm:text-lg">Enterprise Roadmap (Planned separately)</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    "Additional regional gateways (Space, Credo, Cristal, Keepz) + cryptocurrency options.",
                    "Programmatic bank refunds triggered directly from the admin panel.",
                    "Full RMA / returns cycles integrated with 1C stock tracking.",
                    "Advanced CRM, customer marketing automation, and abandoned-cart flow triggers.",
                    "Push alerts and transactional SMS notifications ecosystem.",
                    "Integrations for Wolt, My.ge, and Onoff.ge listing catalog updates.",
                    "Hardened price-tag profile admin UI and bulk attributes validation validations.",
                    "Automated testing pipelines (E2E integrations) and high-scale load testing scripts."
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-2.5 sm:gap-3 text-xs sm:text-sm text-ink items-start leading-normal">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-blue mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {scopeTab === "ai" && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 text-deep">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-deep flex-shrink-0"></span>
                  <h4 className="font-display font-bold text-sm sm:text-lg">Optional AI Pilot Features</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    "AI-Assisted Catalog: Assistance writing product descriptions, alt text, and comparison tables.",
                    "Sales Intelligence: Dashboards tracking low-conversion items and lost sales from stock-outs.",
                    "Semantic Search: Proof of concept natural-language search vectors and intent discovery.",
                    "AI-Ready Data structures built into PostgreSQL schemas from Phase 1."
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-2.5 sm:gap-3 text-xs sm:text-sm text-ink items-start leading-normal">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-deep mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: DELIVERY PHASES */}
        <section id="phases" className={`reveal ${isVisible ? 'in' : ''} space-y-6 sm:space-y-8`}>
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-blue font-bold">3. Delivery Phases</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-deep mt-2">
              A structured execution timeline
            </h2>
            <p className="text-sm sm:text-base text-muted-text mt-3 sm:mt-4 leading-relaxed">
              We divide execution into four core engineering phases, plus support and AI pilots. Click on any phase to review objectives, activities, and deliverables.
            </p>
          </div>

          <div className="space-y-3 no-print">
            {phases.map((p, idx) => {
              const isOpen = activePhase === idx;
              return (
                <div 
                  key={idx}
                  className={`bg-white border rounded-xl overflow-hidden transition-all shadow-sm ${isOpen ? 'border-brand-blue shadow-[0_4px_12px_rgba(47,91,255,0.06)]' : 'border-border-line hover:border-brand-blue/50'}`}
                >
                  <button 
                    onClick={() => setActivePhase(isOpen ? -1 : idx)}
                    className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                      <span className={`w-8 h-8 rounded-lg font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 ${p.id === 'AI' ? 'bg-brand-amber text-brand-amber-ink' : p.id === 'RET' ? 'bg-gray-400 text-white' : 'bg-deep text-white'}`}>
                        {p.id}
                      </span>
                      <div>
                        <h4 className="font-display font-bold text-sm sm:text-base text-deep leading-tight">{p.name}</h4>
                        <span className="text-xs text-muted-text font-mono mt-0.5 block">{p.dur}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pl-11 sm:pl-0">
                      <span className="font-mono text-xs font-semibold text-deep bg-paper px-2.5 py-1 rounded-md">
                        {p.isRetainer ? `${formatCost(p.cost)} / mo` : formatCost(p.cost)}
                      </span>
                      <svg className={`w-4 h-4 text-muted-text transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {isOpen && (
                    <div className="border-t border-border-line-2 bg-paper/40 p-4 sm:p-6 space-y-4 animate-slide-up">
                      <h5 className="font-mono text-[9px] uppercase tracking-wider text-brand-blue font-bold">Objectives & Key Deliverables:</h5>
                      <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
                        {p.objectives.map((obj, oIdx) => (
                          <div key={oIdx} className="flex gap-2.5 sm:gap-3 text-xs text-ink items-start leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 flex-shrink-0"></span>
                            <span>{obj}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: TECHNOLOGY STACK */}
        <section id="tech" className={`reveal ${isVisible ? 'in' : ''} space-y-6 sm:space-y-8`}>
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-blue font-bold">4. Technology Stack</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-deep mt-2">
              Modern, fast, and maintainable
            </h2>
            <p className="text-sm sm:text-base text-muted-text mt-3 sm:mt-4 leading-relaxed">
              We design bespoke architectures to optimize user load capacity, SEO ranking, and data synchronization.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {[
              {
                title: "Frontend Layer",
                tech: "Next.js (React)",
                desc: "Server-side rendering (SSR) delivers sub-second load times, stellar Google Core Web Vitals, and optimal crawler parsing for local search index ranks.",
                color: "border-l-brand-blue"
              },
              {
                title: "Backend Layer",
                tech: "Laravel or NestJS",
                desc: "Highly robust frameworks featuring enterprise queue systems. Safely schedules catalog synchronizations and parses webhooks in the background.",
                color: "border-l-brand-amber"
              },
              {
                title: "Database Store",
                tech: "PostgreSQL & Redis",
                desc: "Relational integrity handles financial ledger rows while Redis caches active products and active checkouts, maintaining speed under heavy traffic.",
                color: "border-l-brand-green"
              },
              {
                title: "Instant Search Engine",
                tech: "Meilisearch / Typesense",
                desc: "Lightweight, typo-tolerant search nodes. Fetches items instantly as the user types, mimicking global e-commerce user experiences.",
                color: "border-l-purple-600"
              },
              {
                title: "Administration Panel",
                tech: "Custom / Filament Admin",
                desc: "Sleek, responsive dashboard workspace featuring role permissions (RBAC) to manage catalog entries, discount keys, and 1C value mappings.",
                color: "border-l-pink-600"
              },
              {
                title: "Static Media & CDN",
                tech: "S3 & Cloudflare",
                desc: "Cloudflare manages edge-caching, dynamic file optimizations, and active DDoS mitigations, shielding the production cluster.",
                color: "border-l-cyan-600"
              }
            ].map((card, idx) => (
              <div key={idx} className={`bg-white border border-border-line border-l-4 ${card.color} p-5 sm:p-6 rounded-2xl space-y-3 shadow-sm`}>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-text">{card.title}</span>
                <h4 className="font-display font-bold text-base sm:text-lg text-deep">{card.tech}</h4>
                <p className="text-xs text-muted-text leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: COMMERCIAL SUMMARY */}
        <section id="pricing" className={`reveal ${isVisible ? 'in' : ''} space-y-6 sm:space-y-8`}>
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-blue font-bold">5. Pricing Details</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-deep mt-2">
              Budget breakdown and schedules
            </h2>
            <p className="text-sm sm:text-base text-muted-text mt-3 sm:mt-4 leading-relaxed">
              MVP discovery, design, and engineering milestones are committed as fixed fees. Alternate currency column is indicative.
            </p>
          </div>

          <div className="bg-white border border-border-line rounded-2xl overflow-hidden shadow-sm">
            {/* DESKTOP TABLE HEADER */}
            <div className="hidden md:grid grid-cols-12 bg-deep text-white font-mono text-[10px] uppercase tracking-widest p-4 text-left">
              <div className="col-span-6 font-bold">Phase / Deliverable</div>
              <div className="col-span-2 text-right font-bold font-mono">USD Amount</div>
              <div className="col-span-2 text-right font-bold font-mono">GEL (Indicative)</div>
              <div className="col-span-2 text-right font-bold font-mono">Billing Model</div>
            </div>

            {/* RESPONSIVE TABLE ROWS */}
            {pricingRows.map((row, idx) => {
              const isMVP = row.name.includes("MVP Launch Total");
              
              let highlightClass = "";
              if (row.highlight) {
                highlightClass = isMVP 
                  ? "bg-brand-blue-soft/30 font-semibold border-l-2 border-l-brand-amber" 
                  : "bg-brand-green-soft/20 font-semibold border-l-2 border-l-brand-green";
              }
              const highlightDeepClass = row.name.includes("Ongoing Support") ? "bg-paper text-muted-text" : "";
              
              const isSupportRow = row.name.includes("Support");
              
              return (
                <div key={idx}>
                  {/* DESKTOP ROW */}
                  <div className={`hidden md:grid grid-cols-12 p-4 text-xs items-center border-b border-border-line-2 last:border-0 ${highlightClass} ${highlightDeepClass}`}>
                    <div className="col-span-6">
                      <span>{row.name}</span>
                      {row.sub && <span className="block text-[10px] text-muted-text font-normal mt-0.5">{row.sub}</span>}
                    </div>
                    <div className="col-span-2 text-right font-mono font-medium">
                      {isSupportRow ? `${formatDirect(row.usd, ccy)}/mo` : formatDirect(row.usd, ccy)}
                    </div>
                    <div className="col-span-2 text-right font-mono text-muted-text">
                      {isSupportRow ? `${formatDirect(row.usd, ccy === "USD" ? "GEL" : "USD")}/mo` : formatDirect(row.usd, ccy === "USD" ? "GEL" : "USD")}
                    </div>
                    <div className="col-span-2 text-right font-mono text-[10px] uppercase text-muted-text">
                      {row.model}
                    </div>
                  </div>

                  {/* MOBILE ROW */}
                  <div className={`md:hidden flex flex-col gap-2 p-4 border-b border-border-line-2 last:border-0 ${highlightClass} ${highlightDeepClass}`}>
                    <div>
                      <span className="font-semibold text-sm">{row.name}</span>
                      {row.sub && <span className="block text-[10px] text-muted-text font-normal mt-0.5">{row.sub}</span>}
                    </div>
                    <div className="flex items-center justify-between font-mono text-xs mt-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-deep">
                          {isSupportRow ? `${formatDirect(row.usd, ccy)}/mo` : formatDirect(row.usd, ccy)}
                        </span>
                        <span className="text-[10px] text-muted-text">
                          / {isSupportRow ? `${formatDirect(row.usd, ccy === "USD" ? "GEL" : "USD")}/mo` : formatDirect(row.usd, ccy === "USD" ? "GEL" : "USD")}
                        </span>
                      </div>
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded tracking-wide bg-paper text-muted-text">
                        {row.model}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-paper p-5 rounded-2xl border border-border-line text-xs text-muted-text leading-relaxed shadow-sm">
            <strong>Exclusions note:</strong> Quoted figures exclude local VAT and third-party SaaS provider bills (hosting, Cloudflare subscriptions, domain licenses, transactional SMS packs, 1C developer retainers). Capped T&M estimates are defined during discovery for ERP schema mappings or multi-bank webhooks.
          </div>
        </section>

        {/* SECTION 6: PARTNERSHIP EXPECTATIONS */}
        <section className={`reveal ${isVisible ? 'in' : ''} space-y-6 sm:space-y-8`}>
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-blue font-bold">6. Shared Expectations</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-deep mt-2">
              Keeping the build predictable
            </h2>
            <p className="text-sm sm:text-base text-muted-text mt-3 sm:mt-4 leading-relaxed">
              We operate under transparent alignment policies. Explore how we split integration uncertainty and what we need from you.
            </p>
          </div>

          {/* Tab Header */}
          <div className="flex overflow-x-auto scrollbar-none border-b border-border-line no-print -mx-4 px-4 sm:mx-0 sm:px-0 whitespace-nowrap flex-nowrap">
            <button 
              onClick={() => setExpectationTab("risk")} 
              className={`pb-4 px-5 sm:px-6 font-display text-sm font-semibold tracking-tight border-b-2 transition-all flex-shrink-0 cursor-pointer ${expectationTab === "risk" ? "border-brand-amber text-brand-amber font-bold" : "border-transparent text-muted-text hover:text-ink"}`}
            >
              Risk-Shared Items (Time & Materials)
            </button>
            <button 
              onClick={() => setExpectationTab("client")} 
              className={`pb-4 px-5 sm:px-6 font-display text-sm font-semibold tracking-tight border-b-2 transition-all flex-shrink-0 cursor-pointer ${expectationTab === "client" ? "border-brand-blue text-brand-blue font-bold" : "border-transparent text-muted-text hover:text-ink"}`}
            >
              What We Need From You
            </button>
          </div>

          <div className="bg-white border border-border-line rounded-2xl p-5 sm:p-8 shadow-sm">
            {expectationTab === "risk" ? (
              <div className="space-y-4">
                <h4 className="font-display font-bold text-base sm:text-lg text-deep">Capped Risk-Shared Operations</h4>
                <p className="text-xs text-muted-text leading-relaxed">
                  A small subset of database tasks carry extreme unknowns due to target system documentation gaps. To protect you from inflated fixed-price bids, these modules are confirmed during Discovery and handled against agreed caps or separate SOWs:
                </p>
                <div className="space-y-3 pt-2 text-xs">
                  <div className="p-3 bg-paper rounded-lg">
                    <span className="font-bold text-deep block">Complex 1C/ERP synchronization rules</span>
                    <span className="text-muted-text mt-1 block">Configuring transactional write-backs, catalog variant tables, and failover sync scripts.</span>
                  </div>
                  <div className="p-3 bg-paper rounded-lg">
                    <span className="font-bold text-deep block">Multi-bank installments setup</span>
                    <span className="text-muted-text mt-1 block">Development and interest calculations checking beyond the first priority payment provider.</span>
                  </div>
                  <div className="p-3 bg-paper rounded-lg">
                    <span className="font-bold text-deep block">Automated refunds & external listings (Release 2)</span>
                    <span className="text-muted-text mt-1 block">Configuring programmatic webhooks to verify bank returns, or syncing catalog fields for Wolt and Onoff API.</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h4 className="font-display font-bold text-base sm:text-lg text-deep">Project Prerequisites & Inputs</h4>
                <p className="text-xs text-muted-text leading-relaxed">
                  To meet the launch deadline, the engineering team requires active access to your technical environments:
                </p>
                <ul className="list-disc pl-5 text-xs text-muted-text space-y-2.5">
                  <li>Active sample data feeds, product catalog spreadsheets, category lists, and attribute tables.</li>
                  <li>1C/ERP documentation, mock files, and access to a designated technical coordinator.</li>
                  <li>Developer dashboard logins, sandbox credentials, and merchant approvals for Bank / Payment APIs.</li>
                  <li>High-fidelity vector logos, brand assets, product catalog assets, and copywriting texts.</li>
                  <li>Allocation of a single Client Decision-Maker for prompt Figma reviews and phase sign-offs.</li>
                </ul>
              </div>
            )}
          </div>
        </section>

      </main>

      {/* FOOTER CTA */}
      <section id="next" className="bg-gradient-to-br from-deep to-deep-2 text-white py-12 sm:py-16 px-4 sm:px-6 no-print">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-10">
          <div className="space-y-3 sm:space-y-4 max-w-xl text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-amber font-bold">Kickoff Step</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white leading-tight">
              Begin Phase 1: Discovery
            </h2>
            <p className="text-brand-blue-soft text-xs sm:text-sm leading-relaxed">
              Discovery defines the exact MVP scope limits, identifies third-party bank sandbox availability, reviews catalog attributes structures, and delivers the hardened engineering plan.
            </p>
          </div>

          <a 
            href="mailto:hello@theasylum.agency?subject=MetroMart%20Platform%20—%20Discovery" 
            className="flex flex-col items-start bg-brand-amber hover:bg-brand-amber/90 text-deep-2 p-5 sm:p-6 rounded-xl transition-all shadow-[0_4px_20px_rgba(232,161,58,0.25)] hover:-translate-y-0.5 select-none w-full md:w-auto cursor-pointer"
          >
            <span className="font-bold text-base sm:text-lg">Begin Phase 1</span>
            <span className="font-mono text-[10px] sm:text-xs text-brand-amber-ink mt-1">Discovery · $8,000 · 2–3 weeks</span>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-deep-2 border-t border-white/5 py-8 px-4 sm:px-6 text-white text-[11px] sm:text-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="text-brand-blue-soft">
              The Asylum Agency · theasylum.agency · hello@theasylum.agency
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <a href="/proposal" className="text-brand-amber font-semibold hover:underline">
              Switch to Version 6.0 (Latest Release 1 Proposal)
            </a>
          </div>
          <span className="text-brand-blue-soft font-mono text-[9px] sm:text-[10px] uppercase tracking-wider">
            Proposal v4.0 · valid 30 days · USD contractual
          </span>
        </div>
      </footer>
    </div>
  );
}
