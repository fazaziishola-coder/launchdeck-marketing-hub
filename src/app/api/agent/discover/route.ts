import { NextResponse } from 'next/server';
import { autoRegisterDiscoveredProjects, scanLocalProjectsFolder } from '@/lib/agents/discoveryAgent';
import path from 'path';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const targetDir = searchParams.get('dir') || path.resolve(process.cwd(), '..');

    const discovered = await scanLocalProjectsFolder(targetDir);
    return NextResponse.json({ targetDir, projects: discovered });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to scan projects directory', details: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const targetDir = body.dir || path.resolve(process.cwd(), '..');

    const result = await autoRegisterDiscoveredProjects(targetDir);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to auto-register projects', details: String(error) }, { status: 500 });
  }
}
