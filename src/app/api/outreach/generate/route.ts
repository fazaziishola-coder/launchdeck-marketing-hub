import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { targetRole, painPoint, offer } = await req.json();

    const sequence = [
      {
        stepName: 'Cold Email (Initial Pitch)',
        timing: 'Day 1',
        subject: `Quick question regarding your marketing stack for ${targetRole || 'Growth leads'}`,
        body: `Hi {{firstName}},\n\nI noticed you are leading growth. Most teams we speak with spend 15+ hours/week juggling ChatGPT, Buffer, Canva, and Sheets.\n\nWe built LaunchDeck to solve this: an AI Marketing OS that runs your entire loop (Brand -> Strategy -> Content -> Analytics) in one workspace.\n\nOffer: ${offer || '14-Day Free Access'}.\n\nWould you be open to a quick 5-minute preview this Thursday?\n\nBest,\nAbdulbasit`,
      },
      {
        stepName: 'LinkedIn Connection Note',
        timing: 'Day 2',
        subject: 'LinkedIn Connection',
        body: `Hi {{firstName}}, loved your recent post on startup growth strategies! Would love to connect here on LinkedIn.`,
      },
      {
        stepName: 'Follow-up 1 (Case Study / Value Add)',
        timing: 'Day 4',
        subject: 'Re: Quick question regarding your marketing stack',
        body: `Hi {{firstName}},\n\nFollowing up on my note earlier. Here is how another SaaS founder used LaunchDeck to automate their 14-day launch blitz:\n\n- Generated 5-slide visual carousels\n- Auto-classified comment replies\n- Increased signup conversion by 34%\n\nHere's a 2-min demo link: https://launchdeck-marketing-hub.vercel.app/\n\nCheers,\nAbdulbasit`,
      },
      {
        stepName: 'Follow-up 2 (Pain Point Reminder)',
        timing: 'Day 7',
        subject: 'Eliminating tool fragmentation for your team',
        body: `Hi {{firstName}},\n\nAre you still spending hours every week manually copying AI drafts across different tools?\n\nIf you want to test LaunchDeck with your team for 14 days, I can set up your workspace context today.\n\nLet me know if you'd like me to send over invite access.`,
      },
      {
        stepName: 'Breakup Message',
        timing: 'Day 12',
        subject: 'Closing the loop / Last attempt',
        body: `Hi {{firstName}},\n\nI haven't heard back, so I assume marketing stack automation isn't a priority right now.\n\nI'll stop following up. If anything changes in the future, feel free to check out https://launchdeck-marketing-hub.vercel.app/ anytime.\n\nWishing you great success!`,
      },
    ];

    return NextResponse.json({ success: true, sequence });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate outreach sequence', details: String(error) }, { status: 500 });
  }
}
