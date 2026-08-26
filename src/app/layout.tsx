import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import AICopilot from '@/components/AICopilot';

export const metadata: Metadata = {
  title: 'LaunchDeck - AI Marketing Operating System',
  description: 'Plan, create, and execute your marketing from one AI-powered workspace.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 flex min-h-screen">
        <Navigation />
        <main className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto">
          {children}
        </main>
        <AICopilot />
      </body>
    </html>
  );
}
