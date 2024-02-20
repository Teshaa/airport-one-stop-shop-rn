import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppButton from "../../components/input/AppButton";
import colors from "../../utils/colors";
import Logo from "../../components/Logo";
import routes from "../../navigation/routes";

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assets/shopping-1.jpg")}
      resizeMode="cover"
    >
      <View style={styles.col}>
        <View style={{ alignItems: "center" }}>
          <Logo size={300} />
        </View>
        <View style={{ width: "100%" }}>
          <AppButton
            title="Login"
            backgroundColor={colors.medium}
            onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
          />
          <AppButton
            title="Register"
            backgroundColor={colors.medium}
            onPress={() => navigation.navigate(routes.REGISTER_SCREEN)}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  col: {
    backgroundColor: colors.back1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
  },
  slogan: {
    fontWeight: "bold",
    textAlign: "center",
    fontStyle: "italic",
    // color: colors.white,
  },
});
