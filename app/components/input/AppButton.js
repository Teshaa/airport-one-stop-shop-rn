import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../utils/colors";
import { ActivityIndicator } from "react-native-paper";

const AppButton = ({
  title,
  onPress,
  backgroundColor = colors.primary,
  color = colors.white,
  loading = false,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={loading}>
      <View style={[styles.container, { backgroundColor }]}>
        {loading ? (
          <ActivityIndicator color={color} />
        ) : (
          <Text style={[styles.text, { color }]}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 20,
    padding: 15,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
