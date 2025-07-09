import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View } from "react-native";
import { colors } from "@styles/colors";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "@navigation/drawer/DrawerNavigator";
import { AddButton, IconWithLabel } from "./components";
import HomeScreen from "@features/home/screens/HomeScreen";
import Members from "@features/members/screens/MembersScreen";

export type MainTabsParamList = {
  Home: undefined;
  Members: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

export const MainTabs = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const [screenFocused, setScreenFocused] = useState("");

  const screenOptions = {
    tabBarHideOnKeyboard: true,
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
      height: 55,
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderColor: "#d3d3d3",
    },
  };

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={screenOptions}
        screenListeners={({ route }) => ({
          focus: () => {
            console.log(route);
            setScreenFocused(route?.name);
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarItemStyle: { left: 15 },
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
          component={Members}
          options={{
            tabBarItemStyle: { right: 15 },
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
          onPress={() => {
            if (screenFocused === "HomeNavigation") return;

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
