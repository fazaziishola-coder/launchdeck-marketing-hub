import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { DEFAULT_DIRECTORIES, DEFAULT_LAUNCH_CHECKLIST } from '@/lib/initialData';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username') || 'vercel';

    const githubRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
      headers: {
        'User-Agent': 'LaunchDeck-App',
        ...(process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {}),
      },
    });

    if (!githubRes.ok) {
      return NextResponse.json({ error: `GitHub API error: ${githubRes.statusText}` }, { status: githubRes.status });
    }

    const repos = await githubRes.json();
    const formattedRepos = repos.map((r: any) => ({
      id: r.id,
      name: r.name,
      slug: r.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tagline: r.description || `High-performance ${r.language || 'Software'} project`,
      description: r.description || `${r.name} repository discovered from GitHub (${username}).`,
      websiteUrl: r.homepage || r.html_url,
      repoUrl: r.html_url,
      techStack: r.language ? `${r.language}, GitHub` : 'TypeScript, Next.js',
      stars: r.stargazers_count,
      forks: r.forks_count,
    }));

    return NextResponse.json({ username, repos: formattedRepos });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch GitHub repos', details: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { repos } = await req.json();
    if (!Array.isArray(repos) || repos.length === 0) {
      return NextResponse.json({ error: 'No repos provided for registration' }, { status: 400 });
    }

    const newlyRegistered = [];

    for (const r of repos) {
      const existing = await db.product.findFirst({
        where: { name: { equals: r.name } },
      });

      if (existing) continue;

      const product = await db.product.create({
        data: {
          name: r.name,
          slug: `${r.slug}-${Date.now().toString().slice(-4)}`,
          tagline: r.tagline || 'Discovered from GitHub',
          description: r.description || '',
          status: 'BUILDING',
          websiteUrl: r.websiteUrl || null,
          repoUrl: r.repoUrl || null,
          techStack: r.techStack || 'JavaScript',
          targetAudience: 'Developers & SaaS Founders',
          pricingModel: 'Open Source / Freemium',
          monthlyRevenue: 0,
          totalUsers: r.stars || 0,
        },
      });

      // Populate default launch checklist
      for (const item of DEFAULT_LAUNCH_CHECKLIST) {
        await db.checklistItem.create({
          data: {
            productId: product.id,
            stage: item.stage,
            category: item.category,
            task: item.task,
          },
        });
      }

      // Populate default directories
      for (const dir of DEFAULT_DIRECTORIES) {
        await db.directorySubmission.create({
          data: {
            productId: product.id,
            directoryName: dir.directoryName,
            directoryUrl: dir.directoryUrl,
            domainRating: dir.domainRating,
            notes: dir.notes,
            status: 'NOT_STARTED',
          },
        });
      }

      newlyRegistered.push(product);
    }

    return NextResponse.json({
      success: true,
      registeredCount: newlyRegistered.length,
      products: newlyRegistered,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to register GitHub repos', details: String(error) }, { status: 500 });
  }
}
