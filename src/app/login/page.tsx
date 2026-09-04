'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Rocket, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid email or password');
      } else {
        router.push('/');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080a11] text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/" className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-1 btn-tactile">
            <Rocket className="w-4 h-4" />
          </Link>
          <h1 className="text-xl font-bold text-slate-100 tracking-tight">Sign in to LaunchDeck</h1>
          <p className="text-xs text-slate-400">Access your autonomous marketing workspace</p>
        </div>

        {/* Card */}
        <div className="p-6 rounded-xl bg-[#0c0f18] border border-white/[0.08] shadow-2xl space-y-4">
          {error && (
            <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="founder@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-[#080a11] border border-white/[0.08] focus:border-sky-400/60 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Password
                </label>
                <a href="#" className="text-[11px] text-sky-400 hover:text-sky-300 transition-colors">
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-[#080a11] border border-white/[0.08] focus:border-sky-400/60 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-sky-400 hover:bg-sky-300 text-slate-950 font-semibold text-xs rounded-lg transition-colors btn-tactile shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50 mt-1"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-400 border-t border-white/[0.06]">
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold text-sky-400 hover:text-sky-300 transition-colors">
              Sign up free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
