'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShieldCheck,
  Target,
  Sparkles,
  Calendar,
  MessageSquare,
  Mail,
  BarChart2,
  Zap,
  Users,
  CreditCard,
  Settings,
  Rocket,
  LogOut,
  User,
} from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Hide sidebar on root landing page, signup, login, onboarding
  if (['/', '/landing', '/login', '/signup', '/onboarding'].includes(pathname)) {
    return null;
  }

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setCurrentUser(null);
    router.push('/login');
  };

  const workspaceLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Brand Hub', href: '/brand', icon: ShieldCheck, badge: 'TRUTH' },
    { name: 'Campaigns Engine', href: '/campaigns', icon: Target },
    { name: 'Content Studio', href: '/content', icon: Sparkles },
    { name: 'Content Calendar', href: '/calendar', icon: Calendar },
    { name: 'Engagement Hub', href: '/engagement', icon: MessageSquare },
    { name: 'Cold Outreach', href: '/outreach', icon: Mail },
    { name: 'Growth Analytics', href: '/analytics', icon: BarChart2 },
    { name: 'Autopilot OS', href: '/autopilot', icon: Zap, badge: 'AUTO' },
  ];

  const managementLinks = [
    { name: 'Team Workspace', href: '/team', icon: Users },
    { name: 'Billing & AI Credits', href: '/billing', icon: CreditCard },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0c0f18] border-r border-white/[0.08] p-4 flex flex-col justify-between min-h-screen sticky top-0 z-30">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-3 border-b border-white/[0.06]">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
            <Rocket className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-100 tracking-tight">LaunchDeck</span>
              <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 rounded bg-white/[0.05] border border-white/[0.08] text-slate-400">
                OS v2
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">Marketing Engine</p>
          </div>
        </div>

        {/* Primary Workspace Links */}
        <div className="space-y-1">
          <span className="px-2 text-[11px] font-medium text-slate-400 block mb-1">
            Workspace
          </span>
          <nav className="space-y-0.5">
            {workspaceLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[13px] transition-colors btn-tactile ${
                    isActive
                      ? 'bg-sky-500/10 text-sky-300 font-medium'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                    <span className="truncate">{link.name}</span>
                  </div>
                  {link.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded border uppercase shrink-0 ${
                        link.badge === 'TRUTH'
                          ? 'bg-sky-500/10 text-sky-300 border-sky-500/20 font-medium'
                          : 'bg-white/[0.04] text-slate-400 border-white/[0.08]'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Management Links */}
        <div className="space-y-1 pt-2">
          <span className="px-2 text-[11px] font-medium text-slate-400 block mb-1">
            Management
          </span>
          <nav className="space-y-0.5">
            {managementLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[13px] transition-colors btn-tactile ${
                    isActive
                      ? 'bg-sky-500/10 text-sky-300 font-medium'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                    <span className="truncate">{link.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* User Profile & Auth Footer */}
      <div className="pt-4 border-t border-white/[0.06]">
        {currentUser ? (
          <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-md bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-bold shrink-0 text-xs">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-slate-200 truncate">{currentUser.name || 'User'}</div>
                <div className="text-[10px] text-slate-400 truncate">{currentUser.email}</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Log Out"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-white/[0.05] rounded-md transition-colors btn-tactile"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="flex-1 text-center py-1.5 text-xs font-medium text-slate-300 bg-white/[0.03] hover:bg-white/[0.06] rounded-lg border border-white/[0.08] transition-colors btn-tactile"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="flex-1 text-center py-1.5 text-xs font-semibold text-sky-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors btn-tactile shadow-sm"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
