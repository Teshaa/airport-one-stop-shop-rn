import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, IconButton, List } from "react-native-paper";
import colors from "../../utils/colors";

const QuanterSizer = ({ value = 0, onIncrement, onDecrement, style }) => {
  return (
    <View style={[styles.container, style]}>
      <IconButton
        style={styles.btn}
        icon="minus"
        size={10}
        mode="outlined"
        iconColor={colors.white}
        onPress={onDecrement}
      />
      <Text style={styles.text}>{value}</Text>
      <IconButton
        onPress={onIncrement}
        style={styles.btn}
        icon="plus"
        size={10}
        iconColor={colors.white}
      />
    </View>
  );
};

export default QuanterSizer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  btn: {
    // borderWidth: 1,
    padding: 0,
    borderRadius: 2,
    margin: 0,
    backgroundColor: colors.medium,
    // color: colors.white,
  },
  text: {
    fontWeight: "bold",
    color: colors.medium,
    height: 26,
    // fontSize: 20,
    verticalAlign: "middle",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    textAlign: "center",
    borderColor: colors.medium,
  },
});
