import { create } from "zustand";

interface useNimeModalNime {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useNimeModals = create<useNimeModalNime>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
