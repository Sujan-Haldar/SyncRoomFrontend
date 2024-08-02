"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useAxiosPrivateApis } from "@/services/api";
import { useAllServersStore, useAuthStore, useServerStore } from "@/store";
import { useModalStore } from "@/store/use-modal-store";
import { useRouter } from "next/navigation";
import { useState } from "react";
export const DeleteServerModal = () => {
  const { onOpen, isOpen, onClose, type } = useModalStore();
  const { id: currentServerId, name, removeServerInfo } = useServerStore();
  const { servers, setServers } = useAllServersStore();
  const { id } = useAuthStore();
  const { deleteServerApi } = useAxiosPrivateApis();
  const isModalOpen = isOpen && type === "deleteServer";
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const deleteServer = () => {
    setIsLoading(true);
    currentServerId &&
      id &&
      deleteServerApi({
        userId: id,
        serverId: currentServerId,
      })
        .then((res) => {
          const myServers = servers.filter(
            (temp) => temp.id != currentServerId
          );
          setServers(myServers);
          removeServerInfo();
          if (myServers.length === 0) {
            push("/");
          } else {
            push(`/servers/${myServers[0].id}`);
          }
          onClose();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold ">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to delete?
            <br />
            <span className="font-semibold text-indigo-500">{name}</span> will
            be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pb-4">
          <div className="flex justify-center gap-3 w-full">
            <Button
              disabled={isLoading}
              variant="ghost"
              onClick={() => onClose()}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              variant={"primary"}
              onClick={deleteServer}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
