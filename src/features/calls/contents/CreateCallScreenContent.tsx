import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { colors } from "@styles/colors";
import CreateCallFormContent from "./CreateCallFormContent";
import { useCallback, useMemo, useState } from "react";
import {
  Button,
  Header,
  Input,
  Modal,
  SearchInput,
  Spacer,
  Text,
} from "@components/index";
import {
  SongsList,
  MembersList,
  BottomNavigation,
  StepIndicators,
} from "../components";
import * as RN from "react-native";
import Toast from "@components/Toast/view";
import { useCreateCallContext } from "../contexts/CreateCallContext";
import { IEvent } from "../domain/entities/Events";
import { Music4, Pen, Trash2 } from "lucide-react-native";
import responsiveSize from "@utils/responsiveSize";
import { getHeight } from "@utils/index";
import useFormSong from "../hooks/forms/useFormSong";
import { useSongsQueries } from "../infra/queryAdapters/useSongsQueries";
import { useQueryClient } from "@tanstack/react-query";
import { ISong } from "../domain/entities/Songs";

// Constants
const TOAST_DELAY = 350;
const MODAL_DELAY = 450;
const BUTTON_HEIGHT = getHeight * 0.046;

const CreateCallScreenContent = ({ eventData }: { eventData: IEvent }) => {
  const { goBack } = useNavigation();
  const { createSongMutation, deleteSongMutation } = useSongsQueries();
  const queryClient = useQueryClient();

  // Local state
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleToast, setVisibleToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Context state
  const {
    resetAll,
    step,
    searchTerm,
    setSearchTerm,
    visibleMenuMusic,
    setVisibleMenuMusic,
    songPressed,
    setSongPressed,
  } = useCreateCallContext();

  // Form hooks
  const { control, handleSubmit, errors, resetForm, handleSetValue } =
    useFormSong();

  // Reset on focus - use empty dependency array to prevent infinite loops
  useFocusEffect(useCallback(() => resetAll(), []));

  // Memoized values
  const isEditMode = Boolean(songPressed);
  const modalTitle = isEditMode ? "Editar música" : "Adicionar música";
  const modalSubtitle = isEditMode
    ? "Preencha o campo abaixo com o nome da música que você deseja editar."
    : "Preencha o campo abaixo com o nome da música que você deseja adicionar.";
  const buttonText = isEditMode ? "Editar" : "Adicionar";

  // Memoized step content
  const stepContent = useMemo(() => {
    switch (step) {
      case 0:
        return <CreateCallFormContent eventData={eventData} />;
      case 1:
        return <MembersList />;
      case 2:
        return <SongsList />;
      default:
        return null;
    }
  }, [step, eventData]);

  // Memoized handlers
  const handleAddSong = useCallback(() => setVisibleModal(true), []);

  const handleEditSong = useCallback(() => {
    if (songPressed?.music) {
      handleSetValue(songPressed.music);
      setVisibleMenuMusic(false);
      setTimeout(() => setVisibleModal(true), MODAL_DELAY);
    }
  }, [songPressed?.music, handleSetValue, setVisibleMenuMusic]);

  const generateId = useCallback(
    () => Math.random().toString(36).substring(2, 9),
    []
  );

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setTimeout(() => setVisibleToast(true), TOAST_DELAY);
  }, []);

  const handleSuccess = useCallback(
    (message: string) => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
      setVisibleModal(false);
      resetForm();
      setSongPressed(null);
      showToast(message);
    },
    [queryClient, resetForm, setSongPressed, showToast]
  );

  const onSubmit = useCallback(
    (data: { song: string }) => {
      RN.Keyboard.dismiss();

      const dataSong: ISong = songPressed
        ? { id: songPressed.id, music: data.song }
        : { id: generateId(), music: data.song };

      createSongMutation.mutate(dataSong, {
        onSuccess: () => {
          const message = isEditMode
            ? "Música editada com sucesso!"
            : "Música adicionada com sucesso!";
          handleSuccess(message);
        },
        onError: (error) => {
          console.error("Error creating song:", error);
        },
      });
    },
    [songPressed, generateId, createSongMutation, isEditMode, handleSuccess]
  );

  const handleDeleteSong = useCallback(() => {
    if (songPressed?.id) {
      deleteSongMutation.mutate(songPressed.id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["songs"] });
          setVisibleMenuMusic(false);
          setSongPressed(null);
          showToast("Música excluída com sucesso!");
        },
        onError: (error) => {
          console.error("Error deleting song:", error);
        },
      });
    }
  }, [
    songPressed?.id,
    deleteSongMutation,
    queryClient,
    setVisibleMenuMusic,
    setSongPressed,
    showToast,
  ]);

  const handleCloseModal = useCallback(() => {
    setVisibleModal(false);
    setSongPressed(null);
    resetForm();
  }, [setSongPressed, resetForm]);

  const handleCloseMenuMusic = useCallback(() => {
    setVisibleMenuMusic(false);
    setSongPressed(null);
  }, [setVisibleMenuMusic, setSongPressed]);

  return (
    <RN.View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        title={eventData ? "Editar chamada" : "Criar chamada"}
        onPressBack={goBack}
        bgColor="primary"
        color="white"
      />

      <StepIndicators />

      {step !== 0 && (
        <RN.View className="px-7">
          <RN.View className="flex-row w-full items-center mt-5 justify-between gap-3">
            <>
              <SearchInput
                styleRest={{
                  maxWidth: step === 1 ? "100%" : "83%",
                }}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              {step === 2 && (
                <RN.TouchableOpacity
                  style={{ height: responsiveSize(42), flex: 1 }}
                  className="flex-row items-center justify-center bg-primary rounded-lg"
                  onPress={handleAddSong}
                >
                  <RN.Image
                    source={require("@assets/icons/add-song.png")}
                    style={{ width: 28, height: 28 }}
                  />
                </RN.TouchableOpacity>
              )}
            </>
          </RN.View>
        </RN.View>
      )}

      <RN.View className="flex-1 mt-6 mb-11 px-6">{stepContent}</RN.View>

      <BottomNavigation />

      <Modal.Root>
        <Modal.Content visible={visibleModal}>
          <Modal.AreaCloseModal onClose={handleCloseModal} />
          <Spacer height={14} />

          <RN.View className="flex-row items-center gap-2">
            <Modal.Title>{modalTitle}</Modal.Title>
            <Music4 color={colors.primary} strokeWidth={2.5} />
          </RN.View>

          <Text
            size={14}
            className="font-poppinsMedium text-grayDark text-center"
            style={{ maxWidth: "90%" }}
          >
            {modalSubtitle}
          </Text>

          <Input.Root>
            <Input.Content
              icon={<Music4 size={20} strokeWidth={2.5} color={"#FFFFFF"} />}
              errors={errors.song!}
              size={0.044}
            >
              <Input.TextInput
                name="song"
                control={control}
                placeholder="Nome da música"
                autoCapitalize="words"
                autoFocus={true}
              />
            </Input.Content>
          </Input.Root>

          <Button
            styleRest={{ height: BUTTON_HEIGHT, marginTop: 4 }}
            onPress={handleSubmit(onSubmit)}
            activeLoading={createSongMutation.isPending}
          >
            <Text size={16} className="font-poppinsSemiBold text-white">
              {buttonText}
            </Text>
          </Button>
        </Modal.Content>
      </Modal.Root>

      <Modal.Root>
        <Modal.Content visible={visibleMenuMusic}>
          <Modal.AreaCloseModal onClose={handleCloseMenuMusic} />
          <Spacer height={14} />

          <RN.View className="flex-row items-center gap-3">
            <Music4 color={colors.primary} strokeWidth={2.5} />
            <Text
              style={{ maxWidth: "90%" }}
              numberOfLines={1}
              size={20}
              className="font-poppinsSemiBold"
            >
              {songPressed?.music}
            </Text>
          </RN.View>

          <Button
            bgColor="primary"
            styleRest={{ height: BUTTON_HEIGHT, marginTop: 4 }}
            onPress={handleEditSong}
          >
            <Pen size={18} color={colors.white} strokeWidth={2.5} />
            <Text className="font-poppinsSemiBold text-white">
              Editar música
            </Text>
          </Button>

          <Button
            bgColor="redDark"
            styleRest={{ height: BUTTON_HEIGHT }}
            onPress={handleDeleteSong}
            activeLoading={deleteSongMutation.isPending}
          >
            <Trash2 size={18} color={colors.white} strokeWidth={2.5} />
            <Text className="font-poppinsSemiBold text-white">
              Excluir música
            </Text>
          </Button>
        </Modal.Content>
      </Modal.Root>

      <Toast
        message={toastMessage}
        onHide={() => setVisibleToast(false)}
        visible={visibleToast}
      />
    </RN.View>
  );
};

export default CreateCallScreenContent;
