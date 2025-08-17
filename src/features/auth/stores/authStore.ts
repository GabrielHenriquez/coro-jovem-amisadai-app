import { IUser } from "@features/auth/domain/entities/User";
import { FirebaseAuthRepository } from "@features/auth/domain/repositories/FirebaseAuthRepository";
import { secureStorage } from "@features/auth/utils/secureStorage";
import { Log } from "@services/Logger";
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
    try {
      const storedUser = await secureStorage.getAuth();
      if (storedUser) {
        const user = await authRepo.getUser(storedUser);
        Log.info("Usuário carregado do armazenamento seguro:", user?.name);
        set({ user });
      } else {
        Log.error("Nenhum usuário encontrado no armazenamento seguro");
      }
    } catch (error) {
      Log.error("Erro ao carregar usuário do storage:", error);
    }
  },

  logout: async () => {
    await authRepo.logout();
    secureStorage.clear();
    set({ user: null });
  },
}));
