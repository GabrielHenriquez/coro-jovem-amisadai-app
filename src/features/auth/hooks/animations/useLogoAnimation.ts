import { useWindowDimensions } from "react-native";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedReaction,
  runOnJS,
} from "react-native-reanimated";
import { useState, useMemo } from "react";

const useLogoAnimation = () => {
  const { height } = useWindowDimensions();
  const screenHeight = useMemo(() => height, [height]);

  const translateY = useSharedValue(-450);
  const opacity = useSharedValue(0);
  const size = useSharedValue(320);
  const Aheight = useSharedValue(0.4);
  const showRegisterView = useSharedValue(false);

  const [showRegisterViewReact, setShowRegisterViewReact] = useState(false);

  useAnimatedReaction(
    () => showRegisterView.value,
    (current, prev) => {
      if (current !== prev) {
        runOnJS(setShowRegisterViewReact)(current);
      }
    }
  );

  const timingConfig = {
    duration: 1250,
    easing: Easing.out(Easing.exp),
  };

  const animatedCollpaseHeightLogo = () => {
    if (Aheight.value !== 0.12) {
      Aheight.value = withTiming(0.14, timingConfig);
      size.value = withTiming(150, { duration: 750 });
      showRegisterView.value = true;
    }
  };

  const animatedExpandableHeightLogo = () => {
    if (Aheight.value !== 0.4) {
      Aheight.value = withTiming(0.4, timingConfig);
      size.value = withTiming(320, { duration: 750 });
      showRegisterView.value = false;
    }
  };

  const applyAnimationDownLogo = () => {
    translateY.value = withTiming(0, {
      duration: 1450,
      easing: Easing.out(Easing.exp),
    });
    opacity.value = withTiming(1, { duration: 1200 });
  };

  const heightAnimatedStyle = useAnimatedStyle(() => ({
    height: screenHeight * Aheight.value,
  }));

  const sizeLogoAnimatedStyle = useAnimatedStyle(() => ({
    width: size.value,
    height: size.value,
  }));

  const logoDownanimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return {
    animatedExpandableHeightLogo,
    animatedCollpaseHeightLogo,
    applyAnimationDownLogo,
    heightAnimatedStyle,
    logoDownanimatedStyle,
    sizeLogoAnimatedStyle,
    showRegisterView: showRegisterViewReact,
  };
};

export default useLogoAnimation;
