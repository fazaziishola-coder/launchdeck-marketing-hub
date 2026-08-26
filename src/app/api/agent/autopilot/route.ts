import { NextResponse } from 'next/server';
import { getProviderHealthStatus } from '@/lib/ai/fallbackRouter';
import { autoRegisterDiscoveredProjects } from '@/lib/agents/discoveryAgent';
import path from 'path';

export async function GET() {
  try {
    const aiHealth = getProviderHealthStatus();
    return NextResponse.json({
      status: 'ACTIVE',
      mode: 'AUTOPILOT_SCHEDULED',
      aiProviders: aiHealth,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Autopilot status error' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const parentProjectsDir = path.resolve(process.cwd(), '..');
    const discovery = await autoRegisterDiscoveredProjects(parentProjectsDir);

    return NextResponse.json({
      success: true,
      message: `Autopilot cycle complete. Auto-discovered ${discovery.newlyRegisteredCount} projects.`,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Autopilot execution error', details: String(error) }, { status: 500 });
  }
}
