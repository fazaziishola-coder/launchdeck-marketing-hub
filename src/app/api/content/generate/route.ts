import { NextResponse } from 'next/server';
import { executePromptWithFallback } from '@/lib/ai/fallbackRouter';
import { db } from '@/lib/db';
import { getOrCreateDefaultWorkspace } from '@/lib/workspace';

export async function POST(req: Request) {
  try {
    const { contentType, topic, objective, campaignId } = await req.json();

    const workspace = await getOrCreateDefaultWorkspace();
    const brand = await db.brand.findUnique({ where: { workspaceId: workspace.id } });

    const company = brand?.companyName || 'LaunchDeck';
    const tagline = brand?.tagline || 'AI Marketing Operating System';
    const audience = brand?.targetAudience || 'Startup founders and marketers';

    if (contentType === 'CAROUSEL') {
      const slides = [
        {
          slideNumber: 1,
          badge: '🚀 PRODUCTIVITY BREAKTHROUGH',
          headline: topic || `Why ${company} is replacing 10 marketing tools`,
          subheadline: tagline,
          points: [`For: ${audience}`, 'Unified AI Marketing OS'],
          themeColor: 'from-sky-600 to-indigo-600',
        },
        {
          slideNumber: 2,
          badge: '⚠️ THE PAIN POINT',
          headline: 'Tool fragmentation is killing founder focus',
          subheadline: 'Juggling ChatGPT, Notion, Buffer, Canva, and Sheets takes 15+ hours/week.',
          points: ['Loss of brand context', 'Inconsistent posting schedule', 'No performance loop'],
          themeColor: 'from-rose-600 to-amber-600',
        },
        {
          slideNumber: 3,
          badge: '✨ THE SOLUTION',
          headline: `Run marketing from one workspace`,
          subheadline: `With ${company}, your AI Marketing OS handles strategy to distribution.`,
          points: ['AI Brand Source of Truth', 'Multi-channel campaigns', 'Automated distribution'],
          themeColor: 'from-emerald-600 to-teal-600',
        },
        {
          slideNumber: 4,
          badge: '⚡ KEY HIGHLIGHTS',
          headline: 'Built for speed and conversion',
          subheadline: 'Everything early-stage teams need to scale revenue.',
          points: ['1️⃣ 14-day launch campaigns', '2️⃣ 5-slide visual carousel generator', '3️⃣ Multi-LLM quota failover router'],
          themeColor: 'from-blue-600 to-cyan-600',
        },
        {
          slideNumber: 5,
          badge: '🎁 GET STARTED TODAY',
          headline: `Try ${company} Free!`,
          subheadline: 'Plan, create, and execute your marketing from one workspace.',
          points: ['👉 Link in comments', '⚡ Comment "LAUNCH" for priority onboarding!'],
          themeColor: 'from-sky-500 to-emerald-500',
        },
      ];

      // Save content item
      await db.content.create({
        data: {
          workspaceId: workspace.id,
          campaignId: campaignId || null,
          title: `5-Slide Carousel: ${topic || company}`,
          contentType: 'CAROUSEL',
          status: 'DRAFT',
          body: JSON.stringify(slides),
          slidesData: JSON.stringify(slides),
        },
      });

      return NextResponse.json({ success: true, slides });
    }

    // Generate multi-variation copy
    const variations = [
      {
        angle: 'Variation A: Founder Story',
        content: `🚀 Why we built ${company}...\n\nMost founders spend 15+ hours a week juggling 10 different tools.\n\nWe realized AI generators alone weren't enough. You need one workspace to run your marketing operation.\n\nHere is how ${company} fixes that 🧵👇`,
      },
      {
        angle: 'Variation B: Educational Growth Guide',
        content: `💡 3 steps to scale your startup marketing without hiring a full team:\n\n1️⃣ Establish an AI Brand Source of Truth\n2️⃣ Plan 14-day goal-driven campaigns\n3️⃣ Distribute across LinkedIn & X with automated scheduling\n\nHow ${company} automates this loop: [LINK]`,
      },
      {
        angle: 'Variation C: Contrarian Tech Take',
        content: `Unpopular opinion: AI copy generators are commoditized.\n\nGenerating isolated posts isn't a strategy. Running a weekly marketing loop (Brand -> Strategy -> Campaign -> Analytics) is what actually scales ARR.\n\nThat's why we built ${company}.`,
      },
    ];

    // Save primary content item
    await db.content.create({
      data: {
        workspaceId: workspace.id,
        campaignId: campaignId || null,
        title: `${contentType}: ${topic || company}`,
        contentType,
        status: 'DRAFT',
        body: variations[0].content,
        variations: JSON.stringify(variations),
      },
    });

    return NextResponse.json({ success: true, variations });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate content', details: String(error) }, { status: 500 });
  }
}
