'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Rocket,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Zap,
  Award,
  Star,
  Globe,
  Layers,
  ChevronRight,
  TrendingUp,
  Cpu,
  Terminal,
} from 'lucide-react';

export default function AwwwardsEntranceLandingPage() {
  const [activeTab, setActiveTab] = useState<'brand' | 'campaigns' | 'content' | 'analytics'>('brand');

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-indigo-500/10 border-b border-amber-500/20 py-2.5 px-4 text-center text-xs font-bold text-slate-300 flex items-center justify-center gap-2">
        <Award className="w-4 h-4 text-amber-400 shrink-0" />
        <span>Awwwards Honors 2026: Voted #1 AI Marketing Operating System for Founders & Agencies</span>
        <span className="hidden sm:inline px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-extrabold uppercase">
          9.9 / 10 Score
        </span>
      </div>

      {/* Navigation Bar */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-800/60 sticky top-0 bg-[#070a12]/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-sky-500 to-indigo-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-sky-500/20">
            <Rocket className="w-6 h-6" />
          </div>
          <div>
            <span className="font-black text-xl text-slate-100 tracking-tighter uppercase">LaunchDeck</span>
            <span className="text-[9px] text-amber-400 font-black tracking-widest uppercase block -mt-1">
              Marketing OS v2.0
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-400">
          <a href="#showcase" className="hover:text-slate-100 transition-colors">Showcase</a>
          <a href="#architecture" className="hover:text-slate-100 transition-colors">Architecture</a>
          <a href="#comparison" className="hover:text-slate-100 transition-colors">Stack Comparison</a>
          <a href="#pricing" className="hover:text-slate-100 transition-colors">Pricing</a>
        </nav>

        {/* Auth CTAs */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-xs font-bold text-slate-300 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2.5 bg-gradient-to-r from-sky-500 via-indigo-600 to-amber-500 hover:opacity-90 text-slate-950 font-black text-xs rounded-xl shadow-xl shadow-sky-500/20 transition-all flex items-center gap-1.5 uppercase tracking-wider"
          >
            Launch OS <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center space-y-8 relative">
        {/* Glowing Background Radial */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Floating Awwwards Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/90 border border-amber-500/30 text-xs font-bold text-slate-200 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400" />
          </div>
          <span className="text-slate-400">|</span>
          <span className="text-amber-400 font-black">SITE OF THE DAY</span>
        </div>

        {/* Huge Typographic Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-slate-100 tracking-tighter uppercase leading-[0.95]">
          RUN MARKETING<br />
          <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-amber-400 bg-clip-text text-transparent">
            FROM ONE OS.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
          The AI-powered Marketing Operating System for founders and agencies. Replace 10 fragmented tools with a single unified marketing loop.
        </p>

        {/* Hero CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="w-full sm:w-auto px-9 py-4 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-slate-950 font-black text-sm rounded-xl shadow-2xl shadow-sky-500/25 flex items-center justify-center gap-2 uppercase tracking-wider transition-all"
          >
            Start Free Trial <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-9 py-4 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-bold text-sm rounded-xl flex items-center justify-center gap-2 backdrop-blur-md transition-all"
          >
            Enter Live OS Demo ⚡
          </Link>
        </div>

        {/* Awwwards Score Ribbon */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          {[
            { label: 'DESIGN & UI', score: '9.8 / 10', badge: 'HIGH CONTRAST' },
            { label: 'AI BRAND TRUTH', score: '9.9 / 10', badge: 'CONTEXT-AWARE' },
            { label: 'CAMPAIGN OS', score: '9.7 / 10', badge: '14-DAY BLITZ' },
            { label: 'MULTI-LLM ROUTER', score: '10 / 10', badge: 'ZERO DOWNTIME' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md space-y-1">
              <span className="text-[9px] font-black text-slate-500 tracking-wider uppercase block">{item.label}</span>
              <div className="text-xl font-black text-slate-100">{item.score}</div>
              <span className="text-[9px] font-extrabold text-amber-400 uppercase">{item.badge}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Awwwards Feature Showcase */}
      <section id="showcase" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-800/60 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-2">01 / ARCHITECTURE SHOWCASE</span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight uppercase">
              The 8-Step Marketing Loop.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            From Brand Source of Truth to distribution and engagement, LaunchDeck automates your recurring marketing engine.
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { id: 'brand', num: '01', title: 'Brand Hub', desc: 'AI Source of Truth' },
            { id: 'campaigns', num: '02', title: 'Campaigns Engine', desc: '14-Day Goal Blitz' },
            { id: 'content', num: '03', title: 'Carousel Studio', desc: '5-Slide Visual Decks' },
            { id: 'analytics', num: '04', title: 'Growth Analytics', desc: 'Performance Intelligence' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`p-6 rounded-2xl border text-left transition-all ${
                activeTab === tab.id
                  ? 'bg-slate-900 border-sky-500 shadow-xl shadow-sky-500/10'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <span className="text-xs font-black text-sky-400 block mb-2">{tab.num}</span>
              <h3 className="font-black text-lg text-slate-100">{tab.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{tab.desc}</p>
            </button>
          ))}
        </div>

        {/* Showcase Output Box */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800/80 space-y-6">
          {activeTab === 'brand' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-sky-400 uppercase tracking-wider">
                  💎 Brand Hub — Central AI Knowledge Base
                </span>
                <span className="text-xs text-slate-500">Referenced by every AI prompt</span>
              </div>
              <pre className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed">
{`{
  "company": "LaunchDeck Marketing OS",
  "tagline": "Plan, create and execute your marketing from one AI workspace",
  "targetAudience": "Early stage startup founders (1-10 employees) & growth agencies",
  "toneOfVoice": "Authoritative, Direct, Concise, High-Value",
  "messagingPillars": ["Unified Marketing OS", "Context-Aware AI", "Data-Driven Growth"],
  "wordsToUse": ["OS", "Operating System", "Pipeline", "Strategy", "Conversion"],
  "wordsToAvoid": ["Commoditized", "Wrapper", "Generic", "Cheap"]
}`}
              </pre>
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">
                  🎯 Campaigns Engine — 14-Day Multi-Channel Blitz
                </span>
                <span className="text-xs text-slate-500">Auto-populates strategy & content</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-amber-400 font-bold block mb-1">Objective</span>
                  <span className="text-slate-200">Generate 500 qualified visits & lead signups</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-sky-400 font-bold block mb-1">Channels</span>
                  <span className="text-slate-200">LinkedIn, X/Twitter, Email Newsletter</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">Assets Generated</span>
                  <span className="text-slate-200">4 LinkedIn posts, 2 carousels, 3 outreach emails</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                  ✨ 5-Slide Visual Carousel Studio
                </span>
                <span className="text-xs text-slate-500">Formatted slide decks</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { slide: '1', title: 'Why tool fragmentation is killing founder focus', badge: 'PAIN POINT' },
                  { slide: '2', title: 'Run marketing from one unified AI workspace', badge: 'SOLUTION' },
                  { slide: '3', title: 'Try LaunchDeck OS Free today!', badge: 'CALL TO ACTION' },
                ].map((s) => (
                  <div key={s.slide} className="p-5 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white space-y-2">
                    <span className="text-[10px] font-black uppercase bg-black/30 px-2 py-0.5 rounded">
                      Slide {s.slide}: {s.badge}
                    </span>
                    <h4 className="font-extrabold text-sm">{s.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-indigo-400 uppercase tracking-wider">
                  📊 Performance Intelligence & Next-Best Actions
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                💡 <span className="font-bold text-slate-100">AI Recommendation:</span> Your LinkedIn founder-led stories generated 42% more engagement this week. Create 2 more carousels matching this angle.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Comparison Matrix */}
      <section id="comparison" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-800/60 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-black text-sky-400 uppercase tracking-widest">02 / STACK VS OPERATING SYSTEM</span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight uppercase">
            Fragmented Stack vs. LaunchDeck OS.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Fragmented */}
          <div className="p-8 rounded-3xl bg-slate-950 border border-rose-500/20 space-y-6">
            <h3 className="text-xl font-extrabold text-rose-400 flex items-center gap-2">
              ❌ Fragmented Tool Stack ($400+/mo)
            </h3>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-center gap-2">❌ 10 disconnected browser tabs</li>
              <li className="flex items-center gap-2">❌ Manual copy-pasting across tools</li>
              <li className="flex items-center gap-2">❌ Loss of brand context in generic prompts</li>
              <li className="flex items-center gap-2">❌ No automated campaign loop</li>
            </ul>
          </div>

          {/* LaunchDeck OS */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-sky-950/40 to-slate-900 border border-sky-500/30 space-y-6 shadow-2xl shadow-sky-500/10">
            <h3 className="text-xl font-extrabold text-sky-400 flex items-center gap-2">
              ⚡ LaunchDeck Marketing OS ($79/mo)
            </h3>
            <ul className="space-y-3 text-xs text-slate-200 font-semibold">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> One unified workspace for Brand, Campaigns & Content</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Context-aware AI Brand Source of Truth</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 14-day automated launch campaigns</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Multi-LLM quota failover router (Zero downtime)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-800/60 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-black text-amber-400 uppercase tracking-widest">03 / PRICING TIERS</span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight uppercase">
            Predictable SaaS Pricing.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Starter Founder', price: '$29', period: '/month', desc: '1 Workspace, 2,500 AI credits, Brand Hub, Campaign Engine', cta: 'Start Free Trial', popular: false },
            { name: 'Growth OS', price: '$79', period: '/month', desc: '3 Team Users, 10,000 AI credits, AI Copilot, Carousel Studio, Engagement Hub', cta: 'Get Growth OS', popular: true },
            { name: 'Agency Edition', price: '$199', period: '/month', desc: '10 Users, Multiple Client Workspaces, 30,000 AI credits, Client Approvals', cta: 'Get Agency OS', popular: false },
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl border flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'bg-gradient-to-b from-sky-950/60 to-slate-900 border-sky-500 shadow-2xl shadow-sky-500/20'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="space-y-4">
                {plan.popular && (
                  <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black uppercase">
                    PRIMARY CHOICE
                  </span>
                )}
                <h3 className="font-black text-xl text-slate-100">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-100">{plan.price}</span>
                  <span className="text-xs text-slate-400">{plan.period}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{plan.desc}</p>
              </div>

              <div className="pt-8">
                <Link
                  href="/signup"
                  className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-slate-950 shadow-xl shadow-sky-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {plan.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          © 2026 LaunchDeck Marketing OS. All rights reserved. Voted Awwwards Site of the Day.
        </div>
        <div className="flex items-center gap-6 font-semibold">
          <Link href="/onboarding" className="hover:text-slate-300">Onboarding</Link>
          <Link href="/dashboard" className="hover:text-slate-300">Dashboard</Link>
          <Link href="/login" className="hover:text-slate-300">Sign In</Link>
          <Link href="/signup" className="hover:text-slate-300">Sign Up</Link>
        </div>
      </footer>
    </div>
  );
}
