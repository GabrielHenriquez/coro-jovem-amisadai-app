import { ICredentials } from "@models/auth";
import { Keyboard } from "react-native";
import { useLogin } from "../useLogin";

const useLoginViewModel = () => {
  const { mutateAsync, isPending, isError, reset } = useLogin();
  const onSubmit = (credentials: ICredentials) => {
    Keyboard.dismiss();
    mutateAsync(credentials);
  };

  return {
    onSubmit,
    reset,
    isError,
    isLoading: isPending,
  };
};

export default useLoginViewModel;
