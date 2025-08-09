import { createContext, useContext, useState, ReactNode } from "react";
import { FormProvider } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useFormCreateCall from "../hooks/forms/useFormCreateCall";
import { useEventsQueries } from "../infra/queryAdapters/useEventsQueries";
import { FirebaseMembersRepository } from "@features/members/domain/repositories/FirebaseMembersRepository";
import { MembersUseCase } from "@features/members/domain/usecases/MembersUseCase";
import { IMember } from "@features/members/domain/entities/Member";
import { IEvent, IEventCard } from "../domain/entities/Events";
import { useAuthStore } from "@features/auth/presentation/stores/authStore";
import { collection, getDocs } from "firebase/firestore";
import { db } from "global/configs/firebase";
import { formatDateToUS } from "@utils/date";
import { useNavigation } from "@react-navigation/native";

interface CreateCallFormData {
  hour: string;
  cult: string;
  date: string;
  callType: "Escala" | "Saída";
  local?: string;
  namePreacher?: string;
}

interface CreateCallContextType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  eventID: string | null;
  setEventID: React.Dispatch<React.SetStateAction<string | null>>;
  setOldType: React.Dispatch<React.SetStateAction<string | null>>;
  membersData: IMember[];
  songsData: string[];
  validateIsActive: (id: string) => boolean;
  validateIsActiveMusic: (id: string) => boolean;
  setMembersSelected: React.Dispatch<React.SetStateAction<IMember[]>>;
  setSongsData: React.Dispatch<React.SetStateAction<string[]>>;
  resetAll: () => void;
  handleItemSelected: (item: IMember) => void;
  handleMusicSelected: (item: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  dataForm: CreateCallFormData | undefined;
  setDataForm: React.Dispatch<
    React.SetStateAction<CreateCallFormData | undefined>
  >;
  visibleToast: boolean;
  setVisibleToast: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCallContext = createContext({} as CreateCallContextType);

export const CreateCallProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthStore();
  const { goBack } = useNavigation();
  const { createEventMutation } = useEventsQueries();
  const queryClient = useQueryClient();

  // State management
  const [step, setStep] = useState(0);
  const [visibleToast, setVisibleToast] = useState(false);
  const [eventID, setEventID] = useState<string | null>(null);
  const [oldType, setOldType] = useState<string | null>(null);
  const [membersSelected, setMembersSelected] = useState<IMember[]>([]);
  const [songsSelected, setSongsSelected] = useState<string[]>([]);
  const [dataForm, setDataForm] = useState<CreateCallFormData | undefined>();

  // Dependencies
  const membersUseCase = new MembersUseCase(new FirebaseMembersRepository());
  const formValidator = useFormCreateCall();
  const { mutate, isPending } = createEventMutation;

  // Helper functions
  const getSongs = async () => {
    try {
      const snapshot = await getDocs(collection(db, "musics"));
      return snapshot.docs
        .map((doc) => doc.data()?.music)
        .filter(Boolean)
        .sort();
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
      return [];
    }
  };

  // Queries
  const { data: membersData = [] } = useQuery({
    queryKey: ["members"],
    queryFn: () => membersUseCase.execute("getMembers"),
  });

  const { data: songsData = [] } = useQuery({
    queryKey: ["songs"],
    queryFn: getSongs,
  });

  const generateDotKey = (
    type: string,
    date: string,
    numberSearchDoc: string
  ) => `${type}-${date}-${numberSearchDoc}`;

  // Event handlers
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
    setEventID(null);
    setOldType(null);
    setMembersSelected([]);
    setSongsSelected([]);
    setDataForm(undefined);
  };

  const handleMissingComponents = () => {
    if (!Array.isArray(membersData)) return [];

    const selectedIds = membersSelected.map((m) => m.id);
    return membersData
      .filter((member) => !selectedIds.includes(member.id))
      .map(({ id, gender, suit, name }) => ({
        id,
        gender: gender || "Não informado",
        suit: suit || "Não informado",
        name,
      }));
  };

  const handleGetEventData = () => {
    if (!dataForm) throw new Error("Form data is required");

    const numberRandom = Math.floor(Math.random() * 151);

    const dataFormEvent: IEvent = {
      hour: dataForm.hour,
      cult: dataForm.cult,
      musics: songsSelected,
      type: dataForm.callType,
      components: membersSelected.map((member) => ({
        name: member.name,
        id: member.id,
        gender: member.gender || "Não informado",
        suit: member.suit || "Não informado",
      })),
      numberSearchDoc: eventID ? parseInt(eventID) : numberRandom,
      date: formatDateToUS(dataForm.date),
      missingComponents: handleMissingComponents(),
      scheduleBy: `${user?.name} (${user?.office})`,
      local: dataForm.local ?? "IEADPE - Casa Amarela",
      namePreacher: dataForm.namePreacher ?? "Não informado",
    };

    const dataFormEventCard: IEventCard = {
      id: `${dataFormEvent.date}-${dataFormEvent.numberSearchDoc}`,
      title: `${dataForm.callType} - ${dataForm.cult}`,
      type: dataForm.callType,
      cult: dataForm.cult,
      hour: dataForm.hour,
      date: formatDateToUS(dataForm.date),
    };

    return { dataFormEvent, dataFormEventCard };
  };

  const handleCreateEvent = () => {
    try {
      const { dataFormEvent, dataFormEventCard } = handleGetEventData();
      const isEdit = !!eventID;

      mutate(
        {
          eventId: `${dataFormEvent?.date}-${dataFormEvent?.numberSearchDoc}`,
          oldKey: isEdit
            ? generateDotKey(
                oldType ?? "",
                dataFormEvent?.date,
                dataFormEvent?.numberSearchDoc.toString()
              )
            : undefined,
          dataFormEvent,
          dataFormEventCard,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
            queryClient.invalidateQueries({ queryKey: ["dots"] });
            goBack();
            resetAll();
            setVisibleToast(true);
          },
          onError: (error) => {
            console.error("Error creating event:", error);
          },
        }
      );
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const contextValue: CreateCallContextType = {
    step,
    setStep,
    resetAll,
    handleItemSelected,
    validateIsActive,
    validateIsActiveMusic,
    setEventID,
    setOldType,
    setMembersSelected,
    handleMusicSelected,
    membersData: Array.isArray(membersData) ? membersData : [],
    eventID,
    songsData,
    setSongsData: setSongsSelected,
    onSubmit: handleCreateEvent,
    isLoading: isPending,
    dataForm,
    setDataForm,
    visibleToast,
    setVisibleToast,
  };

  return (
    <CreateCallContext.Provider value={contextValue}>
      <FormProvider {...formValidator}>{children}</FormProvider>
    </CreateCallContext.Provider>
  );
};

export const useCreateCallContext = () => useContext(CreateCallContext);
