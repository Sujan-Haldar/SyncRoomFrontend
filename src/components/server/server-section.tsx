import { ActionTooltip } from "@/components/action-tooltip";
import { ChannelType, MemberRole } from "@/services/interface";
import { useModalStore } from "@/store";
import { Plus, Settings } from "lucide-react";
import React from "react";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
}
export const ServerSection: React.FC<ServerSectionProps> = ({
  label,
  sectionType,
  channelType,
  role,
}) => {
  const { onOpen } = useModalStore();
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role != MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip lebel="Create Channel" side="top">
          <button
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            onClick={() => onOpen("createChannel", { channelType })}
          >
            <Plus className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
      {role == MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip lebel="Manage Members" side="top">
          <button
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            onClick={() => onOpen("manageMember")}
          >
            <Settings className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};
