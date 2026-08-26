import { NextResponse } from 'next/server';
import { executePromptWithFallback } from '@/lib/ai/fallbackRouter';
import { db } from '@/lib/db';
import { getOrCreateDefaultWorkspace } from '@/lib/workspace';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const workspace = await getOrCreateDefaultWorkspace();
    const brand = await db.brand.findUnique({ where: { workspaceId: workspace.id } });

    const systemContext = `Workspace Brand Context:
Company: ${brand?.companyName || 'LaunchDeck'}
Tagline: ${brand?.tagline || 'AI Marketing Operating System'}
Target Audience: ${brand?.targetAudience || 'Founders & Marketers'}
Tone of Voice: ${brand?.toneOfVoice || 'Authoritative & Direct'}
Content Pillars: ${brand?.contentPillars || 'Building in Public, Growth Tips'}`;

    const { text, providerUsed } = await executePromptWithFallback(prompt, systemContext);

    return NextResponse.json({
      success: true,
      reply: text || `I have processed your request ("${prompt}") referencing your Brand Source of Truth.`,
      actionTaken: `Executed prompt using ${providerUsed}`,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process copilot request', details: String(error) }, { status: 500 });
  }
}
