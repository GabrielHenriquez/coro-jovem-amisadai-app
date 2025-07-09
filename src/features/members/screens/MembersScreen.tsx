import * as RN from "react-native";
import React from "react";
import Text from "@components/Text";
import LogoAmisadai from "@assets/images/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { Menu } from "lucide-react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { colors } from "@styles/colors";
import SearchInput from "@components/SearchInput/view";
import Spacer from "@components/Spacer";
import MemberCard from "../components/MemberCard";

const Members = () => {
  const { dispatch } = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
      <RN.StatusBar translucent backgroundColor="#4C5E46" />
      <RN.View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 8,
          paddingTop: 14,
          marginBottom: 20,
        }}
      >
        <RN.TouchableOpacity
          onPress={() => dispatch(DrawerActions.openDrawer())}
          style={{
            position: "absolute",
            left: 16,
          }}
        >
          <Menu size={36} color="#FFF" />
        </RN.TouchableOpacity>

        <LogoAmisadai width={140} height={70} />
      </RN.View>

      <RN.View
        style={{
          borderTopLeftRadius: 45,
          borderTopRightRadius: 45,
        }}
        className="flex-1 bg-background pt-4"
      >
        <RN.View className="gap-4">
          <Text className="text-center font-poppinsBold text-primary" size={28}>
            Componentes
          </Text>

          <SearchInput
            styleRest={{ paddingHorizontal: 16 }}
            searchTerm={""}
            setSearchTerm={() => {}}
          />

          <Text className="text-center font-poppinsMedium text-gray">
            Quantidade de componentes: 54
          </Text>
        </RN.View>

        <Spacer height={6} />

        <RN.FlatList
          data={Array(54).fill(null)}
          renderItem={() => <MemberCard />}
          contentContainerClassName="gap-3 pb-16 px-5 mt-2"
        />
      </RN.View>
    </SafeAreaView>
  );
};

export default Members;
