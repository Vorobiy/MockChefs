import { useSession } from "@/app/(main)/SessionProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  avatarUrl: string | null | undefined;
  size: number;
  className?: string;
}

export default function UserAvatar({
  avatarUrl,
  className,
  size,
}: UserAvatarProps) {
  const user = useSession();
  if (!avatarUrl) {
    return (
      <Avatar>
        <AvatarImage
          src="undefined"
          width={size ?? 48}
          height={size ?? 48}
          className={cn(
            "bg-secondary aspect-square h-fit flex-none rounded-full object-cover",
            className,
          )}
        />
        <AvatarFallback>
          {user.user.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    );
  } else {
    return (
      <Avatar>
        <AvatarImage
          src={avatarUrl}
          width={size ?? 48}
          height={size ?? 48}
          className={cn(
            "bg-secondary aspect-square h-fit flex-none rounded-full object-cover",
            className,
          )}
        />
        <AvatarFallback>
          {user.user.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    );
  }
}
