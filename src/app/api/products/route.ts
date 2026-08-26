import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ensureSeeded } from '@/lib/seedHelper';
import { DEFAULT_DIRECTORIES, DEFAULT_LAUNCH_CHECKLIST } from '@/lib/initialData';

export async function GET() {
  try {
    await ensureSeeded();
    const products = await db.product.findMany({
      include: {
        campaigns: true,
        checklistItems: true,
        directorySubmissions: true,
        metricLogs: {
          orderBy: { date: 'desc' },
          take: 10,
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products', details: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, tagline, description, status, websiteUrl, repoUrl, techStack, targetAudience, pricingModel } = body;

    if (!name || !tagline) {
      return NextResponse.json({ error: 'Name and tagline are required' }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

    const product = await db.product.create({
      data: {
        name,
        slug,
        tagline,
        description: description || '',
        status: status || 'BUILDING',
        websiteUrl: websiteUrl || null,
        repoUrl: repoUrl || null,
        techStack: techStack || null,
        targetAudience: targetAudience || null,
        pricingModel: pricingModel || 'Freemium',
      },
    });

    // Auto-populate default launch checklist items
    for (const item of DEFAULT_LAUNCH_CHECKLIST) {
      await db.checklistItem.create({
        data: {
          productId: product.id,
          stage: item.stage,
          category: item.category,
          task: item.task,
        },
      });
    }

    // Auto-populate default directory directory submissions
    for (const dir of DEFAULT_DIRECTORIES) {
      await db.directorySubmission.create({
        data: {
          productId: product.id,
          directoryName: dir.directoryName,
          directoryUrl: dir.directoryUrl,
          domainRating: dir.domainRating,
          notes: dir.notes,
          status: 'NOT_STARTED',
        },
      });
    }

    // Initial metric log
    await db.metricLog.create({
      data: {
        productId: product.id,
        visitors: 0,
        signups: 0,
        mrr: 0,
        notes: 'Product Created',
      },
    });

    const fullProduct = await db.product.findUnique({
      where: { id: product.id },
      include: {
        campaigns: true,
        checklistItems: true,
        directorySubmissions: true,
        metricLogs: true,
      },
    });

    return NextResponse.json(fullProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product', details: String(error) }, { status: 500 });
  }
}
