import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import colors from "../../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

// https://hossein-zare.github.io/react-native-dropdown-picker-website/

const DropDown = ({
  placeholder,
  icon,
  value,
  setValue,
  data = [],
  setData,
}) => {
  const [open, setOpen] = useState(false);

  //   return console.log(data, setData, value);

  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons name={icon} size={20} color={colors.medium} />
      )}
      <DropDownPicker
        open={open}
        value={value}
        items={data}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setData}
        placeholder={placeholder}
        placeholderStyle={{
          color: colors.medium,
        }}
        listMode="FLATLIST"
        containerStyle={styles.input}
        style={{
          borderWidth: 0,
        }}
        dropDownContainerStyle={{
          borderWidth: 0,
          zIndex: 1,
        }}
        selectedItemContainerStyle={{
          backgroundColor: colors.light,
        }}
        customItemContainerStyle={{
          backgroundColor: "red",
        }}
      />
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
    backgroundColor: colors.white,
    margin: 5,
    zIndex: 1,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 0,
    flex: 1,
  },
});
