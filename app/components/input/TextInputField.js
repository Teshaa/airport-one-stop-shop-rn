import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../utils/colors";

const TextInputField = ({
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  width,
  backgroundColor = colors.white,
  ...otherProps
}) => {
  return (
    <View style={[styles.container, { width, backgroundColor }]}>
      {icon && (
        <MaterialCommunityIcons name={icon} size={20} color={colors.medium} />
      )}
      <TextInput
        style={styles.text}
        placeholder={placeholder}
        placeholderTextColor={colors.medium}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        {...otherProps}
      />
    </View>
  );
};

export default TextInputField;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    padding: 10,

    margin: 5,
  },
  text: {
    paddingHorizontal: 10,
    flex: 1,
  },
});
