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

// TODO: improve names?

export type DialogStore = {
  dialogType: DialogType | null;
  isDialogOpen: boolean;
  openDialog: (type: DialogType, params?: { server?: Server }) => void;
  closeDialog: () => void;
};

export const useDialog = create<DialogStore>((set) => ({
  dialogType: null,
  isDialogOpen: false,
  openDialog: (type) => set({ dialogType: type, isDialogOpen: true }),
  closeDialog: () => set({ dialogType: null, isDialogOpen: false })
}));
