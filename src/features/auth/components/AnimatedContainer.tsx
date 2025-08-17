import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const AnimatedContainer = ({ children }: { children: React.ReactNode }) => {
  const translateY = useSharedValue(500);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, {
      duration: 1450,
      easing: Easing.out(Easing.exp),
    });
    opacity.value = withTiming(1, { duration: 650 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, { flex: 1 }]}>
      {children}
    </Animated.View>
  );
};

export default AnimatedContainer;
