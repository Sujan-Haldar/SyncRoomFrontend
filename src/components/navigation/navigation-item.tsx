"use client";

import { ActionTooltip } from "@/components/action-tooltip";
import { cn } from "@/lib/utils";
import { useAxiosPrivateApis } from "@/services/api";
import { ChannelInterface } from "@/services/interface";
import { useAuthStore, useServerStore } from "@/store";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();
  const { removeServerInfo, setServer } = useServerStore();
  const { getServerByUserIdandServerIdApi } = useAxiosPrivateApis();
  const { id: userId } = useAuthStore();
  const onClick = () => {
    getServerByUserIdandServerIdApi({
      userId,
      serverId: id,
    })
      .then((res) => {
        if (res?.data?.data) setServer(res?.data?.data);
        if (res?.data?.data?.channels) {
          const myChannels: Array<ChannelInterface> = res?.data?.data?.channels;
          const channel = myChannels.find((temp) => temp.name === "general");
          if (channel) router.push(`/servers/${id}/channels/${channel.id}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip lebel={name} side="right" align="center">
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",

            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        ></div>
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[2px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image src={imageUrl} alt="Channel" fill />
        </div>
      </button>
    </ActionTooltip>
  );
};
