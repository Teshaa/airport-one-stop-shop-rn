import { Dimensions, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { IconButton, useTheme, Text } from "react-native-paper";
import { Modal } from "react-native";
import Scanner from "./Scanner";

const screenWidth = Dimensions.get("screen").width;

const CodeScanner = ({
  onScaned,
  label = "Scan QR Code",
  widthRation = 0.15,
}) => {
  const { colors } = useTheme();
  const [show, setShow] = useState(false);
  return (
    <View style={styles.container}>
      <IconButton
        icon="qrcode-scan"
        size={screenWidth * widthRation}
        mode="outlined"
        containerColor={colors.secondary}
        iconColor={colors.surface}
        onPress={() => setShow(true)}
      />
      <Text>{label}</Text>
      <Modal
        visible={show}
        onRequestClose={(onRequestClose) => setShow(false)}
        animationType="slide"
      >
        <Scanner
          onScanned={({ type, data }) => {
            setShow(false);
            if (onScaned instanceof Function) {
              onScaned(data);
            }
          }}
          requestCancel={() => setShow(false)}
        />
      </Modal>
    </View>
  );
};

export default CodeScanner;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
