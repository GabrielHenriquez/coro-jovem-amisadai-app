import { create } from "zustand";

interface ISelectionState {
  selectedSongs: string[];
  selectedMembers: string[];

  addSong: (title: string) => void;
  songExists: (title: string) => boolean;
  removeSong: (title: string) => void;
  addMember: (name: string) => void;
  memberExists: (title: string) => boolean;
  removeMember: (name: string) => void;
  clearAll: () => void;
}

export const useSelectionStore = create<ISelectionState>((set, get) => ({
  selectedSongs: [],
  selectedMembers: [],

  addSong: (title) =>
    set((s) =>
      s.selectedSongs.includes(title)
        ? s
        : { selectedSongs: [...s.selectedSongs, title] }
    ),

  songExists: (title) => get().selectedSongs.includes(title),
  removeSong: (title) =>
    set((s) => ({
      selectedSongs: s.selectedSongs.filter((t) => t !== title),
    })),

  addMember: (name) =>
    set((s) =>
      s.selectedMembers.includes(name)
        ? s
        : { selectedMembers: [...s.selectedMembers, name] }
    ),
  memberExists: (title) => get().selectedSongs.includes(title),
  removeMember: (name) =>
    set((s) => ({
      selectedMembers: s.selectedMembers.filter((n) => n !== name),
    })),

  clearAll: () => set({ selectedSongs: [], selectedMembers: [] }),
}));
