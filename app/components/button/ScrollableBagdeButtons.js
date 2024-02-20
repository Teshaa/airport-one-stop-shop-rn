import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../utils/colors";

const ScrollableBadgeButtons = ({
  data = [],
  contentContainerStyle,
  title,
  defaultItemIndex,
  keyExtractor,
  labelExtractor,
  onItemChange = (item) => {},
  selectable = true,
  activeBackgroundColor = colors.background,
  activeTintColor = colors.black,
}) => {
  const [currentIndex, setCurentIndex] = useState(
    defaultItemIndex > -1 && defaultItemIndex < data.length
      ? defaultItemIndex
      : -1
  );
  useEffect(() => {
    if (currentIndex === -1) {
      onItemChange(null);
    } else {
      const item = data[currentIndex];
      onItemChange(item);
    }
  }, [currentIndex]);
  return (
    <View style={[styles.container, contentContainerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              const index = data.indexOf(item);
              index === currentIndex && selectable
                ? setCurentIndex(-1)
                : setCurentIndex(index);
            }}
          >
            <View
              style={[
                styles.listItem,
                item === data[currentIndex] && selectable
                  ? { backgroundColor: activeBackgroundColor }
                  : {},
              ]}
            >
              <Text
                style={[
                  styles.title,
                  item === data[currentIndex] && selectable
                    ? { color: activeTintColor }
                    : {},
                ]}
              >
                {labelExtractor(item)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ScrollableBadgeButtons;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  listItem: {
    margin: 5,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
  },
});
