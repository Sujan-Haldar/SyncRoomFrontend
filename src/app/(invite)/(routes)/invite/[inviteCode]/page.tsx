"use client";

import { withAuth } from "@/hoc/with-auth";
import { useAxiosPrivateApis } from "@/services/api";
import { useAuthStore } from "@/store";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

interface InvitePageProps {
  params: {
    inviteCode: string;
  };
}
const InvitePage: React.FC<InvitePageProps> = ({ params }) => {
  const { id } = useAuthStore();
  const { serverInviteApi } = useAxiosPrivateApis();
  const { push } = useRouter();
  useLayoutEffect(() => {
    if (!params.inviteCode) return push("/");
    id &&
      serverInviteApi({
        userId: id,
        inviteCode: params.inviteCode,
      })
        .then((res) => {
          if (res?.data?.data) {
            return push(`/servers/${res?.data?.data?.id}`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
  }, [id, params.inviteCode, push, serverInviteApi]);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col items-center">
        <Loader2 className="w-10 h-10 animate-spin" />
        <p className="font-semibold text-lg">Loading...</p>
      </div>
    </div>
  );
};
export default withAuth(InvitePage);
