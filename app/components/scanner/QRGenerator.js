import { StyleSheet, Text, View } from "react-native";
import React from "react";
import QRCodeStyled from "react-native-qrcode-styled";
import { useTheme } from "react-native-paper";

// Dependancy: react-native-svg react-native-qrcode-styled
const QRGenerator = ({ value, style }) => {
  const { colors } = useTheme();
  return (
    <View style={style}>
      <QRCodeStyled
        data={value}
        style={{ backgroundColor: "white" }}
        color={colors.primary}
        pieceBorderRadius={10}
        padding={20}
        pieceSize={15}
        logo={require("../../assets/logo.png")}
      />
    </View>
  );
};

export default QRGenerator;

const styles = StyleSheet.create({});
