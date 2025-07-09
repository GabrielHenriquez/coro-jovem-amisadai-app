import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import HomeScreen from "@features/home/screens/HomeScreen";

export type HomeStackParamList = {
  Home: undefined;
};

export type AppNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
