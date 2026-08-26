'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Rocket, Globe, Target, Sparkles, Check, ArrowRight, ArrowLeft, Layers, ShieldCheck, RefreshCw } from 'lucide-react';

export default function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form State
  const [category, setCategory] = useState('SAAS');
  const [companyName, setCompanyName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [channels, setChannels] = useState<string[]>(['LINKEDIN', 'TWITTER']);
  const [primaryGoal, setPrimaryGoal] = useState('GENERATE_LEADS');
  const [toneOfVoice, setToneOfVoice] = useState('Authoritative & Direct');
  const [brandColor, setBrandColor] = useState('#0284c7');

  const [analyzing, setAnalyzing] = useState(false);
  const [synthesizedBrand, setSynthesizedBrand] = useState<any>(null);

  const toggleChannel = (ch: string) => {
    if (channels.includes(ch)) {
      setChannels(channels.filter((c) => c !== ch));
    } else {
      setChannels([...channels, ch]);
    }
  };

  const handleRunAnalysis = async () => {
    setAnalyzing(true);
    try {
      const res = await fetch('/api/onboarding/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          websiteUrl,
          description,
          industry,
          targetAudience,
          category,
          primaryGoal,
          toneOfVoice,
        }),
      });

      const data = await res.json();
      if (data.synthesized) {
        setSynthesizedBrand(data.synthesized);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzing(false);
      setStep(6);
    }
  };

  const handleCompleteOnboarding = async () => {
    try {
      await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          websiteUrl,
          description,
          industry,
          category,
          targetAudience,
          channels: channels.join(','),
          primaryGoal,
          toneOfVoice,
          brandColors: brandColor,
          synthesizedBrand,
        }),
      });

      router.push('/');
    } catch (e) {
      console.error(e);
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6">
      {/* Progress Bar Header */}
      <div className="max-w-3xl mx-auto w-full pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-slate-950 font-extrabold">
              <Rocket className="w-5 h-5" />
            </div>
            <span className="font-bold text-base text-slate-200">LaunchDeck OS Setup</span>
          </div>
          <span className="text-xs font-semibold text-slate-400">Step {step} of 6</span>
        </div>

        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-sky-500 to-indigo-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content Card */}
      <div className="max-w-2xl mx-auto w-full my-auto py-8">
        {step === 1 && (
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-100">What are you marketing?</h2>
              <p className="text-sm text-slate-400 mt-1">Select your primary business type to customize your AI Marketing OS.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'SAAS', label: 'Startup / SaaS', desc: 'Software products, micro-SaaS, tech platforms' },
                { id: 'AGENCY', label: 'Marketing Agency', desc: 'Managing multiple client growth accounts' },
                { id: 'PERSONAL_BRAND', label: 'Personal Brand / Creator', desc: 'Consultants, founders, creators' },
                { id: 'ECOMMERCE', label: 'E-commerce', desc: 'Physical or digital product stores' },
                { id: 'SERVICE', label: 'Professional Service', desc: 'B2B agencies, consultancies, dev shops' },
                { id: 'OTHER', label: 'Other Business', desc: 'Local business, non-profit, community' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCategory(item.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    category === item.id
                      ? 'bg-sky-600/10 border-sky-500 text-slate-100 shadow-lg shadow-sky-500/10'
                      : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-sm text-slate-200">{item.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-100">Tell us about your business</h2>
              <p className="text-sm text-slate-400 mt-1">This context forms the baseline of your AI Brand Source of Truth.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. LaunchDeck OS"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company Website URL</label>
                <input
                  type="url"
                  placeholder="https://yourcompany.com"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Brief Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe what your product does and the core problem it solves..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Industry</label>
                  <input
                    type="text"
                    placeholder="e.g. AI / SaaS"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target Audience (ICP)</label>
                  <input
                    type="text"
                    placeholder="e.g. Founders & Marketers"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button onClick={() => setStep(1)} className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                disabled={!companyName || !description}
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-semibold text-xs rounded-xl flex items-center gap-2"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-100">Where do you market?</h2>
              <p className="text-sm text-slate-400 mt-1">Select the distribution channels you prioritize for your marketing campaigns.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'LINKEDIN', label: 'LinkedIn', desc: 'B2B Founder stories, thought leadership & carousels' },
                { id: 'TWITTER', label: 'X / Twitter', desc: 'Build in public threads, launch announcements & takes' },
                { id: 'EMAIL', label: 'Email Newsletter', desc: 'Direct subscriber updates & lead nurture sequences' },
                { id: 'INSTAGRAM', label: 'Instagram', desc: 'Visual carousels & video shorts' },
                { id: 'BLOG', label: 'Blog / SEO', desc: 'Long-form educational content & SEO articles' },
                { id: 'OUTREACH', label: 'Cold Outreach', desc: 'Direct B2B cold email & LinkedIn messaging' },
              ].map((item) => {
                const selected = channels.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleChannel(item.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selected
                        ? 'bg-sky-600/10 border-sky-500 text-slate-100 shadow-lg shadow-sky-500/10'
                        : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-200">{item.label}</span>
                      {selected && <Check className="w-4 h-4 text-sky-400" />}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex justify-between">
              <button onClick={() => setStep(2)} className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-100">What is your primary goal?</h2>
              <p className="text-sm text-slate-400 mt-1">This shapes the strategy and campaign templates generated for your workspace.</p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'GENERATE_LEADS', label: 'Generate Qualified Leads', desc: 'Drive signups, demo requests, and customer inquiries.' },
                { id: 'PRODUCT_LAUNCH', label: 'Launch a New Product / Feature', desc: 'Create maximum launch buzz across Product Hunt, X, and LinkedIn.' },
                { id: 'GENERATE_AWARENESS', label: 'Build Brand Awareness', desc: 'Establish thought leadership and reach a wider industry audience.' },
                { id: 'GENERATE_SALES', label: 'Direct Revenue & Sales', desc: 'Promote special offers, paid subscriptions, or product sales.' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPrimaryGoal(item.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    primaryGoal === item.id
                      ? 'bg-sky-600/10 border-sky-500 text-slate-100 shadow-lg shadow-sky-500/10'
                      : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-sm text-slate-200">{item.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between">
              <button onClick={() => setStep(3)} className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-100">Connect your brand voice</h2>
              <p className="text-sm text-slate-400 mt-1">Configure your writing style so AI generation feels authentically like your brand.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tone of Voice</label>
                <select
                  value={toneOfVoice}
                  onChange={(e) => setToneOfVoice(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-sky-500"
                >
                  <option value="Authoritative & Direct">Authoritative & Direct (B2B SaaS Founder)</option>
                  <option value="Conversational & Friendly">Conversational & Friendly (Community-first)</option>
                  <option value="Educational & Analytical">Educational & Analytical (Data-driven Insights)</option>
                  <option value="Bold & Contrarian">Bold & Contrarian (Thought Leadership)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Brand Accent Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="w-10 h-10 rounded-lg border border-slate-800 bg-slate-950 cursor-pointer"
                  />
                  <span className="text-xs text-slate-300 font-mono">{brandColor}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button onClick={() => setStep(4)} className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={handleRunAnalysis}
                className="px-6 py-2.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-sky-600/20"
              >
                <Sparkles className="w-4 h-4" /> Synthesize Brand Profile & Campaign
              </button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" /> AI Brand Profile & Initial Campaign Ready
              </div>
              <h2 className="text-2xl font-extrabold text-slate-100">Welcome to LaunchDeck OS</h2>
              <p className="text-sm text-slate-400 mt-1">Your AI Brand Source of Truth and initial launch campaign have been generated.</p>
            </div>

            {synthesizedBrand && (
              <div className="space-y-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 block uppercase text-[10px]">Brand Tagline</span>
                  <span className="text-slate-200 font-semibold">{synthesizedBrand.tagline}</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase text-[10px]">Content Pillars</span>
                  <span className="text-sky-400">{synthesizedBrand.contentPillars}</span>
                </div>
              </div>
            )}

            <button
              onClick={handleCompleteOnboarding}
              className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-sky-600/20 flex items-center justify-center gap-2"
            >
              Launch Workspace Dashboard <Rocket className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="text-center text-xs text-slate-500 pb-4">
        LaunchDeck Marketing Operating System v2.0
      </div>
    </div>
  );
}
