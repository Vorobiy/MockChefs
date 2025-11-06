"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  username: string;
  avatarUrl: string | null | undefined;
  size: number;
  className?: string;
}

export default function UserAvatar({
  avatarUrl,
  username,
  className,
  size,
}: UserAvatarProps) {
  const initials = username?.slice(0, 2).toUpperCase() ?? "??";

  return (
    <Avatar>
      <AvatarImage
        src={avatarUrl ?? undefined}
        width={size ?? 48}
        height={size ?? 48}
        className={cn(
          "bg-secondary aspect-square h-fit flex-none rounded-full object-cover",
          className,
        )}
      />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
