import { create } from "zustand";

type Action = "create" | "edit" | "delete";

interface ToastMemberState {
  action: Action;
  labelToast: "excluído" | "editado" | "cadastrado";
  visibleToast: boolean;
  setVisibleToast: (visible: boolean, action?: Action) => void;
  getLabelToast: () => string;
}

const actions = {
  create: "cadastrado",
  edit: "editado",
  delete: "excluído",
};

export const useToastMemberStore = create<ToastMemberState>((set, get) => ({
  action: "create",
  labelToast: "cadastrado",
  visibleToast: false,
  setVisibleToast: (visible, action) =>
    set({ visibleToast: visible, action: action || get().action }),
  getLabelToast: () => actions[get().action],
}));
