import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import Animated from "react-native-reanimated";
import StatusBar from "@components/StatusBar";
import { useLogoAnimation } from "../hooks";
import { AnimatedContainer, AnimatedLogo } from "../components";
import { LoginContent, RegisterContent } from "@features/auth/presentation/contents";
import * as RN from "react-native";
import AnimatedContent from "../components/AnimatedContent";

const AuthSPAScreen = () => {
  const {
    showRegisterView,
    heightAnimatedStyle,
    animatedCollpaseHeightLogo,
    logoDownanimatedStyle,
    sizeLogoAnimatedStyle,
    applyAnimationDownLogo,
    animatedExpandableHeightLogo,
  } = useLogoAnimation();

  return (
    <RN.View className="flex-1 bg-primary">
      <StatusBar backgroundColor="primary" barStyle={"light-content"} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={"height"}
        keyboardVerticalOffset={0}
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
              <RN.View style={{ position: "relative", height: "100%" }}>
                <AnimatedContent visible={!showRegisterView}>
                  <LoginContent collapseLogoFn={animatedCollpaseHeightLogo} />
                </AnimatedContent>

                <AnimatedContent visible={showRegisterView}>
                  <RegisterContent
                    collapseLogoFn={animatedExpandableHeightLogo}
                  />
                </AnimatedContent>
              </RN.View>
            </AnimatedContainer>
          </RN.ScrollView>
        </RN.TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </RN.View>
  );
};

export default AuthSPAScreen;
