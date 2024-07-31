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
    leaveServerApi,
    deleteServerApi,
  };
};
