"use client";

import { ChatHeader } from "@/components";
import { withAuth } from "@/hoc/with-auth";
import { useAxiosPrivateApis } from "@/services/api";
import { ConversationInterface, MemberInterface } from "@/services/interface";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";

interface MemberIdPageProps {
  params: {
    serverId: string;
    memberId: string;
  };
}
const MemberIdPage: React.FC<MemberIdPageProps> = ({ params }) => {
  const { id: userId } = useAuthStore();
  const { getMemberByUserAndServerIdApi, getOrCreateConversationApi } =
    useAxiosPrivateApis();
  const router = useRouter();
  const [otherMember, setOtherMember] = useState<MemberInterface>();
  useLayoutEffect(() => {
    userId &&
      getMemberByUserAndServerIdApi({ userId, serverId: params.serverId })
        .then((memberRes) => {
          const member: MemberInterface = memberRes?.data?.data;
          member &&
            getOrCreateConversationApi({
              memberOne: member?.id,
              memberTwo: params?.memberId,
            })
              .then((res) => {
                const conversation: ConversationInterface = res?.data?.data;
                setOtherMember(
                  conversation.memberOne.id === params.memberId
                    ? conversation.memberOne
                    : conversation.memberTwo
                );
              })
              .catch((err) => {
                return router.push(`/servers/${params.serverId}`);
              });
        })
        .catch((err) => {
          if (err?.response?.status === 404) {
            return router.push("/");
          }
        });
  }, []);
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        type="conversation"
        serverId={params.serverId}
        name={otherMember?.user.name}
        imageUrl={otherMember?.user?.imageUrl}
      />
    </div>
  );
};

export default withAuth(MemberIdPage);
