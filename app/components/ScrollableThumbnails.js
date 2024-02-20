import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import colors from "../utils/colors";

const ScrollableThumbnails = ({ uris = [], onPress }) => {
  return (
    <FlatList
      data={uris}
      keyExtractor={(url) => url}
      horizontal
      contentContainerStyle={{ backgroundColor: colors.transparent }}
      renderItem={({ item: uri }) => (
        <TouchableOpacity onPress={() => onPress(uri)}>
          <Image style={styles.image} source={{ uri }} resizeMode="contain" />
        </TouchableOpacity>
      )}
    />
  );
};

export default ScrollableThumbnails;

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});
