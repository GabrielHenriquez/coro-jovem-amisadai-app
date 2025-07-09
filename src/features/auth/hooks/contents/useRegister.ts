/* import { useAuthStore } from "@stores/auth/authStore"; */
import { useMutation } from "@tanstack/react-query";
import { ICredentials } from "@models/auth";
import { Keyboard } from "react-native";

const useRegisterViewModel = () => {
  /*   const { login: loginStore } = useAuthStore(); */

  const registerMutation = useMutation({
    mutationFn: (credentials: ICredentials) => {},
    onSuccess: (data) => {},
    onError: (erro) => console.error("[MutationRegister] ->", erro),
  });

  const onSubmit = (credentials: ICredentials) => {
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
