'use client';

import Link from 'next/link';
import { Rocket, Sparkles, Check, ArrowRight, Shield, Layers, Zap, Target, BarChart2 } from 'lucide-react';

export default function PublicLandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-slate-950">
      {/* Navigation Bar */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-amber-500 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-sky-500/20">
            <Rocket className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-lg text-slate-100 tracking-tight">LaunchDeck</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/onboarding" className="text-xs font-bold text-slate-300 hover:text-white transition-colors">
            Log In
          </Link>
          <Link
            href="/onboarding"
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-600/20 transition-all"
          >
            Start Free →
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Market Ready AI Marketing OS v2.0
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight leading-tight">
          Your AI marketing team,<br />
          <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-amber-400 bg-clip-text text-transparent">
            in one workspace.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Plan campaigns, create multi-channel content, engage your audience, and understand what's working without juggling a dozen fragmented tools.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-extrabold text-sm rounded-xl shadow-xl shadow-sky-600/25 flex items-center justify-center gap-2"
          >
            Start Free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-sm rounded-xl flex items-center justify-center gap-2"
          >
            Open Live Workspace Demo
          </Link>
        </div>
      </section>

      {/* Tool Comparison Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">Stop managing marketing across 10 different tools.</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">Replace fragmented workflows with a single unified operating loop.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Before */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-rose-500/20 space-y-4">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">Before LaunchDeck (Fragmented Stack)</span>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 font-mono">
              <div className="p-2 rounded bg-slate-950 border border-slate-800">❌ ChatGPT</div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">❌ Canva</div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">❌ Notion</div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">❌ Buffer</div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">❌ Apollo</div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">❌ Google Sheets</div>
            </div>
          </div>

          {/* After */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-sky-950/40 to-slate-900 border border-sky-500/30 space-y-4 shadow-xl shadow-sky-500/10">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">After LaunchDeck (Unified Marketing OS)</span>
            <div className="space-y-2 text-xs text-slate-200">
              <div className="flex items-center gap-2 font-bold"><Check className="w-4 h-4 text-emerald-400" /> Brand Source of Truth</div>
              <div className="flex items-center gap-2 font-bold"><Check className="w-4 h-4 text-emerald-400" /> Goal-Driven 14-Day Campaigns</div>
              <div className="flex items-center gap-2 font-bold"><Check className="w-4 h-4 text-emerald-400" /> Multi-Platform Content & 5-Slide Carousels</div>
              <div className="flex items-center gap-2 font-bold"><Check className="w-4 h-4 text-emerald-400" /> Social Inbox & Automated Comment Replies</div>
              <div className="flex items-center gap-2 font-bold"><Check className="w-4 h-4 text-emerald-400" /> Growth Performance Intelligence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-800 text-center text-xs text-slate-500">
        © 2026 LaunchDeck OS. All rights reserved.
      </footer>
    </div>
  );
}
