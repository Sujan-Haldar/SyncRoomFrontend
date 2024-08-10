import { API } from "@/constant";
import { useAxiosPrivate } from "@/hook";
import { useCallback } from "react";
const defaultHeader = {
  "Content-type": "application/json",
};
export const useAxiosPrivateApis = () => {
  const { createAxiosPrivateInstance } = useAxiosPrivate();
  const getServerByProfileId = (id: string) => {
    return createAxiosPrivateInstance({
      url: `${API.auth_urls.getServerByProfileId}/${id}`,
      method: "GET",
      headers: defaultHeader,
    });
  };
  const createServer = useCallback((data: any) => {
    return createAxiosPrivateInstance({
      url: API.auth_urls.server,
      method: "POST",
      headers: defaultHeader,
      data: data,
    });
  }, []);
  const getMultipleServerByUserId = useCallback((id: string) => {
    return createAxiosPrivateInstance({
      url: `${API.auth_urls.getMultipleServerByUserId}/${id}`,
      method: "GET",
      headers: defaultHeader,
    });
  }, []);
  const getServerByUserIdandServerIdApi = useCallback((data: any) => {
    return createAxiosPrivateInstance({
      url: API.auth_urls.getServerByUserIdandServerId,
      method: "POST",
      headers: defaultHeader,
      data: data,
    });
  }, []);
  const updateServerBasicDetailsApi = useCallback((data: any) => {
    return createAxiosPrivateInstance({
      url: API.auth_urls.server,
      method: "PATCH",
      headers: defaultHeader,
      data: data,
    });
  }, []);
  const serverInviteApi = useCallback((data: any) => {
    return createAxiosPrivateInstance({
      url: API.auth_urls.serverInvite,
      method: "PATCH",
      headers: defaultHeader,
      data: data,
    });
  }, []);
  const updateMemberApi = useCallback((data: any) => {
    return createAxiosPrivateInstance({
      url: API.auth_urls.member,
      method: "PATCH",
      headers: defaultHeader,
      data: data,
    });
  }, []);
  const deleteMemberApi = useCallback((data: any) => {
    return createAxiosPrivateInstance({
      url: API.auth_urls.member,
      method: "DELETE",
      headers: defaultHeader,
      data: data,
    });
  }, []);
  const createChannelApi = useCallback((data: any) => {
    return createAxiosPrivateInstance({
      url: API.auth_urls.channel,
      method: "POST",
      headers: defaultHeader,
      data: data,
    });
  }, []);
  const updateChannelApi = useCallback((data: any) => {
    return createAxiosPrivateInstance({
      url: API.auth_urls.channel,
      method: "PATCH",
      headers: defaultHeader,
      data: data,
    });
  }, []);
  const deleteChannelApi = useCallback((id: string) => {
    return createAxiosPrivateInstance({
      url: `${API.auth_urls.channel}/${id}`,
      method: "DELETE",
      headers: defaultHeader,
    });
  }, []);
  const leaveServerApi = useCallback((data: any) => {
    return createAxiosPrivateInstance({
      url: API.auth_urls.leaveServer,
      method: "PATCH",
      headers: defaultHeader,
      data: data,
    });
  }, []);
  const deleteServerApi = useCallback((data: any) => {
    return createAxiosPrivateInstance({
      url: API.auth_urls.server,
      method: "DELETE",
      headers: defaultHeader,
      data: data,
    });
  }, []);
  const getOrCreateConversationApi = useCallback(
    (data: { memberOne: string; memberTwo: string }) => {
      return createAxiosPrivateInstance({
        url: API.auth_urls.conversation,
        method: "POST",
        headers: defaultHeader,
        data: data,
      });
    },
    []
  );
  const getMemberByUserAndServerIdApi = useCallback(
    ({ userId, serverId }: { userId: string; serverId: string }) => {
      return createAxiosPrivateInstance({
        url: `${API.auth_urls.member}/${userId}/${serverId}`,
        method: "GET",
        headers: defaultHeader,
      });
    },
    []
  );
  const sendNewMessageForChannelApi = useCallback((data: any) => {
    return createAxiosPrivateInstance({
      url: API.auth_urls.message,
      method: "POST",
      headers: defaultHeader,
      data: data,
    });
  }, []);
  const getMessagesForChannelApi = useCallback((query: string) => {
    return createAxiosPrivateInstance({
      url: `${API.auth_urls.message}?${query}`,
      method: "GET",
      headers: defaultHeader,
    });
  }, []);
  const updateOrDeleteMessageForChannelApi = useCallback((data: any) => {
    return createAxiosPrivateInstance({
      url: API.auth_urls.message,
      method: "PATCH",
      headers: defaultHeader,
      data: data,
    });
  }, []);
  const sendNewMessageForConversationApi = useCallback((data: any) => {
    return createAxiosPrivateInstance({
      url: API.auth_urls.directMessage,
      method: "POST",
      headers: defaultHeader,
      data: data,
    });
  }, []);
  const getMessagesForConversationApi = useCallback((query: string) => {
    return createAxiosPrivateInstance({
      url: `${API.auth_urls.directMessage}?${query}`,
      method: "GET",
      headers: defaultHeader,
    });
  }, []);
  const updateOrDeleteMessageForConversationApi = useCallback((data: any) => {
    return createAxiosPrivateInstance({
      url: API.auth_urls.directMessage,
      method: "PATCH",
      headers: defaultHeader,
      data: data,
    });
  }, []);
  const signOutApi = useCallback(() => {
    return createAxiosPrivateInstance({
      url: API.auth_urls.signOut,
      method: "GET",
      headers: defaultHeader,
    });
  }, []);
  return {
    getServerByProfileId,
    createServer,
    getMultipleServerByUserId,
    getServerByUserIdandServerIdApi,
    updateServerBasicDetailsApi,
    serverInviteApi,
    updateMemberApi,
    deleteMemberApi,
    createChannelApi,
    deleteChannelApi,
    updateChannelApi,
    leaveServerApi,
    deleteServerApi,
    getOrCreateConversationApi,
    getMemberByUserAndServerIdApi,
    sendNewMessageForChannelApi,
    getMessagesForChannelApi,
    updateOrDeleteMessageForChannelApi,
    sendNewMessageForConversationApi,
    getMessagesForConversationApi,
    updateOrDeleteMessageForConversationApi,
    signOutApi,
  };
};
