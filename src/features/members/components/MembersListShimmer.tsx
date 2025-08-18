import * as RN from "react-native";
import React, { useMemo } from "react";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
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

interface MembersListShimmerProps {
  itemCount?: number;
}

const MembersListShimmer: React.FC<MembersListShimmerProps> = React.memo(
  ({ itemCount = 6 }) => {
    const containerStyle = useMemo(
      () => ({
        borderWidth: 1,
        borderColor: "#CCC",
        paddingVertical: 7,
        elevation: 4,
        gap: 20,
      }),
      []
    );

    const shimmerItems = useMemo(
      () =>
        Array.from({ length: itemCount }, (_, index) => (
          <RN.View
            key={index}
            style={containerStyle}
            className="px-5 bg-white rounded-2xl flex-row items-center"
          >
            <ShimmerRectangle
              width={14}
              height={44}
              borderRadius={30}
              style={{ backgroundColor: "#E5E7EB" }}
            />

            <RN.View className="gap-3.5 flex-row items-center">
              <ShimmerCircle size={50} />

              <RN.View className="gap-1">
                <ShimmerBar width={220} height={18} />

                <RN.View className="flex-row gap-1.5 items-center right-0.5">
                  <ShimmerCircle size={16} />
                  <ShimmerBar width={180} />
                </RN.View>
              </RN.View>
            </RN.View>
          </RN.View>
        )),
      [itemCount, containerStyle]
    );

    return (
      <RN.View className="gap-2.5 pb-16 px-6 mt-2">{shimmerItems}</RN.View>
    );
  }
);

MembersListShimmer.displayName = "MembersListShimmer";
ShimmerCircle.displayName = "ShimmerCircle";
ShimmerRectangle.displayName = "ShimmerRectangle";
ShimmerBar.displayName = "ShimmerBar";

export default MembersListShimmer;
