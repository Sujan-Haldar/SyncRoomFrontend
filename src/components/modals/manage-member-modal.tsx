"use client";
import { UserAvater } from "@/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAxiosPrivateApis } from "@/services/api";
import { MemberRole } from "@/services/interface";
import { useAuthStore, useServerStore } from "@/store";
import { useModalStore } from "@/store/use-modal-store";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useState } from "react";
const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500" />,
};
export const ManageMemberModal = () => {
  const { onOpen, isOpen, onClose, type } = useModalStore();
  const {
    id: currentServerId,
    user,
    members,
    updateMember,
    deleteMember,
  } = useServerStore();
  const { id } = useAuthStore();
  const { updateMemberApi, deleteMemberApi } = useAxiosPrivateApis();
  const isModalOpen = isOpen && type === "manageMember";
  const isAdmin = id === user?.id;
  const [loadingId, setLoadingId] = useState<string>("");
  const updateMemberRole = (id: string, role: string) => {
    setLoadingId(id);
    updateMemberApi({
      id,
      role,
    })
      .then((res) => {
        if (res?.data?.data) {
          updateMember(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingId("");
      });
  };
  const removeMemberFromServer = (id: string) => {
    setLoadingId(id);
    deleteMemberApi({
      id,
    })
      .then((res) => {
        if (res) {
          deleteMember(id);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingId("");
      });
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold ">
            manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {members?.length} members
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {members &&
            members.map((member) => (
              <div key={member.id} className="flex items-center gap-x-2 mb-6">
                <UserAvater src={member.user.imageUrl}></UserAvater>
                <div className="flex flex-col gap-y-1">
                  <div className="text-xs font-semibold flex items-center gap-x-1">
                    {member.user.name}
                    {member.role === MemberRole.ADMIN && roleIconMap.ADMIN}
                    {member.role === MemberRole.MODERATOR &&
                      roleIconMap.MODERATOR}
                  </div>
                  <p className="text-xs text-zink-500 ">{member.user.email}</p>
                </div>
                {user &&
                  user.id !== member.user.id &&
                  loadingId !== member.id && (
                    <div className="ml-auto">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreVertical className="h-4 w-4 text-zinc-500" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="left">
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="flex items-center">
                              <ShieldQuestion className="w-4 h-4 mr-2" />
                              <span>Role</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem
                                  onClick={() =>
                                    member.role != "GUEST" &&
                                    updateMemberRole(member.id, "GUEST")
                                  }
                                >
                                  <Shield className="h-4 w-4 mr-2" />
                                  Guest
                                  {member.role === MemberRole.GUEST && (
                                    <Check className="h-4 w-4 ml-auto" />
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    member.role != "MODERATOR" &&
                                    updateMemberRole(member.id, "MODERATOR")
                                  }
                                >
                                  <ShieldCheck className="h-4 w-4 mr-2" />
                                  Moderator
                                  {member.role === MemberRole.MODERATOR && (
                                    <Check className="h-4 w-4 ml-auto" />
                                  )}
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => removeMemberFromServer(member.id)}
                          >
                            <Gavel className="h-4 w-4 mr-2" />
                            Kick
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                {loadingId === member.id && (
                  <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4" />
                )}
              </div>
            ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
