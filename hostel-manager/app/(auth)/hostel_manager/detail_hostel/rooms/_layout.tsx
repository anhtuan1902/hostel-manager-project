import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View, Alert } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { supabase } from "../../../../../utils/supabase";
import { colors } from "../../../../../constants/colors";
import Icon from "../../../../../components/Icon";

const RoomLayout = () => {
  const params = useLocalSearchParams();
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [dataParam, setDataParam] = useState(id);
  const [name, setName] = useState("");

  useEffect(() => {
    get_hostel(dataParam)
  }, []);

  async function get_hostel(id: any) {
    try {
      const { data: hostels, error } = await supabase
        .from("hostels")
        .select("name")
        .eq("id", id);

      if (error) {
        throw console.log(error);
      } else {
        setName(hostels[0].name);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack screenOptions={{ headerShown: true, headerTitleStyle: {fontFamily: 'open-sans'}, }} initialRouteName="index">
      <Stack.Screen
        name="index"
        initialParams={{id: dataParam}}
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            color: colors.white,
          },
          headerTitle: name,
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
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/hostel_manager/detail_hostel/detail",
                  params: { id: dataParam },
                });
              }}
            >
              <View>
                <Icon name="Settings2" size={24} color="white" />
              </View>
            </TouchableOpacity>
          ),
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="add_room"
        initialParams={{id: dataParam}}
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            color: colors.white,
          },
          headerTitle: 'Thêm phòng trọ',
          presentation: 'modal',
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
        name="detail_room"
        options={{
          headerTitle: "Chi tiết phòng trọ",
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

export default RoomLayout;
