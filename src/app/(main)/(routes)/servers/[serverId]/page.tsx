"use client";
import { withAuth } from "@/hoc/with-auth";
import { ChannelInterface } from "@/services/interface";
import { useServerStore } from "@/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

const ServerIDPage = () => {
  const { channels } = useServerStore();
  const { push } = useRouter();
  const params = useParams();
  useLayoutEffect(() => {
    if (!!channels?.length) {
      const channel: ChannelInterface | undefined = channels.find(
        (temp) => temp.name === "general"
      );
      if (channel) push(`/servers/${params.serverId}/channels/${channel.id}`);
    }
  }, [channels, params.serverId, push]);
  return null;
};

export default withAuth(ServerIDPage);
