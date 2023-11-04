import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { colors } from "../constants/colors";

interface ButtonProps {
  onTap: Function;
  title: string;
  disabled?: boolean;
}

const ButtonWithTitle: React.FC<ButtonProps> = ({
  onTap,
  title,
  disabled = false
}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={() => onTap()} disabled={disabled}>
      <Text style={{ fontSize: 20, 
    fontFamily: 'open-sans' }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    fontFamily: 'open-sans',
    height: 50,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    paddingLeft: 50,
    paddingRight: 50,
    width: 320,
  },
});

export { ButtonWithTitle };
