"use client";

import { useEffect, useState } from "react";
import { CreateServerDialog } from "@/components/dialogs/create-server-dialog";
import { InvitePeopleDialog } from "@/components/dialogs/invite-people-dialog";
import { ServerSettingsDialog } from "@/components/dialogs/server-settings-dialog";
import { ManageMembersDialog } from "@/components/dialogs/manage-members-dialog";
import { CreateChannelDialog } from "@/components/dialogs/create-channel-dialog";
import { LeaveServerDialog } from "@/components/dialogs/leave-server-dialog";
import { DeleteServerDialog } from "@/components/dialogs/delete-server-dialog";

export const DialogProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerDialog />
      <InvitePeopleDialog />
      <ServerSettingsDialog />
      <ManageMembersDialog />
      <CreateChannelDialog />
      <LeaveServerDialog />
      <DeleteServerDialog />
    </>
  );
};
