import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Icon from "../../components/Icon";

const room = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} style="light" />
      <View style={styles.body}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.containerBtn}>
            <View>
              <Icon name="Home" size={55} color="black" />
            </View>
            <Text style={{ fontSize: 16, marginTop: 10 }}>Phong 1</Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Icon name="Users2" color="black" size={12} />
                <Text style={{ fontSize: 12, marginStart: 5 }}>2</Text>
              </View>
              <View style={{ flexDirection: "row", marginStart: 80 }}>
                <Icon name="Users2" color="black" size={12} />
                <Text style={{ fontSize: 12, marginStart: 5 }}>2</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerBtn}>
            <View>
              <Icon name="Home" size={55} color="black" />
            </View>
            <Text style={{ fontSize: 16, marginTop: 10 }}>Phong 1</Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Icon name="Users2" color="black" size={12} />
                <Text style={{ fontSize: 12, marginStart: 5 }}>2</Text>
              </View>
              <View style={{ flexDirection: "row", marginStart: 80 }}>
                <Icon name="Users2" color="black" size={12} />
                <Text style={{ fontSize: 12, marginStart: 5 }}>2</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default room;

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
  containerBtn: {
    margin: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
});
