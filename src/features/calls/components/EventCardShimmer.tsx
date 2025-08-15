import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const EventCardShimmer = () => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#CCC",
        elevation: 3,
        gap: 18,
      }}
      className="flex-row items-center mt-3 py-2.5 px-4 bg-white rounded-xl"
    >
      <ShimmerPlaceholder
        stopAutoRun
        style={{
          borderRadius: 30,
          width: 16.5,
          height: 48,
        }}
      />
      <View className=" w-full gap-1.5">
        <ShimmerPlaceholder
          stopAutoRun
          style={{
            width: "80%",
            height: 18,
            borderRadius: 4,
          }}
        />
        <View style={{ gap: 8, flexDirection: "row", alignItems: "center" }}>
          <ShimmerPlaceholder
            stopAutoRun
            style={{
              width: 16,
              height: 16,
              borderRadius: 16 / 2,
            }}
          />
          <ShimmerPlaceholder
            stopAutoRun
            style={{
              width: 180,
              height: 16,
              borderRadius: 4,
            }}
          />
        </View>
        <View style={{ gap: 8, flexDirection: "row", alignItems: "center" }}>
          <ShimmerPlaceholder
            stopAutoRun
            style={{
              width: 16,
              height: 16,
              borderRadius: 16 / 2,
            }}
          />
          <ShimmerPlaceholder
            stopAutoRun
            style={{
              width: 120,
              height: 16,
              borderRadius: 4,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export const BirthDateShimmer = () => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#CCC",
        elevation: 3,
      }}
      className="px-4 py-2 bg-white rounded-xl gap-5 flex-row items-center overflow-hidden"
    >
      <ShimmerPlaceholder
        stopAutoRun
        style={{
          borderRadius: 30,
          width: 15,
          height: 44,
        }}
      />
      <View className="flex-row items-center gap-3">
        <ShimmerPlaceholder
          stopAutoRun
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
          }}
        />
        <View className="gap-1">
          <ShimmerPlaceholder
            stopAutoRun
            style={{
              width: 200,
              height: 20,
              borderRadius: 4,
            }}
          />
          <ShimmerPlaceholder
            stopAutoRun
            style={{
              width: 96,
              height: 16,
              borderRadius: 4,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default EventCardShimmer;
