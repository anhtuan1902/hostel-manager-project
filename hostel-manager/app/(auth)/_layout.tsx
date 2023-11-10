import React from "react";
import { Tabs } from "expo-router";
import { Home, Hotel, Menu } from "lucide-react-native";
import { colors } from "../../constants/colors";

export default () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarInactiveBackgroundColor: colors.white,
        tabBarActiveBackgroundColor: colors.primary,
        tabBarShowLabel: false,
        headerTitleStyle: {fontFamily: 'open-sans'},
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="hostel_manager"
        options={{
          tabBarIcon: ({ color, size }) => <Hotel size={size} color={color} />,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => <Menu size={size} color={color} />,
        }}
      ></Tabs.Screen>
    </Tabs>
  );
};
