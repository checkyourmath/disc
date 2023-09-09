import { create } from "zustand";
import { Channel, ChannelType } from "@prisma/client";
import { ServerWithMembersWithProfile } from "@/types";

export enum DialogType {
  CREATE_SERVER = "create-server",
  SERVER_INVITE_PEOPLE = "server-invite-people",
  SERVER_SETTINGS = "server-settings",
  SERVER_MANAGE_MEMBERS = "server-manage-members",
  SERVER_CREATE_CHANNEL = "server-create-channel",
  SERVER_DELETE = "server-delete",
  SERVER_LEAVE = "server-leave",
  CHANNEL_DELETE = "channel-delete",
  CHANNEL_EDIT = "channel-edit"
}

export type DialogData = {
  server?: ServerWithMembersWithProfile;
  channelType?: ChannelType;
  channel?: Channel;
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
