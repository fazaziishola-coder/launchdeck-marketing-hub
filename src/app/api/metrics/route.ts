import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, visitors, signups, mrr, notes } = body;

    if (!productId) {
      return NextResponse.json({ error: 'ProductId is required' }, { status: 400 });
    }

    // Create metric log
    const log = await db.metricLog.create({
      data: {
        productId,
        visitors: Number(visitors) || 0,
        signups: Number(signups) || 0,
        mrr: Number(mrr) || 0,
        notes: notes || null,
      },
    });

    // Also update product totals if MRR or users provided
    await db.product.update({
      where: { id: productId },
      data: {
        monthlyRevenue: Number(mrr) || 0,
        totalUsers: Number(signups) || 0,
      },
    });

    return NextResponse.json(log, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record metrics', details: String(error) }, { status: 500 });
  }
}
