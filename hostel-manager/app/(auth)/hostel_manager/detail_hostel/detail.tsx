import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-elements";
import { useAuth } from "../../../../provider/AuthProvider";
import { supabase } from "../../../../utils/supabase";
import { colors } from "../../../../constants/colors";
import InputWithIcon from "../../../../components/InputWithIcon";

const detail_hostel = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [image_url, setImageUrl] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    get_hostel(id);
  }, []);

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

  async function get_hostel(id: any) {
    try {
      const { data: hostels, error } = await supabase
        .from("hostels")
        .select("*")
        .eq("id", id);

      if (error) {
        throw console.log(error);
      } else {
        setName(hostels[0].name);
        setAddress(hostels[0].address);
        setImageUrl(hostels[0].image_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function update_hostel({
    id,
    name,
    address,
    image_url,
  }: {
    id: any;
    name: string;
    address: string;
    image_url: string;
  }) {
    try {
      setLoading(true);
      if (!user) throw new Error("No user on the session!");

      if (name == "" && address == "") {
        Alert.alert("Hãy nhập đủ thông tin!");
      } else {
        const updates = {
          name: name,
          address: address,
          image_url: image_url,
          update_date: new Date(),
        };

        const { error } = await supabase
          .from("hostels")
          .update(updates)
          .eq("id", id);

        if (error) {
          throw console.log(error);
        } else {
          router.replace("/hostel_manager");
          Alert.alert("Bạn đã cập nhật thành công!");
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

      const { error } = await supabase.from("hostels").delete().eq("id", id);

      if (error) {
        throw console.log(error);
      } else {
        router.replace("/hostel_manager");
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
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
      <StatusBar />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color={colors.primary} animating={loading} />
        </View>
      ) : (
        <ScrollView style={{ flex: 1}}>
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
                fontSize: 36,
                fontWeight: "500",
                marginBottom: 10,
                fontFamily: "open-sans-bold",
              }}
            >
              {name}
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
              Thông tin của nhà trọ có thể chỉnh sửa hoặc xóa
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
                    height: 220,
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
              placeholder="Địa chỉ"
              onTextChange={setAddress}
              colorIcon="black"
              icon="GitBranchPlus"
              sizeIcon={32}
              value={address ? address : ""}
            />
            <View style={{ marginBottom: 30 }}>
              <Button
                title={loading ? "Loading ..." : "Cập nhật nhà trọ"}
                buttonStyle={{
                  backgroundColor: colors.primary,
                  width: 320,
                  height: 50,
                  borderRadius: 30,
                  marginTop: 20,
                }}
                titleStyle={{ fontFamily: "open-sans" }}
                onPress={() =>
                  update_hostel({
                    id: id,
                    name: name,
                    address: address,
                    image_url: image_url,
                  })
                }
                disabled={loading}
              />
              <Button
                title={loading ? "Loading ..." : "Xóa nhà trọ"}
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
      )}
    </SafeAreaView>
  );
};

export default detail_hostel;

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
