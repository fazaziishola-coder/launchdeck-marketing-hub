'use client';

import { useState } from 'react';
import { Mail, Sparkles, Send, Copy, Check, RefreshCw } from 'lucide-react';

export default function OutreachPage() {
  const [targetRole, setTargetRole] = useState('Head of Growth / Marketing Director');
  const [painPoint, setPainPoint] = useState('Juggling 10+ marketing tools & spending 15h/week creating content');
  const [offer, setOffer] = useState('14-Day Free Access to LaunchDeck AI Marketing OS');

  const [generating, setGenerating] = useState(false);
  const [sequence, setSequence] = useState<any[]>([]);

  const handleGenerateOutreach = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/outreach/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetRole, painPoint, offer }),
      });
      const data = await res.json();
      if (data.sequence) setSequence(data.sequence);
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
          <Mail className="w-8 h-8 text-sky-400" /> Cold Outreach Studio
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Structured 5-step cold outreach sequences (Initial Email, LinkedIn Connection, Follow-up 1, Follow-up 2, Breakup).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-slate-200">Outreach Parameters</h2>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Target Persona / Role</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Pain Point</label>
            <textarea
              rows={2}
              value={painPoint}
              onChange={(e) => setPainPoint(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Core Offer / Hook</label>
            <input
              type="text"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
            />
          </div>

          <button
            onClick={handleGenerateOutreach}
            disabled={generating}
            className="w-full py-2.5 bg-sky-400 hover:bg-sky-300 disabled:opacity-50 text-slate-950 font-semibold text-xs rounded-lg shadow-sm flex items-center justify-center gap-2 btn-tactile transition-colors"
          >
            {generating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{generating ? 'Drafting Sequence...' : 'Generate Outreach Sequence'}</span>
          </button>
        </div>

        {/* Sequence List */}
        <div className="lg:col-span-2 space-y-4">
          {sequence.length === 0 ? (
            <div className="p-16 text-center bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-500">
              Set parameters on the left and click "Generate Outreach Sequence" to build a 5-step cold sequence.
            </div>
          ) : (
            sequence.map((step, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    Step {idx + 1}: {step.stepName}
                  </span>
                  <span className="text-xs text-slate-500">{step.timing}</span>
                </div>
                <h4 className="font-bold text-xs text-slate-200">Subject: {step.subject}</h4>
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 font-sans whitespace-pre-wrap leading-relaxed">
                  {step.body}
                </pre>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
