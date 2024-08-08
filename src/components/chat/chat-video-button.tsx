"use client";
import { ActionTooltip } from "@/components";
import { Video, VideoOff } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

export const ChatVideoButton = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isVideo = searchParams?.get("video");
  const Icon = isVideo ? VideoOff : Video;
  const toolTipLable = isVideo ? "End video call" : "Start video call";
  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathName || "",
        query: {
          video: isVideo ? undefined : true,
        },
      },
      { skipNull: true }
    );
    router.push(url);
  };
  return (
    <ActionTooltip lebel={toolTipLable} side="bottom">
      <button onClick={onClick} className="hover:opacity-75 transition mr-4">
        <Icon className="h-6 w-6 text-zinc-500" />
      </button>
    </ActionTooltip>
  );
};
