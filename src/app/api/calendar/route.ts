import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getOrCreateDefaultWorkspace } from '@/lib/workspace';

export async function GET() {
  try {
    const workspace = await getOrCreateDefaultWorkspace();
    const schedules = await db.contentSchedule.findMany({
      where: { workspaceId: workspace.id },
      include: { content: true },
      orderBy: { scheduledFor: 'asc' },
    });
    return NextResponse.json({ schedules });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch calendar schedules', details: String(error) }, { status: 500 });
  }
}
