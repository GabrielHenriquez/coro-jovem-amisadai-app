import { View, TouchableOpacity } from "react-native";
import { colors } from "@styles/colors";
import Text from "@components/Text";
import { Music4 } from "lucide-react-native";
import { useCreateCallContext } from "../contexts/CreateCallContext";

const SongCard = ({ item }: { item: string }) => {
  const { validateIsActiveMusic, handleMusicSelected } = useCreateCallContext();
  const isSelected = validateIsActiveMusic(item);

  return (
    <TouchableOpacity
      style={{
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#CCC",
        backgroundColor: isSelected ? "#7f917c" : colors.white,
      }}
      className="px-4 rounded-2xl flex-row items-center"
      onPress={() => handleMusicSelected(item)}
    >
      <View className="gap-4 flex-row items-center">
        <Music4
          color={isSelected ? colors.white : colors.primary}
          strokeWidth={2.5}
        />

        <View className="flex-1 gap-1.5">
          <Text
            size={17}
            className={`font-poppinsSemiBold leading-none ${
              isSelected ? "text-white" : "text-primary"
            }`}
          >
            {item}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SongCard;
