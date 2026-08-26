'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles, Copy, Check, Save, Layers, RefreshCw, Plus, Edit2, Download } from 'lucide-react';

function ContentStudioInner() {
  const searchParams = useSearchParams();
  const campaignIdParam = searchParams.get('campaignId') || '';

  const [contentType, setContentType] = useState('LINKEDIN_POST');
  const [topic, setTopic] = useState('');
  const [objective, setObjective] = useState('GENERATE_LEADS');
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState(campaignIdParam);

  const [generating, setGenerating] = useState(false);
  const [variations, setVariations] = useState<any[]>([]);
  const [slides, setSlides] = useState<any[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/campaigns')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCampaigns(data);
      });
  }, []);

  const handleGenerateContent = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/content/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType,
          topic,
          objective,
          campaignId: selectedCampaignId,
        }),
      });

      const data = await res.json();
      if (data.variations) setVariations(data.variations);
      if (data.slides) setSlides(data.slides);
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-sky-400" /> Content Studio & Carousel Builder
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Produce multi-variation content and 5-slide visual carousels tied to your Brand Source of Truth.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls (1 col) */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          <h2 className="text-base font-bold text-slate-200">1. Generation Parameters</h2>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Content Type</label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200"
            >
              <option value="LINKEDIN_POST">LinkedIn Post</option>
              <option value="TWITTER_THREAD">X / Twitter Thread</option>
              <option value="CAROUSEL">5-Slide Visual Carousel</option>
              <option value="EMAIL">Email Newsletter</option>
              <option value="COLD_OUTREACH">Cold Outreach Sequence</option>
              <option value="BLOG">SEO Blog Outline</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Topic / Core Idea</label>
            <textarea
              rows={3}
              placeholder="e.g. Why founders should replace fragmented tools with one AI Marketing OS..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Attach to Campaign</label>
            <select
              value={selectedCampaignId}
              onChange={(e) => setSelectedCampaignId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200"
            >
              <option value="">No Campaign (Standalone)</option>
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleGenerateContent}
            disabled={generating}
            className="w-full py-3 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-600/20 flex items-center justify-center gap-2"
          >
            {generating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Synthesizing Content...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Generate Multi-Variation Content
              </>
            )}
          </button>
        </div>

        {/* Output Workspace (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {contentType === 'CAROUSEL' && slides.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-200">5-Slide Visual Carousel Preview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {slides.map((s: any, idx: number) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl bg-gradient-to-tr ${s.themeColor || 'from-sky-600 to-indigo-600'} text-white space-y-3 shadow-xl`}
                  >
                    <span className="text-[10px] font-bold uppercase bg-black/30 px-2.5 py-1 rounded-full w-max">
                      Slide {idx + 1}: {s.badge}
                    </span>
                    <h3 className="font-extrabold text-base leading-tight">{s.headline}</h3>
                    <p className="text-xs opacity-90">{s.subheadline}</p>
                    <ul className="text-xs space-y-1 pt-2 border-t border-white/20">
                      {s.points?.map((pt: string, pIdx: number) => (
                        <li key={pIdx}>• {pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : variations.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-200">Multi-Variation Content Outputs</h2>
              {variations.map((v: any, idx: number) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 text-[10px] font-extrabold rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      {v.angle}
                    </span>
                    <button
                      onClick={() => handleCopy(v.content, idx)}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5"
                    >
                      {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedIdx === idx ? 'Copied!' : 'Copy'}
                    </button>
                  </div>

                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 font-sans whitespace-pre-wrap leading-relaxed">
                    {v.content}
                  </pre>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-16 text-center bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-500 flex flex-col items-center gap-2">
              <Sparkles className="w-8 h-8 text-slate-600" />
              Configure parameters on the left and click "Generate Multi-Variation Content" to create posts and carousels.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ContentStudioPage() {
  return (
    <Suspense fallback={<div className="text-xs text-slate-400">Loading Content Studio...</div>}>
      <ContentStudioInner />
    </Suspense>
  );
}
