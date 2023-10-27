import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { colors } from "../constants/colors";

interface ButtonProps {
  onTap: Function;
  title: string;
}

const ButtonWithTitle: React.FC<ButtonProps> = ({
  onTap,
  title,
}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={() => onTap()}>
      <Text style={{ fontSize: 20 }}>{title}</Text>
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
  },
});

export { ButtonWithTitle };
