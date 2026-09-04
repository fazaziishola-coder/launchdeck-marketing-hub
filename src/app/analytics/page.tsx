'use client';

import { useEffect, useState } from 'react';
import { BarChart3, Megaphone, Target, Sparkles, Layers } from 'lucide-react';

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto animate-pulse">
        <div className="h-16 bg-white/[0.03] rounded-xl border border-white/[0.06]" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-white/[0.03] rounded-xl border border-white/[0.06]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 mb-1.5">
          <BarChart3 className="w-4 h-4" />
          <span>Performance Telemetry</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
          Growth &middot; Intelligence
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Measure cross-channel campaign reach, audience retention, and automated conversion benchmarks.
        </p>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-[#0c0f18] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Total Impressions</span>
            <Megaphone className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 tracking-tight">48,290</div>
          <p className="text-[10px] font-mono text-emerald-400">+24.5% vs previous 30d</p>
        </div>

        <div className="p-5 rounded-xl bg-[#0c0f18] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Qualified Leads</span>
            <Target className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 tracking-tight">342</div>
          <p className="text-[10px] font-mono text-emerald-400">+18.2% conversion rate</p>
        </div>

        <div className="p-5 rounded-xl bg-[#0c0f18] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">AI Generation Units</span>
            <Sparkles className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 tracking-tight">3,450</div>
          <p className="text-[10px] font-mono text-slate-400">10,000 monthly quota</p>
        </div>

        <div className="p-5 rounded-xl bg-[#0c0f18] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Active Sprints</span>
            <Layers className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 tracking-tight">
            {data?.campaignsCount || 1}
          </div>
          <p className="text-[10px] font-mono text-sky-400">100% on schedule</p>
        </div>
      </div>

      {/* AI Performance Intelligence Box */}
      <div className="p-6 rounded-xl bg-[#0c0f18] border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <h2 className="text-sm font-bold text-slate-100 tracking-tight">
              Actionable Performance Intelligence
            </h2>
          </div>
          <span className="font-mono text-[10px] text-slate-400">Telemetry Feed</span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-lg bg-[#080a11] border border-white/[0.06] flex items-start gap-3">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[10px] uppercase shrink-0">
              TOP PERFORMER
            </span>
            <div>
              <span className="font-semibold text-slate-200 block mb-0.5">
                Founder-Led Narrative Hooks on LinkedIn
              </span>
              <p className="text-slate-400 leading-relaxed">
                Posts starting with founder decision rationales registered 2.4x more bookmark saves and reply depth over the last 30 days.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#080a11] border border-white/[0.06] flex items-start gap-3">
            <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono text-[10px] uppercase shrink-0">
              OPTIMIZATION
            </span>
            <div>
              <span className="font-semibold text-slate-200 block mb-0.5">
                5-Slide Visual Decks vs Text Threads
              </span>
              <p className="text-slate-400 leading-relaxed">
                Carousels converted to landing page clicks at 4.2% versus 1.8% for text-only threads.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
