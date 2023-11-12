import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";
import { colors } from "../constants/colors";
import Icon from "./Icon";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../provider/AuthProvider";

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullname, setFullname] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUrl(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select("fullname, phone_number, avatar_url")
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.fullname);
        setPhoneNumber(data.phone_number);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    fullname,
    phone_number,
    avatar_url,
  }: {
    fullname: string;
    phone_number: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        fullname: fullname,
        phone_number: phone_number,
        avatar_url: avatar_url,
        updated_at: new Date(),
      };
      console.log(updates);

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw console.log(error);
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
    <>
      <View style={styles.containerBtn}>
        <View style={{ marginRight: 70, width: 70 }}>
          <TouchableOpacity onPress={pickImageAsync}>
            { avatarUrl ? (
              <Image
                source={{ uri: avatarUrl }}
                style={{ width: 110, height: 120, borderRadius: 50 }}
              />
            ) : (
              <Icon name="User" size={60} color="black" />
            )}
          </TouchableOpacity>
        </View>
        <View style={{ width: 180 }}>
          <Text style={{ fontSize: 15 }}>Họ tên: {fullname}</Text>
          <Text style={{ fontSize: 12, marginTop: 10 }}>
            Số điện thoại: {phoneNumber}
          </Text>
        </View>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Họ và tên"
          value={fullname || ""}
          onChangeText={(text) => setFullname(text)}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Số điện thoại"
          value={phoneNumber || ""}
          onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>
      <View style={{ width: 100 }}>
        <Button
          title={loading ? "Loading ..." : "Cập nhật"}
          buttonStyle={{ backgroundColor: colors.primary, marginStart: 10 }}
          onPress={() =>
            updateProfile({
              fullname: fullname,
              phone_number: phoneNumber,
              avatar_url: avatarUrl,
            })
          }
          disabled={loading}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  verticallySpaced: {
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    width: 350,
  },
  containerBtn: {
    marginTop: 17,
    marginBottom: 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: 350,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
});
