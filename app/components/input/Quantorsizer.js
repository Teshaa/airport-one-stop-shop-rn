import { StyleSheet, View } from "react-native";
import React from "react";
import { IconButton, Text } from "react-native-paper";
import colors from "../../utils/colors";

const Quantorsizer = ({ value = 0, onIncreament, onDecrement }) => {
  return (
    <View style={styles.qContainer}>
      <IconButton icon="minus" onPress={onDecrement} />
      <Text style={styles.text}>{value}</Text>
      <IconButton icon="plus" onPress={onIncreament} />
    </View>
  );
};

export default Quantorsizer;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    verticalAlign: "middle",
  },
  qContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.medium,
  },
});
