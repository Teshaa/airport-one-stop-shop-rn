import { Image, View, StyleSheet } from "react-native";
import React from "react";
import colors from "../utils/colors";

const getVariant = (variant) => {
  if (variant === "black") {
    return require("../assets/logo-black.png");
  }
  if (variant === "white") {
    return require("../assets/logo-white.png");
  }
  return require("../assets/logo-white.png");
};

const Logo = ({ variant, size = 100, backgroundColor }) => {
  return (
    <View style={{ backgroundColor }}>
      <Image
        style={{ width: size, height: size }}
        source={getVariant(variant)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Logo;
