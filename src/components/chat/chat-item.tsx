"use client";
import { ActionTooltip, UserAvater } from "@/components";
import { cn } from "@/lib/utils";
import { useAxiosPrivateApis } from "@/services/api";
import {
  MemberInterface,
  MemberRole,
  MessageInterface,
} from "@/services/interface";
import { useModalStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
interface ChatItemProps {
  message: MessageInterface;
  currentMember?: MemberInterface;
  data: {
    userId: string;
    serverId: string;
    channelId?: string;
    conversationId?: string;
  };
  handleSubmitForUpdateAndDeleteMessage: Function;
}
const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};
const formSchem = z.object({
  content: z.string().min(1, "Please write the message..."),
});
export const ChatItem: React.FC<ChatItemProps> = ({
  message,
  currentMember,
  data,
  handleSubmitForUpdateAndDeleteMessage,
}) => {
  const { content, createdAt, deleted, fileUrl, id, member, updated } = message;
  const DATE_FORMAT = "d MMM yyyy, HH:mm";
  const isAdmin = currentMember?.role === MemberRole.ADMIN;
  const isModerator = currentMember?.role === MemberRole.MODERATOR;
  const isOwner = currentMember?.id === member.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const fileType = fileUrl?.split(".").pop();
  const isPDF = fileType === "pdf" && fileUrl;
  const isImage = !isPDF && fileUrl;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { updateOrDeleteMessageForChannelApi } = useAxiosPrivateApis();
  const { onOpen } = useModalStore();
  const { push } = useRouter();
  const form = useForm<z.infer<typeof formSchem>>({
    resolver: zodResolver(formSchem),
    defaultValues: {
      content: content,
    },
  });
  const isLoading = form.formState.isSubmitting;
  useEffect(() => {
    form.reset({
      content: content,
    });
  }, [content]);
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setIsEditing(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  const onSubmit = (values: z.infer<typeof formSchem>) => {
    handleSubmitForUpdateAndDeleteMessage({
      ...data,
      messageId: id,
      content: values.content,
      method: "UPDATE",
    })
      .then((res: any) => {
        setIsEditing(false);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const onMemberClick = () => {
    if (member.user.id === data.userId) return;
    push(`/servers/${data.serverId}/conversations/${member.id}`);
  };
  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div
          className="cursor-pointer hover:drop-shadow-md transition'"
          onClick={onMemberClick}
        >
          <UserAvater src={member?.user?.imageUrl} name={member?.user?.name} />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p
                onClick={onMemberClick}
                className="font-semibold text-sm hover:underline cursor-pointer"
              >
                {member?.user?.name}
              </p>
              <ActionTooltip lebel={member.role}>
                {roleIconMap[member.role as keyof typeof roleIconMap]}
              </ActionTooltip>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {format(new Date(createdAt), DATE_FORMAT)}
            </span>
          </div>
          {isImage && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrel"
              className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
            >
              <Image src={fileUrl} alt="Image" fill className="object-cover" />
            </a>
          )}
          {isPDF && (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
              <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                PDF File
              </a>
            </div>
          )}
          {!fileUrl && !isEditing && (
            <p
              className={cn(
                "text-sm text-zinc-600 dark:text-zinc-300",
                deleted &&
                  "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
              )}
            >
              {content}
              {updated && !deleted && (
                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                  (edited)
                </span>
              )}
            </p>
          )}
          {!fileUrl && isEditing && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-center w-full gap-x-2 pt-2"
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            disabled={isLoading}
                            className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                            placeholder="Edited Message"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button size="sm" variant={"primary"} disabled={isLoading}>
                  Save
                </Button>
              </form>
              <span className="text-[10px] mt-1 text-zinc-400">
                Press escape to cancel,enter to save
              </span>
            </Form>
          )}
        </div>
      </div>
      {canDeleteMessage && (
        <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
          {canEditMessage && (
            <ActionTooltip lebel="Edit">
              <Edit
                className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                onClick={() => setIsEditing(true)}
              />
            </ActionTooltip>
          )}
          <ActionTooltip lebel="Delete">
            <Trash
              className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
              onClick={() =>
                onOpen("deleteMessage", {
                  payload: {
                    ...data,
                    messageId: id,
                    method: "DELETE",
                  },
                  apiMethod: handleSubmitForUpdateAndDeleteMessage,
                })
              }
            />
          </ActionTooltip>
        </div>
      )}
    </div>
  );
};
