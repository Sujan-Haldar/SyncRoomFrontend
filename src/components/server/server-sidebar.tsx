"use client";
import {
  ServerChannel,
  ServerHeader,
  ServerMember,
  ServerSearch,
  ServerSection,
} from "@/components";
import { ScrollArea } from "@/components/ui/scroll-area";
import { withAuth } from "@/hoc/with-auth";
import { useAxiosPrivateApis } from "@/services/api";
import {
  ChannelInterface,
  ChannelType,
  MemberInterface,
  MemberRole,
} from "@/services/interface";
import { useAuthStore, useServerStore } from "@/store";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import { Separator } from "../ui/separator";
interface ServerSidebarProps {
  serverId: string;
}
const channelIconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
};
const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />,
};

const MyServerSidebar: React.FC<ServerSidebarProps> = ({ serverId }) => {
  const { id } = useAuthStore();
  const { getServerByUserIdandServerIdApi } = useAxiosPrivateApis();
  const {
    id: currentServerId,
    channels,
    members: currentServerMembers,
  } = useServerStore();
  const [textChannels, setTextChannels] = useState<Array<ChannelInterface>>([]);
  const [audioChannels, setAudioChannels] = useState<Array<ChannelInterface>>(
    []
  );
  const [videoChannels, setVideoChannels] = useState<Array<ChannelInterface>>(
    []
  );
  const [members, setMembers] = useState<Array<MemberInterface>>([]);
  const [role, setRole] = useState<string>();
  useLayoutEffect(() => {
    if (channels) {
      setTextChannels(
        channels.filter((channel) => channel.type === ChannelType.TEXT)
      );
      setAudioChannels(
        channels.filter((channel) => channel.type === ChannelType.AUDIO)
      );
      setVideoChannels(
        channels.filter((channel) => channel.type === ChannelType.VIDEO)
      );
    }
    if (currentServerMembers) {
      setMembers(
        currentServerMembers.filter((member) => member.user.id !== id)
      );
      setRole(
        currentServerMembers.find((member) => member.user.id === id)?.role
      );
    }
  }, [channels, currentServerMembers, id]);
  return (
    <div className="flex flex-col h-full w-full text-primary dark:bg-[#2B2D31] bg-[#F2F3F5]">
      {currentServerId && <ServerHeader role={role} />}

      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelIconMap[ChannelType.TEXT],
                })),
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelIconMap[ChannelType.AUDIO],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelIconMap[ChannelType.VIDEO],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members.map((member) => ({
                  id: member.id,
                  name: member.user.name,
                  icon: roleIconMap[member.role as keyof typeof roleIconMap],
                })),
              },
            ]}
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role as MemberRole}
              label="Text Channels"
            />
            <div className="space-y-[2px]">
              {textChannels &&
                textChannels.map((channel) => (
                  <ServerChannel
                    key={channel.id}
                    channel={channel}
                    role={role as MemberRole}
                  />
                ))}
            </div>
          </div>
        )}
        {!!audioChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role as MemberRole}
              label="Voice Channels"
            />
            <div className="space-y-[2px]">
              {audioChannels &&
                audioChannels.map((channel) => (
                  <ServerChannel
                    key={channel.id}
                    channel={channel}
                    role={role as MemberRole}
                  />
                ))}
            </div>
          </div>
        )}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role as MemberRole}
              label="Video Channels"
            />
            <div className="space-y-[2px]">
              {videoChannels &&
                videoChannels.map((channel) => (
                  <ServerChannel
                    key={channel.id}
                    channel={channel}
                    role={role as MemberRole}
                  />
                ))}
            </div>
          </div>
        )}
        {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="members"
              role={role as MemberRole}
              label="Members"
            />
            <div className="space-y-[2px]">
              {members &&
                members.map((member) => (
                  <ServerMember key={member.id} member={member} />
                ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export const ServerSidebar = withAuth(MyServerSidebar);
