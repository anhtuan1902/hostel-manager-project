import React from 'react';
import { Button, Text } from "react-native";
import { Stack, router } from 'expo-router';
import { colors } from '../../constants/colors';

const ChildLayout = () => {
  return (
    <Stack screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="room"
        options={{
          headerTitle: 'Quản lí phòng',
          headerTitleAlign: 'center',
          headerStyle:{
            backgroundColor: colors.primary
          },
          headerTintColor: colors.white,
          headerLeft: () => (<Text onPress={() => {
            router.back();
          }} style={{
            color: colors.white
          }} >Quay lại</Text>)
        }}></Stack.Screen> 
    </Stack>
  );
};

export default ChildLayout;