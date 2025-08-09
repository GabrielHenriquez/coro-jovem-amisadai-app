import * as RNReanimated from "react-native-reanimated";
import { useEffect } from "react";
import { IToastViewModel } from "./model";

const useToastViewModel = ({ visible, onHide }: IToastViewModel) => {
  const translateY = RNReanimated.useSharedValue(100);
  const animatedStyle = RNReanimated.useAnimatedStyle(() => ({
    transform: [
      {
        translateY: RNReanimated.withTiming(translateY.value, {
          duration: 500,
        }),
      },
    ],
    opacity: RNReanimated.withTiming(visible ? 1 : 0, { duration: 500 }),
  }));

  function applyAnimation() {
    if (visible) translateY.value = -5;
    setTimeout(() => {
      onHide();
      translateY.value = -100;
    }, 2500);
  }

  useEffect(() => {
    applyAnimation();
  }, [visible]);

  return { animatedStyle };
};

export default useToastViewModel;
