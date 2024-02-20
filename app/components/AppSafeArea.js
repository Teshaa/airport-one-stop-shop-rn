import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import React from "react";

const AppSafeArea = ({ children }) => {
  return <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>;
};

export default AppSafeArea;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
