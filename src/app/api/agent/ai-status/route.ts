import { NextResponse } from 'next/server';
import { getProviderHealthStatus } from '@/lib/ai/fallbackRouter';

export async function GET() {
  try {
    const providers = getProviderHealthStatus();
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      providers,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch AI provider status', details: String(error) }, { status: 500 });
  }
}
