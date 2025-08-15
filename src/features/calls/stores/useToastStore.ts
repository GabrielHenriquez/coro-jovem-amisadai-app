import { create } from "zustand";

interface IToastState {
  message: string;
  visible: boolean;
  onHide: () => void;
  setMessage: (message: string) => void;
}

export const useToastStore = create<IToastState>((set, get) => ({
  message: "",
  visible: false,
  onHide: () => {
    set({ visible: false });
  },
  setMessage: (message) => {
    set({ message, visible: true });
  },
}));
