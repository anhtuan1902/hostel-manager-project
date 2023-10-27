import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../constants/colors";
import { TextField } from "../../components/TextField";
import { ButtonWithTitle } from "../../components/BtnWithTitle";
import { Link } from "expo-router";
import {
  User2,
  LockKeyhole,
  Smartphone,
  PenLine,
  Mail,
} from "lucide-react-native";
import InputWithIcon from "../../components/InputWithIcon";

const Register = () => {
  const nav = useNavigation();

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("Login");
  const [isSignup, setIsSignup] = useState(false);

  const tap = () => {};

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
            }}
          >
            Đăng kí
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "400",
              color: "grey",
              marginTop: 5,
            }}
          >
            Nhập vào thông tin cần thiết để tạo tài khoản
          </Text>

          <InputWithIcon
            placeholder="Họ và tên"
            onTextChange={setUsername}
            colorIcon="black"
            icon="PenLine"
            sizeIcon={32}
          />
          <InputWithIcon
            placeholder="Tài khoản đăng nhập"
            onTextChange={setUsername}
            colorIcon="black"
            icon="User2"
            sizeIcon={32}
          />
          <InputWithIcon
            placeholder="Số điện thoại"
            onTextChange={setUsername}
            colorIcon="black"
            icon="Smartphone"
            sizeIcon={32}
          />
          <InputWithIcon
            placeholder="Địa chỉ email"
            onTextChange={setUsername}
            colorIcon="black"
            icon="Mail"
            sizeIcon={32}
          />
          <InputWithIcon
            placeholder="Mật khẩu"
            onTextChange={setUsername}
            colorIcon="black"
            icon="LockKeyhole"
            sizeIcon={32}
            isPassword={true}
            isSecure={true}
          />
          <InputWithIcon
            placeholder="Nhập lại mật khẩu"
            onTextChange={setUsername}
            colorIcon="black"
            icon="LockKeyhole"
            sizeIcon={32}
            isPassword={true}
            isSecure={true}
          />
          <Text
            style={{
              fontSize: 13,
              fontWeight: "400",
              color: "black",
              marginTop: 15,
              lineHeight: 25,
              width: "80%",
              opacity: 0.5,
            }}
            numberOfLines={2}
          >
            Bằng cách tiếp tục, bạn đồng ý với Điều khoản dịch vụ và Chính sách
            quyền riêng tư của chúng tôi
          </Text>
          <ButtonWithTitle title="Đăng kí" onTap={tap} />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <Text style={{ fontSize: 16 }}>Đã có tài khoản?</Text>
            <Link href="/login" asChild>
              <Pressable style={styles.linkBtn}>
                <Text
                  style={{
                    fontSize: 15,
                    color: colors.primary,
                    fontWeight: "600",
                  }}
                >
                  Đăng nhập ngay
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  linkBtn: {
    margin: 8,
    alignItems: "center",
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
});
