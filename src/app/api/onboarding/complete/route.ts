import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getOrCreateDefaultWorkspace } from '@/lib/workspace';

export async function POST(req: Request) {
  try {
    const {
      companyName,
      websiteUrl,
      description,
      industry,
      category,
      targetAudience,
      channels,
      primaryGoal,
      toneOfVoice,
      brandColors,
      synthesizedBrand,
    } = await req.json();

    const workspace = await getOrCreateDefaultWorkspace();

    // Update Brand Profile
    await db.brand.upsert({
      where: { workspaceId: workspace.id },
      update: {
        companyName: companyName || 'LaunchDeck',
        websiteUrl: websiteUrl || null,
        industry: industry || 'Software',
        businessCategory: category || 'SAAS',
        description: description || '',
        targetAudience: targetAudience || 'Founders & Growth Teams',
        tagline: synthesizedBrand?.tagline || 'Plan, create and execute your marketing from one AI workspace.',
        valueProps: synthesizedBrand?.valueProps || 'Unified marketing loop, AI Brand Source of Truth.',
        messagingPillars: synthesizedBrand?.messagingPillars || 'All-in-one OS; Founder efficiency.',
        contentPillars: synthesizedBrand?.contentPillars || 'Building in Public; Educational Growth Tips.',
        toneOfVoice: toneOfVoice || 'Authoritative & Direct',
        primaryGoal: primaryGoal || 'GENERATE_LEADS',
        brandColors: brandColors || '#0284c7',
      },
      create: {
        workspaceId: workspace.id,
        companyName: companyName || 'LaunchDeck',
        websiteUrl: websiteUrl || null,
        industry: industry || 'Software',
        businessCategory: category || 'SAAS',
        description: description || '',
        targetAudience: targetAudience || 'Founders & Growth Teams',
        tagline: synthesizedBrand?.tagline || 'Plan, create and execute your marketing from one AI workspace.',
        valueProps: synthesizedBrand?.valueProps || 'Unified marketing loop, AI Brand Source of Truth.',
        messagingPillars: synthesizedBrand?.messagingPillars || 'All-in-one OS; Founder efficiency.',
        contentPillars: synthesizedBrand?.contentPillars || 'Building in Public; Educational Growth Tips.',
        toneOfVoice: toneOfVoice || 'Authoritative & Direct',
        primaryGoal: primaryGoal || 'GENERATE_LEADS',
        brandColors: brandColors || '#0284c7',
      },
    });

    // Create Initial Launch Campaign
    const campaign = await db.campaign.create({
      data: {
        workspaceId: workspace.id,
        name: `${companyName || 'Product'} 14-Day Launch Blitz`,
        objective: primaryGoal || 'GENERATE_LEADS',
        status: 'ACTIVE',
        targetAudience: targetAudience || 'Early adopters',
        channels: channels || 'LINKEDIN,TWITTER',
        offer: 'Early Access Demo & 14-Day Free Trial',
        startDate: new Date(),
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      },
    });

    // Populate Initial Content Ideas inside Campaign
    await db.content.create({
      data: {
        workspaceId: workspace.id,
        campaignId: campaign.id,
        title: `Why we built ${companyName || 'our product'} – Founder Story`,
        contentType: 'LINKEDIN_POST',
        status: 'DRAFT',
        body: `🚀 Why we built ${companyName || 'our product'}\n\nMost founders spend 15+ hours a week juggling 10 different tools.\n\nHere is how we fixed that 🧵👇`,
      },
    });

    return NextResponse.json({ success: true, workspaceId: workspace.id, campaignId: campaign.id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to complete onboarding', details: String(error) }, { status: 500 });
  }
}
