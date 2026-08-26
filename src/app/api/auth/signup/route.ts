import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, createSession } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'auth-ip';
    const rateLimit = checkRateLimit(`signup-${ip}`, 5, 60 * 1000); // 5 signups per min

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many account creation attempts. Please try again in 1 minute.' },
        { status: 429 }
      );
    }

    const { email, password, name, companyName } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 400 });
    }

    const passwordHash = hashPassword(password);

    // Create User & Workspace
    const user = await db.user.create({
      data: {
        email,
        name: name || email.split('@')[0],
        passwordHash,
      },
    });

    const slug = (companyName || 'my-workspace').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);

    const workspace = await db.workspace.create({
      data: {
        name: companyName ? `${companyName} Workspace` : 'Primary Workspace',
        slug,
        ownerId: user.id,
        plan: 'STARTER',
        aiCreditsRemaining: 2500,
        monthlyCreditLimit: 2500,
        members: {
          create: {
            userId: user.id,
            role: 'OWNER',
          },
        },
        brand: {
          create: {
            companyName: companyName || 'My Startup',
            description: '',
            toneOfVoice: 'Authoritative & Direct',
          },
        },
      },
    });

    await createSession(user.id);

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
      workspaceId: workspace.id,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create account', details: String(error) }, { status: 500 });
  }
}
