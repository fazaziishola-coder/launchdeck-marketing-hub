import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { productName, tagline, description, targetAudience, channel, tone } = await req.json();

    const pName = productName || 'My Side Product';
    const pTagline = tagline || 'A super useful tool for builders';
    const pDesc = description || 'Helps users automate tasks effortlessly.';
    const pAudience = targetAudience || 'Indie hackers, SaaS builders, developers';

    let generatedContent = '';

    switch (channel) {
      case 'TWITTER':
        generatedContent = `🚀 Excited to publicly launch ${pName}!

${pTagline}

Problem: Most ${pAudience} spend hours on manual setups when they should be shipping.

Here is how ${pName} fixes that:
1️⃣ ${pDesc}
2️⃣ Simple zero-friction setup in < 2 mins
3️⃣ Built specifically for speed & conversion

Try it out today: [YOUR_LINK_HERE]

Built in public! Would love your feedback & thoughts 👇 🧵`;
        break;

      case 'REDDIT':
        generatedContent = `[Show & Tell / Side Project] I built ${pName} – ${pTagline}

Hey r/SideProject!

Like many of you here, I build a lot of products. One recurring problem I kept running into was: ${pDesc}.

So over the last couple of weeks, I built **${pName}**.

**What it does:**
- Solves: ${pTagline}
- Key Value: Tailored specifically for ${pAudience}

**Tech Stack:** Next.js, React, Tailwind CSS, SQLite.

I'd really appreciate honest feedback from fellow builders! You can check it out live here: [YOUR_LINK_HERE]

What features would make this even more useful for your workflow?`;
        break;

      case 'PRODUCT_HUNT':
        generatedContent = `**Tagline:** ${pTagline}

**Maker Comment:**
Hey Product Hunt! 👋

I'm the creator of **${pName}**.

As a serial indie builder, I noticed that ${pAudience} often struggle with efficiency and promotion. We spend weeks coding great products, but managing & launching them takes just as much energy.

That's why I created ${pName} — ${pDesc}

**Key Features:**
✨ Fast setup & intuitive dashboard
⚡ Pre-built launch checklists and directory tracking
📊 Real-time growth and marketing management

We're offering 50% off for the PH community today! Try it out and let me know your thoughts in the comments below! 🚀`;
        break;

      case 'LINKEDIN':
        generatedContent = `Big milestone today! 🚀

After weeks of building in public, I'm officially launching **${pName}** — ${pTagline}.

If you are in ${pAudience}, you know how hard it can be to manage launching and promoting new software tools. 

With ${pName}, we're enabling creators to:
-> ${pDesc}
-> Track launch checklists across Product Hunt, Hacker News, & Reddit
-> Keep all product growth metrics in one place

Check out the live product here: [YOUR_LINK_HERE]

Special thanks to everyone who helped test early prototypes! What are your favorite marketing strategies for new products? Let's discuss in the comments! 👇

#indiehackers #saas #buildinginpublic #startups #productlaunch`;
        break;

      case 'COLD_EMAIL':
        generatedContent = `Subject: Quick question re: ${pTagline}

Hi [First Name],

I noticed you're active in ${pAudience} and thought this might be relevant to your workflow.

We just launched **${pName}** — ${pTagline}.

In short: ${pDesc}

Would you be open to checking out a quick 2-minute interactive demo? Here's the link: [YOUR_LINK_HERE]

Would love to hear your thoughts or any feedback!

Best,
[Your Name]`;
        break;

      default:
        generatedContent = `📢 Launch Announcement: ${pName}

${pTagline}

Description: ${pDesc}
Target Audience: ${pAudience}

Link: [YOUR_LINK_HERE]`;
    }

    return NextResponse.json({
      success: true,
      content: generatedContent,
      channel,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate content', details: String(error) }, { status: 500 });
  }
}
