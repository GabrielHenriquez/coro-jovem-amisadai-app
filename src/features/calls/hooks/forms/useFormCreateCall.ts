import createCallSchema, {
  CreateCallData,
} from "@features/calls/schemas/createCallSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Resolver, useForm } from "react-hook-form";

export const useFormCreateCall = () => {
  const methods = useForm<CreateCallData>({
    resolver: yupResolver(createCallSchema) as Resolver<CreateCallData>,
  });

  return methods;
};

export default useFormCreateCall;
