import fs from 'fs';
import path from 'path';
import { db } from '../db';
import { getOrCreateDefaultWorkspace } from '../workspace';

export interface DiscoveredProject {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  path: string;
  techStack: string;
  repositoryUrl?: string;
  hasReadme: boolean;
}

export async function scanLocalProjectsDirectory(parentDirPath: string): Promise<DiscoveredProject[]> {
  const discovered: DiscoveredProject[] = [];

  if (!fs.existsSync(parentDirPath)) {
    console.warn(`[Discovery Agent] Path does not exist: ${parentDirPath}`);
    return [];
  }

  const entries = fs.readdirSync(parentDirPath, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;

    const projectPath = path.join(parentDirPath, entry.name);
    let name = entry.name;
    let description = `${name} project discovered locally on machine.`;
    let tagline = `Innovative ${name} tool`;
    let techStack = 'JavaScript/TypeScript';
    let hasReadme = false;

    // Check package.json
    const packageJsonPath = path.join(projectPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      try {
        const pkgData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        if (pkgData.name) name = pkgData.name;
        if (pkgData.description) description = pkgData.description;
        tagline = pkgData.description ? pkgData.description.slice(0, 80) : tagline;

        const deps = { ...(pkgData.dependencies || {}), ...(pkgData.devDependencies || {}) };
        const stackList: string[] = [];
        if (deps.next) stackList.push('Next.js');
        if (deps.react) stackList.push('React');
        if (deps.prisma || deps['@prisma/client']) stackList.push('Prisma');
        if (deps.tailwindcss) stackList.push('Tailwind');
        if (deps.typescript) stackList.push('TypeScript');
        if (stackList.length > 0) techStack = stackList.join(', ');
      } catch (e) {
        // ignore parse error
      }
    }

    // Check README.md
    const readmePath = path.join(projectPath, 'README.md');
    if (fs.existsSync(readmePath)) {
      hasReadme = true;
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    discovered.push({
      name,
      slug,
      tagline,
      description,
      path: projectPath,
      techStack,
      hasReadme,
    });
  }

  return discovered;
}

export async function autoRegisterDiscoveredProjects(parentDirPath: string) {
  const workspace = await getOrCreateDefaultWorkspace();
  const projects = await scanLocalProjectsDirectory(parentDirPath);
  const registered = [];

  for (const proj of projects) {
    const existing = await db.product.findFirst({
      where: { name: { equals: proj.name } },
    });

    if (existing) continue;

    const created = await db.product.create({
      data: {
        workspaceId: workspace.id,
        name: proj.name,
        slug: `${proj.slug}-${Date.now().toString().slice(-4)}`,
        tagline: proj.tagline,
        description: proj.description,
        status: 'BUILDING',
        techStack: proj.techStack,
        targetAudience: 'Developers & SaaS Users',
        pricingModel: 'Freemium',
        monthlyRevenue: 0,
        totalUsers: 0,
      },
    });

    registered.push(created);
  }

  return {
    discoveredTotal: projects.length,
    newlyRegisteredCount: registered.length,
    projects: registered,
  };
}
