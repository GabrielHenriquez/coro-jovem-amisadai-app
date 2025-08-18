import AuthStack from "@features/auth/navigation/AuthStack";
import DrawerNavigator from "./drawer/DrawerNavigator";
import { useAuthStore } from "@features/auth/stores/authStore";

const RootNavigator = () => {
  const { user } = useAuthStore();
  return user?.uid ? <DrawerNavigator /> : <AuthStack />;
};

export default RootNavigator;
