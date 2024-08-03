"use client";
import { withAuth } from "@/hoc/with-auth";
import { useAxiosPrivateApis } from "@/services/api";
import { ChannelInterface } from "@/services/interface";
import { useAuthStore, useServerStore } from "@/store";
import { useParams, useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

const ServerIDPage = () => {
  const { getServerByUserIdandServerIdApi } = useAxiosPrivateApis();
  const { id: userId } = useAuthStore();
  const { setServer } = useServerStore();
  const { push } = useRouter();
  const params = useParams();
  useLayoutEffect(() => {
    getServerByUserIdandServerIdApi({
      userId,
      serverId: params?.serverId,
    })
      .then((res) => {
        if (res?.data?.data) setServer(res?.data?.data);
        if (res?.data?.data?.channels) {
          const myChannels: Array<ChannelInterface> = res?.data?.data?.channels;
          const channel = myChannels.find((temp) => temp.name === "general");
          if (channel)
            push(`/servers/${params?.serverId}/channels/${channel.id}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return null;
};

export default withAuth(ServerIDPage);
