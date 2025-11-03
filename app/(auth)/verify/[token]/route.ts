// app/(auth)/verify/[token]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { isWithinExpirationDate } from "oslo";

export async function GET(
  req: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token: tokenParam } = await context.params; // ✅ MUST await in Next.js 15+

  if (!tokenParam) {
    return NextResponse.redirect(new URL("/?error=missing-token", req.url));
  }

  const token = await prisma.emailVerificationToken.findUnique({
    where: { id: tokenParam },
  });

  // Delete token immediately (prevents re-use)
  if (token) {
    await prisma.emailVerificationToken.delete({ where: { id: token.id } });
  }

  if (!token || !isWithinExpirationDate(token.expiresAt)) {
    return NextResponse.redirect(
      new URL("/verify/error?reason=invalid-or-expired", req.url),
    );
  }

  const user = await prisma.user.findUnique({ where: { id: token.userId } });

  if (!user || user.email !== token.email) {
    return NextResponse.redirect(
      new URL("/verify/error?reason=user-mismatch", req.url),
    );
  }

  // Mark email verified
  await prisma.user.update({
    where: { id: user.id },
    data: { email_verified: true },
  });

  // Create session cookie (auto login)
  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  // Redirect wherever you want after success
  return NextResponse.redirect(new URL("/", req.url));
}
