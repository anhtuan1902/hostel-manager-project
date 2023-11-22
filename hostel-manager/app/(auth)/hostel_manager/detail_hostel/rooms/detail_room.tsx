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
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";

const detail_room = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [monthlyPrice, setmonthlyPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image_url, setImageUrl] = useState("");
  const { user, session } = useAuth();
  const params = useLocalSearchParams();
  const { id } = params;

  useEffect(() => {
    getRoom(id);
  }, [])

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const img = result.assets[0];
      const base64 = await FileSystem.readAsStringAsync(img.uri, {
        encoding: "base64",
      });
      const filePath = `${user!.id}/${new Date().getTime()}.png`;
      const contentType = "image/png";
      await supabase.storage.from("files").upload(filePath, decode(base64), {
        contentType,
      });

      await supabase.storage
      .from("files")
      .download(filePath)
      .then(( {data} ) => {
        const fr = new FileReader();
        fr.readAsDataURL(data!);
        fr.onload = () => {
          setImageUrl(fr.result as string);
        };
      });
    } else {
      alert("You did not select any image.");
    }
  };

  async function getRoom(id: any) {
    try {
      const { data, error, status } = await supabase
        .from("rooms")
        .select("*")
        .eq("id", id);

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setName(data[0].name);
        setmonthlyPrice(data[0].monthly_price);
        setDescription(data[0].description);
        setImageUrl(data[0].image_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function update_room({
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
        Alert.alert("Hãy nhập đủ thông tin!");
      } else {
        const data = {
          name: name,
          monthly_price: monthlyPrice,
          description: description,
          image_url: image_url,
          hostel_id: id,
          update_date: new Date(),
        };

        const { error } = await supabase.from("rooms").update(data);

        if (error) {
          throw console.log(error);
        } else {
          router.back();
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

  async function delete_hostel(id: any) {
    try {
      setLoading(true);

      const { error } = await supabase.from("rooms").delete().eq("id", id);

      if (error) {
        throw console.log(error);
      } else {
        router.back();
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
              fontFamily: "open-sans-bold",
            }}
          >
            Phòng {name}
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
            Thông tin chi tiết của phòng trọ
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
            value={name ? name : ""}
          />
          <InputWithIcon
            placeholder="Nhập giá tiền phòng"
            onTextChange={setmonthlyPrice}
            colorIcon="black"
            icon="Banknote"
            sizeIcon={32}
            value={monthlyPrice ? monthlyPrice.toString() : ''}
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
              value={description ? description : ""}
            />
          </View>
          <View style={{ marginBottom: 30 }}>
            <Button
              title={loading ? "Loading ..." : "Cập nhật phòng trọ"}
              buttonStyle={{
                backgroundColor: colors.primary,
                width: 320,
                height: 50,
                borderRadius: 30,
                marginTop: 20,
              }}
              titleStyle={{ fontFamily: "open-sans" }}
              onPress={() =>
                update_room({
                  name: name,
                  monthlyPrice: monthlyPrice,
                  description: description,
                  image_url: image_url,
                })
              }
              disabled={loading}
            />
            <Button
              title={loading ? "Loading ..." : "Xóa phòng trọ"}
              onPress={() => delete_hostel(id)}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default detail_room;

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
