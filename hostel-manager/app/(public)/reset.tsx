import { View, StyleSheet, TextInput, Button, Text } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { colors } from '../../constants/colors';

const PwReset = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);

  // Request a passowrd reset code by email
//   const onRequestReset = async () => {
//     try {
//       await signIn.create({
//         strategy: 'reset_password_email_code',
//         identifier: emailAddress,
//       });
//       setSuccessfulCreation(true);
//     } catch (err: any) {
//       alert(err.errors[0].message);
//     }
//   };

//   // Reset the password with the code and the new password
//   const onReset = async () => {
//     try {
//       const result = await signIn.attemptFirstFactor({
//         strategy: 'reset_password_email_code',
//         code,
//         password,
//       });
//       console.log(result);
//       alert('Password reset successfully');

//       // Set the user session active, which will log in the user automatically
//       await setActive({ session: result.createdSessionId });
//     } catch (err: any) {
//       alert(err.errors[0].message);
//     }
//   };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />
        
      {!successfulCreation && (
        <>
            <Text style={{fontSize: 30, marginBottom: 20}}>Xác thực Email</Text>
          <TextInput autoCapitalize="none" placeholder="abc@gmail.com" value={emailAddress} onChangeText={setEmailAddress} style={styles.inputField} />
        {/* onPress={onRequestReset} */}
          <Button  title="Gửi email xác nhận" color={colors.primary}></Button>
        </>
      )}

      {successfulCreation && (
        <>
          <View>
          <Text style={{fontSize: 30, marginBottom: 20}}>Nhập lại mật khẩu mới</Text>
            <TextInput value={code} placeholder="Mã xác thực" style={styles.inputField} onChangeText={setCode} />
            <TextInput placeholder="Mật khẩu mới" value={password} onChangeText={setPassword} secureTextEntry style={styles.inputField} />
          </View>
          {/* onPress={onReset} */}
          <Button  title="Set new Password" color={colors.primary}></Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20
  },
  button: {
    margin: 8,
    alignItems: 'center',
  },
});

export default PwReset;