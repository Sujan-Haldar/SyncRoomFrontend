"use client";

import { ChatItem, ChatWelcome } from "@/components";
import { useChatQuery, useChatScroll, useChatSocket } from "@/hook";
import { useAxiosPrivateApis } from "@/services/api";
import { MemberInterface, MessageInterface } from "@/services/interface";
import { Loader2, ServerCrash } from "lucide-react";
import { ElementRef, Fragment, useRef } from "react";
interface ChatMessagesProps {
  name?: string;
  type: "channel" | "conversation";
  data: {
    userId: string;
    serverId: string;
    channelId?: string;
    conversationId?: string;
  };
  chatId: string;
  currentMember?: MemberInterface;
  getMessages: Function;
  handleSubmitForUpdateAndDeleteMessage: Function;
}
export const ChatMessages: React.FC<ChatMessagesProps> = ({
  name,
  type,
  chatId,
  data,
  currentMember,
  getMessages,
  handleSubmitForUpdateAndDeleteMessage,
}) => {
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;
  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);
  const {
    data: res,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useChatQuery({ queryKey, queryData: data, apiFunction: getMessages });
  useChatSocket({ queryKey, addKey, updateKey });
  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: res?.pages?.[0]?.messages?.length ?? 0,
  });
  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong
        </p>
      </div>
    );
  }
  return (
    <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && <ChatWelcome type={type} name={name} />}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300"
            >
              Load previous message
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto">
        {res?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group?.messages?.map((message: MessageInterface) => (
              <ChatItem
                key={message.id}
                message={message}
                currentMember={currentMember}
                data={data}
                handleSubmitForUpdateAndDeleteMessage={
                  handleSubmitForUpdateAndDeleteMessage
                }
              />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};
