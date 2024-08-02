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
import { useServerStore } from "@/store";
import { useModalStore } from "@/store/use-modal-store";
import { useState } from "react";
export const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data } = useModalStore();
  const { channel } = data;
  const { deleteChannelApi } = useAxiosPrivateApis();
  const { deleteChannel } = useServerStore();
  const isModalOpen = isOpen && type === "deleteChannel";
  const [isLoading, setIsLoading] = useState(false);
  const delete_Channel = () => {
    setIsLoading(true);
    channel &&
      deleteChannelApi(channel.id)
        .then((res) => {
          deleteChannel(channel.id);
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
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to delete?
            <br />
            <span className="font-semibold text-indigo-500">
              #{data?.channel?.name}
            </span>{" "}
            will be permanently deleted.
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
              onClick={delete_Channel}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
