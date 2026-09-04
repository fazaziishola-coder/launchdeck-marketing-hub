'use client';

import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation';
import AICopilot from '@/components/AICopilot';

const PUBLIC_ROUTES = ['/', '/landing', '/login', '/signup', '/onboarding'];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (isPublicRoute) {
    return (
      <div className="w-full min-h-screen bg-[#080a11] text-slate-100 flex flex-col">
        {children}
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#080a11] text-slate-100 flex flex-col md:flex-row">
      <Navigation />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
      <AICopilot />
    </div>
  );
}
