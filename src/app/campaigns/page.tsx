'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Target, Plus, Calendar, ArrowUpRight, CheckCircle2, Clock, Sparkles, Layers, X } from 'lucide-react';

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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
            <Target className="w-8 h-8 text-sky-400" /> Campaigns Engine
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Central campaign workspaces. Plan strategy, produce content, schedule distribution, and track results.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/20 transition-all"
        >
          <Plus className="w-4 h-4" /> Create Campaign
        </button>
      </div>

      {/* Campaign Cards Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
        </div>
      ) : campaigns.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-3">
          <Target className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-300">No campaigns launched yet</h3>
          <p className="text-sm text-slate-500">Launch a multi-channel campaign to drive leads and product awareness.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white text-xs font-semibold rounded-xl"
          >
            <Plus className="w-4 h-4" /> Create First Campaign
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="group p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex flex-col justify-between transition-all shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-sky-400 transition-colors">
                    {camp.name}
                  </h3>
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {camp.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-400 mb-6">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Goal</span>
                    <span className="font-medium text-slate-300">{camp.objective}</span>
                  </div>
                  {camp.offer && (
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Offer</span>
                      <span className="font-medium text-slate-300">{camp.offer}</span>
                    </div>
                  )}
                  {camp.channels && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {camp.channels.split(',').map((ch: string) => (
                        <span key={ch} className="px-2 py-0.5 text-[9px] font-bold rounded bg-slate-950 text-sky-400 border border-slate-800">
                          {ch.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500">{camp.contentItems?.length || 0} Content Assets</span>
                <Link
                  href={`/campaigns/${camp.id}`}
                  className="inline-flex items-center gap-1 font-semibold text-sky-400 hover:text-sky-300"
                >
                  Campaign Workspace <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-200">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-slate-100 mb-1">Create New Campaign</h2>
            <p className="text-xs text-slate-400 mb-6">Plan a multi-channel campaign around a specific goal or launch offer.</p>

            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Campaign Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q3 Launch Blitz"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Objective</label>
                  <select
                    value={newCampaign.objective}
                    onChange={(e) => setNewCampaign({ ...newCampaign, objective: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                  >
                    <option value="GENERATE_LEADS">Generate Leads</option>
                    <option value="PRODUCT_LAUNCH">Product Launch</option>
                    <option value="GENERATE_AWARENESS">Brand Awareness</option>
                    <option value="GENERATE_SALES">Generate Sales</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Channels</label>
                  <input
                    type="text"
                    placeholder="LINKEDIN, TWITTER, EMAIL"
                    value={newCampaign.channels}
                    onChange={(e) => setNewCampaign({ ...newCampaign, channels: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Offer / Call to Action</label>
                <input
                  type="text"
                  placeholder="e.g. 14-Day Free Trial or Free Guide"
                  value={newCampaign.offer}
                  onChange={(e) => setNewCampaign({ ...newCampaign, offer: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-xs text-slate-400">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="px-4 py-2 bg-sky-600 text-white font-semibold text-xs rounded-lg">
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
