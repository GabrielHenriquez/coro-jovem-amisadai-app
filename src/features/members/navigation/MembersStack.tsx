import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import RegisterMemberScreen from "../screens/RegisterMemberScreen";

export type MembersStackParamList = {
  Members: undefined;
  RegisterMember: undefined;
};

export type MembersNavigationProp =
  NativeStackNavigationProp<MembersStackParamList>;

const Stack = createNativeStackNavigator<MembersStackParamList>();

const MembersStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="RegisterMember" component={RegisterMemberScreen}  />
    </Stack.Navigator>
  );
};

export default MembersStack;
