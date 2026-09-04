'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Rocket,
  ArrowRight,
  ShieldCheck,
  Target,
  Sparkles,
  BarChart2,
  Check,
  Terminal,
  Zap,
} from 'lucide-react';

export default function LandingPage() {
  const [activeEngine, setActiveEngine] = useState<'brand' | 'campaign' | 'carousel'>('brand');

  return (
    <div className="min-h-screen bg-[#080a11] text-slate-100">
      {/* Top Navigation */}
      <header className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between border-b border-white/[0.08] sticky top-0 bg-[#080a11]/90 backdrop-blur-md z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-bold shrink-0">
            <Rocket className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base tracking-tight text-slate-100">LaunchDeck</span>
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-slate-400">
              v2.0
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-400">
          <a href="#engines" className="hover:text-slate-200 transition-colors">Core Engines</a>
          <a href="#workflow" className="hover:text-slate-200 transition-colors">14-Day Loop</a>
          <a href="#stack" className="hover:text-slate-200 transition-colors">Stack Integration</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-xs font-medium text-slate-400 hover:text-slate-200 px-3 py-1.5 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-sky-400 hover:bg-sky-300 text-sky-950 font-semibold text-xs rounded-lg transition-colors btn-tactile shadow-sm flex items-center gap-1.5"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section: Asymmetric Split Layout */}
      <section className="max-w-7xl mx-auto px-6 pt-20 md:pt-28 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100dvh-4.5rem)]">
        {/* Left Column: Copy & Actions */}
        <div className="lg:col-span-6 space-y-6">
          {/* Headline (strictly max 2 lines desktop, leading-tight, no kicker) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.08]">
            Run recurring marketing.<br />
            <span className="text-sky-400">From one system.</span>
          </h1>

          {/* Subtext (strictly 18 words, max 20 words cap) */}
          <p className="text-base text-slate-400 leading-relaxed max-w-[48ch]">
            Replace fragmented marketing stacks with a unified loop: Brand Truth, 14-day campaign blitzes, and automated multi-channel generation.
          </p>

          {/* Single CTA Intent */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/signup"
              className="px-6 py-3 bg-sky-400 hover:bg-sky-300 text-sky-950 font-semibold text-sm rounded-lg transition-colors btn-tactile flex items-center justify-center gap-2 shadow-sm"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="px-5 py-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-slate-200 font-medium text-sm rounded-lg transition-colors btn-tactile flex items-center justify-center gap-2"
            >
              Explore Live Demo
            </Link>
          </div>

          <div className="pt-4 flex items-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" /> Deploy in under 5 minutes
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Live OS Engine Preview */}
        <div className="lg:col-span-6">
          <div className="rounded-xl border border-white/[0.08] bg-[#0c0f18] shadow-2xl overflow-hidden">
            {/* Window Topbar */}
            <div className="px-4 py-3 border-b border-white/[0.06] bg-[#080a11] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.12]" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.12]" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.12]" />
                <span className="text-[11px] text-slate-400 ml-2">launchdeck-os.internal</span>
              </div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Active Pipeline</span>
              </div>
            </div>

            {/* Interactive Engine Tabs */}
            <div className="p-2 border-b border-white/[0.06] bg-[#0c0f18] grid grid-cols-3 gap-1">
              {[
                { id: 'brand', label: 'Brand Vault', icon: ShieldCheck },
                { id: 'campaign', label: '14-Day Sprints', icon: Target },
                { id: 'carousel', label: 'Carousel Studio', icon: Sparkles },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeEngine === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveEngine(tab.id as any)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors btn-tactile ${
                      isActive
                        ? 'bg-white/[0.06] text-sky-400 font-semibold border border-white/[0.08]'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Engine Tab Content Panels */}
            <div className="p-5 min-h-[300px] flex flex-col justify-between">
              {activeEngine === 'brand' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">Brand Source of Truth (JSON)</span>
                    <span className="font-mono text-[10px] text-slate-400">Context synced across all agents</span>
                  </div>
                  <pre className="p-4 rounded-lg bg-[#080a11] border border-white/[0.06] font-mono text-[11px] text-slate-300 leading-relaxed overflow-x-auto">
{`{
  "brand": "LaunchDeck OS",
  "voice": "Authoritative, Direct, Concise",
  "audience": "High-velocity B2B founders & growth teams",
  "pillars": ["Unified OS", "Context-Aware AI", "14-Day Loop"],
  "bannedWords": ["Commoditized", "Wrapper", "Synergy"]
}`}
                  </pre>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Enforced across LinkedIn, Twitter/X, and outreach drafts</span>
                  </div>
                </div>
              )}

              {activeEngine === 'campaign' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">Q3 Launch Blitz &middot; Sprint 2</span>
                    <span className="font-mono text-[10px] text-sky-400">Day 6 of 14</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-mono text-slate-400">
                      <span>Pipeline Progress</span>
                      <span>12 / 18 Assets Published</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full bg-sky-400 rounded-full w-[66%]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                    <div className="p-3 rounded-lg bg-[#080a11] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-slate-400 block">LinkedIn</span>
                      <span className="font-bold text-slate-100">6 Posts live</span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#080a11] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-slate-400 block">Carousels</span>
                      <span className="font-bold text-slate-100">3 Visual decks</span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#080a11] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-slate-400 block">Direct Leads</span>
                      <span className="font-bold text-emerald-400">+142 Signups</span>
                    </div>
                  </div>
                </div>
              )}

              {activeEngine === 'carousel' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">5-Slide Interactive Deck Builder</span>
                    <span className="font-mono text-[10px] text-slate-400">Automated slide flow</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-3 rounded-lg bg-[#080a11] border border-white/[0.06] space-y-1">
                      <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400">
                        Slide 1
                      </span>
                      <p className="font-medium text-[11px] text-slate-200 pt-1">The cost of tool fragmentation</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#080a11] border border-sky-400/30 space-y-1">
                      <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 font-semibold">
                        Slide 2
                      </span>
                      <p className="font-medium text-[11px] text-slate-200 pt-1">One unified marketing loop</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#080a11] border border-white/[0.06] space-y-1">
                      <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400">
                        Slide 3
                      </span>
                      <p className="font-medium text-[11px] text-slate-200 pt-1">Automated distribution</p>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-sky-500/[0.06] border border-sky-500/20 text-[11px] text-sky-300 flex items-center justify-between">
                    <span>Export ready for LinkedIn PDF Carousels</span>
                    <span className="font-mono text-[10px]">1080 &times; 1350</span>
                  </div>
                </div>
              )}

              {/* Bottom Quick-Bar */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-slate-400">Engine status: Operational</span>
                <Link
                  href="/signup"
                  className="font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
                >
                  Configure your workspace &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authentic Trust Strip (Logo-Only Rule: No Category Labels) */}
      <section className="border-y border-white/[0.08] bg-[#0c0f18]/60 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-8">
            Engineered for modern teams deploying on modern stacks
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all">
            {/* Real SVG brand marks */}
            <div className="flex items-center gap-2 text-slate-300 font-bold text-sm tracking-tight">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 22.525H0l12-21.05 12 21.05z" />
              </svg>
              <span>Vercel</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-bold text-sm tracking-tight">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.4 12.879.4 6.942.4 2.923 3.513 2.923 8.358c0 5.43 4.887 7.025 8.448 8.384 2.502.955 3.356 1.644 3.356 2.656 0 .973-.834 1.516-2.28 1.516-2.556 0-5.32-1.077-7.234-2.138l-.946 5.578c1.947.886 4.978 1.488 7.98 1.488 6.478 0 10.73-3.08 10.73-8.282 0-5.46-4.908-7.078-9.001-8.39z" />
              </svg>
              <span>Stripe</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-bold text-sm tracking-tight">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M21.362 9.354H12V.316a.316.316 0 0 0-.546-.217L.637 12.927a.316.316 0 0 0 .227.535H12v9.038a.316.316 0 0 0 .546.217l10.817-12.828a.316.316 0 0 0-.227-.535z" />
              </svg>
              <span>Supabase</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-bold text-sm tracking-tight">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M3.284 12.001a8.716 8.716 0 1 1 17.432 0 8.716 8.716 0 0 1-17.432 0zm1.743 0a6.973 6.973 0 1 0 13.946 0 6.973 6.973 0 0 0-13.946 0z" />
              </svg>
              <span>Linear</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-bold text-sm tracking-tight">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67zM22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l10.072 6.198a.75.75 0 0 0 .856 0L22.5 6.908z" />
              </svg>
              <span>Resend</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Engines (Bento Grid with Compositional Rhythm) */}
      <section id="engines" className="max-w-7xl mx-auto px-6 py-24 space-y-12">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Four specialized engines.<br />
            Synchronized into one loop.
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Eliminate context loss between copywriters, campaign managers, and distribution channels.
          </p>
        </div>

        {/* Bento Grid (Asymmetric Tile Sizes & Visual Variation) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Card 1: Brand Truth (Col 7) */}
          <div className="md:col-span-7 rounded-xl border border-white/[0.08] bg-[#0c0f18] p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 tracking-tight">
                Brand Hub &middot; Unified Source of Truth
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-[55ch]">
                Define tone parameters, audience pain points, and forbidden phrasing once. Every asset generated across the company adheres to the same brand standards.
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-[#080a11] border border-white/[0.06] font-mono text-[11px] text-slate-300 flex flex-wrap gap-2">
              <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Tone: Direct &amp; Authoritative
              </span>
              <span className="px-2 py-0.5 rounded bg-white/[0.05] text-slate-300">Audience: B2B Founders</span>
              <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                Zero Generic Jargon
              </span>
            </div>
          </div>

          {/* Card 2: 14-Day Blitz Engine (Col 5) */}
          <div className="md:col-span-5 rounded-xl border border-white/[0.08] bg-[#0c0f18] p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 tracking-tight">
                14-Day Blitz Planner
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Turn product milestones into structured marketing sprints with pre-scheduled distribution across LinkedIn, X, and newsletters.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#080a11] border border-white/[0.06] space-y-2">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Milestone Sprint</span>
                <span className="text-emerald-400 font-semibold">14 Days Planned</span>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                  <div
                    key={d}
                    className={`h-2 rounded-xs ${d <= 4 ? 'bg-sky-400' : 'bg-white/[0.08]'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Visual Decks & Content Studio (Col 5) */}
          <div className="md:col-span-5 rounded-xl border border-white/[0.08] bg-[#0c0f18] p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 tracking-tight">
                Multi-Channel Content Studio
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generate high-conversion copy and slide decks tailored to each platform's native formatting requirements.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06]">LinkedIn Carousels</span>
              <span className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06]">Short-form X</span>
              <span className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06]">Email Notes</span>
            </div>
          </div>

          {/* Card 4: Feedback Loop & Analytics (Col 7) */}
          <div className="md:col-span-7 rounded-xl border border-white/[0.08] bg-[#0c0f18] p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <BarChart2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 tracking-tight">
                Continuous Performance Intelligence
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-[55ch]">
                Inspect what resonates. The intelligence router analyzes post traction and automatically refines future hooks and content generation.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-[#080a11] border border-white/[0.06]">
                <span className="font-mono text-[10px] text-slate-400 block">Avg Engagement</span>
                <span className="font-bold text-slate-100 text-sm">4.8%</span>
              </div>
              <div className="p-3 rounded-lg bg-[#080a11] border border-white/[0.06]">
                <span className="font-mono text-[10px] text-slate-400 block">Lead Conversion</span>
                <span className="font-bold text-emerald-400 text-sm">18.4%</span>
              </div>
              <div className="p-3 rounded-lg bg-[#080a11] border border-white/[0.06]">
                <span className="font-mono text-[10px] text-slate-400 block">Time Saved</span>
                <span className="font-bold text-sky-400 text-sm">14 hrs / wk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Conversion Section (Strict single intent: Start Free Trial) */}
      <section className="border-t border-white/[0.08] bg-[#0c0f18]/40 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Stop stitching disjointed marketing tools.
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Unify brand messaging, campaign planning, and automated asset delivery into one operating center today.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="px-6 py-3 bg-sky-400 hover:bg-sky-300 text-sky-950 font-semibold text-sm rounded-lg transition-colors btn-tactile shadow-sm flex items-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="px-5 py-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-slate-200 font-medium text-sm rounded-lg transition-colors btn-tactile"
            >
              Sign In to Workspace
            </Link>
          </div>
        </div>
      </section>

      {/* Clean Minimalist Footer */}
      <footer className="border-t border-white/[0.08] py-8 max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-200">LaunchDeck</span>
          <span className="font-mono text-[10px]">&copy; {new Date().getFullYear()} LaunchDeck Marketing OS.</span>
        </div>
        <div className="flex items-center gap-6 font-mono text-[11px]">
          <Link href="/dashboard" className="hover:text-slate-200 transition-colors">Demo</Link>
          <Link href="/login" className="hover:text-slate-200 transition-colors">Sign In</Link>
          <Link href="/signup" className="hover:text-slate-200 transition-colors">Sign Up</Link>
        </div>
      </footer>
    </div>
  );
}
