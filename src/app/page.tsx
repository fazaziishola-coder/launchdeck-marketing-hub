'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Target,
  Megaphone,
  TrendingUp,
  ArrowUpRight,
  Plus,
  Zap,
  CheckCircle2,
  Clock,
  Layers,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

export default function B2BDashboardPage() {
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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" /> Brand Source of Truth Active
          </div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">
            Good morning, Abdulbasit
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Here's what is happening with your marketing operation today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/content"
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-colors"
          >
            Generate Content
          </Link>
          <Link
            href="/campaigns"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/20 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create Campaign
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Published Content', value: '24', change: '+18% this month', icon: Megaphone, color: 'text-sky-400' },
          { label: 'Avg Engagement Rate', value: '4.8%', change: '+1.2% this week', icon: TrendingUp, color: 'text-emerald-400' },
          { label: 'Leads Generated', value: '142', change: '+32 vs last week', icon: Target, color: 'text-indigo-400' },
          { label: 'Active Campaigns', value: String(campaigns.length || 1), change: '100% on schedule', icon: Layers, color: 'text-amber-400' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="text-2xl font-extrabold text-slate-100">{stat.value}</div>
              <span className="text-[10px] font-semibold text-slate-500">{stat.change}</span>
            </div>
          );
        })}
      </div>

      {/* AI Performance Intelligence Recommendations */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/40 via-slate-900 to-slate-900 border border-sky-500/20 space-y-3">
        <div className="flex items-center gap-2 text-xs font-extrabold text-sky-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-400" /> AI Performance Intelligence Recommendations
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="font-bold text-slate-200 block mb-1">📈 High Engagement Trigger</span>
            <span className="text-slate-400">Your LinkedIn posts generated 42% more engagement when leading with founder stories.</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="font-bold text-slate-200 block mb-1">🎯 Audience Preference</span>
            <span className="text-slate-400">Your audience responds 2.4x better to 5-slide visual carousels than text threads.</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="font-bold text-slate-200 block mb-1">📅 Schedule Alert</span>
            <span className="text-slate-400">You have 4 scheduled posts remaining this week. Keep campaign momentum strong.</span>
          </div>
        </div>
      </div>

      {/* Active Campaigns & Content Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Campaigns (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Target className="w-4 h-4 text-sky-400" /> Active Marketing Campaigns
            </h2>
            <Link href="/campaigns" className="text-xs font-semibold text-sky-400 hover:underline">
              View All Campaigns →
            </Link>
          </div>

          <div className="space-y-3">
            {campaigns.length === 0 ? (
              <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-500">
                No active campaigns. Launch one in 1 click!
              </div>
            ) : (
              campaigns.map((c) => (
                <div key={c.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-sm text-slate-200">{c.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Goal: {c.objective} • Offer: {c.offer || 'Product Demo'}</p>
                  </div>
                  <Link
                    href={`/campaigns/${c.id}`}
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-semibold rounded-lg flex items-center gap-1"
                  >
                    Open <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Content Pipeline Status (1 col) */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-400" /> Content Pipeline
          </h2>

          <div className="space-y-3 text-xs">
            {[
              { stage: 'Ideas / Topics', count: '12 Items', color: 'text-slate-400' },
              { stage: 'Drafts in Progress', count: '5 Items', color: 'text-amber-400' },
              { stage: 'Scheduled for Release', count: '4 Items', color: 'text-sky-400' },
              { stage: 'Published This Week', count: '8 Items', color: 'text-emerald-400' },
            ].map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="font-semibold text-slate-300">{p.stage}</span>
                <span className={`font-bold ${p.color}`}>{p.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
