import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useAuth } from "../../../provider/AuthProvider";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { supabase } from "../../../utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../../constants/colors";
import InputWithIcon from "../../../components/InputWithIcon";
import { Button } from "react-native-elements";

const add_hostels = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [image_url, setImageUrl] = useState("");
  const { session } = useAuth();

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  async function create_hostel({
    name,
    address,
    image_url,
  }: {
    name: string;
    address: string;
    image_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      if (name == "" && address == "") {
        Alert.alert("Please enter information!");
      } else {
        const updates = {
          name: name,
          address: address,
          image_url: image_url,
          owner_id: session?.user.id,
          update_date: new Date(),
        };
        console.log(updates);

        const { error } = await supabase.from("hostels").upsert(updates);

        if (error) {
          throw console.log(error);
        } else {
          router.replace("/hostel_manager");
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
      <ScrollView style={{ flex: 1, paddingTop: 20 }}>
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
            Nhà trọ
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
            Nhập vào thông tin cần thiết để tạo nhà trọ
          </Text>
          {image_url ? (
            <TouchableOpacity
              style={[
                styles.button,
                {
                  width: 320,
                  marginTop: 10,
                  marginBottom: 20,
                  borderRadius: 20,
                  height: 320,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
              onPress={pickImageAsync}
            >
              <Image
                source={{ uri: image_url }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 20,
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.button,
                {
                  width: 320,
                  marginTop: 10,
                  marginBottom: 20,
                  borderRadius: 20,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
              onPress={pickImageAsync}
            >
              <Text style={{ fontFamily: "open-sans" }}>
                Ấn để tải hình ảnh
              </Text>
            </TouchableOpacity>
          )}
          <InputWithIcon
            placeholder="Tên nhà trọ"
            onTextChange={setName}
            colorIcon="black"
            icon="ClipboardEdit"
            sizeIcon={32}
          />
          <InputWithIcon
            placeholder="Địa chỉ"
            onTextChange={setAddress}
            colorIcon="black"
            icon="GitBranchPlus"
            sizeIcon={32}
          />

          <Button
            title={loading? 'Đang cập nhật' :"Thêm nhà trọ"}
            buttonStyle={{
              backgroundColor: colors.primary,
              width: 320,
              height: 50,
              borderRadius: 30,
              marginTop: 20,
            }}
            titleStyle={{ fontFamily: "open-sans" }}
            onPress={() =>
              create_hostel({
                name: name,
                address: address,
                image_url: image_url,
              })
            }

          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default add_hostels;

const styles = StyleSheet.create({
  linkBtn: {
    margin: 8,
    alignItems: "center",

    fontFamily: "open-sans",
  },
  containerInput: {
    flexDirection: "row",
    height: 50,
    borderRadius: 30,
    backgroundColor: "#DBDBDB",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 20,
    paddingRight: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
