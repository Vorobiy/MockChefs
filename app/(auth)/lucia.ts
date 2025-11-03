"use server";

import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/../../auth";
import { generateIdFromEntropySize, type Session, type User } from "lucia";

/**
 * Create a session for a user and set the session cookie.
 * Call this right after you authenticate the user (password/OAuth).
 */
export async function setSession(userId: string): Promise<Session> {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return session;
}

/**
 * Clear the current session (if any) and drop the cookie.
 * Use for sign-out.
 */
export async function clearSession(): Promise<void> {
  const { session } = await validateRequest();
  if (session) {
    await lucia.invalidateSession(session.id);
  }
  const blank = lucia.createBlankSessionCookie();
  (await cookies()).set(blank.name, blank.value, blank.attributes);
}

/**
 * Get the current user + session from the request cookies.
 * Returns { user, session } or { user: null, session: null }.
 */
export async function getSession(): Promise<
  { user: User; session: Session } | { user: null; session: null }
> {
  return validateRequest();
}

/**
 * Require an authenticated user. Throws on unauthenticated.
 * Use inside server actions/route handlers that demand auth.
 */
export async function requireUser(): Promise<{ user: User; session: Session }> {
  const { user, session } = await validateRequest();
  if (!user || !session) {
    throw new Error("UNAUTHORIZED");
  }
  return { user, session };
}

export { lucia }; // re-export the instance in case you need advanced calls
export type { User, Session };
