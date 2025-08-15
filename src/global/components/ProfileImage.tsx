import { colors } from "@styles/colors";
import { Image, View } from "react-native";
import { getInitials } from "@utils/strings";
import Text from "./Text";
import FastImage from "react-native-fast-image";

const ProfileImage: React.FC<{
  data: { name: string; uri: string | undefined };
  size: number;
}> = ({ data, size }) => {
  const imageStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: 1.5,
    borderColor: colors.gray,
  };

  if (data?.uri) {
    return (
      <FastImage
        style={imageStyle}
        source={{
          uri: data.uri,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    );
  }

  return (
    <View
      style={{
        ...imageStyle,
        backgroundColor: colors.greenLight,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        className="font-poppinsSemiBold text-primary"
        size={size > 52 ? 34 : 20}
      >
        {getInitials(data?.name || "")}
      </Text>
    </View>
  );
};

export default ProfileImage;
