import { db } from './db';

export async function getOrCreateDefaultWorkspace() {
  try {
    let user = await db.user.findFirst();
    if (!user) {
      user = await db.user.create({
        data: {
          email: 'founder@launchdeck.app',
          name: 'Abdulbasit',
        },
      });
    }

    let workspace = await db.workspace.findFirst({
      include: {
        brand: true,
        campaigns: true,
        contentItems: true,
        members: true,
      },
    });

    if (!workspace) {
      workspace = await db.workspace.create({
        data: {
          name: 'Primary Workspace',
          slug: 'primary-workspace',
          ownerId: user.id,
          plan: 'GROWTH',
          aiCreditsRemaining: 10000,
          monthlyCreditLimit: 10000,
          members: {
            create: {
              userId: user.id,
              role: 'OWNER',
            },
          },
          brand: {
            create: {
              companyName: 'LaunchDeck',
              websiteUrl: 'https://launchdeck.app',
              industry: 'Software / AI Marketing',
              businessCategory: 'SAAS',
              description: 'AI-powered marketing operating system for early stage founders and lean growth teams.',
              targetAudience: 'Early stage startup founders (1-10 employees), solopreneurs, and growth agencies.',
              tagline: 'Plan, create and execute your marketing from one AI-powered workspace.',
              mission: 'Replace fragmented marketing tools with a unified AI workflow operating loop.',
              valueProps: 'Unified workspace, AI Brand Source of Truth, automated 14-day launch campaigns, multi-platform content studio, slide deck generator.',
              messagingPillars: 'All-in-one marketing OS; Context-aware AI; Data-driven growth recommendations.',
              contentPillars: 'Building in Public; Educational Startup Growth; Contrarian Tech Takes; Product Features.',
              toneOfVoice: 'Authoritative, Concise, Direct, High-Value',
              wordsToUse: 'OS, Operating System, Pipeline, Strategy, Conversion, Growth, Workflow',
              wordsToAvoid: 'Commoditized, Generic, Cheap, Wrapper, Hype',
              primaryGoal: 'GENERATE_LEADS',
              brandColors: '#0284c7, #0f172a, #f59e0b',
            },
          },
          campaigns: {
            create: {
              name: 'Q3 Product Launch Campaign',
              objective: 'GENERATE_LEADS',
              status: 'ACTIVE',
              targetAudience: 'Bootstrapped SaaS Founders & Agency Leads',
              offer: '14-Day Free Trial of LaunchDeck Marketing OS',
              channels: 'LINKEDIN, TWITTER, EMAIL',
              startDate: new Date(),
              endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            },
          },
        },
        include: {
          brand: true,
          campaigns: true,
          contentItems: true,
          members: true,
        },
      });
    }

    return workspace;
  } catch (error) {
    console.error('Error in getOrCreateDefaultWorkspace:', error);
    throw error;
  }
}
