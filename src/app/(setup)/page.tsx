"use client";
import InitialModal from "@/components/modals/initial-modal";
import { withAuth } from "@/hoc/with-auth";
import { useAxiosPrivateApis } from "@/services/api";
import { useAuthStore } from "@/store";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { useLayoutEffect, useState } from "react";

const SetupPage = () => {
  const { getServerByProfileId } = useAxiosPrivateApis();
  const { id } = useAuthStore();
  const router = useRouter();
  const [isFound, setIsFound] = useState<boolean>(true);
  useLayoutEffect(() => {
    id &&
      getServerByProfileId(id)
        .then((res) => {
          if (res?.data && res?.data?.data) {
            return router.push(`/servers/${res.data.data.id}`);
          }
        })
        .catch((err) => {
          if (err.response.status === 404) setIsFound(false);
        });
  }, [getServerByProfileId, id, isFound, router]);
  if (isFound) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col items-center">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="font-semibold text-lg">Loading...</p>
        </div>
      </div>
    );
  }
  return <InitialModal />;
};
export default withAuth(SetupPage);
