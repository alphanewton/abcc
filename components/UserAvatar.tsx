import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

function UserAvatar({
  name,
  image,
  className,
}: {
  name?: string | null;
  image?: string | null;
  className?: string;
}) {
  return (
    <Avatar className={cn("bg-white text-black", className)}>
      <Image
        src={image || "https://github.com/shadcn.png"}
        alt="PP"
        width={40}
        height={40}
        className="rounded-full"
      />
      <AvatarFallback
        delayMs={1000}
        className="dark:bg-white dark:text-white text-lg"
      >
        {name
          ? name
              .split(" ")
              .map((n) => n[0])
              .join("")
          : "Username"}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
