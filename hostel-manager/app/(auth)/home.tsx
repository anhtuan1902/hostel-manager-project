import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserCircle2 } from "lucide-react-native";
import { ButtonRectangleWithIcon } from "../../components/BtnRectangleWithIcon";
import { ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

export default function home() {
  const router = useRouter()
  const tap = () => {};

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
              Tran Anh Tuan
            </Text>
          </View>

          <UserCircle2
            size={32}
            style={{ flex: 1, marginRight: 30 }}
            color="black"
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
