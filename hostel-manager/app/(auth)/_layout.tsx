import React from "react";
import { Tabs } from "expo-router";
import { Home, Menu } from "lucide-react-native";
import { colors } from "../../constants/colors";

export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveBackgroundColor: colors.white,
        tabBarActiveBackgroundColor: colors.primary,
        tabBarActiveTintColor: colors.secondary
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="service"
        options={{
          headerTitleAlign: 'center',
          headerStyle:{
            backgroundColor: colors.primary
          },
          headerTitleStyle:{
            color: colors.white
          },
          headerTitle: 'Dịch vụ',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="profile"
        options={{
          headerTitleAlign: 'center',
          headerStyle:{
            backgroundColor: colors.primary
          },
          headerTitleStyle:{
            color: colors.white
          },
          headerTitle: 'Thông tin',
          tabBarIcon: ({ color, size }) => <Menu size={size} color={color} />,
        }}
      ></Tabs.Screen>
    </Tabs>
  );
};
