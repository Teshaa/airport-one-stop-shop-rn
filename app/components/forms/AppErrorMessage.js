import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

function AppErrorMessage({ error, visible }) {
  if (!visible || !error) return null;

  return <Text style={styles.error}>{error}</Text>;
}

const styles = StyleSheet.create({
  error: {
    color: "red",
    paddingHorizontal: 10,
  },
});

export default AppErrorMessage;
