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
}

const ButtonRectangleWithIcon: React.FC<ButtonProps> = ({
  onTap,
  width,
  height,
  icon,
  title,
  sizeIcon,
  colorIcon,
}) => {
  return (
    <TouchableOpacity
      style={[styles.containerBtn, { width, height }]}
      onPress={() => onTap()}
    >
      <View style={{ marginRight: 20 }}>
        <Icon name={icon} size={sizeIcon} color={colorIcon} />
      </View>
      <Text style={{ fontSize: 16, width: 125 }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerBtn: {
    marginTop: 17,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: 300,
    height: 100,
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

export { ButtonRectangleWithIcon };
