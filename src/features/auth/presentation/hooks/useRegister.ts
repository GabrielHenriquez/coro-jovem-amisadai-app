import { FirebaseAuthRepository } from "@features/auth/domain/repositories/FirebaseAuthRepository";
import { RegisterUseCase } from "@features/auth/domain/usecases/RegisterUseCase";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../stores/authStore";
import { secureStorage } from "@features/auth/storage/secureStorage";

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
      await secureStorage.saveAuth(user);
      setUser(user);
      return user;
    },
  });
};
