import React from "react";
import { Stack, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../constants/colors";

const HomeLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleStyle: { fontFamily: "open-sans" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="manage_lessee"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="manage_contract"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
