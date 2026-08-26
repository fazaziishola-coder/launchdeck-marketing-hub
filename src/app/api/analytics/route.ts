import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getOrCreateDefaultWorkspace } from '@/lib/workspace';

export async function GET() {
  try {
    const workspace = await getOrCreateDefaultWorkspace();
    const campaignsCount = await db.campaign.count({ where: { workspaceId: workspace.id } });
    const contentCount = await db.content.count({ where: { workspaceId: workspace.id } });

    return NextResponse.json({
      success: true,
      campaignsCount,
      contentCount,
      creditsRemaining: workspace.aiCreditsRemaining,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
