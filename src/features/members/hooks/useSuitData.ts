import { useState, useEffect } from "react";
import { MALE_VOICES, FEMALE_VOICES, VoiceValue } from "../domain/entities/MemberForm";

export const useSuitData = (gender: string | null) => {
  const [suitData, setSuitData] = useState<VoiceValue[]>(MALE_VOICES);

  useEffect(() => {
    const isGenderMale = gender === "Masculino";
    setSuitData(isGenderMale ? MALE_VOICES : FEMALE_VOICES);
  }, [gender]);

  return suitData;
};
