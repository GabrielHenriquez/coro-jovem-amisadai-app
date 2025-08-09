import { colors } from "@styles/colors";
import { ArrowUp } from "lucide-react-native";
import * as RN from "react-native";

// Constants
const SCROLL_TO_TOP_BUTTON_SIZE = 42; // Size of the scroll to top button
const SCROLL_TO_TOP_BUTTON_RADIUS = 14; // Border radius of the scroll to top button

// Types
interface ScrollToTopButtonProps {
  onPress: () => void;
}

// Components
/**
 * Scroll to top button component that appears when user scrolls down
 */
export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  onPress,
}) => (
  <RN.TouchableOpacity
    style={{
      position: "absolute",
      bottom: 15,
      right: 20,
      width: SCROLL_TO_TOP_BUTTON_SIZE,
      height: SCROLL_TO_TOP_BUTTON_SIZE,
      backgroundColor: colors.primary,
      borderRadius: SCROLL_TO_TOP_BUTTON_RADIUS,
      justifyContent: "center",
      alignItems: "center",
      elevation: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      zIndex: 1000,
    }}
    onPress={onPress}
  >
    <ArrowUp size={24} color={colors.white} />
  </RN.TouchableOpacity>
);

export default ScrollToTopButton;
