import { StyleSheet, View, TextInput } from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import colors from "../../utils/colors";

const SearchBar = ({ setSearchString, searchButton }) => {
  return (
    <View style={styles.search}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        // onChangeText={setSearchString}
      />
      <IconButton
        style={styles.searchButton}
        icon="magnify"
        mode="outlined"
        iconColor={colors.white}
        // onPress={fetchProducts}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  search: {
    backgroundColor: colors.white,
    flexDirection: "row",
    borderRadius: 10,
    width: "100%",
  },
  input: {
    flex: 1,
    padding: 10,
  },
  searchButton: {
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
});
