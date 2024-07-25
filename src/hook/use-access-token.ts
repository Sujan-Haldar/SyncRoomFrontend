import { getAccessTokenApi } from "@/services/api";
import { useAuthStore } from "../store/use-auth-store";

export const useAccessToken = () => {
  const { setAccessToken, setIsAuthenticated } = useAuthStore();
  const getAccessToken = async () => {
    try {
      const res = await getAccessTokenApi();
      setAccessToken(res?.data?.data?.access_token);
      setIsAuthenticated(res?.data?.status);
      return res?.data?.data?.access_token;
    } catch (error) {
      console.log("😒😒 : Error in hook/use-access-token.ts");
    }
  };
  return { getAccessToken };
};
