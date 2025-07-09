import { createDrawerNavigator } from "@react-navigation/drawer";
import { Dimensions } from "react-native";
import CustomDrawerContent from "./components/CustomDrawerContent";
import MainTabs, { MainTabsParamList } from "@navigation/tabs/MainTabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import MembersStack, {
  MembersStackParamList,
} from "@features/members/navigation/MembersStack";

const Drawer = createDrawerNavigator();
const { width } = Dimensions.get("window");

export type DrawerParamList = {
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
  MembersNavigation: NavigatorScreenParams<MembersStackParamList>;
};

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        swipeEnabled: false,
        headerShown: false,
        drawerStyle: {
          width: width * 0.7,
        },
      }}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen name="MainTabs" component={MainTabs} />
      <Drawer.Screen name="MembersNavigation" component={MembersStack} />
    </Drawer.Navigator>
  );
}
