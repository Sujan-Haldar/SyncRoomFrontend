"use client";

import { useAuth } from "@/hook";
import { useAxiosPrivateApis } from "@/services/api";
import { useAuthStore } from "@/store";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const SetupPage = () => {
  useAuth();
  const { getServerByProfileId } = useAxiosPrivateApis();
  const { id } = useAuthStore();
  useEffect(() => {
    async () => {
      const server = await getServerByProfileId(id as string);
      if (server?.data && server?.data?.data) {
        return redirect(`/servers/${server.data.data.id}`);
      }
    };
  });
  return <div>page</div>;
};
export default SetupPage;
