import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
import { useAuth } from "../../../../../provider/AuthProvider";
import { supabase } from "../../../../../utils/supabase";
import { colors } from "../../../../../constants/colors";
import InputWithIcon from "../../../../../components/InputWithIcon";
import Icon from "../../../../../components/Icon";

const add_room = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [monthlyPrice, setmonthlyPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image_url, setImageUrl] = useState("");
  const { session } = useAuth();
  const params = useLocalSearchParams();
  const { id } = params;

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

  async function create_room({
    name,
    monthlyPrice,
    description,
    image_url,
  }: {
    name: string;
    monthlyPrice: number;
    description: string;
    image_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      if (name == "" && description == "" && monthlyPrice == 0) {
        Alert.alert("Please enter information!");
      } else {
        const data = {
          name: name,
          monthly_price: monthlyPrice,
          description: description,
          image_url: image_url,
          hostel_id: id,
          update_date: new Date(),
        };

        const { error } = await supabase.from("rooms").insert(data);

        if (error) {
          throw console.log(error);
        } else {
          router.back();
          Alert.alert("Bạn đã thêm phòng trọ thành công!");
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
            Phòng trọ
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
            Nhập vào thông tin cần thiết để tạo phòng trọ
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
            placeholder="Nhập giá tiền phòng"
            onTextChange={setmonthlyPrice}
            colorIcon="black"
            icon="Banknote"
            sizeIcon={32}
          />
          <View
            style={{
              backgroundColor: "#DBDBDB",
              width: 320,
              flexDirection: "row",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <View style={{ marginEnd: 10 }}>
              <Icon name={"Text"} color={"black"} size={32} />
            </View>
            <TextInput
              editable
              multiline
              maxLength={150}
              onChangeText={(text) => setDescription(text)}
              placeholder="Mô tả phòng trọ"
              style={{ width: 240, fontSize: 18, minHeight: 50, padding: 10 }}
            />
          </View>
          <Button
            title={loading ? "Đang cập nhật" : "Thêm nhà trọ"}
            buttonStyle={{
              backgroundColor: colors.primary,
              width: 320,
              height: 50,
              borderRadius: 30,
              marginTop: 20,
            }}
            titleStyle={{ fontFamily: "open-sans" }}
            onPress={() =>
              create_room({
                name: name,
                monthlyPrice: monthlyPrice,
                description: description,
                image_url: image_url,
              })
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default add_room;

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
