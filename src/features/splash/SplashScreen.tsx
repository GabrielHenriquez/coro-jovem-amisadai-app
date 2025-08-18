import { Animated, View } from "react-native";
import React, { useEffect, useRef } from "react";
import Logo from "@assets/images/logo.svg";

const SplashScreen = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <View className="flex-1 bg-primary justify-center items-center">
      <Animated.View style={{ opacity }}>
        <Logo width={280} height={280} />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
