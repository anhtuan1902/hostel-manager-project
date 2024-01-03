import { View, Text, StyleSheet, Alert, Image } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserCircle2 } from "lucide-react-native";
import { ButtonRectangleWithIcon } from "../../../components/BtnRectangleWithIcon";
import { useRouter } from "expo-router";
import { supabase } from "../../../utils/supabase";
import { useAuth } from "../../../provider/AuthProvider";
import { Contract, Hostel, Lessee, Room } from "../../../provider/Database";

export default function home() {
  const [fullname, setFullname] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const { user, session } = useAuth();
  const [listLessee, setListLessee] = useState<Lessee[]>([]);
  const [listHostel, setListHostel] = useState<Hostel[]>([]);
  const [listRoom, setListRoom] = useState<Room[]>([]);
  const [listContract, setListContract] = useState<Contract[]>([]);

  useEffect(() => {
    if (session) {
      getProfile();
      getData();
    }
  }, [session]);

  const router = useRouter();
  const tap = () => {};

  async function getProfile() {
    try {
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
    }
  }

  async function getData() {
    try {
      if (!user) throw new Error("No user on the session!");

      const { data: lessees } = await supabase
        .from("manage_lessee")
        .select("*")
        .eq("created_by", user.id);

      const { data: hostels } = await supabase
        .from("hostels")
        .select("*")
        .eq("owner_id", user.id);

      const { data: rooms } = await supabase
        .from("rooms")
        .select("*, hostels(id, owner_id)")
        .eq("hostels.owner_id", user.id);

      const { data: contracts } = await supabase
        .from("manage_rental_contract")
        .select("*, rooms(id), hostels(id, owner_id)")
        .eq("hostels.owner_id", user.id);

      if (lessees) {
        setListLessee(lessees);
      }
      if (hostels) {
        setListHostel(hostels);
      }
      if (rooms) {
        setListRoom(rooms);
      }
      if (contracts) {
        setListContract(contracts);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
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
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <View style={{ flexDirection: "column", flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                marginStart: 30,
                color: colors.white,
                fontFamily: "open-sans",
              }}
            >
              Xin chào,
            </Text>
            <Text
              style={{
                fontSize: 13,
                marginStart: 30,
                color: colors.white,
                fontWeight: "500",
                fontFamily: "open-sans-bold",
              }}
            >
              {fullname}
            </Text>
          </View>
          {avatarUrl ? (
            <Image
              source={{ uri: avatarUrl }}
              style={{
                width: 35,
                height: 35,
                borderRadius: 50,
                marginEnd: 20,
              }}
            />
          ) : (
            <UserCircle2
              size={32}
              style={{ flex: 1, marginRight: 30 }}
              color="black"
            />
          )}
        </View>
        <Image
          source={require("../../../assets/image/logo.png")}
          style={{ height: 60, width: 60, marginBottom: 10 }}
        />
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
            <View style={{ width: 120 }}>
              <Text style={styles.cardNumber}>Số tòa nhà hiện có</Text>
              <Text style={styles.cardNumber}>{listHostel.length}</Text>
            </View>
            <View style={{ width: 120 }}>
              <Text style={styles.cardNumber}>Số người thuê</Text>
              <Text style={styles.cardNumber}>{listLessee.length}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 15,
            }}
          >
            <View style={{ width: 120 }}>
              <Text style={styles.cardNumber}>Số phòng hiện có</Text>
              <Text style={styles.cardNumber}>{listRoom.length}</Text>
            </View>
            <View style={{ width: 120 }}>
              <Text style={styles.cardNumber}>Số phòng trống</Text>
              <Text style={styles.cardNumber}>{ listRoom.length - listContract.length > 0 ? listRoom.length - listContract.length : 0}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          {/* <ButtonRectangleWithIcon
            icon="TableProperties"
            colorIcon="black"
            sizeIcon={24}
            height={60}
            width={300}
            title="Quản lí dịch vụ"
            onTap={() => {
              router.push("/home/manage_service");
            }}
          /> */}
          <ButtonRectangleWithIcon
            icon="Users2"
            colorIcon="black"
            sizeIcon={24}
            height={60}
            width={300}
            title="Quản lí thông tin người thuê"
            onTap={() => {
              router.push("/home/manage_lessee");
            }}
          />
          <ButtonRectangleWithIcon
            icon="ClipboardSignature"
            colorIcon="black"
            sizeIcon={24}
            height={60}
            width={300}
            title="Quản lí hợp đồng"
            onTap={() => {
              router.push("/home/manage_contract");
            }}
          />
          <ButtonRectangleWithIcon
            icon="Wallet"
            colorIcon="black"
            sizeIcon={24}
            height={60}
            width={300}
            title="Quản lí chi tiêu"
            onTap={() => {
              router.push("/home/manage_report");
            }}
          />
          {/* <ButtonRectangleWithIcon
            icon="FileText"
            colorIcon="black"
            sizeIcon={24}
            height={60}
            width={300}
            title="Quản lí báo cáo"
            onTap={tap}
          /> */}
        </View>
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
    fontSize: 13,
    color: "#023047",
    alignSelf: "center",
    marginTop: 10,
    fontFamily: "open-sans-bold",
  },
});
