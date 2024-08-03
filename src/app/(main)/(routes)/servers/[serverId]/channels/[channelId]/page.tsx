"use client";

import { ChatHeader } from "@/components";
import { withAuth } from "@/hoc/with-auth";
import { ChannelInterface } from "@/services/interface";
import { useServerStore } from "@/store";
import { useLayoutEffect, useState } from "react";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}
const ChannelIdPage: React.FC<ChannelIdPageProps> = ({ params }) => {
  const [channel, setChannel] = useState<ChannelInterface>();
  const { channels } = useServerStore();
  useLayoutEffect(() => {
    setChannel(channels?.find((temp) => temp.id === params.channelId));
  }, [channels, params.channelId]);
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        serverId={params.serverId}
        type="channel"
        name={channel?.name}
      />
    </div>
  );
};

export default withAuth(ChannelIdPage);
