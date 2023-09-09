import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(request: Request, { params }: { params: { serverId: string } }) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse("Server Id is missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        // TODO: check all members with Admin role
        profileId: profile.id // creator id = admin id
      },
      data: {
        inviteCode: uuidv4()
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("[SERVERS_SERVER_ID_INVITE_CODE_PATCH]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
