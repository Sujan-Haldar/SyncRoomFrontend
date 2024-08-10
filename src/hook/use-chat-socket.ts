import { useSocket } from "@/components";
import { MessageInterface } from "@/services/interface";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface ChatSocketProps {
  addKey: string;
  updateKey: string;
  queryKey: string;
}

export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey,
}: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!socket) return;
    socket.on(updateKey, (message: MessageInterface) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) return;
        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            messages: page.messages.map((item: MessageInterface) => {
              if (item.id === message.id) return message;
              return item;
            }),
          };
        });
        return {
          ...oldData,
          pages: newData,
        };
      });
    });
    socket.on(addKey, (message: MessageInterface) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [{ messages: [message] }],
          };
        }

        const newData = [...oldData.pages];
        newData[0] = {
          ...newData[0],
          messages: [message, ...newData[0].messages],
        };
        return {
          ...oldData,
          pages: newData,
        };
      });
    });
    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    };
  }, [addKey, queryClient, queryKey, socket, updateKey]);
};
