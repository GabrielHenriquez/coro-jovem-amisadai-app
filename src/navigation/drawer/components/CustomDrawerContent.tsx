import { ReactNode, useState } from "react";
import { Modal, Button, Text } from "@components/index";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { View, Image, StatusBar } from "react-native";
import { colors } from "@styles/colors";
import { ArrowBigUpDashIcon, FolderClosed, LogOut } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { LogOutLogo } from "@assets/images/modal";

interface ButtonContent {
  icon: ReactNode;
  text: string;
  action: VoidFunction;
}

import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { AppNavigationProp } from "@features/home/navigation/HomeStack";

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  const [showModal, setShowModal] = useState(false);
  /*   const { user, logout } = useAuthStore(); */
  const { navigate } = useNavigation<AppNavigationProp>();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        paddingTop: StatusBar.currentHeight! + 30,
      }}
      className="bg-white"
    >
      <View className="px-4 mt-8">
        <Button
          bgColor="redDark"
          styleRest={{ height: 38 }}
          onPress={() => setShowModal(true)}
        >
          <Text size={16} className="text-white font-bold">
            Sair
          </Text>
        </Button>
      </View>

      <Modal.Root>
        <Modal.Content visible={showModal}>
          <Modal.AreaCloseModal onClose={() => setShowModal(false)} />
          <Modal.Logo>
            <LogOutLogo width={90} height={90} />
          </Modal.Logo>
          <Modal.Title>Tem certeza que deseja sair?</Modal.Title>
          <Button
            styleRest={{ height: 40, marginTop: 4 }}
            bgColor="redDark"
            onPress={() => {
              setShowModal(false);
              /*  logout(); */
            }}
          >
            <Text className="text-white font-poppinsSemiBold">Sair</Text>
          </Button>
        </Modal.Content>
      </Modal.Root>
    </DrawerContentScrollView>
  );
}
