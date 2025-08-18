import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import AuthSPAScreen from "../screens/AuthSPAScreen";

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
      <Stack.Screen name="AuthSPA" component={AuthSPAScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
