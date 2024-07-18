import { setIsAuthenticatedApi } from "@/services/api";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuth = () => {
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated, setUserId } = useAuthStore();
  useEffect(() => {
    if (!isAuthenticated) {
      setIsAuthenticatedApi()
        .then((res) => {
          if (res?.data?.data?.is_login) {
            setIsAuthenticated(true);
            setUserId(res?.data?.data?.id);
          } else {
            router.push("/login");
          }
        })
        .catch((err) => {
          setIsAuthenticated(false);
          router.push("/login");
        });
    }
  });
};
