import React from 'react';
import { Stack, router } from 'expo-router';
import { colors } from '../../constants/colors';
import { TouchableOpacity, Text } from 'react-native';

const PublicLayout = () => {
  
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="login"></Stack.Screen>
      <Stack.Screen
        name="reset"></Stack.Screen>
    </Stack>
  );
};

export default PublicLayout;