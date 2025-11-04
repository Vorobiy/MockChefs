"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { createPostSchema } from "@/lib/validation";

export async function submitPost(input: string) {
  const { user } = await validateRequest();

  if (!user) throw Error("Unauthorized");

  const {} = createPostSchema.parse({ content: input });

  await prisma.post.create({
    data: {
      userId: user.id,
      createdAt: Date.now().toString(),
    },
  });
}
