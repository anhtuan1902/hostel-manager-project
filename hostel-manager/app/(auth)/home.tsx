import { View, Text, StyleSheet, Alert, Image } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserCircle2 } from "lucide-react-native";
import { ButtonRectangleWithIcon } from "../../components/BtnRectangleWithIcon";
import { ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../utils/supabase";

export default function home() {
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session)
    getProfile();
  }, [session]);

  const router = useRouter()
  const tap = () => {};

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select("fullname, avatar_url")
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.fullname);
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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} style="light" />
      <SafeAreaView style={styles.navigation}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 50,
            marginTop: 20,
          }}
        >
          <View style={{ flexDirection: "column", flex: 1 }}>
            <Text
              style={{
                fontSize: 13,
                marginStart: 30,
                color: colors.tertiary,
              }}
            >
              Xin chao,
            </Text>
            <Text
              style={{
                fontSize: 13,
                marginStart: 30,
                color: colors.secondary,
                fontWeight: "500",
              }}
            >
              {fullname}
            </Text>
          </View>

          <Image
                source={{ uri: avatarUrl }}
                style={{ width: 50, height: 50, borderRadius: 50, marginEnd: 20 }}
              />
        </View>
        <View></View>
      </SafeAreaView>
      <View style={styles.body}>
        <View style={styles.containerCard}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 15,
            }}
          >
            <View>
              <Text style={styles.cardNumber}>Số phòng hiện có</Text>
              <Text style={styles.cardNumber}>0</Text>
            </View>
            <View>
              <Text style={styles.cardNumber}>Số người thuê</Text>
              <Text style={styles.cardNumber}>0</Text>
            </View>
          </View>
          <Text style={styles.cardNumber}>Số phòng trống hiện có</Text>
          <Text style={styles.cardNumber}>0</Text>
        </View>
        <ScrollView style={{}}>
          <ButtonRectangleWithIcon
            icon="Home"
            colorIcon="black"
            sizeIcon={24}
            height={60}
            width={300}
            title="Quản lí phòng"
            onTap={() => { router.push('/room') }}
          />
          <ButtonRectangleWithIcon
            icon="Users2"
            colorIcon="black"
            sizeIcon={24}
            height={60}
            width={300}
            title="Quản lí thông tin người thuê"
            onTap={tap}
          />
          <ButtonRectangleWithIcon
            icon="ClipboardSignature"
            colorIcon="black"
            sizeIcon={24}
            height={60}
            width={300}
            title="Quản lí hợp đồng"
            onTap={tap}
          />
          <ButtonRectangleWithIcon
            icon="Wallet"
            colorIcon="black"
            sizeIcon={24}
            height={60}
            width={300}
            title="Quản lí chi tiêu"
            onTap={tap}
          />
          <ButtonRectangleWithIcon
            icon="FileText"
            colorIcon="black"
            sizeIcon={24}
            height={60}
            width={300}
            title="Quản lí báo cáo"
            onTap={tap}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigation: {
    flex: 2,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 9,
    marginTop: 20,
    alignItems: "center",
  },
  foorer: {
    flex: 1,
  },
  containerCard: {
    backgroundColor: "#fff",
    width: 350,
    height: 180,
    justifyContent: "center",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  cardNumber: {
    fontSize: 14,
    color: "#023047",
    alignSelf: "center",
    marginTop: 10,
  },
});
