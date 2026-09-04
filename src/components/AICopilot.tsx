'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, RefreshCw, Terminal } from 'lucide-react';

export default function AICopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>([
    {
      sender: 'ai',
      text: 'Good morning! I am your AI Marketing Copilot. I have full context on your Brand Source of Truth and active campaigns. What would you like to do today?',
    },
  ]);
  const [loading, setLoading] = useState(false);

  // Keyboard shortcut Cmd + K or Ctrl + K to toggle Copilot
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: data.reply || 'Workflow executed successfully! I have updated your workspace.',
          actionTaken: data.actionTaken,
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Sorry, I encountered an issue processing that command.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-3.5 py-2.5 bg-[#0f131f] hover:bg-[#141a2a] text-slate-200 font-medium text-xs rounded-full shadow-2xl flex items-center gap-2 border border-white/[0.12] hover:border-sky-500/40 transition-colors btn-tactile"
      >
        <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
        <span className="font-semibold text-slate-200">AI Copilot</span>
        <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 bg-white/[0.06] border border-white/[0.08] rounded">
          ⌘K
        </span>
      </button>

      {/* Slide-over Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex justify-end">
          <div className="bg-[#0c0f18] border-l border-white/[0.08] w-full max-w-md h-full flex flex-col justify-between shadow-2xl">
            {/* Drawer Header */}
            <div className="p-4 border-b border-white/[0.06] flex items-center justify-between bg-[#080a11]/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-xs text-slate-100">Marketing Copilot</h3>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Active" />
                  </div>
                  <p className="text-[10px] text-slate-400">Context: Brand Hub & Active Campaigns</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] rounded-md transition-colors btn-tactile"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.sender === 'ai' && (
                    <div className="w-6 h-6 rounded-md bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-sky-500 text-slate-950 font-medium'
                        : 'bg-[#101422] border border-white/[0.07] text-slate-200'
                    }`}
                  >
                    {m.text}
                    {m.actionTaken && (
                      <div className="mt-2 pt-2 border-t border-white/[0.08] text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                        <Terminal className="w-3 h-3 shrink-0" />
                        <span>Action: {m.actionTaken}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2 items-center text-xs text-sky-400 font-mono p-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Executing copilot workflow...</span>
                </div>
              )}
            </div>

            {/* Quick Action Chips & Input Form */}
            <div className="p-3 border-t border-white/[0.06] bg-[#080a11] space-y-2.5">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                {[
                  'Draft 14-Day Blitz',
                  'Verify Brand Voice',
                  'Generate LinkedIn Hook',
                ].map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => setInput(action)}
                    className="px-2 py-1 rounded-md bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-slate-300 font-medium shrink-0 transition-colors btn-tactile text-[11px]"
                  >
                    {action}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSend} className="relative">
                <input
                  type="text"
                  placeholder="Ask copilot or type a command..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 bg-[#0d111b] border border-white/[0.1] focus:border-sky-400/60 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="absolute right-1.5 top-1.5 p-1.5 bg-sky-400 hover:bg-sky-300 disabled:opacity-30 text-slate-950 rounded-md transition-colors btn-tactile"
                >
                  <Send className="w-3 h-3" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
