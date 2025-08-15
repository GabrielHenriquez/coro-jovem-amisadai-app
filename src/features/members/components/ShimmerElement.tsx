import * as RN from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ShimmerElementProps {
  width: number;
  height: number;
  borderRadius?: number;
}

const ShimmerElement: React.FC<ShimmerElementProps> = ({
  width,
  height,
  borderRadius = 4,
}) => {
  return (
    <RN.View
      style={{
        width,
        height,
        backgroundColor: "#E5E7EB",
        borderRadius,
        overflow: "hidden",
      }}
    >
      <LinearGradient
        colors={["#E5E7EB", "#F3F4F6", "#E5E7EB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      />
    </RN.View>
  );
};

export default ShimmerElement;
