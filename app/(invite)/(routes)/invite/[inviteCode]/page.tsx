import { SignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { Server } from "@prisma/client";

type InviteCodePageProps = {
  params: {
    inviteCode: string;
  };
};

const InviteCodePage = async ({ params: { inviteCode } }: InviteCodePageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    // return redirectToSignIn(); // <- causes error
    return <SignIn />;
  }

  if (!inviteCode) {
    return redirect("/");
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  let server: Server = null;

  try {
    server = await db.server.update({
      where: {
        inviteCode
      },
      data: {
        members: {
          create: [
            {
              profileId: profile.id
            }
          ]
        }
      }
    });
  } catch {
    /* ignore for now */
  }

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return redirect("/");
};

export default InviteCodePage;
