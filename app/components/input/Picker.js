import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Button,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import colors from "../../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

/**
 *
 * @param {*displayExractor} param0 -> Used as display field for the currently selected item, replaces the placeholder
 * @returns
 */

function Picker({
  placeHolder,
  icon,
  layout = "linear",
  keyExtractor,
  data,
  children,
  defaultIndex,
  displayExractor,
  onSelectedItemChange,
  itemStyle,
  contentContainerStyle,
}) {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurentIndex] = useState(
    defaultIndex > -1 && defaultIndex < data.length ? defaultIndex : -1
  );

  useEffect(() => {
    const item = currentIndex === -1 ? null : data[currentIndex];
    onSelectedItemChange(item);
  }, [currentIndex]);

  const setSelectedItem = (item) => {
    setShowModal(false);
    setCurentIndex(data.indexOf(item));
  };
  return (
    <TouchableWithoutFeedback onPress={() => setShowModal(true)}>
      <View style={styles.container}>
        {icon && <MaterialCommunityIcons name={icon} size={30} />}
        <Text style={styles.text}>
          {currentIndex === -1
            ? placeHolder
            : displayExractor(data[currentIndex])}
        </Text>
        <MaterialCommunityIcons
          name="chevron-down"
          color={colors.dark}
          size={30}
        />
        <Modal animationType="slide" visible={showModal} >
          <>
            {layout === "linear" ? (
              <FlatList
                contentContainerStyle={contentContainerStyle}
                renderItem={({ item, ...otherProps }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => setSelectedItem(item)}
                      style={itemStyle}
                    >
                      {children({
                        currentSelectedItem:
                          currentIndex === -1 ? null : data[currentIndex],
                        item: item,
                        setSelectedItem: setSelectedItem,
                      })}
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={keyExtractor}
                data={data}
                // ItemSeparatorComponent={ListItemSeparator}
              />
            ) : (
              <ScrollView>
                <View style={[styles.gridContainer, contentContainerStyle]}>
                  {data.map((item) => (
                    <TouchableOpacity
                      key={keyExtractor(item)}
                      onPress={() => setSelectedItem(item)}
                      style={itemStyle}
                    >
                      {children({
                        currentSelectedItem:
                          currentIndex === -1 ? null : data[currentIndex],
                        item: item,
                        setSelectedItem: setSelectedItem,
                      })}
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            )}
          </>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 25,
    padding: 10,
    flexDirection: "row",
    marginVertical: 10,
  },
  text: {
    flex: 1,
    textAlignVertical: "center",
    textAlign: "left",
    fontSize: 20,
    paddingHorizontal: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});


export default Picker;
