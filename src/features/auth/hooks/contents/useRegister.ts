import { useMutation } from "@tanstack/react-query";
import { ICredentialsRegister } from "@models/auth";
import { Keyboard } from "react-native";
import { FirebaseAuthRepository } from "@features/auth/domain/repositories/FirebaseAuthRepository";
import { useAuthStore } from "../../stores/authStore";
import { secureStorage } from "@features/auth/utils/secureStorage";

const useRegisterViewModel = () => {
  const repository = new FirebaseAuthRepository();
  const { setUser } = useAuthStore();
  const registerMutation = useMutation({
    mutationFn: (credentials: ICredentialsRegister) => {
      return repository.register(credentials?.email, credentials?.password);
    },
    onSuccess: (data, variables) => {
      const user = {
        email: data?.email,
        uid: data?.uid,
        office: variables?.office,
        phone: variables?.phone,
        name: variables?.name,
      };

      repository.createUser(user);
      secureStorage.saveAuth(data);
      setUser(user);
    },
    onError: (erro) => console.error("[MutationRegister] ->", erro),
  });

  const onSubmit = (credentials: ICredentialsRegister) => {
    Keyboard.dismiss();
    registerMutation.mutate(credentials);
  };

  return {
    onSubmit,
    reset: registerMutation.reset,
    isError: registerMutation.isError,
    isLoading: registerMutation.isPending,
  };
};

export default useRegisterViewModel;
