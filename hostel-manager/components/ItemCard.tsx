import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  isFront: boolean;
  textHidden?: boolean;
  width?: number;
  height?: number;
}
const ItemCard = ({ isFront, textHidden, width, height }: Props) => {

  const styles = StyleSheet.create({
    container: {
      
      backgroundColor: "#fff",
      width: 300,
      height: 100,
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
      fontSize: 18,
      color: "#023047",
      alignSelf: "center",
      marginTop: 20,
    },
  });

  return (
    <View style={styles.container}>
      {isFront && !textHidden && <Text style={styles.cardNumber}>sdsad</Text>}
      {!isFront && <Text style={styles.cardNumber}>2</Text>}
    </View>
  );
};
export default ItemCard;


