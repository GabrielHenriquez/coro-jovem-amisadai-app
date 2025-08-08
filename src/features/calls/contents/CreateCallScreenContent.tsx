import useAnimationContent from "../hooks/animations/useAnimationContent";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { colors } from "@styles/colors";
import height from "@utils/getHeight";
import CreateCallFormContent from "./CreateCallFormContent";
import { CheckLogo } from "@assets/images/modal";
import { useCallback } from "react";
import { Button, Header, Modal, Text } from "@components/index";
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

const CreateCallScreenContent = ({ eventData }: { eventData: IEvent }) => {
  const { goBack } = useNavigation();
  const { resetAll, step, visibleToast, setVisibleToast } =
    useCreateCallContext();
  const { animatedContentStyles } = useAnimationContent();
  useFocusEffect(useCallback(() => resetAll(), []));

  const renderStepContent = () => {
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
  };

  return (
    <RN.View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        title={eventData ? "Editar chamada" : "Criar chamada"}
        onPressBack={goBack}
        bgColor="primary"
        color="white"
      />

      <StepIndicators />

      <RN.Animated.View
        className="flex-1 mt-6 mb-11 px-6"
        style={animatedContentStyles}
      >
        {renderStepContent()}
      </RN.Animated.View>

      <BottomNavigation />

      <Toast
        message="Chamada criada com sucesso!"
        onHide={() => setVisibleToast(false)}
        visible={visibleToast}
      />
    </RN.View>
  );
};

export default CreateCallScreenContent;
