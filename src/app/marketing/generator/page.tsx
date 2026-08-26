'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Sparkles, Copy, Check, Save, ArrowLeft, Send, RefreshCw } from 'lucide-react';

function GeneratorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const preselectedProductId = searchParams.get('productId') || '';

  const [products, setProducts] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] = useState(preselectedProductId);
  const [channel, setChannel] = useState('TWITTER');
  const [tone, setTone] = useState('High-Energy');
  
  // Product info inputs
  const [productName, setProductName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');

  const [generating, setGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
          if (preselectedProductId) {
            const found = data.find((p) => p.id === preselectedProductId);
            if (found) populateProductDetails(found);
          } else if (data.length > 0) {
            setSelectedProductId(data[0].id);
            populateProductDetails(data[0]);
          }
        }
      });
  }, [preselectedProductId]);

  const populateProductDetails = (p: any) => {
    setProductName(p.name);
    setTagline(p.tagline);
    setDescription(p.description || '');
    setTargetAudience(p.targetAudience || '');
  };

  const handleSelectProduct = (id: string) => {
    setSelectedProductId(id);
    const found = products.find((p) => p.id === id);
    if (found) populateProductDetails(found);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setCopied(false);
    setSaved(false);

    try {
      const res = await fetch('/api/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName,
          tagline,
          description,
          targetAudience,
          channel,
          tone,
        }),
      });

      const data = await res.json();
      if (data.content) {
        setGeneratedResult(data.content);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToCampaign = async () => {
    if (!selectedProductId || !generatedResult) return;
    try {
      await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProductId,
          title: `${channel} Post Draft - ${new Date().toLocaleDateString()}`,
          channel,
          content: generatedResult,
          status: 'DRAFT',
        }),
      });
      setSaved(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
          <Sparkles className="w-7 h-7 text-sky-400" /> AI Marketing Copy Studio
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Generate channel-optimized launch copy, social posts, and email pitches tailored to your products.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Form */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          <h2 className="text-base font-bold text-slate-200">1. Product & Channel Settings</h2>

          {/* Product Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Select Existing Product</label>
            <select
              value={selectedProductId}
              onChange={(e) => handleSelectProduct(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            >
              <option value="">Custom Product Details</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.status})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Description / Core Features</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Target Audience</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
              />
            </div>
          </div>

          {/* Channel Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Target Channel</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'TWITTER', label: 'X / Twitter Thread' },
                { id: 'REDDIT', label: 'Reddit (r/SideProject)' },
                { id: 'PRODUCT_HUNT', label: 'Product Hunt Post' },
                { id: 'LINKEDIN', label: 'LinkedIn Post' },
                { id: 'COLD_EMAIL', label: 'Outreach Email' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setChannel(c.id)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    channel === c.id
                      ? 'bg-sky-600/20 text-sky-400 border-sky-500/40'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full py-3 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-600/20 flex items-center justify-center gap-2 transition-all"
          >
            {generating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Crafting Copy...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Generate Marketing Copy
              </>
            )}
          </button>
        </div>

        {/* Right Preview */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h2 className="text-base font-bold text-slate-200">2. Copy Preview</h2>
              {generatedResult && (
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
              )}
            </div>

            {generatedResult ? (
              <textarea
                rows={16}
                value={generatedResult}
                onChange={(e) => setGeneratedResult(e.target.value)}
                className="w-full p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 font-mono leading-relaxed focus:outline-none focus:border-sky-500"
              />
            ) : (
              <div className="py-24 text-center text-slate-500 text-xs flex flex-col items-center gap-2">
                <Sparkles className="w-8 h-8 text-slate-600" />
                Select your product and channel on the left, then click "Generate Marketing Copy".
              </div>
            )}
          </div>

          {generatedResult && selectedProductId && (
            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={handleSaveToCampaign}
                disabled={saved}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
              >
                {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {saved ? 'Saved to Product Campaigns!' : 'Save to Product Workspace'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MarketingGeneratorPage() {
  return (
    <Suspense fallback={<div className="text-slate-400 text-xs">Loading Studio...</div>}>
      <GeneratorContent />
    </Suspense>
  );
}
