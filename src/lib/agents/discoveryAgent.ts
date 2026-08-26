import fs from 'fs';
import path from 'path';
import { db } from '../db';
import { DEFAULT_DIRECTORIES, DEFAULT_LAUNCH_CHECKLIST } from '../initialData';

export interface DiscoveredProject {
  folderName: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  techStack: string;
  websiteUrl?: string;
  repoUrl?: string;
  targetAudience: string;
  status: string;
  isRegistered: boolean;
}

export async function scanLocalProjectsFolder(projectsDir: string): Promise<DiscoveredProject[]> {
  const discovered: DiscoveredProject[] = [];

  if (!fs.existsSync(projectsDir)) {
    console.warn(`[Discovery Agent] Path does not exist: ${projectsDir}`);
    return discovered;
  }

  const entries = fs.readdirSync(projectsDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('.') || entry.name === 'node_modules') continue;

    const fullPath = path.join(projectsDir, entry.name);
    const packageJsonPath = path.join(fullPath, 'package.json');
    const readmePath = path.join(fullPath, 'README.md');
    const pyprojectPath = path.join(fullPath, 'pyproject.toml');

    let name = entry.name;
    let description = '';
    let tagline = '';
    let techStackParts: string[] = [];
    let websiteUrl = '';
    let repoUrl = '';

    // Inspect package.json if present
    if (fs.existsSync(packageJsonPath)) {
      try {
        const pkgContent = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        if (pkgContent.name) name = pkgContent.name.replace(/^@[^/]+\//, '');
        if (pkgContent.description) description = pkgContent.description;

        const deps = { ...pkgContent.dependencies, ...pkgContent.devDependencies };
        if (deps.next) techStackParts.push('Next.js');
        if (deps.react) techStackParts.push('React');
        if (deps.typescript) techStackParts.push('TypeScript');
        if (deps.tailwindcss) techStackParts.push('Tailwind CSS');
        if (deps['@prisma/client'] || deps.prisma) techStackParts.push('Prisma/SQLite');
        if (deps.express) techStackParts.push('Express');
        if (deps.vue) techStackParts.push('Vue');
        if (deps.svelte) techStackParts.push('Svelte');
        if (deps.electron || deps['@tauri-apps/api']) techStackParts.push('Desktop App');

        if (pkgContent.homepage) websiteUrl = pkgContent.homepage;
        if (pkgContent.repository) {
          repoUrl = typeof pkgContent.repository === 'string' ? pkgContent.repository : pkgContent.repository.url || '';
        }
      } catch (e) {
        console.error(`[Discovery Agent] Error parsing package.json in ${entry.name}`, e);
      }
    }

    // Inspect pyproject.toml if present
    if (fs.existsSync(pyprojectPath)) {
      techStackParts.push('Python');
    }

    // Inspect README.md for tagline
    if (fs.existsSync(readmePath)) {
      try {
        const readmeText = fs.readFileSync(readmePath, 'utf8');
        const lines = readmeText.split('\n').map((l) => l.trim()).filter(Boolean);
        const headingIndex = lines.findIndex((l) => l.startsWith('# '));
        if (headingIndex !== -1 && lines[headingIndex + 1]) {
          tagline = lines[headingIndex + 1].replace(/^[#>*-\s]+/, '');
        }
      } catch (e) {
        console.error(`[Discovery Agent] Error reading README in ${entry.name}`, e);
      }
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    if (!tagline) tagline = description || `Modern ${techStackParts.join(', ') || 'Software'} Application`;
    if (!description) description = `${name} project discovered from local directory ${entry.name}.`;

    // Check if project already exists in SQLite DB
    const existing = await db.product.findFirst({
      where: {
        OR: [{ slug }, { name: { equals: name } }],
      },
    });

    discovered.push({
      folderName: entry.name,
      name: capitalize(name.replace(/[-_]/g, ' ')),
      slug,
      tagline,
      description,
      techStack: techStackParts.length > 0 ? techStackParts.join(', ') : 'Node.js, TypeScript',
      websiteUrl: websiteUrl || undefined,
      repoUrl: repoUrl || undefined,
      targetAudience: 'Developers, Solopreneurs, End Users',
      status: 'BUILDING',
      isRegistered: Boolean(existing),
    });
  }

  return discovered;
}

export async function autoRegisterDiscoveredProjects(projectsDir: string) {
  const discovered = await scanLocalProjectsFolder(projectsDir);
  const newlyRegistered: any[] = [];

  for (const proj of discovered) {
    if (proj.isRegistered) continue;

    console.log(`[Discovery Agent] Auto-registering new discovered project: ${proj.name}...`);

    const product = await db.product.create({
      data: {
        name: proj.name,
        slug: `${proj.slug}-${Date.now().toString().slice(-4)}`,
        tagline: proj.tagline,
        description: proj.description,
        status: proj.status,
        techStack: proj.techStack,
        targetAudience: proj.targetAudience,
        websiteUrl: proj.websiteUrl || null,
        repoUrl: proj.repoUrl || null,
        pricingModel: 'Freemium',
        monthlyRevenue: 0,
        totalUsers: 0,
      },
    });

    // Populate default launch checklists
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

    // Populate default directory submissions
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

    // Initial metric log
    await db.metricLog.create({
      data: {
        productId: product.id,
        visitors: 0,
        signups: 0,
        mrr: 0,
        notes: 'Discovered and Registered by Autonomous Agent',
      },
    });

    newlyRegistered.push(product);
  }

  return {
    scannedCount: discovered.length,
    newlyRegisteredCount: newlyRegistered.length,
    registeredProjects: newlyRegistered,
    allDiscovered: discovered,
  };
}

function capitalize(str: string) {
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
}
