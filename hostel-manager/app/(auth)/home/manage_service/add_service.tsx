import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useAuth } from "../../../../provider/AuthProvider";
import React, { useState } from "react";
import { supabase } from "../../../../utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../../../constants/colors";
import { Button } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const add_contract = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [icon, setIcon] = useState("");
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
  const { user, session } = useAuth();

  async function create_service({
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
      if (!session?.user) throw new Error("No user on the session!");

      if (name === null && price === null && icon === null) {
        Alert.alert("Please enter information!");
      } else {
        const data = {
          name: name,
          price: price,
          icon: icon,
          owner_id: user?.id,
        };

        const { error } = await supabase.from("services").upsert(data);

        if (error) {
          throw console.log(error);
        } else {
          router.replace("/home/manage_service");
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <ScrollView style={{ flex: 1 }}>
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
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: "grey",
              marginTop: 5,
              marginBottom: 10,
              fontFamily: "open-sans",
            }}
          >
            Nhập vào thông tin cần thiết để tạo dịch vụ
          </Text>

          <View style={styles.containerBtn}>
            <Text
              style={{
                paddingStart: 10,
                width: 140,
                fontFamily: "open-sans-bold",
                fontSize: 14,
              }}
            >
              Chọn icon dịch vụ
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
              style={{ width: 180, height: "100%" }}
            >
              {listIcon.map((item) => (
                <Picker.Item
                  key={item.id}
                  fontFamily="open-sans"
                  label={item.label}
                  value={item.name}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.containerBtn}>
            <Text
              style={{
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
            />
          </View>
          <View style={styles.containerBtn}>
            <Text
              style={{
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
              onChangeText={(text) => setPrice(Number(text))}
            />
          </View>
          <Button
            title={loading ? "Đang cập nhật" : "Thêm hợp đồng"}
            buttonStyle={{
              backgroundColor: colors.primary,
              width: 320,
              height: 50,
              borderRadius: 30,
              marginTop: 20,
            }}
            titleStyle={{ fontFamily: "open-sans" }}
            onPress={() => {
              create_service({
                name: name,
                price: price,
                icon: icon,
              });
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default add_contract;

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
});
