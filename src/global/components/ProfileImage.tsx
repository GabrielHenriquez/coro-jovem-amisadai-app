import { colors } from "@styles/colors";
import { Image, View } from "react-native";
import { getInitials } from "@utils/strings";
import Text from "./Text";

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
    return <Image source={{ uri: data.uri }} style={imageStyle} />;
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
        className="font-poppinsBold text-primary"
        size={size > 52 ? 34 : 24}
      >
        {getInitials(data?.name || "")}
      </Text>
    </View>
  );
};

export default ProfileImage;
