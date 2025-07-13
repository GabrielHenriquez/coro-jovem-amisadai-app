import Text from "@components/Text";
import { colors } from "@styles/colors";
import React, { useEffect, useRef } from "react";
import { View, Animated, ViewStyle } from "react-native";
import useCreateCallContext from "../contexts/CreateCallContext";

const sharedStyle: ViewStyle = {
  height: 10,
  flex: 1,
  borderRadius: 50,
  marginHorizontal: 4,
};

const StepIndicators = () => {
  const { step: currentStep } = useCreateCallContext();
  const indicators = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    indicators.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: index === currentStep ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });
  }, [currentStep]);

  const getLabel: Record<number, string> = {
    0: "Preencha o formulário",
    1: "Componentes presentes",
    2: "Músicas cantadas",
  };

  return (
    <View
      style={{ borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}
      className=" bg-primary pt-2 pb-7"
    >
      <Text
        style={{ color: colors.background }}
        size={22}
        className="font-poppinsBold text-center "
      >
        Passo {currentStep + 1}: {getLabel[currentStep]}
      </Text>

      <View className="flex-row mt-5 px-10">
        {indicators.map((anim, index) => {
          const backgroundColor = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [colors.background, "#f76845"],
          });

          const width = anim.interpolate({
            inputRange: [0, 1],
            outputRange: ["33%", "100%"],
          });

          return (
            <Animated.View
              key={index}
              style={[sharedStyle, { backgroundColor, width }]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default StepIndicators;
