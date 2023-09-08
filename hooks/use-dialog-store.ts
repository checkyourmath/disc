import { create } from "zustand";

export enum DialogType {
  CREATE_SERVER = "create-server"
}

// TODO: improve names?

export type DialogStore = {
  dialogType: DialogType | null;
  isDialogOpen: boolean;
  dialogOpen: (type: DialogType) => void;
  dialogClose: () => void;
};

export const useDialog = create<DialogStore>((set) => ({
  dialogType: null,
  isDialogOpen: false,
  dialogOpen: (type) => set({ dialogType: type, isDialogOpen: true }),
  dialogClose: () => set({ dialogType: null, isDialogOpen: false })
}));
