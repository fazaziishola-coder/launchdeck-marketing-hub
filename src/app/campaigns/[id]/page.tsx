'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Target, ArrowLeft, Plus, Sparkles, Layers, Calendar, BarChart2, CheckCircle2, Megaphone } from 'lucide-react';

export default function CampaignDetailWorkspace() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params?.id as string;

  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'strategy' | 'content' | 'calendar' | 'analytics'>('strategy');

  useEffect(() => {
    if (campaignId) fetchCampaignDetails();
  }, [campaignId]);

  const fetchCampaignDetails = async () => {
    try {
      const res = await fetch(`/api/campaigns/${campaignId}`);
      if (!res.ok) {
        router.push('/campaigns');
        return;
      }
      const data = await res.json();
      setCampaign(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !campaign) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <Link href="/campaigns" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200">
        <ArrowLeft className="w-4 h-4" /> Back to Campaigns
      </Link>

      {/* Campaign Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-100">{campaign.name}</h1>
              <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {campaign.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Goal: {campaign.objective} • Offer: {campaign.offer || 'Default Product Demo'}</p>
          </div>

          <Link
            href={`/content?campaignId=${campaign.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-400 hover:bg-sky-300 text-slate-950 font-semibold text-xs rounded-lg shadow-sm btn-tactile transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Content</span>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-2">
        {[
          { id: 'strategy', label: 'Strategy & Positioning', icon: Target },
          { id: 'content', label: `Content Assets (${campaign.contentItems?.length || 0})`, icon: Megaphone },
          { id: 'calendar', label: 'Schedule', icon: Calendar },
          { id: 'analytics', label: 'Performance', icon: BarChart2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-all ${
                isActive
                  ? 'border-sky-500 text-sky-400 bg-sky-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Strategy Tab */}
      {activeTab === 'strategy' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-slate-100">Campaign Strategy & Target Alignment</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 block uppercase text-[10px]">Target Audience (ICP)</span>
              <span className="text-slate-200 font-semibold">{campaign.targetAudience || 'Early stage founders and developers'}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 block uppercase text-[10px]">Distribution Channels</span>
              <span className="text-sky-400 font-semibold">{campaign.channels || 'LinkedIn, Twitter'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Content Assets Tab */}
      {activeTab === 'content' && (
        <div className="space-y-4">
          {campaign.contentItems?.length === 0 ? (
            <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-500">
              No content items generated for this campaign yet. Click "Generate Campaign Content" above!
            </div>
          ) : (
            campaign.contentItems?.map((item: any) => (
              <div key={item.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {item.contentType}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">{item.status}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-200">{item.title}</h4>
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 font-sans whitespace-pre-wrap leading-relaxed">
                  {item.body}
                </pre>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
