import { StyleSheet, View } from "react-native";
import React from "react";
import { TextField } from "./TextField";
import Icon from "./Icon";

interface Props {
  placeholder: string;
  isSecure?: boolean;
  onTextChange: Function;
  isPassword?: boolean;
  icon: any;
  colorIcon: any;
  sizeIcon: any;
  value?: any;
}

const InputWithIcon: React.FC<Props> = ({
  placeholder,
  isPassword = false,
  isSecure = false,
  icon,
  colorIcon,
  sizeIcon,
  value,
  onTextChange
}) => {
  return (
    <View style={styles.containerInput}>
      <View style={{ marginEnd: 20 }}>
        <Icon name={icon} color={colorIcon} size={sizeIcon} />
      </View>
      <TextField
        placeholder={placeholder}
        onTextChange={onTextChange}
        isPassword={isPassword}
        isSecure={isSecure}
        value={value}
      />
    </View>
  );
};

export default InputWithIcon;

const styles = StyleSheet.create({
  containerInput: {
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: "#DBDBDB",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 20,
    paddingRight: 10,
    width: 320,
    fontFamily: 'open-sans'
  },
});
