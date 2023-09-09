import { redirect } from "next/navigation";
import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { InitialDialog } from "@/components/dialogs/initial-dialog";

const SetupPage = async () => {
  const profile = await initialProfile();
  const server = profile
    ? await db.server.findFirst({
        where: {
          members: {
            some: {
              profileId: profile.id
            }
          }
        }
      })
    : null;

  if (server) {
    redirect(`/servers/${server.id}`);
  }

  return <InitialDialog />;
};

export default SetupPage;
