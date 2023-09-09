import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { GENERAL_CHANNEL_NAME } from "@/lib/constants";

export type ServerIdPageProps = {
  params: {
    serverId: string;
  };
};

const ServerIdPage = async ({ params }: ServerIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id
        }
      }
    },
    include: {
      channels: {
        where: {
          name: GENERAL_CHANNEL_NAME
        },
        orderBy: {
          createdAt: "asc"
        }
      }
    }
  });

  const initialChannel = server?.channels[0];

  if (initialChannel?.name !== GENERAL_CHANNEL_NAME) {
    return null;
  }

  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`);
};

export default ServerIdPage;
