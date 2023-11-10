import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Stack, router } from "expo-router";
import { colors } from "../../../constants/colors";

const HostelLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: true, headerTitleStyle: {fontFamily: 'open-sans'}, }}>
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
          headerTitle: 'Nhà trọ',
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="add_hostels"
        options={{
          headerTitle: "Thêm nhà trọ",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          presentation: "modal",
          headerTintColor: colors.white,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <View>
                <Text
                  style={{
                    color: colors.white,
                  }}
                >
                  Quay lại
                </Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="detail_hostel"
        options={{
          headerShown: false
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default HostelLayout;
