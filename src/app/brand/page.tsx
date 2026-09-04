'use client';

import { useEffect, useState } from 'react';
import {
  ShieldCheck,
  Save,
  Check,
  RefreshCw,
  FileText,
  Sliders,
  Code,
  Tag,
} from 'lucide-react';

export default function BrandHubPage() {
  const [brand, setBrand] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showJson, setShowJson] = useState(false);

  useEffect(() => {
    fetchBrand();
  }, []);

  const fetchBrand = async () => {
    try {
      const res = await fetch('/api/brand');
      const data = await res.json();
      if (data.brand) setBrand(data.brand);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/brand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brand),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto animate-pulse">
        <div className="h-16 bg-white/[0.03] rounded-xl border border-white/[0.06]" />
        <div className="h-64 bg-white/[0.03] rounded-xl border border-white/[0.06]" />
        <div className="h-64 bg-white/[0.03] rounded-xl border border-white/[0.06]" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 mb-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>AI Knowledge Base</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            Brand Hub &middot; Source of Truth
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Every autonomous agent and generator prompt references this verified brand profile.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowJson(!showJson)}
            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors btn-tactile flex items-center gap-1.5 ${
              showJson
                ? 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                : 'bg-white/[0.03] text-slate-300 border-white/[0.08] hover:bg-white/[0.06]'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>{showJson ? 'Form View' : 'Inspect JSON'}</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-sky-400 hover:bg-sky-300 text-slate-950 transition-colors btn-tactile shadow-sm disabled:opacity-50"
          >
            {saving ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : saved ? (
              <Check className="w-3.5 h-3.5 text-slate-950" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>{saving ? 'Saving...' : saved ? 'Profile Saved' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {showJson ? (
        <div className="p-6 rounded-xl bg-[#0c0f18] border border-white/[0.08] space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-[11px] uppercase tracking-wider">Compiled Brand Schema</span>
            <span className="font-mono text-[10px] text-emerald-400">Ready for LLM Context</span>
          </div>
          <pre className="p-4 rounded-lg bg-[#080a11] border border-white/[0.06] font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto">
            {JSON.stringify(brand, null, 2)}
          </pre>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Core Identity */}
          <div className="p-6 rounded-xl bg-[#0c0f18] border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
              <FileText className="w-4 h-4 text-sky-400" />
              <h2 className="text-sm font-bold text-slate-100 tracking-tight">
                Company &amp; Positioning
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  value={brand?.companyName || ''}
                  onChange={(e) => setBrand({ ...brand, companyName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#080a11] border border-white/[0.08] focus:border-sky-400/60 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Website URL
                </label>
                <input
                  type="url"
                  value={brand?.websiteUrl || ''}
                  onChange={(e) => setBrand({ ...brand, websiteUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-[#080a11] border border-white/[0.08] focus:border-sky-400/60 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Tagline &amp; Value Proposition (One Line)
              </label>
              <input
                type="text"
                value={brand?.tagline || ''}
                onChange={(e) => setBrand({ ...brand, tagline: e.target.value })}
                className="w-full px-3 py-2 bg-[#080a11] border border-white/[0.08] focus:border-sky-400/60 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Company Description
              </label>
              <textarea
                rows={3}
                value={brand?.description || ''}
                onChange={(e) => setBrand({ ...brand, description: e.target.value })}
                className="w-full px-3 py-2 bg-[#080a11] border border-white/[0.08] focus:border-sky-400/60 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors leading-relaxed"
              />
            </div>
          </div>

          {/* ICP & Tone */}
          <div className="p-6 rounded-xl bg-[#0c0f18] border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
              <Sliders className="w-4 h-4 text-sky-400" />
              <h2 className="text-sm font-bold text-slate-100 tracking-tight">
                Audience Profile &amp; Voice Guidelines
              </h2>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Target Audience (Ideal Customer Profile)
              </label>
              <textarea
                rows={2}
                value={brand?.targetAudience || ''}
                onChange={(e) => setBrand({ ...brand, targetAudience: e.target.value })}
                className="w-full px-3 py-2 bg-[#080a11] border border-white/[0.08] focus:border-sky-400/60 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Content Pillars (Comma-separated)
                </label>
                <input
                  type="text"
                  value={brand?.contentPillars || ''}
                  onChange={(e) => setBrand({ ...brand, contentPillars: e.target.value })}
                  placeholder="Unified Marketing, Context-Aware AI, High-Conversion Loops"
                  className="w-full px-3 py-2 bg-[#080a11] border border-white/[0.08] focus:border-sky-400/60 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Tone of Voice
                </label>
                <input
                  type="text"
                  value={brand?.toneOfVoice || ''}
                  onChange={(e) => setBrand({ ...brand, toneOfVoice: e.target.value })}
                  placeholder="Authoritative, Direct, High-Value"
                  className="w-full px-3 py-2 bg-[#080a11] border border-white/[0.08] focus:border-sky-400/60 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-emerald-400">
                  Vocabulary: Words We Use (Mandatory)
                </label>
                <input
                  type="text"
                  placeholder="OS, Pipeline, Strategy, Conversion, Sprint"
                  value={brand?.wordsToUse || ''}
                  onChange={(e) => setBrand({ ...brand, wordsToUse: e.target.value })}
                  className="w-full px-3 py-2 bg-[#080a11] border border-emerald-500/20 focus:border-emerald-400/60 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-rose-400">
                  Vocabulary: Words We Avoid (Banned)
                </label>
                <input
                  type="text"
                  placeholder="Wrapper, Cheap, Generic, Commoditized, Synergy"
                  value={brand?.wordsToAvoid || ''}
                  onChange={(e) => setBrand({ ...brand, wordsToAvoid: e.target.value })}
                  className="w-full px-3 py-2 bg-[#080a11] border border-rose-500/20 focus:border-rose-400/60 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
