import { NextResponse } from 'next/server';
import { executePromptWithFallback } from '@/lib/ai/fallbackRouter';

export async function POST(req: Request) {
  try {
    const { companyName, websiteUrl, description, industry, targetAudience, category, primaryGoal, toneOfVoice } = await req.json();

    const prompt = `Analyze and synthesize a brand marketing profile for:
Company: ${companyName || 'LaunchDeck'}
Description: ${description || 'AI marketing operating system'}
Industry: ${industry || 'Software / SaaS'}
Category: ${category || 'SAAS'}
Target Audience: ${targetAudience || 'Founders & Marketers'}
Tone of Voice: ${toneOfVoice || 'Authoritative & Direct'}

Return a JSON object with:
- tagline: a high-converting tagline
- valueProps: 3 core value propositions
- messagingPillars: 3 messaging pillars
- contentPillars: 4 content pillars for LinkedIn/X
- wordsToUse: 5 high-impact brand keywords
- wordsToAvoid: 5 words to avoid`;

    const { text } = await executePromptWithFallback(prompt);

    // Parse response or fallback
    let synthesized: any = null;
    try {
      synthesized = JSON.parse(text);
    } catch {
      synthesized = {
        tagline: `Plan, create and execute marketing for ${companyName || 'your business'} from one AI workspace.`,
        valueProps: 'Unified marketing loop, Context-aware AI, Data-driven growth recommendations.',
        messagingPillars: 'All-in-one OS; Founder efficiency; High conversion.',
        contentPillars: 'Building in Public; Educational Growth Tips; Product Feature Demos; Contrarian Takes.',
        wordsToUse: 'OS, Operating System, Pipeline, Strategy, Conversion',
        wordsToAvoid: 'Commoditized, Generic, Wrapper, Cheap',
      };
    }

    return NextResponse.json({ success: true, synthesized });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to analyze brand', details: String(error) }, { status: 500 });
  }
}
