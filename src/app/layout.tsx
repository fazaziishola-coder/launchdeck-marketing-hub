import type { Metadata } from 'next';
import './globals.css';
import AppShell from '@/components/AppShell';

export const metadata: Metadata = {
  title: 'LaunchDeck - AI Marketing Operating System',
  description: 'Plan, create, and execute your marketing from one unified AI-powered workspace.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#080a11] text-slate-100 min-h-screen antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
