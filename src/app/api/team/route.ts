import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getOrCreateDefaultWorkspace } from '@/lib/workspace';

export async function GET() {
  try {
    const workspace = await getOrCreateDefaultWorkspace();
    const members = await db.workspaceMember.findMany({
      where: { workspaceId: workspace.id },
      include: { user: true },
    });
    return NextResponse.json({ members });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { email, role } = await req.json();
    const workspace = await getOrCreateDefaultWorkspace();

    let user = await db.user.findUnique({ where: { email } });
    if (!user) {
      user = await db.user.create({
        data: {
          email,
          name: email.split('@')[0],
        },
      });
    }

    const member = await db.workspaceMember.create({
      data: {
        workspaceId: workspace.id,
        userId: user.id,
        role: role || 'EDITOR',
      },
      include: { user: true },
    });

    return NextResponse.json({ success: true, member });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to invite team member', details: String(error) }, { status: 500 });
  }
}
