'use client';

import { useState } from 'react';
import { CreditCard, Check, Sparkles, Zap, ShieldCheck } from 'lucide-react';

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState('GROWTH');
  const creditsUsed = 3450;
  const creditLimit = 10000;

  const plans = [
    {
      id: 'FREE',
      name: 'Free Starter',
      price: '$0',
      period: 'forever',
      credits: '100 AI credits / mo',
      features: ['1 Workspace', '1 User', 'Basic Brand Profile', 'Content Studio Access'],
    },
    {
      id: 'STARTER',
      name: 'Starter Founder',
      price: '$29',
      period: 'per month',
      credits: '2,500 AI credits / mo',
      features: ['1 Workspace', '1 User', 'Brand Source of Truth', 'Campaigns Engine', 'Content Calendar'],
    },
    {
      id: 'GROWTH',
      name: 'Growth OS',
      price: '$79',
      period: 'per month',
      popular: true,
      credits: '10,000 AI credits / mo',
      features: [
        '3 Team Users',
        'Multi-Channel Campaigns',
        'AI Marketing Copilot',
        '5-Slide Carousel Studio',
        'Engagement Hub Inbox',
        'Growth Analytics & Insights',
      ],
    },
    {
      id: 'AGENCY',
      name: 'Agency Edition',
      price: '$199',
      period: 'per month',
      credits: '30,000 AI credits / mo',
      features: [
        '10 Team Users',
        'Multiple Client Workspaces',
        'Client Approval Workflows',
        'White Labeling Support',
        'Priority Multi-LLM Routing',
      ],
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
          <CreditCard className="w-8 h-8 text-sky-400" /> Billing & AI Credit Metering
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Unified AI credit consumption across Gemini, OpenAI, Anthropic, and multi-provider failover.
        </p>
      </div>

      {/* Credit Usage Meter */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-100">Monthly AI Credit Usage</h2>
            <p className="text-xs text-slate-400">Resets on the 1st of every month</p>
          </div>
          <span className="text-sm font-extrabold text-sky-400">
            {creditsUsed.toLocaleString()} / {creditLimit.toLocaleString()} credits used
          </span>
        </div>

        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-sky-500 to-emerald-500 h-3 rounded-full"
            style={{ width: `${(creditsUsed / creditLimit) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.id;
          return (
            <div
              key={plan.id}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'bg-gradient-to-b from-sky-950/40 to-slate-900 border-sky-500/50 shadow-xl shadow-sky-500/10'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div>
                {plan.popular && (
                  <span className="px-2.5 py-0.5 text-[9px] font-extrabold rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 uppercase tracking-wider mb-3 inline-block">
                    Most Popular
                  </span>
                )}
                <h3 className="font-extrabold text-lg text-slate-100">{plan.name}</h3>
                <div className="my-3 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-100">{plan.price}</span>
                  <span className="text-xs text-slate-400">{plan.period}</span>
                </div>
                <div className="text-xs font-bold text-sky-400 mb-4">{plan.credits}</div>

                <ul className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
                  {plan.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <button
                  disabled={isCurrent}
                  onClick={() => setCurrentPlan(plan.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-default'
                      : 'bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/20'
                  }`}
                >
                  {isCurrent ? 'Current Active Plan' : `Upgrade to ${plan.name}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
