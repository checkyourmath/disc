import { create } from "zustand";
import { Server } from "@prisma/client";

export enum DialogType {
  CREATE_SERVER = "create-server",
  SERVER_INVITE_PEOPLE = "server-invite-people",
  SERVER_SETTINGS = "server-settings",
  SERVER_MANAGE_MEMBERS = "server-manage-members",
  SERVER_CREATE_CHANNEL = "server-create-channel",
  SERVER_DELETE = "server-delete",
  SERVER_LEAVE = "server-leave"
}

export type DialogData = {
  server?: Server;
};

export type DialogStore = {
  dialogType: DialogType | null;
  dialogData: DialogData;
  isDialogOpen: boolean;
  openDialog: (dialogType: DialogType, dialogData?: DialogData) => void;
  closeDialog: () => void;
};

export const useDialog = create<DialogStore>((set) => ({
  dialogType: null,
  dialogData: {},
  isDialogOpen: false,
  openDialog: (dialogType, dialogData = {}) =>
    set({
      dialogType,
      dialogData,
      isDialogOpen: true
    }),
  closeDialog: () =>
    set({
      dialogType: null,
      dialogData: {},
      isDialogOpen: false
    })
}));
