'use client';

import { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Target, Megaphone, Users, Award, Sparkles, Layers } from 'lucide-react';

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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-emerald-400" /> Growth & Performance Intelligence
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Measure campaign reach, lead conversions, content engagement, and AI performance intelligence.
        </p>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Total Reach & Impressions</span>
            <Megaphone className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-100">48,290</div>
          <p className="text-[10px] text-emerald-400 font-semibold">+24.5% vs previous 30 days</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Qualified Leads</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">342</div>
          <p className="text-[10px] text-emerald-400 font-semibold">+18.2% conversion rate</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">AI Credits Used</span>
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-100">3,450</div>
          <p className="text-[10px] text-slate-500 font-semibold">10,000 credit monthly quota</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Active Campaigns</span>
            <Layers className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-100">{data?.campaignsCount || 1}</div>
          <p className="text-[10px] text-sky-400 font-semibold">100% execution score</p>
        </div>
      </div>

      {/* AI Performance Intelligence Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/40 via-slate-900 to-slate-900 border border-sky-500/20 space-y-4">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" /> AI Insights: What Should You Do Next?
        </h2>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
            <span className="p-1 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[10px] uppercase">
              TOP PERFORMER
            </span>
            <div>
              <span className="font-bold text-slate-200 block">Founder-Led Stories on LinkedIn</span>
              <span className="text-slate-400">
                Founder-led posts generated 2.4x more engagement than product announcements over the last 30 days.
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
            <span className="p-1 rounded bg-sky-500/10 text-sky-400 font-bold text-[10px] uppercase">
              OPTIMIZATION
            </span>
            <div>
              <span className="font-bold text-slate-200 block">5-Slide Visual Carousels</span>
              <span className="text-slate-400">
                Carousels had a 4.2% click-through rate to landing pages versus 1.8% for text-only threads.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
