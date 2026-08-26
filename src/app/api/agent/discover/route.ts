import { NextResponse } from 'next/server';
import { autoRegisterDiscoveredProjects, scanLocalProjectsDirectory } from '@/lib/agents/discoveryAgent';
import path from 'path';

export async function GET() {
  try {
    const parentProjectsDir = path.resolve(process.cwd(), '..');
    const projects = await scanLocalProjectsDirectory(parentProjectsDir);
    return NextResponse.json({ parentDir: parentProjectsDir, discoveredTotal: projects.length, projects });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to scan projects', details: String(error) }, { status: 500 });
  }
}

export async function POST() {
  try {
    const parentProjectsDir = path.resolve(process.cwd(), '..');
    const result = await autoRegisterDiscoveredProjects(parentProjectsDir);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to auto-register projects', details: String(error) }, { status: 500 });
  }
}
