"use client";

import { useState } from "react";
import axios from "axios";
import { Check, Copy, RefreshCw } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogType, useDialog } from "@/hooks/use-dialog-store";
import { useOrigin } from "@/hooks/use-origin";
import { Label } from "@/components/ui/label";

export const InvitePeopleDialog = () => {
  const { dialogType, dialogData, isDialogOpen, openDialog, closeDialog } = useDialog();
  const origin = useOrigin();

  const { server } = dialogData;
  const isOpen = isDialogOpen && dialogType === DialogType.SERVER_INVITE_PEOPLE;
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setIsCopied(true);
    } catch {
      // TODO: handle error
    }

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const onGenerateNewLink = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);

      openDialog(DialogType.SERVER_INVITE_PEOPLE, { server: response.data });
    } catch (error) {
      // TODO: handle error
      // eslint-disable-next-line no-console
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={closeDialog}
    >
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">Invite Friends</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              readOnly
              disabled={isLoading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button
              disabled={isLoading}
              onClick={onCopy}
              size="icon"
            >
              {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          <Button
            onClick={onGenerateNewLink}
            disabled={isLoading}
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4"
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
