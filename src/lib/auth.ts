import { cookies } from 'next/headers';
import crypto from 'crypto';
import { db } from './db';

const COOKIE_NAME = 'launchdeck_session';

export function hashPassword(password: string): string {
  const salt = 'launchdeck_salt_2026';
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export async function createSession(userId: string) {
  const token = `${userId}.${Date.now()}.${crypto.randomBytes(16).toString('hex')}`;
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/',
  });
  return token;
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const userId = token.split('.')[0];
    if (!userId) return null;

    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        ownedWorkspaces: {
          include: { brand: true, campaigns: true },
        },
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
