import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import Icon from "./Icon";

interface SearchBarProps {
  onEndEditing?: any | undefined;
  didTouch?: any | undefined;
  autoFocus?: boolean | undefined;
  onTextChange: Function;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onEndEditing,
  didTouch,
  autoFocus = false,
  onTextChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Icon name="Search" color="black" size={32} />
        <TextInput
          style={{
            marginLeft: 10,
            flex: 2,
            fontSize: 20,
            height: 42,
          }}
          placeholder={"Tìm kiếm dịch vụ"}
          autoFocus={autoFocus}
          onTouchStart={didTouch}
          onChangeText={(text) => onTextChange(text)}
          onEndEditing={onEndEditing}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginTop: 20,
  },
  searchBar: {
    display: "flex",
    height: 40,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ededed",
    alignItems: "center",
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: "#E5E5E5",
    borderWidth: 2,
  },
});

export { SearchBar };
