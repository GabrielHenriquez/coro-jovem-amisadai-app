import React, { ReactNode } from "react";
import Button from "@components/Button";
import Text from "@components/Text";
import Modal from "@components/Modal";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { View, Image, StatusBar } from "react-native";
import { colors } from "@styles/colors";
import { ArrowBigUpDashIcon, FolderClosed, LogOut } from "lucide-react-native";
import { AppNavigationProp } from "./homeStack";
import { useNavigation } from "@react-navigation/native";
import LogoutRedLogo from "@assets/images/modal/logout-red.svg";

interface ButtonContent {
  icon: ReactNode;
  text: string;
  action: VoidFunction;
}

export default function CustomDrawerContent(props: any) {
  const [showModal, setShowModal] = React.useState(false);
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
            <LogoutRedLogo width={90} height={90} />
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
