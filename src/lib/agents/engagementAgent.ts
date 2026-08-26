import { executeWithFallback } from '../ai/fallbackRouter';

export interface UserComment {
  id: string;
  author: string;
  platform: 'X' | 'Reddit' | 'Product Hunt' | 'LinkedIn';
  productName: string;
  commentText: string;
  timestamp: string;
  suggestedReply?: string;
  status: 'PENDING' | 'REPLIED';
}

export interface ColdOutreachLead {
  id: string;
  prospectName: string;
  companyOrRole: string;
  email: string;
  productName: string;
  pitchSubject: string;
  pitchBody: string;
  status: 'QUEUED' | 'SENT';
}

export async function generateCommentReply(
  productName: string,
  userComment: string,
  platform: string
): Promise<string> {
  const { result } = await executeWithFallback(async () => {
    if (userComment.toLowerCase().includes('pricing') || userComment.toLowerCase().includes('free')) {
      return `Hey! Thanks for checking out ${productName}! Yes, we offer a generous free tier so you can get started right away. Feel free to give it a spin! 🚀`;
    }
    if (userComment.toLowerCase().includes('stack') || userComment.toLowerCase().includes('tech')) {
      return `Appreciate the question! ${productName} is built using Next.js 14, TypeScript, Tailwind CSS, and SQLite for ultra-fast performance.`;
    }
    return `Thanks so much for the support on ${platform}! Really appreciate you stopping by. Let me know if you have any feedback or feature requests! 🙏`;
  });

  return result;
}

export async function processAutomatedEngagement(productName: string) {
  const sampleComments: UserComment[] = [
    {
      id: 'c1',
      author: '@alex_dev',
      platform: 'X',
      productName,
      commentText: 'Looks super clean! Is there a free trial available for solopreneurs?',
      timestamp: '10 mins ago',
      status: 'PENDING',
    },
    {
      id: 'c2',
      author: 'u/saas_builder',
      platform: 'Reddit',
      productName,
      commentText: 'What tech stack did you use to build this so fast?',
      timestamp: '25 mins ago',
      status: 'PENDING',
    },
    {
      id: 'c3',
      author: 'Sarah Chen',
      platform: 'Product Hunt',
      productName,
      commentText: 'Congrats on the launch! How does this compare to traditional tools?',
      timestamp: '1 hour ago',
      status: 'PENDING',
    },
  ];

  const processed: UserComment[] = [];
  for (const c of sampleComments) {
    const reply = await generateCommentReply(productName, c.commentText, c.platform);
    processed.push({
      ...c,
      suggestedReply: reply,
      status: 'REPLIED',
    });
  }

  const sampleLeads: ColdOutreachLead[] = [
    {
      id: 'l1',
      prospectName: 'David Miller',
      companyOrRole: 'Founder @ MicroTech',
      email: 'david@microtech.example.com',
      productName,
      pitchSubject: `Automate your software marketing for ${productName}`,
      pitchBody: `Hi David,\n\nI noticed you are building side projects and thought ${productName} could save your team 10+ hours a week...\n\nBest,\nYour Autopilot System`,
      status: 'QUEUED',
    },
  ];

  return {
    commentsReplied: processed,
    outreachLeadsQueued: sampleLeads,
  };
}
