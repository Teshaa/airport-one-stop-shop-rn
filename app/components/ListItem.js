import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar, Text } from "react-native-paper";

const ListItem = ({ image, icon, title, subTitle, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {image ? (
        <Avatar.Image source={image} style={styles.image} />
      ) : (
        <Avatar.Icon style={styles.image} icon={icon} />
      )}

      <View style={styles.content}>
        <Text variant="titleLarge">{title}</Text>
        <Text style={styles.subTitle} variant="bodyLarge">
          {subTitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.white,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  subTitle: {
    color: colors.medium,
  },
  content: {
    paddingHorizontal: 10,
    // backgroundColor: "red",
    flex: 1,
    justifyContent: "center",
  },
  image: {
    backgroundColor: colors.light,
  },
});
