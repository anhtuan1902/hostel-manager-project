import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { colors } from "../../constants/colors";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import InputWithIcon from "../../components/InputWithIcon";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "../../components/Icon";
import { ButtonWithTitle } from "../../components/BtnWithTitle";

const profile = () => {

  const tap = () => {

  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} style="light" />
      <View style={styles.body}>
        <View style={styles.containerBtn}>
          <View style={{ marginRight: 60 }}>
            <Icon name="User" size={60} color="black" />
          </View>
          <View>
          <Text style={{ fontSize: 25 }}>Tran Anh Tuan</Text>
          <Text style={{ fontSize: 16 }}>Tran Anh Tuan</Text>
          </View>
        </View>
      </View>
      <View style={styles.foorer}>
        <ButtonWithTitle title="Dang xuat" onTap={tap} />
      </View>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20
  },
  navigation: {
    flex: 2,
    backgroundColor: colors.primary,

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
  containerBtn: {
    marginTop: 17,
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
