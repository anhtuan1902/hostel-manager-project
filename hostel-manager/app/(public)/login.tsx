import { View, Text, StyleSheet, Image, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";
import { Link } from "expo-router";
import { ButtonWithTitle } from "../../components/BtnWithTitle";
import InputWithIcon from "../../components/InputWithIcon";
import { supabase } from "../../utils/supabase";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    if (email && password) {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) Alert.alert(error.message);

      
    }else{
      Alert.alert("Vui lòng nhập tài khoản hoặc mật khẩu!!!");
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} style="light" />
      <SafeAreaView style={styles.navigation}>
        <Image
          source={require("../../assets/image/logo.png")}
          style={{ height: 80, width: 80, marginBottom: 20 }}
        />
      </SafeAreaView>
      <View style={styles.body}>
        <Text
          style={{
            fontSize: 42,
            marginTop: 40,
            marginBottom: 20,
            fontFamily: "open-sans-bold",
            color: colors.primary,
          }}
        >
          Đăng nhập
        </Text>
        <InputWithIcon
          placeholder="Tài khoản đăng nhập"
          onTextChange={setEmail}
          colorIcon="black"
          sizeIcon={32}
          icon="User2"
        />
        <InputWithIcon
          placeholder="Mật khẩu"
          onTextChange={setPassword}
          isPassword={true}
          isSecure={true}
          colorIcon="black"
          sizeIcon={32}
          icon="LockKeyhole"
        />
        <ButtonWithTitle
          title="Đăng nhập"
          onTap={signInWithEmail}
          disabled={loading}
        />
        <Link href="/reset" asChild>
          <Pressable style={styles.linkBtn}>
            <Text>Quên mật khẩu?</Text>
          </Pressable>
        </Link>
        <Link href="/register" disabled={loading} asChild>
          <Pressable style={styles.linkBtn}>
            <Text>Tạo tài khoản mới</Text>
          </Pressable>
        </Link>
      </View>
      <View style={styles.foorer}>
        <Text></Text>
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
    flex: 7,
    alignItems: "center",
  },
  foorer: {
    flex: 1,
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
  linkBtn: {
    margin: 8,
    alignItems: "center",
    fontFamily: "open-sans",
  },
});
