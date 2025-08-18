import * as RN from "react-native";
import * as Icons from "lucide-react-native";
import { UploadProfilePhoto } from "@assets/images";

interface ProfileImageSectionProps {
  profileImage: string;
  onPress: () => void;
}

export const ProfileImageSection: React.FC<ProfileImageSectionProps> = ({
  profileImage,
  onPress,
}) => (
  <RN.TouchableOpacity
    className="w-32 h-32 self-center mt-10"
    onPress={onPress}
  >
    <RN.View
      style={{
        borderRadius: profileImage ? 72 : 0,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {!profileImage ? (
        <RN.Image
          source={UploadProfilePhoto as RN.ImageSourcePropType}
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
        />
      ) : (
        <RN.Image
          source={{ uri: profileImage }}
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
        />
      )}

      {profileImage && (
        <RN.View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 40,
            backgroundColor: "#ffffff42",
            justifyContent: "center",
            alignItems: "center",
            borderBottomLeftRadius: 72,
            borderBottomRightRadius: 72,
          }}
        >
          <Icons.Camera color={"#ffffff"} />
        </RN.View>
      )}
    </RN.View>
  </RN.TouchableOpacity>
);
