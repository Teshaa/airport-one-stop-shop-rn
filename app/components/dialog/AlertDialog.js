import { StyleSheet, View, Image, Dimensions } from "react-native";
import React, { useState } from "react";
import { Text, Button } from "react-native-paper";
import { getDialogIcon } from "./helpers";

const screenWidth = Dimensions.get("screen").width;
const AlertDialog = ({ mode, message, onButtonPress }) => {
  return (
    <View style={styles.dialog}>
      <Image style={styles.img} source={getDialogIcon(mode)} />
      <Text style={styles.text}>{message}</Text>
      <Button mode="outlined" onPress={onButtonPress}>
        Ok
      </Button>
    </View>
  );
};

export default AlertDialog;

const styles = StyleSheet.create({
  dialog: {
    width: screenWidth * 0.75,
  },
  img: {
    alignSelf: "center",
    width: 100,
    height: 100,
  },
  text: {
    textAlign: "center",
    padding: 10,
  },
});
