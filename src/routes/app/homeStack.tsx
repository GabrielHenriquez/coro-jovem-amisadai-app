import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { TabRoutes } from "./tabRoutes";

export type AppStackParamList = {
  Home: undefined;
  Members: undefined;
};

export type AppNavigationProp = NativeStackNavigationProp<AppStackParamList>;

const Stack = createNativeStackNavigator<AppStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={TabRoutes} />
    </Stack.Navigator>
  );
};

export default HomeStack;
