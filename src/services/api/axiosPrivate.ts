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
  return { getServerByProfileId, createServer };
};
