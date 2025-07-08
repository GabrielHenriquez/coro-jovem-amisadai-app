import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Home } from "@screens/app/Home/view";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "@styles/colors";
import { fontFamily } from "@styles/fonts";
import Members from "@screens/app/Members/view";

const Tab = createBottomTabNavigator();

const IconWithLabel = ({
  name,
  label,
  focused,
}: {
  name: "calendar" | "users";
  label: string;
  focused: boolean;
}) => {
  const positionStyle = { alignItems: "center", bottom: -10 };

  return (
    <View style={{ width: 100, justifyContent: "center", ...positionStyle }}>
      <FontAwesome
        name={name}
        size={22}
        color={focused ? colors.primary : colors.gray}
      />
      <Text
        style={{
          fontSize: 10,
          color: focused ? colors.primary : colors.gray,
          marginTop: 6,
          fontFamily: fontFamily.poppinsSemiBold,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

const AddButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
      width: 55,
      height: 55,
      top: -28,
      borderRadius: 50,
      alignSelf: "center",
    }}
  >
    <Ionicons name="add" size={46} color="#FFF" />
  </TouchableOpacity>
);

export const TabRoutes = () => {
  const { navigate } = useNavigation();
  const [screenFocused, setScreenFocused] = useState("");

  const screenOptions = {
    tabBarHideOnKeyboard: true,
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
      height: 55,
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderColor: "#d3d3d3",
    },
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={screenOptions}
      screenListeners={({ route }) => {
        setScreenFocused(route?.name);
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarItemStyle: {
            borderColor: "#000",
            left: 35,
          },
          tabBarIcon: ({ focused }) => (
            <IconWithLabel name="calendar" label="CHAMADAS" focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="Add"
        component={() => <View />}
        options={{
          tabBarButton: () => (
            <AddButton
              onPress={() => {
                if (screenFocused === "Home") return;
                if (screenFocused === "Members") navigate("Home");
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Members"
        component={Members}
        options={{
          tabBarItemStyle: {
            borderColor: "#000",
            right: 35,
          },
          tabBarIcon: ({ focused }) => (
            <IconWithLabel name="users" label="COMPONENTES" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
