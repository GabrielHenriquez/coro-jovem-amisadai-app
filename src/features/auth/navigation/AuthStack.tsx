import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import SPA from "features/auth/screens/AuthScreenSPA";

export type AuthStackParamList = {
  AuthSPA: undefined;
};

export type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AuthSPA" component={SPA} />
    </Stack.Navigator>
  );
};

export default AuthStack;
