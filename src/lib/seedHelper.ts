import { db } from './db';
import { autoRegisterDiscoveredProjects } from './agents/discoveryAgent';
import path from 'path';

export async function ensureSeeded() {
  try {
    const existingProductsCount = await db.product.count();
    if (existingProductsCount > 0) {
      return { seeded: false, message: 'Database active with real products.' };
    }

    console.log('Auto-discovering real local projects for initial setup...');
    const parentProjectsDir = path.resolve(process.cwd(), '..');
    const discovery = await autoRegisterDiscoveredProjects(parentProjectsDir);

    return {
      seeded: true,
      message: `Database initialized cleanly. Auto-discovered ${discovery.newlyRegisteredCount} local projects.`,
    };
  } catch (error) {
    console.error('Error auto-discovering initial projects:', error);
    return { seeded: false, message: 'Ready for user project creation or GitHub import.' };
  }
}
