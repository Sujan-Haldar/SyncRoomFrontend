"use client";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useServerStore } from "@/store";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: any;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}
export const ServerSearch: React.FC<ServerSearchProps> = ({ data }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { push } = useRouter();
  const { id: currentServerId } = useServerStore();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  const onClick = (id: string, type: "channel" | "member") => {
    setOpen(false);
    if (type == "member") {
      return push(`/servers/${currentServerId}/conversations/${id}`);
    }
    if (type == "channel") {
      return push(`/servers/${currentServerId}/channels/${id}`);
    }
  };
  return (
    <>
      <button
        className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
        onClick={() => setOpen(true)}
      >
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
          Search
        </p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <span className="text-xs">CTRL</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members" />
        <CommandList>
          <CommandEmpty>No Results found</CommandEmpty>
          {data &&
            data.map(({ data, label, type }) => {
              if (!data?.length) return null;
              return (
                <CommandGroup key={label} heading={label}>
                  {data?.map(({ icon, id, name }) => (
                    <CommandItem key={id} onSelect={() => onClick(id, type)}>
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              );
            })}
        </CommandList>
      </CommandDialog>
    </>
  );
};
