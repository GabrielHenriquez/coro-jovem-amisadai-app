import { colors } from "@styles/colors";
import { Image, View } from "react-native";
import { getInitials } from "@utils/strings";
import { IMember } from "@features/members/domain/entities/Member";
import Text from "./Text";

const ProfileImage: React.FC<{ member: IMember; size: number }> = ({
  member,
  size,
}) => {
  const imageStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: 1.5,
    borderColor: colors.gray,
  };

  if (member?.profileImageUri) {
    return (
      <Image source={{ uri: member.profileImageUri }} style={imageStyle} />
    );
  }

  return (
    <View
      style={{
        ...imageStyle,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="font-poppinsSemiBold text-white" size={size > 52 ? 34 : 24}>
        {getInitials(member?.name || "")}
      </Text>
    </View>
  );
};

export default ProfileImage;
