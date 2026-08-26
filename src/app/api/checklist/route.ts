import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, stage, category, task } = body;

    if (!productId || !task) {
      return NextResponse.json({ error: 'ProductId and task are required' }, { status: 400 });
    }

    const item = await db.checklistItem.create({
      data: {
        productId,
        stage: stage || 'PRE_LAUNCH',
        category: category || 'General',
        task,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add checklist item', details: String(error) }, { status: 500 });
  }
}
