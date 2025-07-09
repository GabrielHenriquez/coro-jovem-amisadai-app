import React, { useEffect } from "react";
import Animated from "react-native-reanimated";
import Logo from "@assets/images/logo.svg";

const AnimatedLogo = ({
  logoDownanimatedStyle,
  sizeLogoAnimatedStyle,
  applyAnimationDownLogo,
}: any) => {
  useEffect(() => applyAnimationDownLogo(), []);
  return (
    <Animated.View style={[logoDownanimatedStyle, sizeLogoAnimatedStyle]}>
      <Logo width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />
    </Animated.View>
  );
};

export default AnimatedLogo;
