"use client";
import { ServerHeader } from "@/components";
import { withAuth } from "@/hoc/with-auth";
import { useAxiosPrivateApis } from "@/services/api";
import {
  ChannelInterface,
  ChannelType,
  MemberInterface,
} from "@/services/interface";
import { useAuthStore, useServerStore } from "@/store";
import { useLayoutEffect, useState } from "react";
interface ServerSidebarProps {
  serverId: string;
}

const MyServerSidebar: React.FC<ServerSidebarProps> = ({ serverId }) => {
  const { id } = useAuthStore();
  const { getServerByUserIdandServerIdApi } = useAxiosPrivateApis();
  const {
    id: currentServerId,
    channels,
    members: currentServerMembers,
    setServer,
  } = useServerStore();
  // const [server, setServer] = useState<ServerInterfaceForServerSidebar>();
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
    getServerByUserIdandServerIdApi({
      userId: id,
      serverId,
    })
      .then((res) => {
        if (res?.data?.data) setServer(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, serverId]);
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
    </div>
  );
};

export const ServerSidebar = withAuth(MyServerSidebar);
