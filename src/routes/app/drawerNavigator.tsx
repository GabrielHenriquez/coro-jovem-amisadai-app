import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from "./homeStack";
import CustomDrawerContent from "./CustomDrawerContent";
import { Dimensions } from "react-native";

const Drawer = createDrawerNavigator();
const { width } = Dimensions.get("window");

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: width * 0.7,
        },
      }}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen name="HomeStack" component={HomeStack} />
    </Drawer.Navigator>
  );
}
