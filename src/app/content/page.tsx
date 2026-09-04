'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles, Copy, Check, RefreshCw, Layers } from 'lucide-react';

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
      })
      .catch(() => {});
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
      <div className="border-b border-white/[0.08] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 mb-1.5">
          <Sparkles className="w-4 h-4" />
          <span>Multi-Channel Studio</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
          Content Studio &middot; Deck Builder
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Synthesize high-conversion copy and 5-slide visual decks grounded in your Brand Source of Truth.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls (1 col) */}
        <div className="p-5 rounded-xl bg-[#0c0f18] border border-white/[0.08] space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-300">
            Generation Parameters
          </h2>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Content Format
            </label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full px-3 py-2 bg-[#080a11] border border-white/[0.08] focus:border-sky-400/60 rounded-lg text-xs text-slate-100 focus:outline-none transition-colors"
            >
              <option value="LINKEDIN_POST">LinkedIn Thought Leadership Post</option>
              <option value="TWITTER_THREAD">X / Twitter Breakdown Thread</option>
              <option value="CAROUSEL">5-Slide Visual Carousel</option>
              <option value="EMAIL">Founder Newsletter Edition</option>
              <option value="COLD_OUTREACH">Cold Outreach Sequence</option>
              <option value="BLOG">Technical Growth Article</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Topic / Angle
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Why founders should replace fragmented tools with an autonomous marketing loop..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3 py-2 bg-[#080a11] border border-white/[0.08] focus:border-sky-400/60 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Attach to Campaign
            </label>
            <select
              value={selectedCampaignId}
              onChange={(e) => setSelectedCampaignId(e.target.value)}
              className="w-full px-3 py-2 bg-[#080a11] border border-white/[0.08] focus:border-sky-400/60 rounded-lg text-xs text-slate-100 focus:outline-none transition-colors"
            >
              <option value="">No Campaign (Standalone Asset)</option>
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
            className="w-full py-2.5 bg-sky-400 hover:bg-sky-300 text-sky-950 font-semibold text-xs rounded-lg transition-colors btn-tactile shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {generating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Synthesizing Copy...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Content</span>
              </>
            )}
          </button>
        </div>

        {/* Output Workspace (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          {contentType === 'CAROUSEL' && slides.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono uppercase tracking-wider text-[11px]">
                  5-Slide Visual Carousel Export
                </span>
                <span className="font-mono text-[10px]">1080 &times; 1350 PDF Ready</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {slides.map((s: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0c0f18] border border-white/[0.08] space-y-2.5"
                  >
                    <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 w-max block">
                      Slide {idx + 1}: {s.badge}
                    </span>
                    <h3 className="font-bold text-sm text-slate-100 leading-snug">{s.headline}</h3>
                    <p className="text-xs text-slate-400">{s.subheadline}</p>
                    {s.points && s.points.length > 0 && (
                      <ul className="text-xs text-slate-300 space-y-1 pt-2 border-t border-white/[0.06]">
                        {s.points.map((pt: string, pIdx: number) => (
                          <li key={pIdx} className="flex items-start gap-1.5">
                            <span className="text-sky-400">&bull;</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : variations.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono uppercase tracking-wider text-[11px]">
                  Generated Variations
                </span>
                <span className="font-mono text-[10px] text-slate-500">
                  {variations.length} Angles Formatted
                </span>
              </div>
              {variations.map((v: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#0c0f18] border border-white/[0.08] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-white/[0.04] text-sky-400 border border-white/[0.08]">
                      Angle: {v.angle}
                    </span>
                    <button
                      onClick={() => handleCopy(v.content, idx)}
                      className="px-2.5 py-1 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-slate-200 text-xs font-medium rounded-md flex items-center gap-1.5 transition-colors btn-tactile"
                    >
                      {copiedIdx === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="p-3.5 rounded-lg bg-[#080a11] border border-white/[0.06] text-xs text-slate-200 font-sans whitespace-pre-wrap leading-relaxed">
                    {v.content}
                  </pre>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-[#0c0f18] border border-white/[0.08] rounded-xl text-xs text-slate-400 flex flex-col items-center gap-2">
              <Layers className="w-6 h-6 text-slate-500" />
              <p>Configure parameters on the left and click Generate Content to preview outputs.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ContentStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6 max-w-6xl mx-auto animate-pulse">
          <div className="h-16 bg-white/[0.03] rounded-xl border border-white/[0.06]" />
          <div className="h-64 bg-white/[0.03] rounded-xl border border-white/[0.06]" />
        </div>
      }
    >
      <ContentStudioInner />
    </Suspense>
  );
}
