"use client";
import { setIsAuthenticatedApi } from "@/services/api";
import { useAuth } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const Oauth2Redirect = () => {
  const router = useRouter();
  const { setIsAuthenticated, setUserId } = useAuth();
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
        router.push("/login");
      });
  }, [router, setIsAuthenticated, setUserId]);

  return <div>Loading...</div>;
};

export default Oauth2Redirect;
