import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, useTheme, Text } from "react-native-paper";
import QRCodeStyled from "react-native-qrcode-styled";
import * as Clipboard from "expo-clipboard";

const CodeDisplayCopy = ({ message }) => {
  const { colors, roundness } = useTheme();

  const copyToClipBoard = async () => {
    await Clipboard.setStringAsync(message);
  };
  return (
    <View style={[styles.code, { bordderRadius: roundness }]}>
      <QRCodeStyled
        data={message}
        style={{ backgroundColor: "white" }}
        color={colors.primary}
        // pieceBorderRadius={10}
        padding={10}
        pieceSize={8}
      />
      <Text variant="titleMedium" style={{color: colors.primary}}>{message}</Text>
      <Button icon="content-copy" onPress={copyToClipBoard}>
        COPY CODE
      </Button>
    </View>
  );
};

export default CodeDisplayCopy;

const styles = StyleSheet.create({
  code: {
    padding: 10,
    alignItems: "center",
    overflow: "hidden",
  },
});
