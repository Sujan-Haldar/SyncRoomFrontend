"use client";
import { setIsAuthenticatedApi } from "@/services/api";
import { useAuthStore } from "@/store";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const Oauth2Redirect = () => {
  const router = useRouter();
  const { setIsAuthenticated, setUserId, isAuthenticated, setUser } =
    useAuthStore();
  useEffect(() => {
    setIsAuthenticatedApi()
      .then((res) => {
        if (res?.data?.data?.is_login) {
          setIsAuthenticated(true);
          setUserId(res?.data?.data?.id);
          setUser(res?.data?.data?.user);
        }
      })
      .catch((err) => {
        setIsAuthenticated(false);
        router.push("/sign-in");
      });
  }, [router, setIsAuthenticated, setUser, setUserId]);
  if (isAuthenticated) {
    return router.push("/");
  }
  return (
    <div className="flex flex-col items-center">
      <Loader2 className="w-10 h-10 animate-spin" />
      <p className="font-semibold text-lg">Loading...</p>
    </div>
  );
};

export default Oauth2Redirect;
