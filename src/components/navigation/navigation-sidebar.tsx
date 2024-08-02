"use client";
import { ModeToggle } from "@/components";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { withAuth } from "@/hoc/with-auth";
import { useAxiosPrivateApis } from "@/services/api";
import { ServerInterface } from "@/services/interface";
import { useAllServersStore, useAuthStore } from "@/store";
import { useLayoutEffect } from "react";
import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";

export const MyNavigationSidebar = () => {
  const { id } = useAuthStore();
  const { getMultipleServerByUserId } = useAxiosPrivateApis();
  const { servers, setServers } = useAllServersStore();
  useLayoutEffect(() => {
    try {
      id &&
        getMultipleServerByUserId(id).then((res) => {
          if (res?.data?.data) {
            setServers(res?.data?.data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />

      <ScrollArea className="flex-1 w-full">
        {servers.map((server: ServerInterface) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            ></NavigationItem>
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
      </div>
    </div>
  );
};

export const NavigationSidebar = withAuth(MyNavigationSidebar);
