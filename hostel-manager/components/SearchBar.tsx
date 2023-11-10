import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import Icon from "./Icon";

interface SearchBarProps {
  onEndEditing?: any | undefined;
  didTouch?: any | undefined;
  autoFocus?: boolean | undefined;
  onTextChange: Function;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onEndEditing,
  didTouch,
  autoFocus = false,
  onTextChange,
  placeholder
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
          placeholder={placeholder}
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
    marginTop: 10,
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
