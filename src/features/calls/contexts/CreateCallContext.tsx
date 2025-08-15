import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { FormProvider } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useFormCreateCall from "../hooks/forms/useFormCreateCall";
import { useEventsQueries } from "../infra/queryAdapters/useEventsQueries";
import { FirebaseMembersRepository } from "@features/members/domain/repositories/FirebaseMembersRepository";
import { MembersUseCase } from "@features/members/domain/usecases/MembersUseCase";
import { IMember } from "@features/members/domain/entities/Member";
import { IEvent, IEventCard } from "../domain/entities/Events";
import { useAuthStore } from "@features/auth/presentation/stores/authStore";
import { formatDateToUS } from "@utils/date";
import { useNavigation } from "@react-navigation/native";
import { useDebounce } from "use-debounce";
import { Keyboard } from "react-native";
import { useSongsQueries } from "../infra/queryAdapters/useSongsQueries";
import { ISong } from "../domain/entities/Songs";
import { useToastStore } from "../stores/useToastStore";

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
  dataList: IMember[] | ISong[];
  validateIsActive: (id: string) => boolean;
  validateIsActiveMusic: (music: ISong) => boolean;
  setMembersSelected: React.Dispatch<React.SetStateAction<IMember[]>>;
  setSongsSelected: React.Dispatch<React.SetStateAction<ISong[]>>;
  resetAll: () => void;
  handleItemSelected: (item: IMember) => void;
  handleMusicSelected: (music: ISong) => void;
  handleMenuMusic: (item: ISong) => void;
  onSubmit: () => void;
  isLoading: boolean;
  dataForm: CreateCallFormData | undefined;
  setDataForm: React.Dispatch<
    React.SetStateAction<CreateCallFormData | undefined>
  >;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  visibleMenuMusic: boolean;
  setVisibleMenuMusic: React.Dispatch<React.SetStateAction<boolean>>;
  songPressed: ISong | null;
  setSongPressed: React.Dispatch<React.SetStateAction<ISong | null>>;
}

const CreateCallContext = createContext({} as CreateCallContextType);

export const CreateCallProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthStore();
  const { goBack } = useNavigation();
  const { createEventMutation } = useEventsQueries();
  const queryClient = useQueryClient();
  const { setMessage } = useToastStore();

  const [step, setStep] = useState(0);
  const [eventID, setEventID] = useState<string | null>(null);
  const [oldType, setOldType] = useState<string | null>(null);
  const [membersSelected, setMembersSelected] = useState<IMember[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 450);
  const [songsSelected, setSongsSelected] = useState<ISong[]>([]);
  const [visibleMenuMusic, setVisibleMenuMusic] = useState(false);
  const [songPressed, setSongPressed] = useState<ISong | null>(null);
  const [dataForm, setDataForm] = useState<CreateCallFormData | undefined>();

  const membersUseCase = new MembersUseCase(new FirebaseMembersRepository());
  const formValidator = useFormCreateCall();
  const { mutate, isPending } = createEventMutation;
  const { getSongsQuery } = useSongsQueries();

  const { data: songsData = [] } = getSongsQuery;

  const { data: membersData = [] } = useQuery({
    queryKey: ["members"],
    queryFn: () => membersUseCase.execute("getMembers"),
  });

  const generateDotKey = useCallback(
    (type: string, date: string, numberSearchDoc: string) =>
      `${type}-${date}-${numberSearchDoc}`,
    []
  );

  const handleItemSelected = useCallback((item: IMember) => {
    setMembersSelected((prev) => {
      const exists = prev.some((member) => member.id === item.id);
      return exists
        ? prev.filter((member) => member.id !== item.id)
        : [...prev, item];
    });
  }, []);

  const handleMusicSelected = useCallback((music: ISong) => {
    setSongsSelected((prev) => {
      const exists = prev.some((m) => m.id === music.id);
      return exists ? prev.filter((m) => m.id !== music.id) : [...prev, music];
    });
    Keyboard.dismiss();
  }, []);

  const validateIsActive = useCallback(
    (id: string) => membersSelected.some((m) => m.id === id),
    [membersSelected]
  );

  const validateIsActiveMusic = useCallback(
    (music: ISong) => {
      return songsSelected.some((m) => m.id === music.id);
    },
    [songsSelected]
  );

  const resetAll = useCallback(() => {
    setStep(0);
    formValidator.reset();
    setEventID(null);
    setOldType(null);
    setMembersSelected([]);
    setSongsSelected([]);
    setDataForm(undefined);
  }, []);

  const handleMissingComponents = useCallback(() => {
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
  }, [membersData, membersSelected]);

  const handleGetEventData = useCallback(() => {
    if (!dataForm) throw new Error("Form data is required");
    const numberRandom = Math.floor(Math.random() * 100);

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
  }, [
    dataForm,
    songsSelected,
    membersSelected,
    eventID,
    user,
    handleMissingComponents,
  ]);

  const handleCreateEvent = useCallback(() => {
    try {
      const { dataFormEvent, dataFormEventCard } = handleGetEventData();
      const isEdit = !!eventID;
      const message = isEdit
        ? "Chamada editada com sucesso!"
        : "Chamada criada com sucesso!";

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
            Promise.all([
              queryClient.invalidateQueries({ queryKey: ["events"] }),
              queryClient.invalidateQueries({ queryKey: ["dots"] }),
            ]);
            resetAll();
            goBack();

            setTimeout(() => setMessage(message), 250);
          },
          onError: (error) => {
            console.error("Error creating event:", error);
          },
        }
      );
    } catch (error) {
      console.error("Error creating event:", error);
    }
  }, [
    handleGetEventData,
    eventID,
    oldType,
    generateDotKey,
    mutate,
    queryClient,
    resetAll,
    goBack,
    setMessage,
  ]);

  const handleMenuMusic = useCallback((music: ISong) => {
    setSongPressed(music);
    setVisibleMenuMusic(true);
  }, []);

  const dataList = step === 2 ? songsData : membersData;

  const filteredDataList = useMemo(() => {
    if (!dataList || !Array.isArray(dataList)) return [];

    if (!debouncedSearchTerm?.trim()) return dataList;

    const searchTermLower = debouncedSearchTerm.toLowerCase();

    if (step === 2) {
      // Filter songs
      return (dataList as ISong[]).filter((item: ISong) =>
        item?.music?.toLowerCase().includes(searchTermLower)
      );
    } else {
      // Filter members
      return (dataList as IMember[]).filter((item: IMember) =>
        item?.name?.toLowerCase().includes(searchTermLower)
      );
    }
  }, [dataList, debouncedSearchTerm, step]);

  const contextValue: CreateCallContextType = useMemo(
    () => ({
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
      handleMenuMusic,
      dataList: filteredDataList,
      eventID,
      setSongsSelected,
      onSubmit: handleCreateEvent,
      isLoading: isPending,
      dataForm,
      setDataForm,
      searchTerm,
      setSearchTerm,
      visibleMenuMusic,
      setVisibleMenuMusic,
      songPressed,
      setSongPressed,
    }),
    [
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
      handleMenuMusic,
      filteredDataList,
      eventID,
      setSongsSelected,
      handleCreateEvent,
      isPending,
      dataForm,
      setDataForm,
      searchTerm,
      setSearchTerm,
      visibleMenuMusic,
      setVisibleMenuMusic,
      songPressed,
      setSongPressed,
    ]
  );

  return (
    <CreateCallContext.Provider value={contextValue}>
      <FormProvider {...formValidator}>{children}</FormProvider>
    </CreateCallContext.Provider>
  );
};

export const useCreateCallContext = () => useContext(CreateCallContext);
