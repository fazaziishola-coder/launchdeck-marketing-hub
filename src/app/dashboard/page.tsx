'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Megaphone,
  TrendingUp,
  Target,
  Layers,
  ArrowUpRight,
  Plus,
  Calendar,
  Sparkles,
} from 'lucide-react';

export default function DashboardPage() {
  const [workspace, setWorkspace] = useState<any>(null);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/dashboard');
      const data = await res.json();
      if (data.workspace) setWorkspace(data.workspace);
      if (Array.isArray(data.campaigns)) setCampaigns(data.campaigns);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8 max-w-7xl mx-auto animate-pulse">
        <div className="h-20 bg-white/[0.03] rounded-xl border border-white/[0.06]" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-white/[0.03] rounded-xl border border-white/[0.06]" />
          ))}
        </div>
        <div className="h-44 bg-white/[0.03] rounded-xl border border-white/[0.06]" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 mb-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Brand Source of Truth Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            Marketing Command Center
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Real-time status of your autonomous campaigns, content pipeline, and audience reach.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/content"
            className="px-3.5 py-2 rounded-lg text-xs font-medium text-slate-200 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-colors btn-tactile"
          >
            Generate Content
          </Link>
          <Link
            href="/campaigns"
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-sky-400 hover:bg-sky-300 text-slate-950 transition-colors btn-tactile shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Campaign</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Published Content', value: '24', change: '+18% this month', icon: Megaphone },
          { label: 'Avg Engagement Rate', value: '4.8%', change: '+1.2% this week', icon: TrendingUp },
          { label: 'Leads Generated', value: '142', change: '+32 vs last week', icon: Target },
          { label: 'Active Sprints', value: String(campaigns.length || 1), change: 'On schedule', icon: Layers },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#0c0f18] border border-white/[0.08] space-y-2 hover:border-white/[0.14] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{stat.label}</span>
                <Icon className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-2xl font-bold text-slate-100 tracking-tight">{stat.value}</div>
              <span className="font-mono text-[10px] text-slate-400 block">{stat.change}</span>
            </div>
          );
        })}
      </div>

      {/* Performance Intelligence Insights */}
      <div className="p-5 rounded-xl bg-[#0c0f18] border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-200">
              Intelligence Recommendations
            </h2>
          </div>
          <span className="font-mono text-[10px] text-slate-400">Context-derived</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-lg bg-[#080a11] border border-white/[0.06] space-y-1.5">
            <span className="font-semibold text-slate-200 block">High Engagement Trigger</span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              LinkedIn drafts leading with founder decision stories recorded 42% higher retention.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#080a11] border border-white/[0.06] space-y-1.5">
            <span className="font-semibold text-slate-200 block">Format Optimization</span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              5-slide visual carousels outperformed text-only posts by 2.4x for product walk-throughs.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#080a11] border border-white/[0.06] space-y-1.5">
            <span className="font-semibold text-slate-200 block">Sprint Schedule</span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              4 queued posts remaining this week across X and LinkedIn distribution channels.
            </p>
          </div>
        </div>
      </div>

      {/* Active Campaigns & Content Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Campaigns (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Target className="w-4 h-4 text-sky-400" />
              <span>Active 14-Day Campaigns</span>
            </h2>
            <Link href="/campaigns" className="text-xs font-semibold text-sky-400 hover:text-sky-300">
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-2.5">
            {campaigns.length === 0 ? (
              <div className="p-8 text-center bg-[#0c0f18] border border-white/[0.08] rounded-xl text-xs text-slate-400">
                No active campaigns found. Launch a 14-day blitz in one click.
              </div>
            ) : (
              campaigns.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-xl bg-[#0c0f18] border border-white/[0.08] flex items-center justify-between gap-4 hover:border-white/[0.14] transition-colors"
                >
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm text-slate-200 truncate">{c.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">
                      Objective: {c.objective} &middot; Offer: {c.offer || 'Product Demo'}
                    </p>
                  </div>
                  <Link
                    href={`/campaigns/${c.id}`}
                    className="px-3 py-1.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-slate-200 text-xs font-medium rounded-lg flex items-center gap-1 shrink-0 btn-tactile"
                  >
                    <span>View Sprint</span>
                    <ArrowUpRight className="w-3 h-3 text-sky-400" />
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Content Pipeline Status (1 col) */}
        <div className="p-5 rounded-xl bg-[#0c0f18] border border-white/[0.08] space-y-4">
          <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sky-400" />
            <span>Content Pipeline</span>
          </h2>

          <div className="space-y-2 text-xs">
            {[
              { stage: 'Topic Backlog', count: '12 Items', highlight: false },
              { stage: 'Drafts in Review', count: '5 Items', highlight: false },
              { stage: 'Scheduled Distribution', count: '4 Items', highlight: true },
              { stage: 'Published This Week', count: '8 Items', highlight: false },
            ].map((p, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#080a11] border border-white/[0.06]"
              >
                <span className="font-medium text-slate-300">{p.stage}</span>
                <span
                  className={`font-mono text-[11px] ${
                    p.highlight ? 'text-sky-400 font-semibold' : 'text-slate-400'
                  }`}
                >
                  {p.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
