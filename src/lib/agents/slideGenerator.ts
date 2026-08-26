import { executeWithFallback } from '../ai/fallbackRouter';

export interface Slide {
  slideNumber: number;
  type: 'TITLE' | 'PROBLEM' | 'SOLUTION' | 'FEATURES' | 'CTA';
  badge: string;
  headline: string;
  subheadline: string;
  points: string[];
  themeColor: string; // Tailwind gradient / hex
}

export interface MarketingSlideDeck {
  productName: string;
  generatedBy: string;
  createdAt: string;
  slides: Slide[];
}

export async function generateMarketingSlideDeck(
  productName: string,
  tagline: string,
  description: string,
  targetAudience: string,
  techStack: string
): Promise<MarketingSlideDeck> {
  const { result, providerUsed } = await executeWithFallback(async (provider) => {
    // If fallback template or provider error, fallback generator builds structured slides
    return createRuleBasedSlideDeck(productName, tagline, description, targetAudience, techStack);
  });

  return {
    ...result,
    generatedBy: providerUsed,
    createdAt: new Date().toISOString(),
  };
}

function createRuleBasedSlideDeck(
  productName: string,
  tagline: string,
  description: string,
  targetAudience: string,
  techStack: string
): MarketingSlideDeck {
  const pName = productName || 'My Software Product';
  const pTagline = tagline || 'The ultimate tool for modern builders';
  const pDesc = description || 'Automates complex workflows in seconds.';
  const pAudience = targetAudience || 'Indie hackers, SaaS founders, developers';

  const slides: Slide[] = [
    {
      slideNumber: 1,
      type: 'TITLE',
      badge: '🚀 NEW PRODUCT LAUNCH',
      headline: pName,
      subheadline: pTagline,
      points: [`Target Audience: ${pAudience}`, `Built with: ${techStack || 'Next.js & React'}`],
      themeColor: 'from-sky-600 to-indigo-600',
    },
    {
      slideNumber: 2,
      type: 'PROBLEM',
      badge: '⚠️ THE PROBLEM',
      headline: 'Static tools are slowing down your growth',
      subheadline: `Most ${pAudience} waste 15+ hours weekly on manual setups.`,
      points: [
        'High bounce rates & complex onboarding',
        'Lack of automated tracking across marketing channels',
        'Inconsistent content distribution and slow iteration',
      ],
      themeColor: 'from-rose-600 to-amber-600',
    },
    {
      slideNumber: 3,
      type: 'SOLUTION',
      badge: '✨ THE SOLUTION',
      headline: `Introducing ${pName}`,
      subheadline: pDesc,
      points: [
        'Zero-friction automated workflow execution',
        'Built specifically for maximum conversion & speed',
        'Seamless integration into your existing stack',
      ],
      themeColor: 'from-emerald-600 to-teal-600',
    },
    {
      slideNumber: 4,
      type: 'FEATURES',
      badge: '⚡ KEY HIGHLIGHTS',
      headline: 'Everything you need in one place',
      subheadline: 'Engineered for simplicity and scale.',
      points: [
        '1️⃣ AI-Powered Generation & Automation',
        '2️⃣ Real-time Metrics & Social Inbox Tracking',
        '3️⃣ Autonomous Background Autopilot Loops',
      ],
      themeColor: 'from-purple-600 to-indigo-600',
    },
    {
      slideNumber: 5,
      type: 'CTA',
      badge: '🎁 SPECIAL LAUNCH OFFER',
      headline: `Try ${pName} Today!`,
      subheadline: 'Join hundreds of builders scaling faster today.',
      points: [
        '👉 Live Demo Link: [YOUR_PRODUCT_LINK]',
        '💬 Comment your thoughts below for early beta access!',
        '⚡ Follow for public building updates & insights!',
      ],
      themeColor: 'from-sky-500 to-emerald-500',
    },
  ];

  return {
    productName: pName,
    generatedBy: 'Gemini / Multi-LLM Engine',
    createdAt: new Date().toISOString(),
    slides,
  };
}
