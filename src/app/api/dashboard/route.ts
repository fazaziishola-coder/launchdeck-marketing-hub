import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getOrCreateDefaultWorkspace } from '@/lib/workspace';

export async function GET() {
  try {
    const workspace = await getOrCreateDefaultWorkspace();
    const campaigns = await db.campaign.findMany({
      where: { workspaceId: workspace.id },
      include: { contentItems: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ workspace, campaigns });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch dashboard data', details: String(error) }, { status: 500 });
  }
}
