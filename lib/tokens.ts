// lib/tokens.ts
import { TimeSpan, createDate } from "oslo";
import prisma from "@/lib/prisma";
import { generateIdFromEntropySize } from "lucia";

export async function createEmailVerificationToken(
  userId: string,
  email: string,
  expiryHours = 2,
): Promise<string> {
  // remove old tokens for same user
  await prisma.emailVerificationToken.deleteMany({
    where: { userId },
  });

  const tokenId = generateIdFromEntropySize(25);
  await prisma.emailVerificationToken.create({
    data: {
      id: tokenId,
      userId,
      email,
      expiresAt: createDate(new TimeSpan(expiryHours, "h")),
    },
  });

  return tokenId;
}
