"use client";
import {
  CreateChannelModal,
  CreateServerModal,
  DeleteChannelModal,
  DeleteMessageModal,
  DeleteServerModal,
  EditChannelModal,
  EditServerModal,
  ForgetPasswordModal,
  InviteModal,
  LeaveServerModal,
  ManageMemberModal,
  MessageFileModel,
} from "@/components";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <ManageMemberModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModel />
      <DeleteMessageModal />
      <ForgetPasswordModal />
    </>
  );
};
