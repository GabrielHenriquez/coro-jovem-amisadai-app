import StatusBar from "@components/StatusBar";
import AnimatedLogo from "../SPA/components/animatedLogo";
import AnimatedContainer from "./components/animatedContainer";
import LoginView from "./contents/Login/view";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import * as RN from "react-native";
import RegisterView from "./contents/Register/view";
import Animated from "react-native-reanimated";

import useLogoAnimation from "./hooks/animations/useLogoAnimation";

const SPA = () => {
  const {
    showRegisterView,
    heightAnimatedStyle,
    animatedCollpaseHeightLogo,
    logoDownanimatedStyle,
    sizeLogoAnimatedStyle,
    applyAnimationDownLogo,
    animatedExpandableHeightLogo,
  } = useLogoAnimation();

  const isIos = RN.Platform.OS === "ios";

  return (
    <RN.View className="flex-1 bg-primary">
      <StatusBar backgroundColor="primary" barStyle={"light-content"} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={isIos ? "padding" : "height"}
        keyboardVerticalOffset={isIos ? 100 : 0}
      >
        <RN.TouchableWithoutFeedback onPress={RN.Keyboard.dismiss}>
          <RN.ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View
              style={[heightAnimatedStyle]}
              className="items-center justify-center"
            >
              <AnimatedLogo
                logoDownanimatedStyle={logoDownanimatedStyle}
                sizeLogoAnimatedStyle={sizeLogoAnimatedStyle}
                applyAnimationDownLogo={applyAnimationDownLogo}
              />
            </Animated.View>

            <AnimatedContainer>
              {!showRegisterView ? (
                <LoginView collapseLogoFn={animatedCollpaseHeightLogo} />
              ) : (
                <RegisterView collapseLogoFn={animatedExpandableHeightLogo} />
              )}
            </AnimatedContainer>
          </RN.ScrollView>
        </RN.TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </RN.View>
  );
};

export default SPA;
