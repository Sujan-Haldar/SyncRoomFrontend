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
      url: API.auth_urls.createServer,
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
  const updateServerInviteCodeApi = useCallback((data: any) => {
    return createAxiosPrivateInstance({
      url: API.auth_urls.updateServerInviteCode,
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
  return {
    getServerByProfileId,
    createServer,
    getMultipleServerByUserId,
    getServerByUserIdandServerIdApi,
    updateServerInviteCodeApi,
    serverInviteApi,
  };
};
