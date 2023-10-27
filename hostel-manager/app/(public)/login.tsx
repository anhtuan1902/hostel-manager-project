import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { User2, LockKeyhole } from "lucide-react-native";
import { colors } from "../../constants/colors";
import { Link } from "expo-router";
import { TextField } from "../../components/TextField";
import { ButtonWithTitle } from "../../components/BtnWithTitle";
import InputWithIcon from "../../components/InputWithIcon";

export default function login() {
  const [isVisbile, setIsVisbile] = useState(true);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const tap = () => {

  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} style="light" />
      <SafeAreaView style={styles.navigation}>
        <Image
          source={require("/TTS/hostel-manager-project/hostel-manager/assets/image/logo.png")}
          style={{ height: 80, width: 80, marginBottom: 20 }}
        />
      </SafeAreaView>
      <View style={styles.body}>
        <Text style={{ fontSize: 30, marginTop: 40, marginBottom: 20 }}>
          Đăng nhập
        </Text>
        <InputWithIcon placeholder="Tài khoản đăng nhập" onTextChange={setUsername} colorIcon='black' sizeIcon={32} icon='User2'  />
        <InputWithIcon placeholder="Mật khẩu" onTextChange={setPassword} isPassword={true} isSecure={true} colorIcon='black' sizeIcon={32} icon='LockKeyhole'/>
        <ButtonWithTitle title="Đăng nhập" onTap={tap}/>
        <Link href="/reset" asChild>
          <Pressable style={styles.linkBtn}>
            <Text>Forgot password?</Text>
          </Pressable>
        </Link>
        <Link href="/register" asChild>
          <Pressable style={styles.linkBtn}>
            <Text>Create Account</Text>
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
  },
});
