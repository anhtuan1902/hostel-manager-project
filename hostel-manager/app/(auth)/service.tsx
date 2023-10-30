import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SearchBar } from "../../components/SearchBar";
import { ButtonSquareWithIcon } from "../../components/BtnSquareWithIcon";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../constants/colors";
import { StatusBar } from "expo-status-bar";
import Icon from "../../components/Icon";

const service = () => {
  const [search, setSearch] = useState("");
  const tap = () => {};

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} style="light" />
      <View style={styles.body}>
        <SearchBar onTextChange={setSearch} />
        <ScrollView>
          <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
            <ButtonSquareWithIcon
              colorIcon="black"
              icon="Zap"
              sizeIcon={52}
              height={150}
              width={150}
              detail="3.500d/kw"
              title="Dien"
              onTap={tap}
            />
            <ButtonSquareWithIcon
              colorIcon="black"
              icon="Zap"
              sizeIcon={52}
              height={150}
              width={150}
              detail="3.500d/kw"
              title="Dien"
              onTap={tap}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.foorer}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            width: 50,
            borderRadius: 50,
          }}
        >
          <Icon name="Plus" color={colors.white} size={50} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default service;

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
    flex: 8,
    marginTop: 20,
    alignItems: "center",
    marginHorizontal: 20,
  },
  foorer: {
    flex: 1,
    alignSelf: "flex-end",
    marginEnd: 20,
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
