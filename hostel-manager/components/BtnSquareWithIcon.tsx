import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "./Icon";

interface ButtonProps {
  onTap: Function;
  title: string;
  width: number;
  height: number;
  icon: any;
  sizeIcon: any;
  colorIcon: any;
  detail: string;
}

const ButtonSquareWithIcon: React.FC<ButtonProps> = ({
  onTap,
  width,
  height,
  icon,
  title,
  sizeIcon,
  colorIcon,
  detail
}) => {
  return (
    <TouchableOpacity
      style={[styles.containerBtn, { width, height }]}
      onPress={() => onTap()}
    >
      <View >
        <Icon name={icon} size={sizeIcon} color={colorIcon} />
      </View>
      <Text style={{ fontSize: 16, marginTop: 10 }}>{title}</Text>
      <Text style={{ fontSize: 16 }}>{detail}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerBtn: {
    marginTop: 10,
    backgroundColor: "#fff",
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

export { ButtonSquareWithIcon };
