"use client";
import {
  CreateServerModal,
  EditServerModal,
  InviteModal,
  ManageMemberModal,
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
    </>
  );
};
