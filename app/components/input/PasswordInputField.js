import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../utils/colors";

const PasswordInputField = ({ icon, placeholder, value, onChangeText }) => {
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons name={icon} size={20} color={colors.medium} />
      )}
      <TextInput
        style={styles.text}
        placeholder={placeholder}
        placeholderTextColor={colors.medium}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!visible}
      />
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <MaterialCommunityIcons
          name={visible ? "eye" : "eye-off"}
          size={20}
          color={colors.medium}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInputField;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
    backgroundColor: colors.white,
    margin: 5,
  },
  text: {
    paddingHorizontal: 10,
    flex: 1,
  },
});
