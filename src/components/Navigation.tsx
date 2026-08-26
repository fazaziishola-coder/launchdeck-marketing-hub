'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
} from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  const workspaceLinks = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
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
    <aside className="w-64 bg-slate-900/90 border-r border-slate-800/80 p-4 flex flex-col justify-between min-h-screen sticky top-0 backdrop-blur-md">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-slate-800/80">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-amber-500 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-sky-500/20">
            <Rocket className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-slate-100 tracking-tight">LaunchDeck</h1>
            <p className="text-[10px] text-amber-400 font-extrabold tracking-wider uppercase flex items-center gap-1">
              <Zap className="w-3 h-3 fill-amber-400" /> Marketing OS v2
            </p>
          </div>
        </div>

        {/* Primary Workspace Links */}
        <div className="space-y-1">
          <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Workspace</span>
          <nav className="space-y-1 pt-1">
            {workspaceLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-sky-600/10 text-sky-400 border border-sky-500/20 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                    {link.name}
                  </div>
                  {link.badge && (
                    <span
                      className={`px-1.5 py-0.5 text-[9px] font-extrabold rounded ${
                        link.badge === 'TRUTH'
                          ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
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
        <div className="space-y-1 pt-6">
          <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Management</span>
          <nav className="space-y-1 pt-1">
            {managementLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-sky-600/10 text-sky-400 border border-sky-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                    {link.name}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Onboarding Trigger Footer */}
      <div className="pt-4 border-t border-slate-800/80">
        <Link
          href="/onboarding"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-slate-300 bg-slate-800/60 hover:bg-slate-800 rounded-xl border border-slate-700/50 transition-colors"
        >
          <Rocket className="w-3.5 h-3.5 text-sky-400" /> Run Onboarding Wizard
        </Link>
      </div>
    </aside>
  );
}
