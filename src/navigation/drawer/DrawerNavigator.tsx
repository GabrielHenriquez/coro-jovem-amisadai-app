import { createDrawerNavigator } from "@react-navigation/drawer";
import { Dimensions } from "react-native";
import CustomDrawerContent from "./components/CustomDrawerContent";
import MainTabs, { MainTabsParamList } from "@navigation/tabs/MainTabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import MembersStack, {
  MembersStackParamList,
} from "@features/members/navigation/MembersStack";
import { CallStackParamList } from "@features/calls/navigation/CallsStack";
import CallsStack from "@features/calls/navigation/CallsStack";
import ReportsScreen from "@features/calls/screens/ReportsScreen";
import AnnualReportsScreen from "@features/calls/screens/AnnualReportsScreen";

const Drawer = createDrawerNavigator();
const { width } = Dimensions.get("window");

export type DrawerParamList = {
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
  CallsNavigation: NavigatorScreenParams<CallStackParamList>;
  MembersNavigation: NavigatorScreenParams<MembersStackParamList>;
  Reports: undefined;
  AnnualReports: undefined;
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
      <Drawer.Screen name="CallsNavigation" component={CallsStack} />
      <Drawer.Screen name="MembersNavigation" component={MembersStack} />
      <Drawer.Screen name="Reports" component={ReportsScreen} />
      <Drawer.Screen name="AnnualReports" component={AnnualReportsScreen} />
    </Drawer.Navigator>
  );
}
