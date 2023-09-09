"use client";

import { useEffect, useState } from "react";
import { ServerCreateDialog } from "@/components/dialogs/server-create-dialog";
import { InvitePeopleDialog } from "@/components/dialogs/invite-people-dialog";
import { ServerSettingsDialog } from "@/components/dialogs/server-settings-dialog";
import { ManageMembersDialog } from "@/components/dialogs/manage-members-dialog";
import { ChannelCreateDialog } from "@/components/dialogs/channel-create-dialog";
import { LeaveServerDialog } from "@/components/dialogs/leave-server-dialog";
import { ServerDeleteDialog } from "@/components/dialogs/server-delete-dialog";
import { ChannelDeleteDialog } from "@/components/dialogs/channel-delete-dialog";
import { ChannelEditDialog } from "@/components/dialogs/channel-edit-dialog";
import { MessageFileDialog } from "@/components/dialogs/message-file-dialog";

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
      <ServerCreateDialog />
      <InvitePeopleDialog />
      <ServerSettingsDialog />
      <ManageMembersDialog />
      <ChannelCreateDialog />
      <LeaveServerDialog />
      <ServerDeleteDialog />
      <ChannelDeleteDialog />
      <ChannelEditDialog />
      <MessageFileDialog />
    </>
  );
};
