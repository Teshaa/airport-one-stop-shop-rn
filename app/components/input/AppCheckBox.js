import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Checkbox from "expo-checkbox";

const AppCheckBox = ({ text, value, onValueChange }) => {
  return (
    <View style={styles.section} onPress={() => {}}>
      <Checkbox
        style={styles.checkbox}
        value={value}
        onValueChange={onValueChange}
      />
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
};

export default AppCheckBox;

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});
