import { NextResponse } from 'next/server';
import { generateMarketingSlideDeck } from '@/lib/agents/slideGenerator';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, productName, tagline, description, targetAudience, techStack } = body;

    let pName = productName;
    let pTagline = tagline;
    let pDesc = description;
    let pAudience = targetAudience;
    let pTech = techStack;

    if (productId) {
      const product = await db.product.findUnique({ where: { id: productId } });
      if (product) {
        pName = product.name;
        pTagline = product.tagline;
        pDesc = product.description;
        pAudience = product.targetAudience || 'Indie Builders';
        pTech = product.techStack || 'Next.js';
      }
    }

    const deck = await generateMarketingSlideDeck(pName, pTagline, pDesc, pAudience, pTech);
    return NextResponse.json(deck);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate slide deck', details: String(error) }, { status: 500 });
  }
}
