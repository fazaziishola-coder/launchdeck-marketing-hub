'use client';

import { useState } from 'react';
import { MessageSquare, Sparkles, Check, Send, ThumbsUp, AlertCircle, HelpCircle } from 'lucide-react';

export default function EngagementHubPage() {
  const [comments, setComments] = useState<any[]>([
    {
      id: '1',
      platform: 'LinkedIn',
      author: 'David Chen',
      role: 'Growth Lead @ TechCorp',
      comment: 'This looks super interesting! How much does LaunchDeck cost for a team of 3 marketers?',
      intent: 'LEAD',
      suggestedReply: 'Hey David! Our Growth plan is $79/mo for up to 3 team members, including 10,000 AI credits and full campaign tools. Would love to send you a demo link!',
      approved: false,
    },
    {
      id: '2',
      platform: 'X / Twitter',
      author: '@sarah_builds',
      role: 'Indie Hacker',
      comment: 'Does this connect to my existing brand guidelines and tone of voice?',
      intent: 'QUESTION',
      suggestedReply: 'Yes Sarah! LaunchDeck has a dedicated Brand Hub where you specify your ICP, messaging pillars, words to use, and tone of voice. The AI references it in every post.',
      approved: false,
    },
    {
      id: '3',
      platform: 'Reddit (r/SaaS)',
      author: 'u/dev_founder',
      role: 'SaaS Creator',
      comment: 'Is this just another wrapper or does it actually help plan 14-day launch campaigns?',
      intent: 'OBJECTION',
      suggestedReply: 'Great question! Unlike isolated wrappers, LaunchDeck executes a complete 8-step marketing loop (Brand -> Strategy -> Campaign -> Content -> Distribution -> Analytics).',
      approved: false,
    },
  ]);

  const handleApprove = (id: string) => {
    setComments(comments.map((c) => (c.id === id ? { ...c, approved: true } : c)));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-sky-400" /> Engagement Hub
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Social Inbox with automatic sentiment classification and 1-click AI comment replies.
        </p>
      </div>

      {/* Inbox List */}
      <div className="space-y-4">
        {comments.map((item) => (
          <div key={item.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-bold text-sm text-slate-200">{item.author}</span>
                <span className="text-xs text-slate-500">{item.role}</span>
                <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-slate-800 text-sky-400 border border-slate-700">
                  {item.platform}
                </span>
              </div>

              <span
                className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full ${
                  item.intent === 'LEAD'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : item.intent === 'QUESTION'
                    ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}
              >
                {item.intent} DETECTED
              </span>
            </div>

            <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-sans">
              "{item.comment}"
            </p>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400">
                <Sparkles className="w-3.5 h-3.5" /> AI Suggested Response
              </div>
              <p className="text-xs text-slate-300">{item.suggestedReply}</p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleApprove(item.id)}
                  disabled={item.approved}
                  className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
                    item.approved
                      ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/20'
                  }`}
                >
                  {item.approved ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                  {item.approved ? 'Approved & Posted' : 'Approve & Reply'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
