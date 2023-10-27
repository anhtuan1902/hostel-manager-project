import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { SearchBar } from "../../components/SearchBar";
import { ButtonSquareWithIcon } from "../../components/BtnSquareWithIcon";
import { ScrollView } from "react-native-gesture-handler";

const service = () => {
  const [search, setSearch] = useState("");
  const tap = () => {};

  return (
    <View style={{ flex: 1, marginHorizontal: 20 }}>
      <SearchBar onTextChange={setSearch} />
      <ScrollView style={{ flexDirection: "row" }}>
        <View>
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
        <View>
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
  );
};

export default service;

const styles = StyleSheet.create({});
