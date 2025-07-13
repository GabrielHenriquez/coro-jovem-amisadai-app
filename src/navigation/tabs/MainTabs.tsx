import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View } from "react-native";
import { colors } from "@styles/colors";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "@navigation/drawer/DrawerNavigator";
import { AddButton, IconWithLabel } from "./components";
import CallsScreen from "@features/calls/screens/CallsScreen";
import MembersScreen from "@features/members/screens/MembersScreen";

export type MainTabsParamList = {
  Calls: undefined;
  Members: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

export const MainTabs = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const [screenFocused, setScreenFocused] = useState<"Calls" | "Members">(
    "Calls"
  );

  const screenOptions = {
    tabBarHideOnKeyboard: true,
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
      height: 56,
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderColor: "#cfcfcf",
    },
  };

  return (
    <>
      <Tab.Navigator
        initialRouteName="Calls"
        screenOptions={screenOptions}
        screenListeners={({ route }) => ({
          focus: () => setScreenFocused(route?.name),
        })}
      >
        <Tab.Screen
          name="Calls"
          component={CallsScreen}
          options={{
            tabBarItemStyle: { left: 12.5 },
            tabBarIcon: ({ focused }) => (
              <IconWithLabel
                name="calendar"
                label="CHAMADAS"
                focused={focused}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Members"
          component={MembersScreen}
          options={{
            tabBarItemStyle: { right: 12.5 },
            tabBarIcon: ({ focused }) => (
              <IconWithLabel
                name="users"
                label="COMPONENTES"
                focused={focused}
              />
            ),
          }}
        />
      </Tab.Navigator>

      <View
        style={{
          bottom: 0,
          position: "absolute",
          alignSelf: "center",
        }}
      >
        <AddButton
          screenFocused={screenFocused}
          onPress={() => {
            if (screenFocused === "Calls")
              navigation.navigate("CallsNavigation", {
                screen: "CreateCall",
              });

            if (screenFocused === "Members")
              navigation.navigate("MembersNavigation", {
                screen: "RegisterMember",
              });
          }}
        />
      </View>
    </>
  );
};

export default MainTabs;
