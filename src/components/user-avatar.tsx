import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvaterProps {
  src?: string;
  className?: string;
  name?: string;
}
export const UserAvater: React.FC<UserAvaterProps> = ({
  className,
  src,
  name,
}) => {
  if (!!name && name.length > 2) {
    name = name.slice(0, 2);
  }
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={src} />
      {name && (
        <AvatarFallback className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
          {name}
        </AvatarFallback>
      )}
    </Avatar>
  );
};
