export const DEFAULT_DIRECTORIES = [
  { directoryName: 'Product Hunt', directoryUrl: 'https://www.producthunt.com', domainRating: 91, notes: 'Highest impact for tech products. Aim for Tuesday-Thursday launch.' },
  { directoryName: 'Hacker News (Show HN)', directoryUrl: 'https://news.ycombinator.com', domainRating: 90, notes: 'Post concise, non-hype title starting with Show HN. Be ready to answer dev questions.' },
  { directoryName: 'Indie Hackers', directoryUrl: 'https://www.indiehackers.com', domainRating: 84, notes: 'Share honest building story, revenue milestones, and transparent insights.' },
  { directoryName: 'Reddit (r/SideProject)', directoryUrl: 'https://www.reddit.com/r/SideProject', domainRating: 92, notes: 'Post honest explanation, demo link, and ask for community feedback.' },
  { directoryName: 'Reddit (r/SaaS)', directoryUrl: 'https://www.reddit.com/r/SaaS', domainRating: 92, notes: 'Share problem, target audience, and solution story.' },
  { directoryName: 'BetaList', directoryUrl: 'https://betalist.com', domainRating: 78, notes: 'Great for getting early beta subscribers before official public launch.' },
  { directoryName: 'SaaSHub', directoryUrl: 'https://www.saashub.com', domainRating: 76, notes: 'Independent software marketplace. High SEO value.' },
  { directoryName: 'AlternativeTo', directoryUrl: 'https://alternativeto.net', domainRating: 82, notes: 'List your product as an alternative to established software tools.' },
  { directoryName: 'MicroLaunch', directoryUrl: 'https://microlaunch.net', domainRating: 65, notes: 'Monthly launch leaderboard focused on micro-SaaS and indie tools.' },
  { directoryName: 'Launching Next', directoryUrl: 'https://www.launchingnext.com', domainRating: 62, notes: 'Features promising new startups and side projects.' },
  { directoryName: 'PitchWall', directoryUrl: 'https://pitchwall.co', domainRating: 58, notes: 'Platform for startup product reveals and community feedback.' },
  { directoryName: 'BetaPage', directoryUrl: 'https://betapage.co', domainRating: 60, notes: 'Directory for early-stage startup betas and tech products.' }
];

export const DEFAULT_LAUNCH_CHECKLIST = [
  // Pre-Launch
  { stage: 'PRE_LAUNCH', category: 'Landing Page', task: 'Set up clear headline, core benefit value prop, and email signup box' },
  { stage: 'PRE_LAUNCH', category: 'Analytics', task: 'Install lightweight web analytics (Plausible/GA4/Umami) to track conversion rate' },
  { stage: 'PRE_LAUNCH', category: 'Assets', task: 'Prepare high-resolution screenshots, 30-sec demo GIF/video, and square app icon' },
  { stage: 'PRE_LAUNCH', category: 'Copywriting', task: 'Draft Product Hunt tagline, maker story comment, and X/Twitter launch thread' },
  { stage: 'PRE_LAUNCH', category: 'Onboarding', task: 'Test registration and payment flows end-to-end' },

  // Launch Day
  { stage: 'LAUNCH_DAY', category: 'Product Hunt', task: 'Schedule/Publish Product Hunt post at 00:01 AM PST' },
  { stage: 'LAUNCH_DAY', category: 'Social Media', task: 'Post Twitter/X launch thread and pin it to top of profile' },
  { stage: 'LAUNCH_DAY', category: 'Community', task: 'Submit to Show HN on Hacker News with technical/craft angle' },
  { stage: 'LAUNCH_DAY', category: 'Reddit', task: 'Share building journey post on r/SideProject and r/SaaS' },
  { stage: 'LAUNCH_DAY', category: 'Support', task: 'Monitor comments live across PH, HN, X, and Reddit to answer immediately' },

  // Post-Launch
  { stage: 'POST_LAUNCH', category: 'Directories', task: 'Submit product listing to 10+ startup directories for SEO backlinks' },
  { stage: 'POST_LAUNCH', category: 'Outreach', task: 'Reach out to 20 niche influencers or tech newsletters with quick demo link' },
  { stage: 'POST_LAUNCH', category: 'Customer Care', task: 'Send personal thank-you email to first 20 registered users asking for feedback' },
  { stage: 'POST_LAUNCH', category: 'Content Marketing', task: 'Write a "Build in Public" post analyzing launch stats, traffic, and lessons learned' }
];

// Production Clean: No mock products
export const SAMPLE_PRODUCTS: any[] = [];
