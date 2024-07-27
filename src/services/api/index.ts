export * from "@/services/api/axiosPrivate";
import { API } from "@/constant";
import { createAxiosInstance } from "./axiosConfig";
const defaultHeader = {
  "Content-type": "application/json",
};
export const getAccessTokenApi = () => {
  return createAxiosInstance({
    url: API.auth_urls.accessToken,
    method: "GET",
    headers: defaultHeader,
  });
};
export const setIsAuthenticatedApi = () => {
  return createAxiosInstance({
    url: API.auth_urls.isAuthenticated,
    method: "GET",
    headers: defaultHeader,
  });
};
