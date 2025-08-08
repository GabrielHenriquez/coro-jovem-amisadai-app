import { IUser } from "@features/auth/domain/entities/User";
import { FirebaseAuthRepository } from "@features/auth/domain/repositories/FirebaseAuthRepository";
import { secureStorage } from "@features/auth/storage/secureStorage";
import { create } from "zustand";

interface AuthState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  logout: () => Promise<void>;
  loadUserFromStorage: () => Promise<void>;
}

const authRepo = new FirebaseAuthRepository();

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  loadUserFromStorage: async () => {
    const storedUser = await secureStorage.getAuth();
    if (storedUser) {
      const user = await authRepo.getUser(storedUser);
      console.log("🔐 Usuário carregado do armazenamento seguro:", user);
      set({ user });
    }
  },

  logout: async () => {
    await authRepo.logout();
    secureStorage.clear();
    set({ user: null });
  },
}));
