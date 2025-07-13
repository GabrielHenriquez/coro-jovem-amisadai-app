import AuthStack from "@features/auth/navigation/AuthStack";
import DrawerNavigator from "./drawer/DrawerNavigator";

const RootNavigator = () => {
  /* const { user } = useAuthStore(); */
  return /* user?.token ? <DrawerNavigator /> : */ <DrawerNavigator />;
};

export default RootNavigator;
