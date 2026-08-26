import { NextResponse } from 'next/server';
import { ensureSeeded } from '@/lib/seedHelper';

export async function GET() {
  try {
    const result = await ensureSeeded();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to seed database', details: String(error) }, { status: 500 });
  }
}

export async function POST() {
  try {
    const result = await ensureSeeded();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to seed database', details: String(error) }, { status: 500 });
  }
}
