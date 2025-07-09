/* import { useAuthStore } from "@stores/auth/authStore"; */
import { useMutation } from "@tanstack/react-query";
import { ICredentials } from "@models/auth";
import { Keyboard } from "react-native";

const useLoginViewModel = () => {
  /*   const { login: loginStore } = useAuthStore(); */

  const loginMutation = useMutation({
    mutationFn: (credentials: ICredentials) => {},
    onSuccess: (data) => {},
    onError: (erro) => console.error("[MutationLogin] ->", erro),
  });

  const onSubmit = (credentials: ICredentials) => {
    Keyboard.dismiss();
    loginMutation.mutate(credentials);
  };

  return {
    onSubmit,
    reset: loginMutation.reset,
    isError: loginMutation.isError,
    isLoading: loginMutation.isPending,
  };
};

export default useLoginViewModel;
