import { View, TouchableOpacity } from "react-native";
import { colors } from "@styles/colors";
import Text from "@components/Text";
import { Music4 } from "lucide-react-native";

const SongCard = () => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#CCC",
        backgroundColor: 3 === 3 ? "#7b8d75" : colors.white,
      }}
      className="px-4 rounded-2xl flex-row items-center"
    >
      <View className="gap-4 flex-row items-center">
        <Music4
          color={3 === 3 ? colors.white : colors.primary}
          strokeWidth={2.5}
        />

        <View className="flex-1 gap-1.5">
          <Text
            size={17}
            className={`font-poppinsSemiBold leading-none ${
              3 === 3 ? "text-white" : "text-primary"
            }`}
          >
            ETERNO REI
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SongCard;
