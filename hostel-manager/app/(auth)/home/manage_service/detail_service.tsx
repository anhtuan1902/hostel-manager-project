import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useAuth } from "../../../../provider/AuthProvider";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../../../constants/colors";
import { Button } from "react-native-elements";
import { Contract, Service } from "../../../../provider/Database";
import Icon from "../../../../components/Icon";
import { Picker } from "@react-native-picker/picker";

const update_detail_service = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [icon, setIcon] = useState("");
  const { user } = useAuth();
  const params = useLocalSearchParams();
  const { id } = params;
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const listIcon = [
    {
      id: 4,
      label: "Dịch vụ khác",
      name: "ListTree",
    },
    {
      id: 1,
      label: "Điện",
      name: "PlugZap",
    },
    {
      id: 2,
      label: "Nước",
      name: "Droplets",
    },
    {
      id: 3,
      label: "Xe máy",
      name: "Bike",
    },
  ];

  useEffect(() => {
    getService(id);
  }, []);

  async function getService(id: any) {
    try {
      if (!user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("services")
        .select("*")
        .eq("id", id)
        .single();

      if (data){
        setName(data.name);
        setIcon(data.icon);
        setPrice(data.price);
      }

      if (error && status !== 406) {
        throw error;
      }

    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function update_service({
    name,
    price,
    icon,
  }: {
    name: any;
    price: any;
    icon: any;
  }) {
    try {
      setLoading(true);
      if (!user) throw new Error("No user on the session!");

      if (name === null && price === null && icon === null) {
        Alert.alert("Please enter information!");
      } else {
        const data = {
          name: name,
          price: price,
          icon: icon,
          updated_at: new Date(),
        };

        const { error } = await supabase
          .from("services")
          .update(data)
          .eq("id", id);

        if (error) {
          throw console.log(error);
        } else {
          router.replace("/home/manage_service");
          Alert.alert("Bạn đã cập nhật thành công");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function delete_service(id: any) {
    try {
      setLoading(true);

      const { error } = await supabase.from("services").delete().eq("id", id);

      if (error) {
        throw console.log(error);
      } else {
        router.push("/home/manage_service");
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
              Dịch vụ
            </Text>

            <View style={styles.containerBtn}>
              <Text
                style={{
                  paddingStart: 10,
                  width: 123,
                  fontFamily: "open-sans-bold",
                  fontSize: 14,
                }}
              >
                Chọn icon
              </Text>
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  fontSize: 14,
                }}
              >
                :
              </Text>
              <Picker
                selectedValue={icon}
                onValueChange={(itemValue) => setIcon(itemValue)}
                mode="dialog"
                style={[styles.textField, {marginStart: 5}]}
              >
                {listIcon.map((item) => (
                  <Picker.Item
                    key={item.id}
                    fontFamily="open-sans"
                    label={item.label}
                    value={item.name}
                    style={styles.textField}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.containerBtn}>
              <Text
                style={{
                  paddingStart: 10,
                  width: 123,
                  fontFamily: "open-sans-bold",
                  fontSize: 14,
                }}
              >
                Tên dịch vụ
              </Text>
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  fontSize: 14,
                }}
              >
                :
              </Text>
              <TextInput
                autoCapitalize="words"
                style={styles.textField}
                onChangeText={(text) => setName(text)}
                value={name}
              />
            </View>
            <View style={styles.containerBtn}>
              <Text
                style={{
                  paddingStart: 10,
                  width: 123,
                  fontFamily: "open-sans-bold",
                  fontSize: 14,
                }}
              >
                Số tiền
              </Text>
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  fontSize: 14,
                }}
              >
                :
              </Text>
              <TextInput
                autoCapitalize="none"
                style={styles.textField}
                keyboardType="numeric"
                value={price.toString()}
                onChangeText={(text) => setPrice(Number(text))}
              />
            </View>
            <Button
              title={loading ? "Đang cập nhật" : "Cập nhật thông tin"}
              onPress={() =>
                update_service({
                  name: name,
                  price: price,
                  icon: icon,
                })
              }
              buttonStyle={{
                backgroundColor: colors.primary,
                width: 320,
                height: 50,
                borderRadius: 30,
                marginTop: 20,
              }}
              titleStyle={{ fontFamily: "open-sans" }}
            />
            <Button
              title={loading ? "Loading ..." : "Xóa hợp đồng"}
              onPress={() => delete_service(id)}
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

export default update_detail_service;

const styles = StyleSheet.create({
  containerBtn: {
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: "#DBDBDB",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 20,
    paddingRight: 10,
    width: 320,
    fontFamily: 'open-sans'
  },
  textField: {
    flex: 1,
    height: 50,
    fontSize: 20,
    color: "#000",
    paddingStart: 20
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButton: {
    marginTop: 14,
    color: colors.primary,
    fontFamily: "open-sans-bold",
  },
  closeButton: {
    color: "red",
    marginTop: 10,
    fontFamily: "open-sans",
  },
});
