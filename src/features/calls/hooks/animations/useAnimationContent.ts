import useCreateCallContext from "@features/calls/contexts/CreateCallContext";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

const useAnimationContent = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;
  const { step } = useCreateCallContext();

  function animateContent() {
    fadeAnim.setValue(0);
    translateAnim.setValue(300);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }

  useEffect(() => animateContent(), [step]);

  const animatedContentStyles = {
    opacity: fadeAnim,
    transform: [{ translateY: translateAnim }],
  };

  return { animatedContentStyles };
};

export default useAnimationContent;
