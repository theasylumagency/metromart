"use client";

import React, { useState, useEffect } from "react";

// Commercial data — Release 1 offer (Release 2 is intentionally out of the commercial scope)
const MVP_COST = 20000;
const COMMERCE_PACK_COST = 12000;
const STABILIZATION_COST = 9000;
const AI_PILOT_COST = 7500;
const SUPPORT_COST_MONTHLY = 2500;

export default function ProposalPage() {
  // --- STATE ---
  const [includeCriticalCommerce, setIncludeCriticalCommerce] = useState(false);
  const [includeStabilization, setIncludeStabilization] = useState(false);
  const [includeAIPilot, setIncludeAIPilot] = useState(false);
  const [includeSupport, setIncludeSupport] = useState(false);

  const [activePhase, setActivePhase] = useState(0);
  const [scopeTab, setScopeTab] = useState("mvp");
  const [expectationTab, setExpectationTab] = useState("risk");
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animations on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Derived checkbox states
  const isCriticalChecked = includeCriticalCommerce;
  const isStabilizationChecked = includeStabilization;
  const isAIChecked = includeAIPilot;

  // --- PRICING LOGIC (Release 1 only) ---
  const getOneTimeCost = () => {
    let total = MVP_COST;
    if (includeCriticalCommerce) total += COMMERCE_PACK_COST;
    if (includeStabilization) total += STABILIZATION_COST;
    if (includeAIPilot) total += AI_PILOT_COST;
    return total;
  };

  const formatCost = (val, isMonthly = false) => {
    return `$${val.toLocaleString()}${isMonthly ? "/mo" : ""}`;
  };

  // --- DATA ---
  const phases = [
    {
      id: "DSC",
      name: "Discovery & Architecture (separate phase)",
      dur: "~2 weeks · $4,000",
      cost: 4000,
      objectives: [
        "Objective: De-risk the build before any fixed-price commitment. Paid separately; the MVP build is committed only after this phase.",
        "Map the 1C/ERP feed format and confirm stock/price import feasibility with the client's technical contact.",
        "Confirm Bank of Georgia & TBC sandbox availability and merchant-approval status.",
        "Produce the locked SOW, architecture, and a confirmed build scope & price. If conditions differ materially, scope/price are re-baselined — or the client may stop here, having paid only Discovery."
      ]
    },
    {
      id: "MVP",
      name: "Premium MVP Build",
      dur: "12–16 weeks",
      cost: 16000,
      objectives: [
        "Objective: Launch a commercially functional storefront with essential shopping checkout flows and a robust admin dashboard.",
        "Establish UI design system and mobile-first storefront layouts (Homepage, PLP, PDP, Brands).",
        "Implement core product search, attribute filtering, dynamic shopping cart, and unified linear checkout form.",
        "Setup Laravel/Filament administrative dashboard for catalog management, stock import, and order fulfillment.",
        "Integrate Bank of Georgia and TBC standard payment/installment callbacks (subject to bank sandbox access).",
        "Setup GA4/GTM analytics, Meta Pixel tags, Cloudflare security routing, and perform production deployment."
      ]
    },
    {
      id: "CCP",
      name: "Critical Commerce Pack",
      dur: "4–6 weeks",
      cost: COMMERCE_PACK_COST,
      objectives: [
        "Objective: Optimize product discovery, SEO indexation, visitor conversion triggers, and marketing analytics.",
        "SEO Visibility: Enhanced autocomplete search, SEO metadata templates, structured JSON-LD data, sitemaps, and category SEO blocks.",
        "Conversion Merchandising: Promotional product badges, related products widgets, alternative suggestions, and comparison tools.",
        "Retention & Lead Capture: Customer wishlist, 'notify-me-when-available' stock alerts, and lead request forms.",
        "Commerce Analytics: GA4 e-commerce events, GTM event triggers, search query logging, and drop-off analytics."
      ]
    },
    {
      id: "STB",
      name: "Stabilization & Enhancement Sprint",
      dur: "6–8 weeks",
      cost: STABILIZATION_COST,
      objectives: [
        "Objective: Plan a dedicated optimization pass based on real transaction data, users behavior, and admin workflow feedback.",
        "Harden 1C/ERP sync routines and correct catalog schemas and real-data import bugs.",
        "Refine attribute filters, pricing profiles, and index settings based on actual search queries.",
        "Address payment gateway callback edge-case webhook failures and checkout UI bugs.",
        "Refine admin dashboard operational workflows and tune website response caching."
      ]
    },
    {
      id: "AI",
      name: "Optional — AI Catalog & Commerce Intelligence Pilot",
      dur: "Post-Discovery kickoff",
      cost: AI_PILOT_COST,
      objectives: [
        "Objective: Deploy AI catalog automation to drastically reduce administrative product catalog workloads.",
        "AI Content Assistant: Automate copywriting for product descriptions, meta tags, and image alt texts.",
        "Internal Sales Intelligence: Dashboard identifying high-visit but low-conversion items and lost stock-out sales.",
        "AI-ready database schemas structured in PostgreSQL from Phase 1 kickoff."
      ]
    },
    {
      id: "SUP",
      name: "Post-Launch Operational Support",
      dur: "Recommended initial term: 6 months. Renewable after review.",
      cost: SUPPORT_COST_MONTHLY,
      isRetainer: true,
      objectives: [
        "Objective: Maintain system security, callback webhooks, database integrity, and server stability.",
        "Up to 40 hours per month of bug fixes, production supervision, payment callbacks monitoring, and ERP sync status checking.",
        "Includes server performance optimizations, backup checks, minor admin panel adjustments, and monthly technical status reports.",
        "Excludes major new features, new integrations, data entry tasks, or custom client-side 1C scripting."
      ]
    }
  ];

  const pricingRows = [
    { name: "Discovery & Architecture (separate, pre-build)", usd: 4000, model: "100% on signing", sub: "~2 weeks. Delivers the locked SOW; the build is committed only after." },
    { name: "Premium MVP Build (committed after Discovery)", usd: 16000, model: "Milestone payments (40/30/25/5)", sub: "Release 1 MVP total, including Discovery: $20,000." },
    { name: "Critical Commerce Pack (SEO, Merchandising, Analytics)", usd: COMMERCE_PACK_COST, model: "50% start / 50% integration", sub: "Quoted at $15,000 if contracted separately post-launch." },
    { name: "Stabilization & Enhancement Sprint", usd: STABILIZATION_COST, model: "Post-sprint completion", sub: "6–8 weeks duration. Planned optimization pass on real transaction data." },
    { name: "AI Catalog & Commerce Intelligence Pilot Option", usd: AI_PILOT_COST, model: "Start of pilot", sub: "Narrowly scoped catalog automation pilot. Quoted at $12,000 if added later." },
    { name: "Post-Launch Operational Support Retainer", usd: SUPPORT_COST_MONTHLY, model: "Monthly in advance", sub: "Up to 40 hours/month. Recommended initial term: 6 months. Renewable after review." }
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
          <p className="font-bold">Commercial Proposal · Version 6.0</p>
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
            <span className="font-display font-medium text-xs sm:text-sm text-muted-text hidden xs:inline">MetroMart MVP</span>
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
              href="/MetroMart_Proposal_v6.pdf"
              download
              className="px-3 py-1.5 sm:px-4 sm:py-2 border border-border-line rounded-lg text-[10px] sm:text-xs font-semibold hover:border-ink transition-all flex items-center gap-1.5 bg-white shadow-sm text-ink"
            >
              <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Proposal PDF (v6.0)
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
              Strategic Proposal  •  v6.0
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-white">
              Premium Storefront Relaunch — Release 1
            </h1>
            <p className="text-brand-blue-soft text-sm sm:text-lg max-w-xl leading-relaxed">
              A commercially complete storefront launched on a clean, extendable foundation. The enterprise backend is a separate, later conversation — this proposal commits only to Release 1.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1 sm:pt-2">
              {["Premium Storefront", "BoG + TBC Payments", "1C Stock Sync", "GA4 & SEO Ready"].map((badge, idx) => (
                <span key={idx} className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 border border-white/10 bg-white/5 rounded-full text-[10px] sm:text-xs font-mono text-brand-blue-soft">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* DYNAMIC MVP-FIRST CALCULATOR COMPONENT */}
          <div className="lg:col-span-5">
            <div className="glass-card-dark p-5 sm:p-8 rounded-2xl relative overflow-hidden text-white">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-brand-amber">Release 1 — Build Your Package</span>
              </div>

              {/* Main cost display */}
              <div className="space-y-1 mb-5">
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10px] sm:text-xs text-brand-blue-soft font-mono">One-time Project:</span>
                    <span className="font-mono text-3xl sm:text-5xl font-bold tracking-tight text-white transition-all">
                      {formatCost(getOneTimeCost())}
                    </span>
                  </div>
                  {includeSupport && (
                    <div className="flex items-baseline gap-2">
                      <span className="text-[10px] sm:text-xs text-brand-blue-soft font-mono">Support Retainer:</span>
                      <span className="font-mono text-lg sm:text-xl font-bold tracking-tight text-brand-amber">
                        +{formatCost(SUPPORT_COST_MONTHLY)} / mo
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-brand-blue-soft mt-1 leading-normal">
                  Base is the <strong className="text-white">$20k committed MVP storefront</strong>. Tick any optional module to build your Release 1 package — each is priced and contracted separately.
                </p>
              </div>

              {/* Optional module selectors */}
              <div className="border-t border-white/10 pt-4 mb-5 space-y-3 text-[11px] sm:text-xs">
                <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-brand-amber mb-1">Optional Modules</p>

                <label className="flex items-start gap-3 cursor-pointer text-brand-blue-soft hover:text-white transition-all select-none">
                  <input
                    type="checkbox"
                    checked={isCriticalChecked}
                    onChange={(e) => setIncludeCriticalCommerce(e.target.checked)}
                    className="w-4 h-4 rounded accent-brand-amber cursor-pointer mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <span className="block font-semibold text-white">Critical Commerce Pack</span>
                    <span className="block text-[10px] text-brand-blue-soft">Adds {formatCost(COMMERCE_PACK_COST)} (SEO, conversions, analytics)</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer text-brand-blue-soft hover:text-white transition-all select-none">
                  <input
                    type="checkbox"
                    checked={isStabilizationChecked}
                    onChange={(e) => setIncludeStabilization(e.target.checked)}
                    className="w-4 h-4 rounded accent-brand-amber cursor-pointer mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <span className="block font-semibold text-white">Stabilization & Hardening Sprint</span>
                    <span className="block text-[10px] text-brand-blue-soft">Adds {formatCost(STABILIZATION_COST)} post-launch for real-data sync tuning</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer text-brand-blue-soft hover:text-white transition-all select-none">
                  <input
                    type="checkbox"
                    checked={isAIChecked}
                    onChange={(e) => setIncludeAIPilot(e.target.checked)}
                    className="w-4 h-4 rounded accent-brand-amber cursor-pointer mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <span className="block font-semibold text-white">Optional AI Catalog Pilot</span>
                    <span className="block text-[10px] text-brand-blue-soft">Adds {formatCost(AI_PILOT_COST)} for copywriter description assistant</span>
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
                    <span className="block font-semibold text-white">Operational Support Retainer</span>
                    <span className="block text-[10px] text-brand-blue-soft">Adds {formatCost(SUPPORT_COST_MONTHLY)} / month (up to 40 hours/mo, 6-mo term)</span>
                  </div>
                </label>
              </div>

              {/* Key summary stats */}
              <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden text-[10px] sm:text-xs mb-5">
                <div className="bg-deep-2/60 p-2.5 sm:p-3">
                  <span className="text-[9px] font-mono text-brand-blue-soft uppercase tracking-wider block">Project Scope</span>
                  <span className="font-semibold text-brand-amber block mt-0.5 text-[11px] sm:text-xs">
                    Release 1 Storefront
                  </span>
                </div>
                <div className="bg-deep-2/60 p-2.5 sm:p-3">
                  <span className="text-[9px] font-mono text-brand-blue-soft uppercase tracking-wider block">MVP Timeline</span>
                  <span className="font-medium text-white block mt-0.5 text-[11px] sm:text-xs">
                    ~12–16 weeks
                  </span>
                </div>
                <div className="bg-deep-2/60 p-2.5 sm:p-3">
                  <span className="text-[9px] font-mono text-brand-blue-soft uppercase tracking-wider block">Payment Structure</span>
                  <span className="font-medium text-white block mt-0.5 text-[11px] sm:text-xs">
                    Discovery + 40/30/25/5
                  </span>
                </div>
                <div className="bg-deep-2/60 p-2.5 sm:p-3">
                  <span className="text-[9px] font-mono text-brand-blue-soft uppercase tracking-wider block">Support Retainer</span>
                  <span className="font-medium text-white block mt-0.5 text-[11px] sm:text-xs">
                    40 hrs/mo, optional
                  </span>
                </div>
              </div>

              {/* Payment Schedule */}
              <div className="border-t border-white/10 pt-4 mb-5 space-y-2 text-[10px] sm:text-xs">
                <p className="font-mono text-[9px] uppercase tracking-widest text-brand-amber">MVP Payment Breakdown</p>
                <p className="text-[9px] text-brand-blue-soft/80 leading-snug normal-case">Discovery is a separate, paid first step. The $16k build (40/30/25/5) is committed only after Discovery delivers the locked SOW. Release 1 total stays $20k.</p>
                <div className="space-y-1.5 font-mono text-brand-blue-soft">
                  <div className="flex justify-between">
                    <span className="proposal-span">0. Discovery & Architecture (separate, on signing):</span>
                    <span className="text-white font-bold">$4,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="proposal-span">1. Build kickoff (40% of build):</span>
                    <span className="text-white font-bold">$6,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="proposal-span">2. Design & spec signoff (30%):</span>
                    <span className="text-white font-bold">$4,800</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="proposal-span">3. Staging delivery (25%):</span>
                    <span className="text-white font-bold">$4,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="proposal-span">4. Storefront launch (5%):</span>
                    <span className="text-white font-bold">$800</span>
                  </div>

                  {isCriticalChecked && (
                    <div className="flex justify-between text-brand-amber">
                      <span className="proposal-span">Critical Commerce Pack (50% start/50% end):</span>
                      <span className="font-bold">$12,000</span>
                    </div>
                  )}
                  {isStabilizationChecked && (
                    <div className="flex justify-between text-brand-amber">
                      <span className="proposal-span">Stabilization Sprint (Post-completion):</span>
                      <span className="font-bold">$9,000</span>
                    </div>
                  )}
                  {isAIChecked && (
                    <div className="flex justify-between text-brand-amber">
                      <span className="proposal-span">AI Pilot Option (Upon pilot kickoff):</span>
                      <span className="font-bold">$7,500</span>
                    </div>
                  )}
                  {includeSupport && (
                    <div className="flex justify-between text-brand-amber border-t border-white/5 pt-1.5">
                      <span className="proposal-span">Post-Launch Support Retainer:</span>
                      <span className="font-bold">$2,500 / month</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <a
                href="#next"
                className="w-full block text-center py-3.5 bg-brand-amber hover:bg-brand-amber/90 text-deep-2 font-bold rounded-xl transition-all shadow-[0_4px_20px_rgba(232,161,58,0.3)] hover:-translate-y-0.5 text-xs sm:text-sm cursor-pointer"
              >
                Start with Discovery — <span className="font-mono">$4,000</span>
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
                <p className="font-display font-medium text-ink mt-1">23.06.2026</p>
              </div>
              <div>
                <p className="font-bold text-muted-text text-xs uppercase tracking-wider">Proposal Version</p>
                <p className="font-display font-medium text-ink mt-1">Version 6.0</p>
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
              The MetroMart blueprint describes an enterprise-class e-commerce ecosystem. The full blueprint should not be treated as a one-shot build. Our recommendation is to launch a premium customer-facing MVP first, then use real behavior, payment behavior, and operational feedback to expand the platform in controlled stages.
            </p>
            <p className="text-sm sm:text-base text-muted-text mt-2 leading-relaxed">
              The MVP prioritizes the public shopping experience from day one. The frontend is designed to remain the visual foundation of the future platform. Later phases focus mainly on backend depth, automation, integrations, reporting, and operational intelligence.
            </p>
            <p className="text-sm sm:text-base text-muted-text mt-2 leading-relaxed font-semibold text-deep">
              Our strategic path: Launch a premium storefront first. Stabilize on real data. Then expand the backend into a full enterprise commerce platform.
            </p>
            <p className="text-xs sm:text-sm text-muted-text mt-3 leading-relaxed">
              There is one commitment in this proposal — the <strong className="text-deep">$20k Release 1 MVP</strong>. Everything else below is optional, post-launch, and contracted separately: the growth modules and ongoing support. The enterprise backend (Release 2) is deliberately kept out of this contract and shown separately further down as a future direction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-white border border-border-line p-6 rounded-2xl relative overflow-hidden group hover:border-brand-amber transition-all shadow-sm">
              <span className="absolute top-4 right-4 bg-brand-amber/10 text-brand-amber font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold">
                Go-Live
              </span>
              <span className="font-mono text-xs text-muted-text">STAGE · 01</span>
              <h3 className="font-display font-bold text-base sm:text-lg text-deep mt-4 mb-2">MVP Relaunch</h3>
              <p className="text-xs text-muted-text leading-relaxed">
                Commercially usable first version: customer storefront, product attributes grid, checkout, BoG + TBC payments, and a one-way 1C stock/price import.
              </p>
            </div>

            <div className="bg-white border border-border-line p-6 rounded-2xl relative overflow-hidden group hover:border-brand-green transition-all shadow-sm">
              <span className="absolute top-4 right-4 bg-brand-green-soft text-brand-green font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold">
                Optional
              </span>
              <span className="font-mono text-xs text-muted-text">STAGE · 02</span>
              <h3 className="font-display font-bold text-base sm:text-lg text-deep mt-4 mb-2">Growth & Conversion Modules</h3>
              <p className="text-xs text-muted-text leading-relaxed">
                Three à-la-carte add-ons, each priced separately: Critical Commerce Pack (+$12k), Stabilization Sprint (+$9k), and the optional AI Catalog Pilot (+$7.5k).
              </p>
            </div>

            <div className="bg-white border border-border-line p-6 rounded-2xl relative overflow-hidden group hover:border-purple-600 transition-all shadow-sm">
              <span className="absolute top-4 right-4 bg-purple-100 text-purple-600 font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold">
                Operational
              </span>
              <span className="font-mono text-xs text-muted-text">STAGE · 03</span>
              <h3 className="font-display font-bold text-base sm:text-lg text-deep mt-4 mb-2">Operational Support</h3>
              <p className="text-xs text-muted-text leading-relaxed">
                Optional post-launch retainer ($2,500/mo): monitoring, incident resolution, payment-callback analysis, and up to 40 hours per month.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: SCOPE MATRIX */}
        <section id="scope" className={`reveal ${isVisible ? 'in' : ''} space-y-6 sm:space-y-8`}>
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-blue font-bold">2. Scope Matrix</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-deep mt-2">
              Deliverables by stage
            </h2>
            <p className="text-sm sm:text-base text-muted-text mt-3 sm:mt-4 leading-relaxed">
              Feature specifications mapped across the committed MVP Launch and the optional Commerce, Stabilization and AI modules — every item here is part of Release 1.
            </p>
          </div>

          {/* Scope Tab Headers */}
          <div className="flex overflow-x-auto scrollbar-none border-b border-border-line no-print -mx-4 px-4 sm:mx-0 sm:px-0 whitespace-nowrap flex-nowrap">
            <button
              onClick={() => setScopeTab("mvp")}
              className={`pb-4 px-5 sm:px-6 font-display text-xs sm:text-sm font-semibold tracking-tight border-b-2 transition-all flex-shrink-0 cursor-pointer ${scopeTab === "mvp" ? "border-brand-amber text-brand-amber font-bold" : "border-transparent text-muted-text hover:text-ink"}`}
            >
              Premium MVP ($20k)
            </button>
            <button
              onClick={() => setScopeTab("commerce")}
              className={`pb-4 px-5 sm:px-6 font-display text-xs sm:text-sm font-semibold tracking-tight border-b-2 transition-all flex-shrink-0 cursor-pointer ${scopeTab === "commerce" ? "border-brand-green text-brand-green font-bold" : "border-transparent text-muted-text hover:text-ink"}`}
            >
              Commerce Pack (+$12k)
            </button>
            <button
              onClick={() => setScopeTab("stabilization")}
              className={`pb-4 px-5 sm:px-6 font-display text-xs sm:text-sm font-semibold tracking-tight border-b-2 transition-all flex-shrink-0 cursor-pointer ${scopeTab === "stabilization" ? "border-purple-600 text-purple-600 font-bold" : "border-transparent text-muted-text hover:text-ink"}`}
            >
              Stabilization Sprint (+$9k)
            </button>
            <button
              onClick={() => setScopeTab("ai")}
              className={`pb-4 px-5 sm:px-6 font-display text-xs sm:text-sm font-semibold tracking-tight border-b-2 transition-all flex-shrink-0 cursor-pointer ${scopeTab === "ai" ? "border-deep text-deep font-bold" : "border-transparent text-muted-text hover:text-ink"}`}
            >
              Optional AI Pilot (+$7.5k)
            </button>
          </div>

          {/* Tab content list */}
          <div className="bg-white border border-border-line rounded-2xl overflow-hidden p-5 sm:p-8 shadow-sm">
            {scopeTab === "mvp" && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 text-brand-amber">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-brand-amber flex-shrink-0"></span>
                  <h4 className="font-display font-bold text-sm sm:text-lg">Premium MVP Relaunch Scope</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    "Premium Front-End: Responsive mobile-first storefront, Homepage, Category, Brands, PLP, and PDP layouts.",
                    "Search & Filter: Core search logic and basic category, brand, price, and attributes selection.",
                    "Checkout & Ordering: Shopping cart, linear checkout form, and automated customer email confirmations.",
                    "Administration: Laravel/Filament custom admin dashboard, basic order management logs, and basic SEO fields.",
                    "Catalog Tools: Category, brand, and basic attribute tables, product images, and Excel/CSV catalog imports.",
                    "1C Stock Import: One-way, scheduled import of stock & price from a client-provided 1C export in an agreed format. Write-back, real-time bidirectional sync and rollback fail-safe are out of MVP scope.",
                    "Payments: Bank of Georgia AND TBC standard payment/installment callbacks. Both are included; each gateway's timeline depends on the client providing working sandbox credentials and merchant approval.",
                    "Setup & Launch: GA4/GTM analytics, Meta Pixel tags, Cloudflare setup, production deployment, and 30-day bug warranty.",
                    "Bilingual storefront: EN/KA interface framework with Georgian UI. Content translation and copywriting are provided by the client."
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-2.5 sm:gap-3 text-xs sm:text-sm text-ink items-start leading-normal">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-amber mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="proposal-span">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {scopeTab === "commerce" && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 text-brand-green">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-brand-green flex-shrink-0"></span>
                  <h4 className="font-display font-bold text-sm sm:text-lg">Critical Commerce Pack Scope</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    "Search & SEO Visibility: Enhanced search autocomplete, priority filters, SEO metadata templates, structured JSON-LD data, sitemaps, and category SEO blocks.",
                    "Conversion & Merchandising: Promotional product badges, related products widgets, alternative recommendations, featured product blocks, and comparison tools.",
                    "Retention & Lead Capture: Customer wishlist/saved cart, 'notify-me-when-available' stock alerts, lead request forms, and email notification template designs.",
                    "Commerce Analytics: GA4 e-commerce events, GTM event triggers, search query logging, checkout step drop-off analytics, and monthly report templates."
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-2.5 sm:gap-3 text-xs sm:text-sm text-ink items-start leading-normal">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-green mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="proposal-span">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {scopeTab === "stabilization" && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 text-purple-600">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-purple-600 flex-shrink-0"></span>
                  <h4 className="font-display font-bold text-sm sm:text-lg">Stabilization & Enhancement Sprint Scope</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    "Post-launch optimization pass based on real transaction data, users behavior, and admin workflow feedback.",
                    "Harden 1C/ERP sync routines and correct catalog schemas and real-data import bugs.",
                    "Refine attribute filters, pricing profiles, and index settings based on actual search queries.",
                    "Address payment gateway callback edge-case webhook failures and checkout UI bugs.",
                    "Refine admin dashboard operational workflows and tune website response caching."
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-2.5 sm:gap-3 text-xs sm:text-sm text-ink items-start leading-normal">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="proposal-span">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {scopeTab === "ai" && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 text-deep">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-deep flex-shrink-0"></span>
                  <h4 className="font-display font-bold text-sm sm:text-lg">Optional AI Catalog Pilot Scope</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    "AI Catalog Content: Auto-write product description text copy, SEO metadata fields, and image alt attributes.",
                    "Sales Intelligence: Analytics identifying underperforming listings, cart drop-off items, and lost sales from stock-outs.",
                    "Semantic Product Search: Proof of concept testing natural-language query conversions.",
                    "Database optimization: Core tables built vector-ready from Phase 1."
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-2.5 sm:gap-3 text-xs sm:text-sm text-ink items-start leading-normal">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-deep mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="proposal-span" >{item}</span>
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
              We divide execution into structured engineering phases, plus support and AI pilots. Click on any phase to review objectives and activities.
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
                      <span className={`w-8 h-8 rounded-lg font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 ${p.id === 'AI' ? 'bg-brand-amber text-brand-amber-ink' : p.id === 'SUP' ? 'bg-purple-100 text-purple-700' : 'bg-deep text-white'}`}>
                        {p.id}
                      </span>
                      <div>
                        <h4 className="font-display font-bold text-sm sm:text-base text-deep leading-tight">{p.name}</h4>
                        <span className="text-xs text-muted-text font-mono mt-0.5 block">{p.dur}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pl-11 sm:pl-0">
                      <span className="font-mono text-xs font-semibold text-deep bg-paper px-2.5 py-1 rounded-md">
                        {p.isRetainer ? `${formatCost(p.cost)}/mo` : formatCost(p.cost)}
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
                            <span className="proposal-span">{obj}</span>
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
              MVP discovery, design, and engineering milestones are committed as fixed fees in USD. Custom modules are invoiced according to the deliverables checklist.
            </p>
          </div>

          <div className="bg-white border border-border-line rounded-2xl overflow-hidden shadow-sm">
            {/* DESKTOP TABLE HEADER */}
            <div className="hidden md:grid grid-cols-12 bg-deep text-white font-mono text-[10px] uppercase tracking-widest p-4 text-left">
              <div className="col-span-6 font-bold">Phase / Deliverable</div>
              <div className="col-span-3 text-right font-bold font-mono">USD Cost</div>
              <div className="col-span-3 text-right font-bold font-mono">Billing Model</div>
            </div>

            {/* RESPONSIVE TABLE ROWS */}
            {pricingRows.map((row, idx) => {
              const isMVP = row.name.includes("Premium MVP");
              const isPlatform = row.name.includes("Release 2 Complete");

              let highlightClass = "";
              if (isMVP) {
                highlightClass = "bg-brand-amber/5 font-semibold border-l-2 border-l-brand-amber";
              } else if (isPlatform) {
                highlightClass = "bg-brand-blue-soft/30 font-semibold border-l-2 border-l-brand-blue";
              }
              const highlightDeepClass = row.name.includes("Support") ? "bg-paper text-muted-text" : "";

              const isSupportRow = row.name.includes("Support");

              return (
                <div key={idx}>
                  {/* DESKTOP ROW */}
                  <div className={`hidden md:grid grid-cols-12 p-4 text-xs items-center border-b border-border-line-2 last:border-0 ${highlightClass} ${highlightDeepClass}`}>
                    <div className="col-span-6">
                      <span className="proposal-span">{row.name}</span>
                      {row.sub && <span className="block text-[10px] text-muted-text font-normal mt-0.5">{row.sub}</span>}
                    </div>
                    <div className="col-span-3 text-right font-mono font-bold text-deep">
                      {isSupportRow ? `${formatCost(row.usd)}/mo` : formatCost(row.usd)}
                    </div>
                    <div className="col-span-3 text-right font-mono text-[10px] uppercase text-muted-text">
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
                      <span className="font-bold text-deep">
                        {isSupportRow ? `${formatCost(row.usd)}/mo` : formatCost(row.usd)}
                      </span>
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
            <strong>Pricing &amp; Tax Note:</strong> All commercial figures are stated in USD; the GEL equivalent, if required, is calculated at the exchange rate at invoice. The quoted price is the final amount payable — no VAT is added to these figures. They exclude only third-party SaaS/provider bills (hosting, Cloudflare subscriptions, domain licenses, transactional SMS packs, 1C developer retainers).
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
                    <span className="font-bold text-deep block">Bank access dependency (BoG & TBC)</span>
                    <span className="text-muted-text mt-1 block">Both gateways are in the MVP, but each one's timeline depends on the client supplying working sandbox credentials and merchant approval. Client-side delays pause that gateway's timeline (not a breach); if access is unavailable by staging, it ships immediately post-launch without blocking go-live.</span>
                  </div>
                  <div className="p-3 bg-paper rounded-lg">
                    <span className="font-bold text-deep block">Extended installment & write-back logic</span>
                    <span className="text-muted-text mt-1 block">Interest/installment edge-cases beyond standard callbacks, and any 1C write-back, are confirmed during Discovery and handled against agreed caps.</span>
                  </div>
                  <div className="p-3 bg-paper rounded-lg">
                    <span className="font-bold text-deep block">Automated refunds & external listings (future scope)</span>
                    <span className="text-muted-text mt-1 block">Programmatic bank-return webhooks and Wolt/Onoff catalog feeds belong to the separate enterprise engagement, not this contract.</span>
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

          {/* Contractual protections */}
          <div className="pt-2">
            <h4 className="font-display font-bold text-base sm:text-lg text-deep mb-1">Contractual protections (both sides)</h4>
            <p className="text-xs text-muted-text leading-relaxed mb-4 max-w-3xl">
              Clear boundaries keep the engagement predictable and protect both parties. These terms are written into the agreement.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white border border-border-line rounded-xl p-4 shadow-sm">
                <span className="font-bold text-deep block text-sm">Separate, paid Discovery</span>
                <span className="text-xs text-muted-text mt-1 block leading-relaxed">Discovery ($4,000) is its own contract and produces the locked SOW. The $16k build is committed only afterwards. If Discovery reveals materially different integration conditions (1C feed quality, bank API constraints), scope, price and timeline are re-baselined — or the client stops there, having paid only $4,000.</span>
              </div>
              <div className="bg-white border border-border-line rounded-xl p-4 shadow-sm">
                <span className="font-bold text-deep block text-sm">Limitation of liability</span>
                <span className="text-xs text-muted-text mt-1 block leading-relaxed">Total liability is capped at fees paid. No liability for indirect or consequential loss, for third-party outages (banks, 1C, Cloudflare), or for loss arising from client-supplied ERP data.</span>
              </div>
              <div className="bg-white border border-border-line rounded-xl p-4 shadow-sm">
                <span className="font-bold text-deep block text-sm">Cancellation & IP</span>
                <span className="text-xs text-muted-text mt-1 block leading-relaxed">Milestone payments are non-refundable; work to date is billable on cancellation. Intellectual property transfers to the client on full payment.</span>
              </div>
              <div className="bg-white border border-border-line rounded-xl p-4 shadow-sm">
                <span className="font-bold text-deep block text-sm">Warranty scope</span>
                <span className="text-xs text-muted-text mt-1 block leading-relaxed">The 30-day warranty covers defects in delivered, committed scope only — not new features, change requests, or breakage originating on the bank or 1C side.</span>
              </div>
              <div className="bg-white border border-border-line rounded-xl p-4 shadow-sm">
                <span className="font-bold text-deep block text-sm">Data ownership</span>
                <span className="text-xs text-muted-text mt-1 block leading-relaxed">Catalog entry and cleanup of the 2K-attribute / 22K-value dataset, and the blueprint's attribute-validation tooling, are the client's responsibility or separately quoted work — not part of the MVP.</span>
              </div>
              <div className="bg-white border border-border-line rounded-xl p-4 shadow-sm">
                <span className="font-bold text-deep block text-sm">Explicitly out of MVP</span>
                <span className="text-xs text-muted-text mt-1 block leading-relaxed">Load/stress testing, DR rollback fail-safe, full WAF/DDoS hardening &amp; rate-limiting, and CI/E2E pipelines are not in Release 1. "Cloudflare setup" means baseline CDN/SSL routing only.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: PHASE 2 STATEMENT OF READINESS (NON-CONTRACTUAL) */}
        <section id="readiness" className={`reveal ${isVisible ? 'in' : ''}`}>
          <div className="border-2 border-dashed border-border-line rounded-3xl bg-paper/50 p-6 sm:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-muted-text font-bold">Phase 2 · Future Direction</span>
                <h2 className="font-display font-bold text-2xl sm:text-4xl text-deep mt-2">
                  Statement of readiness — the enterprise backend
                </h2>
              </div>
              <span className="self-start sm:self-auto bg-deep text-white font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full font-bold whitespace-nowrap">
                Not part of this proposal
              </span>
            </div>
            <p className="text-sm text-muted-text leading-relaxed max-w-3xl">
              The MetroMart blueprint also describes a deep enterprise backend. We are fully equipped and ready to build it — but it is intentionally <strong className="text-deep">excluded from this contract</strong>. It is a separate engagement, scoped, priced and negotiated on its own once Release 1 is live and proven on real data. Nothing here implies a commitment or a figure today.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {[
                "Automated bank refunds triggered directly from the admin panel.",
                "Bidirectional, hardened 1C/ERP synchronization with validation and rollback fail-safe.",
                "Warehouse stock-ledger tracking and RMA / returns cycles tied to 1C stock levels.",
                "Advanced CRM flows, customer profiles, and automated abandoned-cart re-engagement.",
                "Multi-bank installment logic beyond standard callbacks.",
                "External listing feeds — Wolt, My.ge, Onoff.ge — and marketplace stock sharing.",
                "End-to-end automated testing pipelines and high-capacity load/stress testing.",
                "Full edge security: WAF, DDoS hardening, rate-limiting, and DR backup strategy."
              ].map((item, idx) => (
                <div key={idx} className="flex gap-2.5 sm:gap-3 text-xs sm:text-sm text-ink items-start leading-normal">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-text mt-1.5 flex-shrink-0"></span>
                  <span className="proposal-span">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-text leading-relaxed border-t border-border-line pt-4">
              When MetroMart is ready, this becomes a dedicated Statement of Work with its own discovery, scope and pricing. Treat this section purely as a declaration of capability — a signal that the Release 1 foundation is built to grow into it.
            </p>
          </div>
        </section>

        {/* PRINT ONLY SECTIONS TO CONVERT TO SERIOUS PDF DOCUMENT */}
        <div className="hidden print:block space-y-8 text-xs break-before-page">
          <h2 className="font-display font-bold text-xl text-deep border-b pb-2">Scope Boundaries & Assumptions</h2>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-deep mb-2">Committed Deliverables Included:</h4>
              <ul className="list-disc pl-5 space-y-1 text-muted-text">
                <li>Engineering, interface design, standard QA testing, PM and launch orchestration for committed MVP scope.</li>
                <li>Setup of staging sandbox and production server infrastructure.</li>
                <li>Staged milestone progress updates.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-deep mb-2">Excluded from Release 1 (separate / at cost):</h4>
              <ul className="list-disc pl-5 space-y-1 text-muted-text">
                <li>Server hosting, CDN, domain registration, SSL certificates, paid security plans.</li>
                <li>Internal 1C programming, translations, copywriting, legal and terms page content.</li>
                <li>Bulk catalog data entry and cleanup of the 2K-attribute / 22K-value dataset, and attribute-validation tooling.</li>
                <li>Load/stress testing, DR rollback fail-safe, full WAF/DDoS hardening & rate-limiting, and CI/E2E pipelines.</li>
                <li>The enterprise backend (Release 2) — refunds automation, bidirectional 1C sync, CRM, RMA, marketplace feeds — handled under a separate future agreement.</li>
              </ul>
            </div>
          </div>

          <h2 className="font-display font-bold text-xl text-deep border-b pb-2 mt-8 break-before-page">Detailed Milestone Payment Schedule</h2>
          <div className="border border-border-line rounded-lg overflow-hidden my-4">
            <div className="grid grid-cols-12 bg-paper p-3 font-bold border-b">
              <div className="col-span-8">Phase / Engineering Milestone</div>
              <div className="col-span-4 text-right">Invoiced Amount</div>
            </div>
            <div className="grid grid-cols-12 p-3 border-b">
              <div className="col-span-8">Phase 0 (Discovery & Architecture) — separate contract, 100% on signing</div>
              <div className="col-span-4 text-right">$4,000</div>
            </div>
            <div className="grid grid-cols-12 p-3 border-b">
              <div className="col-span-8">Build M1 — Kickoff (40% of build, committed after Discovery)</div>
              <div className="col-span-4 text-right">$6,400</div>
            </div>
            <div className="grid grid-cols-12 p-3 border-b">
              <div className="col-span-8">Build M2 — Design &amp; spec approval (30% of build)</div>
              <div className="col-span-4 text-right">$4,800</div>
            </div>
            <div className="grid grid-cols-12 p-3 border-b">
              <div className="col-span-8">Build M3 — Staging delivery (25% of build)</div>
              <div className="col-span-4 text-right">$4,000</div>
            </div>
            <div className="grid grid-cols-12 p-3 border-b">
              <div className="col-span-8">Build M4 — Storefront launch (5% of build)</div>
              <div className="col-span-4 text-right">$800</div>
            </div>
            <div className="grid grid-cols-12 p-3 bg-brand-amber/5 font-semibold">
              <div className="col-span-8 font-bold">Release 1 MVP Total (Discovery + Build)</div>
              <div className="col-span-4 text-right font-bold">$20,000</div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-paper rounded-lg border">
            <h4 className="font-bold text-deep mb-1">Change Request Policy</h4>
            <p className="text-muted-text leading-relaxed">
              To preserve delivery deadlines and budget accuracy, any requirement additions or design redirections requested after a phase scope freeze are estimated as distinct Change Requests. The client remains free to authorize development or defer the item to later releases.
            </p>
          </div>

          <div className="mt-4 p-4 bg-paper rounded-lg border">
            <h4 className="font-bold text-deep mb-1">Contractual Protections</h4>
            <ul className="list-disc pl-5 space-y-1 text-muted-text leading-relaxed">
              <li><strong>Separate, paid Discovery:</strong> Discovery ($4,000) is its own contract producing the locked SOW; the $16,000 build is committed only afterwards. If Discovery reveals materially different integration conditions, scope/price/timeline are re-baselined, or the client exits having paid only $4,000.</li>
              <li><strong>Limitation of liability:</strong> total liability capped at fees paid; no liability for indirect/consequential loss, third-party outages (banks, 1C, Cloudflare), or loss from client-supplied ERP data.</li>
              <li><strong>Cancellation & IP:</strong> milestone payments non-refundable; work to date billable; IP transfers on full payment.</li>
              <li><strong>Warranty:</strong> 30-day warranty covers defects in delivered committed scope only — not new features or bank/1C-side breakage.</li>
              <li><strong>Bank dependency:</strong> BoG &amp; TBC are both included; each gateway's timeline depends on client-provided sandbox/merchant access. Client-side delays pause that gateway and do not block go-live.</li>
            </ul>
          </div>
        </div>

      </main>

      {/* FOOTER CTA */}
      <section id="next" className="bg-gradient-to-br from-deep to-deep-2 text-white py-12 sm:py-16 px-4 sm:px-6 no-print">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-10">
          <div className="space-y-3 sm:space-y-4 max-w-xl text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-amber font-bold">Kickoff Step</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white leading-tight">
              Begin with Discovery & Architecture
            </h2>
            <p className="text-brand-blue-soft text-xs sm:text-sm leading-relaxed">
              Discovery defines the exact MVP scope limits, identifies third-party bank sandbox availability, reviews catalog attributes structures, and delivers the hardened engineering plan.
            </p>
          </div>

          <a
            href="mailto:hello@theasylum.agency?subject=MetroMart%20Platform%20—%20MVP%20Relaunch"
            className="flex flex-col items-start bg-brand-amber hover:bg-brand-amber/90 text-deep-2 p-5 sm:p-6 rounded-xl transition-all shadow-[0_4px_20px_rgba(232,161,58,0.25)] hover:-translate-y-0.5 select-none w-full md:w-auto cursor-pointer"
          >
            <span className="font-bold text-base sm:text-lg">Begin Phase 1</span>
            <span className="font-mono text-[10px] sm:text-xs text-brand-amber-ink mt-1">Discovery Phase · $4,000 · ~2 weeks</span>
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
            <a href="/proposal/v4" className="text-brand-amber font-semibold hover:underline">
              Switch to Version 4.0 Proposal
            </a>
          </div>
          <span className="text-brand-blue-soft font-mono text-[9px] sm:text-[10px] uppercase tracking-wider">
            Proposal v6.0 · valid 30 days · USD contractual
          </span>
        </div>
      </footer>
    </div>
  );
}
