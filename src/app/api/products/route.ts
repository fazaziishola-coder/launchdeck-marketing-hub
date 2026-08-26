import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getOrCreateDefaultWorkspace } from '@/lib/workspace';

export async function GET() {
  try {
    const workspace = await getOrCreateDefaultWorkspace();
    const products = await db.product.findMany({
      where: { workspaceId: workspace.id },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const workspace = await getOrCreateDefaultWorkspace();
    const body = await req.json();

    const product = await db.product.create({
      data: {
        workspaceId: workspace.id,
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        tagline: body.tagline || '',
        description: body.description || '',
        status: body.status || 'BUILDING',
        websiteUrl: body.websiteUrl || null,
        repoUrl: body.repoUrl || null,
        techStack: body.techStack || 'TypeScript',
        targetAudience: body.targetAudience || 'Founders & Marketers',
        pricingModel: body.pricingModel || 'Freemium',
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
