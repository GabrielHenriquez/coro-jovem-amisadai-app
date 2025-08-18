import { FormDataRegisterMember } from "../../hooks/forms/useFormRegisterMember";

export type MemberFormData = FormDataRegisterMember;

// Tipo para o retorno do hook
export type MemberFormHookReturn = {
  control: any;
  watch: (name: string) => any;
  handleSubmit: (onSubmit: (data: any) => void) => () => void;
  setValue: (name: string, value: any, options?: any) => void;
  reset: () => void;
  errors: Record<string, any>;
};

export type GenderValue = "Masculino" | "Feminino" | null;
export type VoiceValue =
  | "Contralto"
  | "1º Soprano"
  | "2º Soprano"
  | "Baixo"
  | "Barítono"
  | "1º Tenor"
  | "2º Tenor"
  | null;
export type BaptizedValue = "Sim" | "Não" | null;

export const MALE_VOICES: VoiceValue[] = [
  "Baixo",
  "Barítono",
  "1º Tenor",
  "2º Tenor",
];
export const FEMALE_VOICES: VoiceValue[] = [
  "Contralto",
  "1º Soprano",
  "2º Soprano",
];
export const GENDERS: ("Masculino" | "Feminino")[] = ["Masculino", "Feminino"];
export const BAPTIZED_OPTIONS: ("Sim" | "Não")[] = ["Sim", "Não"];
