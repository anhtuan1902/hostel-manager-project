import React from "react";
import { Tabs } from "expo-router";
import { Home, Menu, TableProperties } from "lucide-react-native";
import { colors } from "../../constants/colors";

export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveBackgroundColor: colors.white,
        tabBarActiveBackgroundColor: colors.primary,
        tabBarActiveTintColor: colors.secondary,
        tabBarShowLabel: false,
        tabBarStyle: {
          flex: 0,
        }
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
          tabBarIcon: ({ color, size }) => <TableProperties size={size} color={color} />,
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
