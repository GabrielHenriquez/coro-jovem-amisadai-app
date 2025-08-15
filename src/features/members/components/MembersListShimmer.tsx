import * as RN from "react-native";
import ShimmerElement from "./ShimmerElement";

interface MembersListShimmerProps {
  itemCount?: number;
}

const MembersListShimmer: React.FC<MembersListShimmerProps> = ({
  itemCount = 6,
}) => {
  const shimmerItems = Array.from({ length: itemCount }, (_, index) => (
    <RN.View
      key={index}
      style={{
        borderWidth: 1,
        borderColor: "#CCC",
        paddingVertical: 7,
        elevation: 4,
        gap: 20,
      }}
      className="px-5 bg-white rounded-2xl flex-row items-center"
    >
      <RN.View
        style={{
          borderRadius: 30,
          width: 14,
          backgroundColor: "#E5E7EB",
        }}
        className="h-11"
      />

      <RN.View className="gap-3.5 flex-row items-center">
        <ShimmerElement width={50} height={50} borderRadius={25} />

        <RN.View className="gap-1">
          <ShimmerElement width={170} height={18} />

          <RN.View className="flex-row gap-1.5 items-center right-0.5">
            <ShimmerElement width={16} height={16} borderRadius={8} />
            <ShimmerElement width={180} height={16} />
          </RN.View>
        </RN.View>
      </RN.View>
    </RN.View>
  ));

  return <RN.View className="gap-2.5 pb-16 px-6 mt-2">{shimmerItems}</RN.View>;
};

export default MembersListShimmer;
