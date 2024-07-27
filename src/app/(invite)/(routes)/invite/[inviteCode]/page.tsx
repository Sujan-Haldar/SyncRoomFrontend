"use client";

import { withAuth } from "@/hoc/with-auth";
import { useAxiosPrivateApis } from "@/services/api";
import { useAuthStore } from "@/store";
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

  return null;
};
export default withAuth(InvitePage);
