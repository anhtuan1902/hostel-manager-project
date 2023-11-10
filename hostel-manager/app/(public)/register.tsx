import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";
import { ButtonWithTitle } from "../../components/BtnWithTitle";
import { Link } from "expo-router";
import InputWithIcon from "../../components/InputWithIcon";
import { supabase } from "../../utils/supabase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    if (password === confirmPassword) {
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) Alert.alert(error.message);
      if (!session)
        Alert.alert("Please check your inbox for email verification!");
    }
    setLoading(false);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <ScrollView style={{ flex: 1, paddingTop: 70 }}>
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
              fontFamily: "open-sans-bold",
            }}
          >
            Đăng kí
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
            Nhập vào thông tin cần thiết để tạo tài khoản
          </Text>

          <InputWithIcon
            placeholder="Tài khoản Email"
            onTextChange={setEmail}
            colorIcon="black"
            icon="User2"
            sizeIcon={32}
          />
          <InputWithIcon
            placeholder="Mật khẩu"
            onTextChange={setPassword}
            colorIcon="black"
            icon="LockKeyhole"
            sizeIcon={32}
            isPassword={true}
            isSecure={true}
          />
          <InputWithIcon
            placeholder="Nhập lại mật khẩu"
            onTextChange={setConfirmPassword}
            colorIcon="black"
            icon="LockKeyhole"
            sizeIcon={32}
            isPassword={true}
            isSecure={true}
          />
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: "grey",
              marginTop: 15,
              lineHeight: 25,
              width: 300,
              opacity: 0.7,

              fontFamily: "open-sans",
            }}
            numberOfLines={2}
          >
            Bằng cách{" "}
            <Text style={{ fontFamily: "open-sans-bold" }}>ĐĂNG KÍ</Text>, bạn
            đồng ý với Điều khoản dịch vụ và Chính sách quyền riêng tư của chúng
            tôi
          </Text>
          <ButtonWithTitle
            title="Đăng kí"
            onTap={signUpWithEmail}
            disabled={loading}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: "open-sans" }}>
              Đã có tài khoản?
            </Text>
            <Link href="/login" disabled={loading} asChild>
              <Pressable style={styles.linkBtn}>
                <Text
                  style={{
                    fontSize: 15,
                    color: colors.primary,
                    fontWeight: "600",
                    fontFamily: "open-sans",
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
});
