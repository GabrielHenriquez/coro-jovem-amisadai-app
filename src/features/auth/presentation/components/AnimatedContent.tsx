import Animated from "react-native-reanimated";

const AnimatedContent = ({
  visible,
  children,
}: {
  visible: boolean;
  children: React.ReactNode;
}) => (
  <Animated.View
    style={{
      position: "absolute",
      opacity: visible ? 1 : 0,
      zIndex: visible ? 1 : 0,
      width: "100%",
      height: "100%",
    }}
  >
    {children}
  </Animated.View>
);

export default AnimatedContent;
