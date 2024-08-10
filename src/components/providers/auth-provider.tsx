"use client";

import { setIsAuthenticatedApi } from "@/services/api";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    setUserId,
    removeAuth,
    setUser,
  } = useAuthStore();
  const router = useRouter();

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      setIsAuthenticatedApi()
        .then((res) => {
          if (res?.data?.data?.is_login) {
            setIsAuthenticated(true);
            setUserId(res?.data?.data?.id);
            setUser(res?.data?.data?.user);
          } else {
            return router.push("/sign-in");
          }
        })
        .catch((error) => {
          if (error?.response?.status === 401) {
            removeAuth();
            return router.push("/sign-in");
          }
        });
    }
  }, [
    isAuthenticated,
    removeAuth,
    router,
    setIsAuthenticated,
    setUser,
    setUserId,
  ]);
  return children;
};
