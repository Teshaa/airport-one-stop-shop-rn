import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import colors from "../../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Menu, Provider } from "react-native-paper";

const DropDownMenu = ({ children, icon, placeholder }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <Provider>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        style={{ position: "relative", zIndex: 1 }}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <View style={styles.container}>
              {icon && (
                <MaterialCommunityIcons
                  name={icon}
                  size={20}
                  color={colors.medium}
                />
              )}
              <Text style={styles.text}>{placeholder}</Text>
              <MaterialCommunityIcons
                name="chevron-down"
                size={20}
                color={colors.medium}
              />
            </View>
          </TouchableOpacity>
        }
      >
        <Menu.Item onPress={() => {}} title="Item 1" />
        <Menu.Item onPress={() => {}} title="Item 2" />

        <Menu.Item onPress={() => {}} title="Item 3" />
      </Menu>
    </Provider>
  );
};

export default DropDownMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
    backgroundColor: colors.white,
    margin: 5,
  },
  text: {
    flex: 1,
    height: 300,
    paddingHorizontal: 10,
  },
});
