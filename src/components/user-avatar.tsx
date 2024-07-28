import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";

interface UserAvaterProps {
  src?: string;
  className?: string;
}
export const UserAvater: React.FC<UserAvaterProps> = ({ className, src }) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={src} />
    </Avatar>
  );
};
