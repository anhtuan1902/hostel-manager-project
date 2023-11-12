import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Stack, router } from "expo-router";
import { colors } from "../../../constants/colors";

const HomeLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: true, headerTitleStyle: {fontFamily: 'open-sans'}, }} >
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
    </Stack>
  );
};

export default HomeLayout;
