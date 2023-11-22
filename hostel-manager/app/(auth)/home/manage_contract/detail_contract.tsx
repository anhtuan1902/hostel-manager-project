import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../../../../provider/AuthProvider";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../../../constants/colors";
import InputWithIcon from "../../../../components/InputWithIcon";
import { Button } from "react-native-elements";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { Contract } from "../../../../provider/Database";
import Icon from "../../../../components/Icon";

const add_lessee = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState<Contract>();
  const { user } = useAuth();
  const params = useLocalSearchParams();
  const { id } = params;
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    getLessee(id);
  }, []);

  async function getLessee(id: any) {
    try {
      if (!user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("manage_rental_contract")
        .select(
          "*, manage_lessee(id, name), hostels(id, name, owner_id), rooms(id, name)"
        )
        .eq("id", id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setContract(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function delete_contract(id: any) {
    try {
      setLoading(true);

      const { error } = await supabase
        .from("manage_rental_contract")
        .delete()
        .eq("id", id);

      if (error) {
        throw console.log(error);
      } else {
        router.push("/home/manage_rental_contracts");
        Alert.alert("Bạn đã xóa thành công");
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
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <ScrollView style={{ flex: 1, marginBottom: 20 }}>
        {loading ? (
          <ActivityIndicator color={colors.primary} animating={loading} />
        ) : (
          <View
            style={{
              paddingHorizontal: 10,
              marginTop: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: colors.primary,
                fontSize: 42,
                fontWeight: "500",
                marginBottom: 10,
                marginTop: 10,
                fontFamily: "open-sans",
              }}
            >
              Thông tin chi tiết
            </Text>
            <View style={{ marginTop: 30 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    paddingStart: 20,
                    fontSize: 16,
                    marginBottom: 10,
                    fontFamily: "open-sans-bold",
                  }}
                >
                  #{contract?.id}
                </Text>
                <Text
                  style={{
                    paddingStart: 220,
                    fontSize: 13,
                    marginBottom: 10,
                    fontFamily: "open-sans",
                  }}
                >
                  {contract?.created_at.toString().substring(0, 10)}
                </Text>
              </View>

              <View
                style={{
                  paddingStart: 30,
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon name={"Hotel"} color={"black"} size={20} />
                <Text
                  style={{
                    paddingStart: 10,
                    fontSize: 14,
                    fontFamily: "open-sans",
                  }}
                >
                  {contract?.rooms?.name} - {contract?.hostels?.name}
                </Text>
              </View>
              <View
                style={{
                  paddingStart: 30,
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon name={"CalendarDays"} color={"black"} size={20} />
                <Text
                  style={{
                    paddingStart: 10,
                    fontSize: 14,
                    fontFamily: "open-sans",
                  }}
                >
                  Từ {contract?.start_date.toString().substring(0, 10)} đến{" "}
                  {contract?.expired_date.toString().substring(0, 10)}
                </Text>
              </View>
              <View
                style={{
                  paddingStart: 30,
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Icon name={"User"} color={"black"} size={20} />
                <Text
                  style={{
                    paddingStart: 10,
                    fontSize: 14,
                    fontFamily: "open-sans",
                  }}
                >
                  Nguời thuê: {contract?.manage_lessee?.name}
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  marginTop: 20,
                  marginBottom: 20,
                }}
              />
            </View>
            <View>
              <View
                style={{
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "open-sans",
                  }}
                >
                  Tiền phòng: {VND.format(Number(contract?.monthly_price))}
                </Text>
              </View>
              <View
                style={{
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "open-sans",
                  }}
                >
                  Ngày thanh toán hằng tháng: {contract?.monthly_payment_day}
                </Text>
              </View>
            </View>
            {/* <Button
            title={loading ? "Đang cập nhật" : "Cập nhật thông tin"}
            onPress={() => router.push('home/add_contract/')}
            buttonStyle={{
              backgroundColor: colors.primary,
              width: 320,
              height: 50,
              borderRadius: 30,
              marginTop: 20,
            }}
            titleStyle={{ fontFamily: "open-sans" }}
          /> */}
            <Button
              title={loading ? "Loading ..." : "Xóa hợp đồng"}
              onPress={() => delete_contract(id)}
              buttonStyle={{
                backgroundColor: colors.primary,
                width: 320,
                height: 50,
                borderRadius: 30,
                marginTop: 20,
              }}
              titleStyle={{ fontFamily: "open-sans" }}
              disabled={loading}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default add_lessee;
