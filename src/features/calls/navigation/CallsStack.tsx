import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import CreateCallSPAScreen from "../screens/CreateCallSPAScreen";

export type CallStackParamList = {
  CreateCall: undefined;
};

export type CallNavigationProp = NativeStackNavigationProp<CallStackParamList>;

const Stack = createNativeStackNavigator<CallStackParamList>();

const CallsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CreateCall" component={CreateCallSPAScreen} />
    </Stack.Navigator>
  );
};

export default CallsStack;
