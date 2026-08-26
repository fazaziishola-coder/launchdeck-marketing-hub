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
        className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs rounded-full shadow-2xl flex items-center gap-2 border border-sky-400/30 transition-transform hover:scale-105"
      >
        <Sparkles className="w-4 h-4 text-amber-300" />
        AI Copilot <span className="text-[10px] opacity-75 font-mono px-1 bg-black/30 rounded">⌘K</span>
      </button>

      {/* Slide-over Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-100">AI Marketing Copilot</h3>
                  <p className="text-[10px] text-slate-400">Connected to Workspace & Brand Source of Truth</p>
                </div>
              </div>

              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-lg bg-sky-600/20 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-sky-600 text-white font-medium rounded-tr-none'
                        : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {m.text}
                    {m.actionTaken && (
                      <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                        <Terminal className="w-3 h-3" /> Action Executed: {m.actionTaken}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2 items-center text-xs text-sky-400 font-semibold p-2">
                  <RefreshCw className="w-4 h-4 animate-spin" /> Copilot is analyzing workspace & executing command...
                </div>
              )}
            </div>

            {/* Prompt Input Form */}
            <form onSubmit={handleSend} className="p-4 border-t border-slate-800 bg-slate-950">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask Copilot e.g. 'Create a 14-day LinkedIn campaign for launch'..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="absolute right-2 top-2 p-1.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white rounded-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
