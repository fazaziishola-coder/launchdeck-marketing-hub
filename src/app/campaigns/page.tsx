'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Target, Plus, ArrowUpRight, X, Layers } from 'lucide-react';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    objective: 'GENERATE_LEADS',
    targetAudience: '',
    offer: '',
    channels: 'LINKEDIN,TWITTER',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch('/api/campaigns');
      const data = await res.json();
      if (Array.isArray(data)) setCampaigns(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaign.name) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCampaign),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setNewCampaign({
          name: '',
          objective: 'GENERATE_LEADS',
          targetAudience: '',
          offer: '',
          channels: 'LINKEDIN,TWITTER',
        });
        fetchCampaigns();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 mb-1.5">
            <Target className="w-4 h-4" />
            <span>Sprint Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            Campaigns Engine
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Goal-driven 14-day marketing sprints. Plan strategy, assemble assets, and track delivery.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-sky-400 hover:bg-sky-300 text-sky-950 transition-colors btn-tactile shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Campaign</span>
        </button>
      </div>

      {/* Campaign Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-56 bg-white/[0.03] rounded-xl border border-white/[0.06]" />
          ))}
        </div>
      ) : campaigns.length === 0 ? (
        <div className="text-center py-16 bg-[#0c0f18] border border-white/[0.08] rounded-xl space-y-3">
          <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 mx-auto">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-slate-200">No campaigns active</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Launch your first 14-day sprint to synchronize distribution across your marketing channels.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-sky-400 hover:bg-sky-300 text-sky-950 text-xs font-semibold rounded-lg btn-tactile transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Campaign</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="p-5 rounded-xl bg-[#0c0f18] border border-white/[0.08] hover:border-white/[0.14] flex flex-col justify-between transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-bold text-slate-100 tracking-tight leading-snug">
                    {camp.name}
                  </h3>
                  <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    {camp.status || 'Active'}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-400">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">Goal</span>
                    <span className="font-medium text-slate-200">{camp.objective}</span>
                  </div>
                  {camp.offer && (
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-500 block">Primary Offer</span>
                      <span className="font-medium text-slate-200">{camp.offer}</span>
                    </div>
                  )}
                  {camp.channels && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {camp.channels.split(',').map((ch: string) => (
                        <span
                          key={ch}
                          className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#080a11] text-slate-300 border border-white/[0.06]"
                        >
                          {ch.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-slate-500">
                  {camp.contentItems?.length || 0} Assets
                </span>
                <Link
                  href={`/campaigns/${camp.id}`}
                  className="inline-flex items-center gap-1 font-semibold text-xs text-sky-400 hover:text-sky-300 transition-colors"
                >
                  <span>Open Workspace</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0c0f18] border border-white/[0.1] rounded-xl p-6 w-full max-w-lg shadow-2xl relative space-y-5">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] rounded-md transition-colors btn-tactile"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h2 className="text-base font-bold text-slate-100 tracking-tight">Create 14-Day Sprint</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Set milestone goals and select targeted channels for this campaign sprint.
              </p>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Campaign Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q3 Founder Launch Blitz"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#080a11] border border-white/[0.08] focus:border-sky-400/60 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Objective
                  </label>
                  <select
                    value={newCampaign.objective}
                    onChange={(e) => setNewCampaign({ ...newCampaign, objective: e.target.value })}
                    className="w-full px-3 py-2 bg-[#080a11] border border-white/[0.08] focus:border-sky-400/60 rounded-lg text-xs text-slate-100 focus:outline-none transition-colors"
                  >
                    <option value="GENERATE_LEADS">Generate Leads</option>
                    <option value="PRODUCT_LAUNCH">Product Launch</option>
                    <option value="GENERATE_AWARENESS">Brand Awareness</option>
                    <option value="GENERATE_SALES">Generate Sales</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Channels
                  </label>
                  <input
                    type="text"
                    placeholder="LINKEDIN, TWITTER, EMAIL"
                    value={newCampaign.channels}
                    onChange={(e) => setNewCampaign({ ...newCampaign, channels: e.target.value })}
                    className="w-full px-3 py-2 bg-[#080a11] border border-white/[0.08] focus:border-sky-400/60 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Core Offer / CTA
                </label>
                <input
                  type="text"
                  placeholder="e.g. 14-Day Trial or Free Architecture Audit"
                  value={newCampaign.offer}
                  onChange={(e) => setNewCampaign({ ...newCampaign, offer: e.target.value })}
                  className="w-full px-3 py-2 bg-[#080a11] border border-white/[0.08] focus:border-sky-400/60 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors btn-tactile"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-1.5 bg-sky-400 hover:bg-sky-300 text-sky-950 font-semibold text-xs rounded-lg transition-colors btn-tactile disabled:opacity-50"
                >
                  {submitting ? 'Launching...' : 'Create Campaign'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
