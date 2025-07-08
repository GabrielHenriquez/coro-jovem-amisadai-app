/* import { useAuthStore } from "@stores/auth/authStore"; */
import DrawerNavigator from "./app/drawerNavigator";
import AuthRoutes from "./auth/authStack";

const Routes = () => {
  /* const { user } = useAuthStore(); */
  return /* user?.token ? <DrawerNavigator /> : */ <DrawerNavigator />;
};

export default Routes;
