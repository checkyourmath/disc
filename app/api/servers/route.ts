import { v4 as uuidv4 } from "uuid";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";
import { GENERAL_CHANNEL_NAME } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const { name, imageUrl } = await request.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const inviteCode = uuidv4();

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode,
        channels: {
          create: [{ name: GENERAL_CHANNEL_NAME, profileId: profile.id }]
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }]
        }
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("[SERVERS_POST]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
