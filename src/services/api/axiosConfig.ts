import { API } from "@/constant";
import axios from "axios";
const BASE_URL = API.baseURL[API.currentEnv as keyof typeof API.baseURL];
export const createAxiosInstance = (info: any) => {
  const { url, method, headers, data, params } = info;
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers,
    withCredentials: true,
  });
  return axiosInstance({ url, method, headers, data, params });
};

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
