"use client";
import { ChatHeader, ChatInput, ChatMessages, MediaRoom } from "@/components";
import { withAuth } from "@/hoc/with-auth";
import { useAxiosPrivateApis } from "@/services/api";
import { ConversationInterface, MemberInterface } from "@/services/interface";
import { useAuthStore, useServerStore } from "@/store";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";

interface MemberIdPageProps {
  params: {
    serverId: string;
    memberId: string;
  };
  searchParams: {
    video?: boolean;
  };
}
const MemberIdPage: React.FC<MemberIdPageProps> = ({
  params,
  searchParams,
}) => {
  const { id: userId } = useAuthStore();
  const { members } = useServerStore();
  const {
    getMemberByUserAndServerIdApi,
    getOrCreateConversationApi,
    sendNewMessageForConversationApi,
    updateOrDeleteMessageForConversationApi,
    getMessagesForConversationApi,
  } = useAxiosPrivateApis();
  const router = useRouter();
  const [currentMember, setCurrentMember] = useState<MemberInterface>();
  const [otherMember, setOtherMember] = useState<MemberInterface>();
  const [conversation, setConversation] = useState<ConversationInterface>();
  useLayoutEffect(() => {
    userId &&
      getMemberByUserAndServerIdApi({ userId, serverId: params.serverId })
        .then((memberRes) => {
          const member: MemberInterface = memberRes?.data?.data;
          member &&
            getOrCreateConversationApi({
              memberOne: member?.id,
              memberTwo: params?.memberId,
            })
              .then((res) => {
                const conversation: ConversationInterface = res?.data?.data;
                setConversation(conversation);
                setOtherMember(
                  conversation.memberOne.id === params.memberId
                    ? conversation.memberOne
                    : conversation.memberTwo
                );
              })
              .catch((err) => {
                return router.push(`/servers/${params.serverId}`);
              });
        })
        .catch((err) => {
          if (err?.response?.status === 404) {
            return router.push("/");
          }
        });
  }, []);
  useLayoutEffect(() => {
    setCurrentMember(
      members?.find((temp: MemberInterface) => temp.user.id === userId)
    );
  }, [members, userId]);

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        type="conversation"
        serverId={params.serverId}
        name={otherMember?.user.name}
        imageUrl={otherMember?.user?.imageUrl}
      />
      {searchParams.video && (
        <MediaRoom
          chatId={conversation?.id as string}
          audio={true}
          video={true}
        />
      )}
      {!searchParams.video && (
        <>
          <ChatMessages
            name={otherMember?.user.name}
            type="conversation"
            chatId={conversation?.id as string}
            data={{
              userId: userId as string,
              serverId: params.serverId,
              conversationId: conversation?.id,
            }}
            currentMember={currentMember}
            getMessages={getMessagesForConversationApi}
            handleSubmitForUpdateAndDeleteMessage={
              updateOrDeleteMessageForConversationApi
            }
          />
          <ChatInput
            data={{
              userId: userId as string,
              serverId: params.serverId,
              conversationId: conversation?.id,
            }}
            name={otherMember?.user.name}
            type="conversation"
            onSubmitHandler={sendNewMessageForConversationApi}
          />
        </>
      )}
    </div>
  );
};

export default withAuth(MemberIdPage);
