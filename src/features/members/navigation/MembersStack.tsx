import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import RegisterMemberScreen from "../screens/RegisterMemberScreen";
import { IMember } from "../domain/entities/Member";

export type MembersStackParamList = {
  Members: IMember[];
  RegisterMember: { member?: IMember };
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
      <Stack.Screen
        name="RegisterMember"
        component={RegisterMemberScreen}
        options={{
          gestureEnabled: true,
          presentation: "card",
        }}
      />
    </Stack.Navigator>
  );
};

export default MembersStack;
