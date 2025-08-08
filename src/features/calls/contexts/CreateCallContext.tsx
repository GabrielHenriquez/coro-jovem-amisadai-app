import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { FormProvider } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import useFormCreateCall from "../hooks/forms/useFormCreateCall";
import { useEventsQueries } from "../infra/queryAdapters/useEventsQueries";

import { FirebaseMembersRepository } from "@features/members/domain/repositories/FirebaseMembersRepository";
import { MembersUseCase } from "@features/members/domain/usecases/MembersUseCase";
import { IMember } from "@features/members/domain/entities/Member";
import { IEvent } from "../domain/entities/Events";
import { useAuthStore } from "@features/auth/presentation/stores/authStore";

import { collection, getDocs } from "firebase/firestore";
import { db } from "global/configs/firebase";
import { formatDateToUS } from "@utils/date";
import { useNavigation } from "@react-navigation/native";
import { DB_COLLECTIONS } from "@utils/DB_collections";

interface CreateCallContextType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  membersData: IMember[];
  songsData: string[];
  validateIsActive: (id: string) => boolean;
  validateIsActiveMusic: (id: string) => boolean;
  setSongsData: React.Dispatch<React.SetStateAction<string[]>>;
  resetAll: () => void;
  handleItemSelected: (item: IMember) => void;
  handleMusicSelected: (item: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  dataForm: any;
  setDataForm: React.Dispatch<React.SetStateAction<any>>;
  visibleToast: boolean;
  setVisibleToast: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCallContext = createContext({} as CreateCallContextType);

export const CreateCallProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthStore();
  const { goBack } = useNavigation();
  const queryClient = useQueryClient();
  const [eventID, setEventID] = useState(null);
  const { createEventMutation } = useEventsQueries();
  const membersUseCase = new MembersUseCase(new FirebaseMembersRepository());

  const [step, setStep] = useState(0);
  const [visibleToast, setVisibleToast] = useState(false);
  const [membersSelected, setMembersSelected] = useState<IMember[]>([]);
  const [songsSelected, setSongsSelected] = useState<string[]>([]);
  const [dataForm, setDataForm] = useState<any>();

  const formValidator = useFormCreateCall();

  const getSongs = async () => {
    try {
      const snapshot = await getDocs(collection(db, DB_COLLECTIONS?.musics));
      return snapshot.docs
        .map((doc) => doc.data()?.music)
        .filter(Boolean)
        .sort();
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
      return [];
    }
  };

  const { data: membersData = [] } = useQuery({
    queryKey: ["members"],
    queryFn: () => membersUseCase.execute("getMembers"),
  });

  const { data: songsData = [] } = useQuery({
    queryKey: ["songs"],
    queryFn: getSongs,
  });

  const handleItemSelected = (item: IMember) => {
    setMembersSelected((prev) => {
      const exists = prev.some((member) => member.id === item.id);
      return exists
        ? prev.filter((member) => member.id !== item.id)
        : [...prev, item];
    });
  };

  const handleMusicSelected = (music: string) => {
    setSongsSelected((prev) => {
      const exists = prev.includes(music);
      return exists ? prev.filter((m) => m !== music) : [...prev, music];
    });
  };

  const validateIsActive = (id: string) =>
    membersSelected.some((m) => m.id === id);
  const validateIsActiveMusic = (music: string) =>
    songsSelected.includes(music);

  const resetAll = () => {
    setStep(0);
    formValidator.reset();
    setMembersSelected([]);
    setSongsSelected([]);
  };

  const handleMissingComponents = () => {
    const selectedIds = membersSelected.map((m) => m.id);
    return membersData
      .filter((member) => !selectedIds.includes(member.id))
      .map(({ id, gender, suit, name }) => ({ id, gender, suit, name }));
  };

  const handleGetEventData = () => {
    const numberRandom = Math.floor(Math.random() * 151);

    const dataFormEvent: IEvent = {
      hour: dataForm?.hour,
      cult: dataForm?.cult,
      musics: songsSelected,
      type: dataForm.callType,
      components: membersSelected,
      numberSearchDoc: eventID ? eventID : numberRandom,
      date: formatDateToUS(dataForm?.date),
      missingComponents: handleMissingComponents(),
      scheduleBy: `${user?.name} (${user?.office})`,
      local: dataForm?.local ?? "IEADPE - Casa Amarela",
      namePreacher: dataForm?.namePreacher ?? "Não informado",
    };

    const dataFormEventCard = {
      type: dataForm.callType,
      cult: dataForm?.cult,
      hour: dataForm?.hour,
      date: formatDateToUS(dataForm?.date),
    };

    return { dataFormEvent, dataFormEventCard };
  };

  const { mutate, isPending } = createEventMutation;

  const handleCreateEvent = () => {
    const { dataFormEvent, dataFormEventCard } = handleGetEventData();
    const eventId = `${dataFormEvent?.date}-${eventID}`;

    mutate(
      { eventId, dataFormEvent, dataFormEventCard, isEdit: !!eventID },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["events"] });
          queryClient.invalidateQueries({ queryKey: ["dots"] });
          goBack();
          resetAll();
          setVisibleToast(true);
        },
      }
    );
  };

  return (
    <CreateCallContext.Provider
      value={{
        step,
        setStep,
        resetAll,
        handleItemSelected,
        validateIsActive,
        validateIsActiveMusic,
        handleMusicSelected,
        membersData,
        setEventID,
        setMembersSelected,
        setSongsSelected,
        songsData,
        onSubmit: handleCreateEvent,
        isLoading: isPending,
        dataForm,
        setDataForm,
        visibleToast,
        setVisibleToast,
      }}
    >
      <FormProvider {...formValidator}>{children}</FormProvider>
    </CreateCallContext.Provider>
  );
};

export const useCreateCallContext = () => useContext(CreateCallContext);
