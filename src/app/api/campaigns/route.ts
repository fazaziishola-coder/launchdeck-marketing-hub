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
    return NextResponse.json(campaigns);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const workspace = await getOrCreateDefaultWorkspace();
    const body = await req.json();

    const campaign = await db.campaign.create({
      data: {
        workspaceId: workspace.id,
        name: body.name,
        objective: body.objective || 'GENERATE_LEADS',
        status: body.status || 'ACTIVE',
        targetAudience: body.targetAudience || 'Target persona',
        offer: body.offer || null,
        channels: body.channels || 'LINKEDIN,TWITTER',
      },
    });

    return NextResponse.json(campaign);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
  }
}
