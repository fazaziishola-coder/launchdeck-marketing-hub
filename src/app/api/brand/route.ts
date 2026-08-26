import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getOrCreateDefaultWorkspace } from '@/lib/workspace';

export async function GET() {
  try {
    const workspace = await getOrCreateDefaultWorkspace();
    const brand = await db.brand.findUnique({
      where: { workspaceId: workspace.id },
    });
    return NextResponse.json({ brand });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch brand profile', details: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const workspace = await getOrCreateDefaultWorkspace();

    const updated = await db.brand.upsert({
      where: { workspaceId: workspace.id },
      update: body,
      create: {
        workspaceId: workspace.id,
        companyName: body.companyName || 'LaunchDeck',
        ...body,
      },
    });

    return NextResponse.json({ success: true, brand: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update brand profile', details: String(error) }, { status: 500 });
  }
}
