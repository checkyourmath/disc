import { create } from "zustand";

export enum DialogType {
  CREATE_SERVER = "create-server"
}

export type DialogStore = {
  type: DialogType | null;
  isOpen: boolean;
  open: (type: DialogType) => void;
  close: () => void;
};

export const useDialog = create<DialogStore>((set) => ({
  type: null,
  isOpen: false,
  open: (type) => set({ type, isOpen: true }),
  close: () => set({ type: null, isOpen: false })
}));
