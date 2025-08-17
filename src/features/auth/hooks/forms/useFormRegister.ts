import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { ICredentialsRegister } from "@models/auth";

const useFormRegister = () => {
  const [secureTextActive, setSecureTextActive] = useState(true);
  const [secureTextActiveConfirmation, setSecureTextActiveConfirmation] =
    useState(true);

  const formSchema = yup.object({
    name: yup
      .string()
      .required("Nome é um campo obrigatório")
      .trim()
      .test(
        "no-multiple-spaces",
        "Não é permitido mais de um espaço entre as palavras",
        (value) => !/\s{2,}/.test(value)
      )
      .test(
        "no-more-than-three-words",
        "Preencha no máximo 3 palavras",
        (value) => (value || "").split(/\s+/).length <= 3
      )
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Nome inválido"),
    email: yup
      .string()
      .required("E-mail é um campo obrigatório")
      .matches(
        /^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}(?:\.[a-zA-Z]{2,})?$/,
        "E-mail inválido"
      )
      .transform((value) => value.toLowerCase()),
    phone: yup
      .string()
      .required("Telefone é um campo obrigatório")
      .min(15, "Preencha todos os dígitos"),
    password: yup
      .string()
      .required("Senha é um campo obrigatório")
      .min(8, "A senha deve conter no mínimo 8 caracteres"),
    passwordConfirm: yup
      .string()
      .required("Confirmação de senha é um campo obrigatório")
      .oneOf([yup.ref("password")], "Senhas não coincidem"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(formSchema),
  });

  return {
    control,
    handleSubmit,
    errors,
    secureTextActive,
    secureTextActiveConfirmation,
    setSecureTextActive,
    setSecureTextActiveConfirmation,
  };
};

export default useFormRegister;
