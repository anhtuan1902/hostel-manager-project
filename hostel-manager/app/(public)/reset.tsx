import { View, StyleSheet, TextInput, Button, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import { colors } from "../../constants/colors";
import { supabase } from "../../utils/supabase";

const PwReset = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        setSuccessfulCreation(true);
      }
    });
  }, []);

  // Request a passowrd reset code by email
  const onRequestReset = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(emailAddress);
      if (error) {
        console.log("Không tồn tại email đăng kí!", error);
      }
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    try {
      if (password === passwordConfirm) {
        const { data, error } = await supabase.auth.updateUser({
          password: password,
        });

        if (data) {
          router.push("/login");
          Alert.alert("Cập nhật mật khẩu thành công!");
        }
        if (error) alert("Có lỗi gì đó khi cập nhật mật khẩu! Thử lại sau!");
      } else {
        Alert.alert("Mật khẩu không khớp với nhau!");
      }
    } catch (err: any) {
      Alert.alert(err.errors[0].message);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

      {!successfulCreation && (
        <>
          <Text
            style={{
              fontSize: 30,
              marginBottom: 20,
              fontFamily: "open-sans-bold",
              color: colors.primary,
            }}
          >
            Xác thực Email
          </Text>
          <TextInput
            autoCapitalize="none"
            placeholder="abc@gmail.com"
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={styles.inputField}
          />

          <View style={{ marginTop: 20 }}>
            <Button
              onPress={onRequestReset}
              title="Gửi email xác nhận"
              color={colors.primary}
            ></Button>
          </View>
          <View style={{ marginTop: 20 }}>
            <Button
              title="quay lại"
              onPress={() => {
                router.back();
              }}
              color={colors.primary}
            ></Button>
          </View>
        </>
      )}

      {successfulCreation && (
        <>
          <View>
            <Text
              style={{
                fontSize: 30,
                marginBottom: 20,
                fontFamily: "open-sans-bold",
                color: colors.primary,
              }}
            >
              Nhập lại mật khẩu mới
            </Text>
            <TextInput
              value={password}
              placeholder="Nhập mật khẩu mới"
              style={styles.inputField}
              secureTextEntry
              onChangeText={setPassword}
            />
            <TextInput
              placeholder="Nhập lại mật khẩu mới"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              secureTextEntry
              style={styles.inputField}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Button
              onPress={onReset}
              title="Đặt mật khẩu mới"
              color={colors.primary}
            ></Button>
          </View>
          <View style={{ marginTop: 20 }}>
            <Button
              title="quay lại"
              onPress={() => {
                router.back();
              }}
              color={colors.primary}
            ></Button>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  button: {
    margin: 8,
    alignItems: "center",
  },
});

export default PwReset;
