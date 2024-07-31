"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useOrigin } from "@/hook";
import { useAxiosPrivateApis } from "@/services/api";
import { useAuthStore, useServerStore } from "@/store";
import { useModalStore } from "@/store/use-modal-store";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type } = useModalStore();
  const {
    id: currentServerId,
    inviteCode,
    setInviteCode,
    user,
  } = useServerStore();
  const { id } = useAuthStore();
  const { updateServerBasicDetailsApi } = useAxiosPrivateApis();
  const origin = useOrigin();
  const isModalOpen = isOpen && type === "invite";
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inviteUrl = `${origin}/invite/${inviteCode}`;
  const isAdmin = id === user?.id;
  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const res = await updateServerBasicDetailsApi({
        serverId: currentServerId,
        userId: id,
        inviteCode: uuidv4(),
      });
      if (res?.data?.data) {
        setInviteCode(res?.data?.data?.inviteCode);
        onOpen("invite");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold ">
            Invite Friends
          </DialogTitle>
          <div className="p-6">
            <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
              Server invite link
            </Label>
            <div className="flex items-center mt-2 gap-x-2">
              <Input
                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 "
                value={inviteUrl}
                disabled={isLoading}
              />
              <Button size={"icon"} onClick={onCopy} disabled={isLoading}>
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <Button
              variant={"link"}
              size="sm"
              className="text-xs text-zinc-500 mt-4"
              onClick={onNew}
              disabled={isLoading || !isAdmin}
            >
              Generate a new link
              <RefreshCw className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
