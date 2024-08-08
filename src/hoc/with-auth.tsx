"use client";

import { setIsAuthenticatedApi } from "@/services/api";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const withAuth = (Component: any) => {
  return function WithAuth(props: any) {
    const {
      isAuthenticated,
      setIsAuthenticated,
      setUserId,
      removeAuth,
      setUser,
    } = useAuthStore();
    const router = useRouter();
    useEffect(() => {
      if (!isAuthenticated) {
        setIsAuthenticatedApi()
          .then((res) => {
            if (res?.data?.data?.is_login) {
              setIsAuthenticated(true);
              setUserId(res?.data?.data?.id);
              setUser(res?.data?.data?.user);
            } else {
              return router.push("/login");
            }
          })
          .catch((error) => {
            if (error?.response?.status === 401) {
              removeAuth();
              return router.push("/login");
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
    if (!isAuthenticated) {
      return null;
    }
    return <Component {...props} />;
  };
};
