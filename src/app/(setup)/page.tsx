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
    id &&
      getServerByProfileId(id)
        .then((res) => {
          if (res?.data && res?.data?.data) {
            return router.push(`/servers/${res.data.data.id}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }, [id]);
  return <InitialModal />;
};
export default withAuth(SetupPage);
