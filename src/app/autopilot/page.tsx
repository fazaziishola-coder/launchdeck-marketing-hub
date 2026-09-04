'use client';

import { useEffect, useState } from 'react';
import {
  Zap, Search, Sparkles, RefreshCw, Cpu, Layers, CheckCircle2, MessageSquare, Send, ArrowRight, Play, Check, ShieldCheck
} from 'lucide-react';

export default function AutopilotPage() {
  const [aiProviders, setAiProviders] = useState<any[]>([]);
  const [discoveredProjects, setDiscoveredProjects] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  // Slide Deck State
  const [slideDeck, setSlideDeck] = useState<any>(null);
  const [generatingSlides, setGeneratingSlides] = useState(false);

  // Engagement State
  const [comments, setComments] = useState<any[]>([]);
  const [outreachLeads, setOutreachLeads] = useState<any[]>([]);

  // Autopilot Execution State
  const [runningAutopilot, setRunningAutopilot] = useState(false);
  const [autopilotResult, setAutopilotResult] = useState<any>(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    fetchAIStatus();
    fetchDiscoveredProjects();
    fetchProducts();
  }, []);

  const fetchAIStatus = async () => {
    try {
      const res = await fetch('/api/agent/ai-status');
      const data = await res.json();
      if (data.providers) setAiProviders(data.providers);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchDiscoveredProjects = async () => {
    setScanning(true);
    try {
      const res = await fetch('/api/agent/discover');
      const data = await res.json();
      if (data.projects) setDiscoveredProjects(data.projects);
    } catch (e) {
      console.error(e);
    } finally {
      setScanning(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
        if (data.length > 0) setSelectedProductId(data[0].id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRegisterAll = async () => {
    setScanning(true);
    try {
      await fetch('/api/agent/discover', { method: 'POST' });
      fetchDiscoveredProjects();
      fetchProducts();
    } catch (e) {
      console.error(e);
    } finally {
      setScanning(false);
    }
  };

  const handleGenerateSlides = async () => {
    if (!selectedProductId) return;
    setGeneratingSlides(true);
    try {
      const res = await fetch('/api/agent/slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: selectedProductId }),
      });
      const data = await res.json();
      if (data.slides) setSlideDeck(data);
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingSlides(false);
    }
  };

  const handleRunFullAutopilot = async () => {
    setRunningAutopilot(true);
    setAutopilotResult(null);
    try {
      const res = await fetch('/api/agent/autopilot', { method: 'POST' });
      const data = await res.json();
      setAutopilotResult(data);
      fetchProducts();
      fetchAIStatus();
    } catch (e) {
      console.error(e);
    } finally {
      setRunningAutopilot(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 mb-1.5">
            <Zap className="w-4 h-4" />
            <span>Autonomous Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            Autopilot Engine
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Automated project discovery, multi-LLM quota failover, slide synthesis, and scheduled distribution.
          </p>
        </div>

        <button
          onClick={handleRunFullAutopilot}
          disabled={runningAutopilot}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-sky-400 hover:bg-sky-300 text-slate-950 shadow-sm transition-colors btn-tactile disabled:opacity-50"
        >
          {runningAutopilot ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Executing Autopilot Loop...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>Run Autopilot Loop</span>
            </>
          )}
        </button>
      </div>

      {/* Autopilot Execution Result Notification */}
      {autopilotResult && (
        <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 space-y-2">
          <div className="flex items-center gap-2 font-bold text-base">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Autopilot Loop Executed Successfully!
          </div>
          <p className="text-xs text-emerald-400/80">
            Scanned {autopilotResult.discovery?.scannedCount} projects, auto-generated slides and posted updates across {autopilotResult.executionLog?.length} active products.
          </p>
        </div>
      )}

      {/* 1. Multi-LLM Quota Fallback Monitor */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-sky-400" /> Multi-LLM Quota Fallback Router
          </h2>
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Auto-Failover Enabled (Gemini → OpenAI → Anthropic)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {aiProviders.map((provider) => {
            const isHealthy = provider.quotaStatus === 'HEALTHY';
            const isExhausted = provider.quotaStatus === 'EXHAUSTED';

            return (
              <div
                key={provider.name}
                className={`p-4 rounded-xl border transition-all ${
                  isHealthy
                    ? 'bg-slate-950 border-slate-800'
                    : isExhausted
                    ? 'bg-rose-950/20 border-rose-500/30'
                    : 'bg-amber-950/20 border-amber-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-200">{provider.name}</span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full border ${
                      isHealthy
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : isExhausted
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}
                  >
                    {provider.quotaStatus}
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono truncate">{provider.model}</div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/60 pt-2">
                  <span>Failovers: {provider.failoverCount}</span>
                  <span>{provider.isAvailable ? 'Key Active' : 'Fallback Mode'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Autonomous Project Discovery & Gemini Slide Deck Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Local & GitHub Scanner */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Search className="w-5 h-5 text-indigo-400" /> Auto-Discovered Projects
            </h2>
            <button
              onClick={handleRegisterAll}
              disabled={scanning}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${scanning ? 'animate-spin' : ''}`} /> Auto-Register All
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Automatically reads local project directories and GitHub repos to create products without manual input.
          </p>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {discoveredProjects.length === 0 ? (
              <div className="py-10 text-center text-xs text-slate-500">
                Scanning projects directory... Click "Auto-Register All" to sync.
              </div>
            ) : (
              discoveredProjects.map((p) => (
                <div key={p.folderName} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                  <div className="space-y-1 max-w-xs">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs text-slate-200">{p.name}</h4>
                      <span className="text-[10px] text-slate-500 font-mono">({p.folderName})</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{p.tagline}</p>
                    <span className="text-[10px] text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded font-medium">
                      {p.techStack}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${
                      p.isRegistered
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}
                  >
                    {p.isRegistered ? 'Registered' : 'Discovered'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Gemini Slide Deck Studio */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" /> Gemini Visual Slide Deck Generator
              </h2>
              {products.length > 0 && (
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <button
              onClick={handleGenerateSlides}
              disabled={generatingSlides || !selectedProductId}
              className="w-full py-2.5 bg-sky-400 hover:bg-sky-300 disabled:opacity-50 text-slate-950 font-semibold text-xs rounded-lg shadow-sm flex items-center justify-center gap-2 mb-4 btn-tactile transition-colors"
            >
              {generatingSlides ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Generating 5-Slide Visual Carousel...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Generate Gemini Visual Pitch Deck
                </>
              )}
            </button>

            {slideDeck ? (
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {slideDeck.slides?.map((slide: any) => (
                  <div
                    key={slide.slideNumber}
                    className={`p-4 rounded-xl bg-gradient-to-r ${slide.themeColor} text-white space-y-2 shadow-lg`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider bg-black/30 px-2.5 py-1 rounded-full w-max">
                      <span>Slide {slide.slideNumber}: {slide.badge}</span>
                    </div>
                    <h3 className="font-extrabold text-sm">{slide.headline}</h3>
                    <p className="text-xs opacity-90">{slide.subheadline}</p>
                    <ul className="text-[11px] space-y-1 pt-1 opacity-95">
                      {slide.points?.map((pt: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span>•</span> <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center text-xs text-slate-500 flex flex-col items-center gap-2">
                <Layers className="w-8 h-8 text-slate-600" />
                Select a product and click "Generate Gemini Visual Pitch Deck" to create slide carousels for social posts.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
