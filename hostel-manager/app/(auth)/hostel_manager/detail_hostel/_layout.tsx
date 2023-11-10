import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View, Alert } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { colors } from "../../../../constants/colors";
import Icon from "../../../../components/Icon";
import { supabase } from "../../../../utils/supabase";

const HostelLayout = () => {
  const params = useLocalSearchParams();
  const { id } = params;
  const [dataParam, setDataParam] = useState(id);

  return (
    <Stack screenOptions={{ headerShown: true, headerTitleStyle: {fontFamily: 'open-sans'}, }} >
      <Stack.Screen
        name="rooms"
        initialParams={{id: dataParam}}
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="detail"
        options={{
          headerTitle: "Chi tiết nhà trọ",
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
      ></Stack.Screen>
    </Stack>
  );
};

export default HostelLayout;
