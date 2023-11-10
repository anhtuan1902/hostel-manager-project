import React from "react";
import { Stack } from "expo-router";
import { colors } from "../../../constants/colors";

const ProfileLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: true, headerTitleStyle: {fontFamily: 'open-sans'}, }} >
      <Stack.Screen
        name="index"
        options={{
            headerTitleAlign: 'center',
            headerStyle:{
              backgroundColor: colors.primary
            },
            headerTitleStyle:{
              color: colors.white
            },
            headerTitle: 'Thông tin',
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
