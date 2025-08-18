import { useState } from "react";
import { Modal, Button, Text } from "@components/index";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { colors } from "@styles/colors";
import { LogOut, FileText } from "lucide-react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useAuthStore } from "@features/auth/stores/authStore";
import ProfileImage from "@components/ProfileImage";
import * as RN from "react-native";

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  const [showModal, setShowModal] = useState(false);
  const { user, logout } = useAuthStore();

  const handleReportsPress = () => {
    props.navigation.navigate("Reports" as never);
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        paddingTop: RN.StatusBar.currentHeight! + 30,
      }}
      className="bg-white"
    >
      <RN.View className="px-4 mt-8">
        <RN.View className="items-center gap-4">
          <ProfileImage data={{ name: user?.name!, uri: "" }} size={84} />

          <RN.View className="gap-1 items-center">
            <Text size={18} className="font-poppinsSemiBold">
              {user?.name}
            </Text>

            <Text className="font-poppinsMedium text-gray">{user?.office}</Text>
          </RN.View>
        </RN.View>

        <RN.View style={{ gap: 15, marginTop: 20 }}>
          <Button
            bgColor="primary"
            styleRest={{ height: 38 }}
            onPress={handleReportsPress}
          >
            <Text size={16} className="text-white font-poppinsSemiBold">
              Relatórios
            </Text>

            <FileText size={20} color={colors.white} />
          </Button>

          <Button
            bgColor="redDark"
            styleRest={{ height: 38 }}
            onPress={() => setShowModal(true)}
          >
            <Text size={16} className="text-white font-poppinsSemiBold">
              Sair
            </Text>

            <LogOut size={20} color={colors.white} />
          </Button>
        </RN.View>
      </RN.View>

      <Modal.Root>
        <Modal.Content visible={showModal}>
          <Modal.AreaCloseModal
            onClose={() => {
              setShowModal(false);
            }}
          />
          <Modal.Logo>
            <RN.View
              style={{
                height: 90,
                width: 90,
                backgroundColor: "#eeb7b7",
                borderRadius: 45,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LogOut
                style={{ left: 4 }}
                strokeWidth={2}
                size={40}
                color={colors.redDark}
              />
            </RN.View>
          </Modal.Logo>
          <Modal.Title>Tem certeza que deseja sair?</Modal.Title>
          <Button
            styleRest={{ height: 40, marginTop: 4 }}
            bgColor="redDark"
            onPress={() => {
              setShowModal(false);
              setTimeout(() => logout(), 100);
            }}
          >
            <Text className="text-white font-poppinsSemiBold">Sair</Text>
          </Button>
        </Modal.Content>
      </Modal.Root>
    </DrawerContentScrollView>
  );
}
