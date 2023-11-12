import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Stack, router } from "expo-router";
import { colors } from "../../../../constants/colors";

const LesseeLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: true, headerTitleStyle: {fontFamily: 'open-sans'}, }} >
      <Stack.Screen
        name="lessees"
        options={{
          headerTitle: "Quản lí bên thuê",
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
        name="add_lessee"
        options={{
          headerTitle: "Thêm người thuê",
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
        name="detail_lessee"
        options={{
          headerTitle: "Thông tin người thuê",
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

export default LesseeLayout;
