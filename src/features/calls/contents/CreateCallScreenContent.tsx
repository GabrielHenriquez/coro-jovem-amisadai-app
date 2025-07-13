import useAnimationContent from "../hooks/animations/useAnimationContent";
import useCreateCallContext from "../contexts/CreateCallContext";
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

const CreateCallScreenContent = () => {
  const { goBack } = useNavigation();
  const { resetAll, step, membersData } = useCreateCallContext();
  const { animatedContentStyles } = useAnimationContent();
  useFocusEffect(useCallback(() => resetAll(), []));

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <CreateCallFormContent />;
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
        title="Criar chamada"
        onPressBack={goBack}
        bgColor="primary"
        color="white"
      />

      <StepIndicators />

      <RN.Animated.View
        className="flex-1 mt-8 mb-11 px-6"
        style={animatedContentStyles}
      >
        {renderStepContent()}
      </RN.Animated.View>

      <BottomNavigation />

      <Modal.Root>
        <Modal.Content visible={false}>
          <Modal.Logo>
            <CheckLogo width={100} />
          </Modal.Logo>

          <Modal.Title>Chamada criada com sucesso!</Modal.Title>

          <Button styleRest={{ marginTop: 10, height: height * 0.047 }}>
            <Text className="font-poppinsSemiBold text-white">Continuar</Text>
          </Button>
        </Modal.Content>
      </Modal.Root>
    </RN.View>
  );
};

export default CreateCallScreenContent;
