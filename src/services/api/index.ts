export * from "@/services/api/axiosPrivate";
import { API } from "@/constant";
import qs from "query-string";
import { createAxiosInstance } from "./axiosConfig";
const defaultHeader = {
  "Content-type": "application/json",
};
export const getAccessTokenApi = () => {
  return createAxiosInstance({
    url: API.noAuthUrls.accessToken,
    method: "GET",
    headers: defaultHeader,
  });
};
export const setIsAuthenticatedApi = () => {
  return createAxiosInstance({
    url: API.noAuthUrls.isAuthenticated,
    method: "GET",
    headers: defaultHeader,
  });
};
export const getOtpApi = (data: any) => {
  const url = qs.stringify(
    {
      ...data,
    },
    { skipNull: true }
  );
  return createAxiosInstance({
    url: `${API.noAuthUrls.otp}?${url}`,
    method: "GET",
    headers: defaultHeader,
  });
};
export const signInApi = (data: any) => {
  return createAxiosInstance({
    url: API.noAuthUrls.signIn,
    method: "POST",
    headers: defaultHeader,
    data: data,
  });
};
export const signUpApi = (data: any) => {
  return createAxiosInstance({
    url: API.noAuthUrls.signUp,
    method: "POST",
    headers: defaultHeader,
    data: data,
  });
};
export const forgetPasswordApi = (data: any) => {
  return createAxiosInstance({
    url: API.noAuthUrls.forgetPassword,
    method: "PATCH",
    headers: defaultHeader,
    data: data,
  });
};
export const signOutApi = () => {
  return createAxiosInstance({
    url: API.auth_urls.signOut,
    method: "GET",
    headers: defaultHeader,
  });
};
