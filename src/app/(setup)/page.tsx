"use client";

import InitialModal from "@/components/modals/initial-modal";
import { withAuth } from "@/hoc/with-auth";
import { useAxiosPrivateApis } from "@/services/api";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";

import { useLayoutEffect } from "react";

const SetupPage = () => {
  const { getServerByProfileId } = useAxiosPrivateApis();
  const { id } = useAuthStore();
  const router = useRouter();
  useLayoutEffect(() => {
    try {
      const getServer = async () => {
        const server = await getServerByProfileId(id as string);
        if (server?.data && server?.data?.data) {
          return router.push(`/servers/${server.data.data.id}`);
        }
      };
      id && getServer();
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  return <InitialModal />;
};
export default withAuth(SetupPage);
