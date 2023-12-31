"use client";

import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";
import { DialogType, useDialog } from "@/hooks/use-dialog-store";
import { GENERAL_CHANNEL_NAME } from "@/lib/constants";
import Link from "next/link";

type ServerChannelProps = {
  channel: Channel;
  server: Server;
  role?: MemberRole;
};

const iconMap = {
  [ChannelType.TEXT]: <Hash className="flex-shrink-0 w-5 h-5 text-blue-500 dark:text-blue-400" />,
  [ChannelType.AUDIO]: <Mic className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" />,
  [ChannelType.VIDEO]: (
    <Video className="flex-shrink-0 w-5 h-5 text-yellow-500 dark:text-yellow-400" />
  )
};

export const ServerChannel = ({ channel, server, role }: ServerChannelProps) => {
  const { openDialog } = useDialog();
  const params = useParams();

  const url = `/servers/${params?.serverId}/channels/${channel.id}`;

  const onAction = (e: React.MouseEvent, dialogType: DialogType) => {
    e.stopPropagation();
    openDialog(dialogType, { channel, server });
  };

  return (
    <Link
      href={url}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      {iconMap[channel.type]}
      <p
        className={cn(
          "line-clamp-1 text-left font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.channelId === channel.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {channel.name}
      </p>
      {channel.name !== GENERAL_CHANNEL_NAME && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit">
            <Edit
              onClick={(e) => onAction(e, DialogType.CHANNEL_EDIT)}
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
              onClick={(e) => onAction(e, DialogType.CHANNEL_DELETE)}
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
        </div>
      )}
      {channel.name === GENERAL_CHANNEL_NAME && (
        <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400" />
      )}
    </Link>
  );
};
