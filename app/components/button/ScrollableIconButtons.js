import { StyleSheet, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../utils/colors";
import ImageButton from "./ImageButton";
import { Text, List, IconButton } from "react-native-paper";

const ScrollableImageButtons = ({
  data = [],
  onItemClicked,
  contentContainerStyle,
  title,
  titleExtractor,
  imageExtractor,
  keyExtractor,
  selectable = false,
  defaultItemIndex,
  disabled,
}) => {
  const [currentIndex, setCurentIndex] = useState(
    defaultItemIndex > -1 && defaultItemIndex < data.length
      ? defaultItemIndex
      : -1
  );
  useEffect(() => {
    if (onItemClicked instanceof Function) {
      if (currentIndex === -1) {
        onItemClicked(null);
      } else {
        const item = data[currentIndex];
        onItemClicked(item);
      }
    }
  }, [currentIndex]);
  return (
    <View style={contentContainerStyle}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <List.Icon icon="chevron-right" />
      </View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={({ item: type }) => (
          <ImageButton
            disable={disabled}
            style={styles.listItem}
            title={titleExtractor(type)}
            image={{ uri: imageExtractor(type) }}
            onPress={() => {
              const index = data.indexOf(type);
              index === currentIndex && selectable
                ? setCurentIndex(-1)
                : setCurentIndex(index);
            }}
            active={type === data[currentIndex] && selectable}
          />
        )}
      />
    </View>
  );
};

export default ScrollableImageButtons;

const styles = StyleSheet.create({
  listItem: {
    margin: 5,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
