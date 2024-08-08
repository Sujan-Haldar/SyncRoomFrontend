"use client";

import { ChatHeader, ChatInput, ChatMessages, MediaRoom } from "@/components";
import { withAuth } from "@/hoc/with-auth";
import { useAxiosPrivateApis } from "@/services/api";
import {
  ChannelInterface,
  ChannelType,
  MemberInterface,
} from "@/services/interface";
import { useAuthStore, useServerStore } from "@/store";
import { useLayoutEffect, useState } from "react";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}
const ChannelIdPage: React.FC<ChannelIdPageProps> = ({ params }) => {
  const [channel, setChannel] = useState<ChannelInterface>();
  const [currentMember, setCurrentMember] = useState<MemberInterface>();
  const { channels, members } = useServerStore();
  const {
    sendNewMessageForChannelApi,
    updateOrDeleteMessageForChannelApi,
    getMessagesForChannelApi,
  } = useAxiosPrivateApis();
  const { id } = useAuthStore();
  useLayoutEffect(() => {
    setChannel(channels?.find((temp) => temp.id === params.channelId));
    setCurrentMember(members?.find((temp) => temp.user.id === id));
  }, [channels, id, members, params.channelId]);
  const handleSubmitForUpdateAndDeleteMessage = async (
    serverId: string,
    channelId: string,
    userId: string,
    messageId: string,
    content: null | string,
    method: string
  ) => {
    return await updateOrDeleteMessageForChannelApi({
      serverId,
      userId,
      messageId,
      channelId,
      content,
      method,
    });
  };
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        serverId={params.serverId}
        type="channel"
        name={channel?.name}
      />
      {channel?.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            name={channel?.name}
            type="channel"
            chatId={channel?.id as string}
            data={{
              userId: id as string,
              serverId: params.serverId,
              channelId: params.channelId,
            }}
            currentMember={currentMember}
            getMessages={getMessagesForChannelApi}
            handleSubmitForUpdateAndDeleteMessage={
              updateOrDeleteMessageForChannelApi
            }
          />
          <ChatInput
            data={{
              userId: id as string,
              serverId: params.serverId,
              channelId: params.channelId,
            }}
            name={channel?.name}
            type="channel"
            onSubmitHandler={sendNewMessageForChannelApi}
          />
        </>
      )}
      {channel?.type === ChannelType.AUDIO && (
        <MediaRoom chatId={channel.id} video={false} audio={true} />
      )}
      {channel?.type === ChannelType.VIDEO && (
        <MediaRoom chatId={channel.id} video={true} audio={true} />
      )}
    </div>
  );
};

export default withAuth(ChannelIdPage);
