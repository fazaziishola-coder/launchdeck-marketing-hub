import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');

    const campaigns = await db.marketingCampaign.findMany({
      where: productId ? { productId } : undefined,
      include: { product: { select: { name: true, slug: true } } },
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json(campaigns);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch campaigns', details: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, title, channel, status, content, notes, scheduledDate } = body;

    if (!productId || !title || !channel || !content) {
      return NextResponse.json({ error: 'ProductId, title, channel, and content are required' }, { status: 400 });
    }

    const campaign = await db.marketingCampaign.create({
      data: {
        productId,
        title,
        channel,
        status: status || 'DRAFT',
        content,
        notes: notes || null,
        scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
      },
    });

    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create campaign', details: String(error) }, { status: 500 });
  }
}
