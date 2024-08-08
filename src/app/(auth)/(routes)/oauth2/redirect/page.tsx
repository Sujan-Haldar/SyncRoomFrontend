"use client";
import { setIsAuthenticatedApi } from "@/services/api";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const Oauth2Redirect = () => {
  const router = useRouter();
  const { setIsAuthenticated, setUserId } = useAuthStore();
  useEffect(() => {
    setIsAuthenticatedApi()
      .then((res) => {
        if (res?.data?.data?.is_login) {
          setIsAuthenticated(true);
          setUserId(res?.data?.data?.id);
          router.push("/");
        }
      })
      .catch((err) => {
        setIsAuthenticated(false);
        router.push("/sign-in");
      });
  }, [router, setIsAuthenticated, setUserId]);

  return <div>Loading...</div>;
};

export default Oauth2Redirect;
