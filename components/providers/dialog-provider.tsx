"use client";

import { useEffect, useState } from "react";
import { CreateServerDialog } from "@/components/dialogs/create-server-dialog";
import { InvitePeopleDialog } from "@/components/dialogs/invite-people-dialog";

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
    </>
  );
};
