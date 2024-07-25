"use client";

import { setIsAuthenticatedApi } from "@/services/api";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const withAuth = (Component: any) => {
  return function WithAuth(props: any) {
    const { isAuthenticated, setIsAuthenticated, setUserId } = useAuthStore();
    const router = useRouter();
    useEffect(() => {
      if (!isAuthenticated) {
        setIsAuthenticatedApi()
          .then((res) => {
            if (res?.data?.data?.is_login) {
              setIsAuthenticated(true);
              setUserId(res?.data?.data?.id);
            } else {
              return router.push("/login");
            }
          })
          .catch((err) => {
            setIsAuthenticated(false);
            return router.push("/login");
          });
      }
    }, []);
    if (!isAuthenticated) {
      return null;
    }
    return <Component {...props} />;
  };
};
