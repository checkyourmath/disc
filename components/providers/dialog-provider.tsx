"use client";

import { useEffect, useState } from "react";
import { CreateServerDialog } from "@/components/dialogs/create-server-dialog";

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
    </>
  );
};
