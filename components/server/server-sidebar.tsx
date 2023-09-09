import { redirect } from "next/navigation";
import { Channel, ChannelType, MemberRole } from "@prisma/client";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ServerHeader } from "@/components/server/server-header";

type ServerSidebarProps = {
  serverId: string;
};

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc"
        }
      },
      members: {
        include: {
          profile: true
        },
        orderBy: {
          role: "asc"
        }
      }
    }
  });

  if (!server) {
    return redirect("/");
  }

  const textChannels: Channel[] = [];
  const audioChannels: Channel[] = [];
  const videoChannels: Channel[] = [];

  server.channels.forEach((channel) => {
    switch (channel.type) {
      case ChannelType.TEXT:
        textChannels.push(channel);
        break;

      case ChannelType.AUDIO:
        audioChannels.push(channel);
        break;

      case ChannelType.VIDEO:
        videoChannels.push(channel);
        break;
    }
  });

  // const members = server.members.filter((member) => member.profileId !== profile.id);
  const role =
    server.members.find((member) => member.profileId === profile.id)?.role || MemberRole.GUEST;

  // TODO: use [s?]css variables for custom colors

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader
        server={server}
        role={role}
      />
      Server Side Bar
    </div>
  );
};
