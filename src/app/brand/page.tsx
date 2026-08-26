'use client';

import { useEffect, useState } from 'react';
import { ShieldCheck, Sparkles, Save, Check, RefreshCw, Layers, Sliders, AlertCircle, FileText } from 'lucide-react';

export default function BrandHubPage() {
  const [brand, setBrand] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-sky-400" /> Brand Hub
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            The AI Source of Truth. Every prompt and campaign automatically references this context.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/20 transition-all"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving Changes...' : saved ? 'Brand Profile Saved!' : 'Save Brand Profile'}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Core Identity */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
            <FileText className="w-4 h-4 text-sky-400" /> Company & Positioning
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Company Name</label>
              <input
                type="text"
                value={brand?.companyName || ''}
                onChange={(e) => setBrand({ ...brand, companyName: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Website URL</label>
              <input
                type="url"
                value={brand?.websiteUrl || ''}
                onChange={(e) => setBrand({ ...brand, websiteUrl: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Tagline & One-Line Pitch</label>
            <input
              type="text"
              value={brand?.tagline || ''}
              onChange={(e) => setBrand({ ...brand, tagline: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Company Description</label>
            <textarea
              rows={3}
              value={brand?.description || ''}
              onChange={(e) => setBrand({ ...brand, description: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
            />
          </div>
        </div>

        {/* ICP & Tone */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" /> Target Audience & Brand Rules
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Target Audience (Ideal Customer Profile)</label>
            <textarea
              rows={2}
              value={brand?.targetAudience || ''}
              onChange={(e) => setBrand({ ...brand, targetAudience: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Content Pillars</label>
              <input
                type="text"
                value={brand?.contentPillars || ''}
                onChange={(e) => setBrand({ ...brand, contentPillars: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Tone of Voice</label>
              <input
                type="text"
                value={brand?.toneOfVoice || ''}
                onChange={(e) => setBrand({ ...brand, toneOfVoice: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Words We Use (Mandatory)</label>
              <input
                type="text"
                placeholder="OS, Pipeline, Strategy, Conversion"
                value={brand?.wordsToUse || ''}
                onChange={(e) => setBrand({ ...brand, wordsToUse: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Words We Avoid (Banned)</label>
              <input
                type="text"
                placeholder="Wrapper, Cheap, Generic, Commoditized"
                value={brand?.wordsToAvoid || ''}
                onChange={(e) => setBrand({ ...brand, wordsToAvoid: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
