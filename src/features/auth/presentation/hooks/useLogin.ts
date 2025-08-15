import { FirebaseAuthRepository } from "@features/auth/domain/repositories/FirebaseAuthRepository";
import { LoginUseCase } from "@features/auth/domain/usecases/LoginUseCase";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../stores/authStore";
import { secureStorage } from "@features/auth/storage/secureStorage";
import { FirebaseAuthService } from "@features/auth/domain/services/FirebaseAuthService";

const authRepo = new FirebaseAuthRepository();
const loginUseCase = new LoginUseCase(authRepo);

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const user = await loginUseCase.execute(email, password);
      console.log("✅ Login feito com sucesso:", user?.email);
      return user;
    },
    onSuccess: async (user) => {
      await secureStorage.saveAuth(user);
      const userData = await FirebaseAuthService.getUser(user.uid);
      console.log("✅ Usuário obtido com sucesso:", userData?.name);
      setUser({ email: user?.email, uid: user?.uid, ...userData });
    },
  });
};
