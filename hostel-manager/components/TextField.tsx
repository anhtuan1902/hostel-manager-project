import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Eye } from "lucide-react-native";

interface TextFieldProps {
  placeholder: string;
  isSecure?: boolean;
  onTextChange: Function;
  isPassword?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  isSecure = false,
  isPassword = false,
  onTextChange,
}) => {
  const [isVisbile, setIsVisbile] = useState(isSecure);

  useEffect(() => {
    setIsVisbile(isSecure);
  }, []);

  return (
    <>
      <TextInput
        placeholder={placeholder}
        autoCapitalize="none"
        onChangeText={(text) => onTextChange(text)}
        secureTextEntry={isVisbile}
        style={styles.textField}
      />
      {isPassword == true ? (
        <TouchableOpacity
          onPress={() => {
            setIsVisbile(!isVisbile);
          }}
        >
          <Eye size={24} color="black" />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textField: {
    flex: 1,
    height: 50,
    fontSize: 20,
    color: "#000",
  },
});
