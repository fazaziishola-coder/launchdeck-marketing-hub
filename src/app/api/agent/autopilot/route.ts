import { NextResponse } from 'next/server';
import { autoRegisterDiscoveredProjects } from '@/lib/agents/discoveryAgent';
import { generateMarketingSlideDeck } from '@/lib/agents/slideGenerator';
import { publishSocialPost } from '@/lib/agents/socialPublisher';
import { processAutomatedEngagement } from '@/lib/agents/engagementAgent';
import { db } from '@/lib/db';
import path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const targetDir = body.dir || path.resolve(process.cwd(), '..');

    console.log('[Autopilot Master Engine] Starting full automated business lifecycle cycle...');

    // Step 1: Discover & Register projects
    const discoveryResult = await autoRegisterDiscoveredProjects(targetDir);

    // Fetch active products
    const products = await db.product.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 3,
    });

    const executionLog: any[] = [];

    for (const prod of products) {
      // Step 2: Auto-generate slide deck & visual campaign
      const slideDeck = await generateMarketingSlideDeck(
        prod.name,
        prod.tagline,
        prod.description,
        prod.targetAudience || 'Builders',
        prod.techStack || 'Next.js'
      );

      // Step 3: Auto-publish post
      const pubResult = await publishSocialPost({
        productId: prod.id,
        channel: 'TWITTER',
        title: `Autopilot Post: ${prod.name}`,
        content: `🚀 Autopilot Update: ${prod.name} – ${prod.tagline}\n\n${prod.description}\n\nTry it live today!`,
      });

      // Step 4: Engagement & Auto-replies
      const engagement = await processAutomatedEngagement(prod.name);

      executionLog.push({
        productName: prod.name,
        slideCount: slideDeck.slides.length,
        postUrl: pubResult.postUrl,
        commentsReplied: engagement.commentsReplied.length,
        outreachQueued: engagement.outreachLeadsQueued.length,
      });
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      discovery: {
        scannedCount: discoveryResult.scannedCount,
        newlyRegisteredCount: discoveryResult.newlyRegisteredCount,
      },
      executionLog,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Autopilot execution failed', details: String(error) }, { status: 500 });
  }
}
