"use client";

import { setIsAuthenticatedApi } from "@/services/api";
import { useAuthStore } from "@/store";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

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
    if (!isAuthenticated)
      return (
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col items-center">
            <Loader2 className="w-10 h-10 animate-spin" />
            <p className="font-semibold text-lg">Loading...</p>
          </div>
        </div>
      );
    return <Component {...props} />;
  };
};
