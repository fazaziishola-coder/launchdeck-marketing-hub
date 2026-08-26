import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request, context: { params: { id: string } | Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const campaign = await db.campaign.findUnique({
      where: { id: params.id },
      include: { contentItems: true },
    });

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    return NextResponse.json(campaign);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch campaign' }, { status: 500 });
  }
}
