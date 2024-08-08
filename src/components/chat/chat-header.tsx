import {
  ChatVideoButton,
  MobileToggle,
  SocketIndicator,
  UserAvater,
} from "@/components";
import { Hash } from "lucide-react";
import React from "react";
interface ChatHeaderProps {
  serverId: string;
  name?: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}
export const ChatHeader: React.FC<ChatHeaderProps> = ({
  imageUrl,
  name,
  serverId,
  type,
}) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle />
      {type === "channel" && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      {type === "conversation" && (
        <UserAvater src={imageUrl} className="h-8 w-8 md:h-8 md:w-8 mr-2" />
      )}
      <p className="font-semibold text-black dark:text-white">{name && name}</p>

      <div className="ml-auto flex items-center">
        {type === "conversation" && <ChatVideoButton />}
        <SocketIndicator />
      </div>
    </div>
  );
};
