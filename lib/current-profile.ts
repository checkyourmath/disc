import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import type { Profile } from "@prisma/client";
import { initialProfile } from "@/lib/initial-profile";

export const currentProfile = async (): Promise<Profile | null> => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  let profile = await db.profile.findUnique({
    where: { userId }
  });

  if (!profile) {
    profile = await initialProfile();
  }

  return profile;
};
