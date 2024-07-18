import { axiosPrivate } from "@/services/api/axiosConfig";
import { useEffect } from "react";
import { useAuthStore } from "../store/use-auth-store";
import { useAccessToken } from "./use-access-token";
export const useAxiosPrivate = () => {
  const { accessToken } = useAuthStore();
  const { getAccessToken } = useAccessToken();
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await getAccessToken();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, getAccessToken]);

  const createAxiosPrivateInstance = (info: any) => {
    const { url, method, headers, data, params } = info;
    return axiosPrivate({ url, method, headers, data, params });
  };
  return { createAxiosPrivateInstance };
};
