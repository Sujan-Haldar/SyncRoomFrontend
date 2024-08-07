import { useSocket } from "@/components";
import { useInfiniteQuery } from "@tanstack/react-query";
import qs from "query-string";
interface ChatQueryProps {
  queryKey: string;
  queryData: {
    userId: string;
    serverId: string;
    channelId?: string;
    conversationId?: string;
  };
  apiFunction: any;
}

export const useChatQuery = ({
  queryKey,
  queryData,
  apiFunction,
}: ChatQueryProps) => {
  const { isConnected } = useSocket();

  const fetchMessages = async ({
    pageParam = undefined,
  }: {
    pageParam?: number;
  }) => {
    const queryString = qs.stringify(
      {
        cursor: pageParam,
        ...queryData,
      },
      { skipNull: true }
    );
    const res = await apiFunction(queryString);
    return res?.data?.data;
  };
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey],
      initialPageParam: undefined,
      queryFn: ({ pageParam }) => fetchMessages({ pageParam }),
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchInterval: isConnected ? false : 1000,
    });

  return { data, fetchNextPage, hasNextPage, status, isFetchingNextPage };
};
