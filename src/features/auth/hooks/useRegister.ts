import { FirebaseAuthRepository } from "@features/auth/domain/repositories/FirebaseAuthRepository";
import { RegisterUseCase } from "@features/auth/domain/usecases/RegisterUseCase";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../stores/authStore";
import { Log } from "@services/Logger";
import { secureStorage } from "@features/auth/utils/secureStorage";

const authRepo = new FirebaseAuthRepository();
const registerUseCase = new RegisterUseCase(authRepo);

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async ({
      email,
      password,
      name,
    }: {
      email: string;
      password: string;
      name: string;
    }) => {
      const user = await registerUseCase.execute(email, password, name);
      Log.success("Usuário registrado com sucesso:", user?.email);
      await secureStorage.saveAuth(user);
      setUser(user);
      return user;
    },
  });
};
