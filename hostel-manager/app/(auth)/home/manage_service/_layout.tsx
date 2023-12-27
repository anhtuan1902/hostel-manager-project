import React from "react";
import { Stack, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../../constants/colors";

const ContractLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleStyle: { fontFamily: "open-sans" },
      }}
      initialRouteName="manage_services"
    >
      <Stack.Screen
        name="manage_services"
        options={{
          headerTitle: "Quản lí dich vu",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          navigationBarHidden: true,
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
      />
      <Stack.Screen
        name="add_service"
        options={{
          headerTitle: "Tạo hợp đồng",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          navigationBarHidden: true,
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
      />
      <Stack.Screen
        name="detail_service"
        options={{
          headerTitle: "Chi tiết hợp đồng",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          navigationBarHidden: true,
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
      />
    </Stack>
  );
};

export default ContractLayout;
