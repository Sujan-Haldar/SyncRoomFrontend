"use client";
import { ActionTooltip, ModeToggle } from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { signOutApi, useAxiosPrivateApis } from "@/services/api";
import { ServerInterface } from "@/services/interface";
import { useAllServersStore, useAuthStore } from "@/store";
import { LogOut, Settings } from "lucide-react";
import { useLayoutEffect } from "react";
import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";
export const MyNavigationSidebar = () => {
  const { id, removeAuth } = useAuthStore();
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
  }, [getMultipleServerByUserId, id, setServers]);
  const onClickSignOut = () => {
    signOutApi()
      .then((res) => {
        removeAuth();
      })
      .catch((err) => {});
  };
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
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-6">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ActionTooltip lebel="Settings" side="top">
              <Settings className="h-6 w-6 text-zinc-700 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
            </ActionTooltip>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right">
            <DropdownMenuItem onClick={onClickSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ModeToggle />
      </div>
    </div>
  );
};

// export const NavigationSidebar = withAuth(MyNavigationSidebar);
export const NavigationSidebar = MyNavigationSidebar;
