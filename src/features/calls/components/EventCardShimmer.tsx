import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import React, { useMemo } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ShimmerCircle = React.memo(
  ({ size, style }: { size: number; style?: any }) => {
    const circleStyle = useMemo(
      () => [
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ],
      [size, style]
    );

    return <ShimmerPlaceholder style={circleStyle} />;
  }
);

const ShimmerRectangle = React.memo(
  ({
    width,
    height,
    borderRadius = 4,
    style,
  }: {
    width: number | string;
    height: number;
    borderRadius?: number;
    style?: any;
  }) => {
    const rectangleStyle = useMemo(
      () => [
        {
          width,
          height,
          borderRadius,
        },
        style,
      ],
      [width, height, borderRadius, style]
    );

    return <ShimmerPlaceholder style={rectangleStyle} />;
  }
);

const ShimmerBar = React.memo(
  ({
    width,
    height = 16,
    style,
  }: {
    width: number | string;
    height?: number;
    style?: any;
  }) => <ShimmerRectangle width={width} height={height} style={style} />
);

const commonContainerStyle = {
  borderWidth: 1,
  borderColor: "#CCC",
  elevation: 3,
};

const EventCardShimmer = React.memo(() => {
  const containerStyle = useMemo(() => [commonContainerStyle, { gap: 18 }], []);

  const rowStyle = useMemo(
    () => ({
      gap: 8,
      flexDirection: "row" as const,
      alignItems: "center" as const,
    }),
    []
  );

  return (
    <View
      style={containerStyle}
      className="flex-row items-center py-2.5 px-4 bg-white rounded-xl"
    >
      <ShimmerRectangle width={16.5} height={48} borderRadius={30} />

      <View className="w-full gap-1.5">
        <ShimmerBar width="80%" height={18} />

        <View style={rowStyle}>
          <ShimmerCircle size={16} />
          <ShimmerBar width={180} />
        </View>

        <View style={rowStyle}>
          <ShimmerCircle size={16} />
          <ShimmerBar width={120} />
        </View>
      </View>
    </View>
  );
});

export const BirthDateShimmer = React.memo(() => {
  const rowStyle = useMemo(
    () => ({
      gap: 8,
      flexDirection: "row" as const,
      alignItems: "center" as const,
    }),
    []
  );

  return (
    <View
      style={commonContainerStyle}
      className="px-4 py-2 bg-white rounded-xl gap-5 flex-row items-center overflow-hidden"
    >
      <ShimmerRectangle width={15} height={44} borderRadius={30} />

      <View style={rowStyle} className="gap-3">
        <ShimmerCircle size={44} />

        <View className="gap-1">
          <ShimmerBar width={240} height={20} />
          <ShimmerBar width={96} />
        </View>
      </View>
    </View>
  );
});

EventCardShimmer.displayName = "EventCardShimmer";
BirthDateShimmer.displayName = "BirthDateShimmer";
ShimmerCircle.displayName = "ShimmerCircle";
ShimmerRectangle.displayName = "ShimmerRectangle";
ShimmerBar.displayName = "ShimmerBar";

export default EventCardShimmer;
