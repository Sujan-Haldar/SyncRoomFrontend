"use client";
import { useAuthStore } from "@/store";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}
export const MediaRoom: React.FC<MediaRoomProps> = ({
  audio,
  chatId,
  video,
}) => {
  const [token, setToken] = useState("");
  const { user } = useAuthStore();
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const res = await fetch(
          `/api/livekit?room=${chatId}&username=${user.name}`
        );
        const data = await res.json();
        setToken(data.token);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [chatId, user]);
  if (token === "") {
    return (
      <div className="flex flex-col justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }
  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};
