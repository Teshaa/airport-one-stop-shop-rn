import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Icon, TextInput, Text } from "react-native-paper";

const ItemPicker = ({
  data = [],
  item,
  onItemChanged,
  error,
  helpText,
  label,
  labelExtractor,
  onPrefixIconPressed,
  onSurfixIconPressed,
  prefixIcon,
  surfixIcon,
  valueExtractor,
  variant,
  renderItem,
  horizontal = false,
  columnCount,
  searchStyle,
  contentContainerStyle,
  searchable,
}) => {
  const [showItems, setShowItems] = useState(false);
  const [filtered, setFiltered] = useState([...data]);

  const toggleShowItems = () => setShowItems(!showItems);

  const currentItem = data.find(
    (dataItem) => item === valueExtractor(dataItem)
  );

  return (
    <>
      <TouchableHighlight onPress={toggleShowItems}>
        <TextInput
          error={Boolean(error)}
          label={label}
          mode={variant}
          value={
            labelExtractor
              ? currentItem
                ? labelExtractor(currentItem)
                : ""
              : currentItem
              ? JSON.stringify(currentItem)
              : ""
          }
          editable={false}
          left={
            prefixIcon && (
              <TextInput.Icon
                icon={prefixIcon}
                onPress={
                  onPrefixIconPressed ? onPrefixIconPressed : toggleShowItems
                }
              />
            )
          }
          right={
            surfixIcon && (
              <TextInput.Icon
                icon={surfixIcon}
                onPress={
                  onSurfixIconPressed ? onSurfixIconPressed : toggleShowItems
                }
              />
            )
          }
        />
      </TouchableHighlight>
      {showItems && (
        <Modal animationType="slide" onRequestClose={toggleShowItems}>
          <View style={styles.itemsContainer}>
            {label && (
              <Text
                variant="titleLarge"
                style={{ textAlign: "center", marginVertical: 20 }}
              >
                {label}
              </Text>
            )}
            {searchable && (
              <TextInput
                left={<TextInput.Icon icon="magnify" />}
                {...searchStyle}
                onChangeText={(value) =>
                  setFiltered(
                    data.filter((_dat) =>
                      (labelExtractor
                        ? labelExtractor(_dat)
                        : JSON.stringify(_dat)
                      )
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    )
                  )
                }
                value={undefined}
              />
            )}

            <FlatList
              contentContainerStyle={contentContainerStyle}
              numColumns={columnCount}
              horizontal={horizontal}
              data={filtered}
              keyExtractor={valueExtractor}
              renderItem={({ item, index, separators }) => (
                <TouchableOpacity
                  onPress={() => {
                    if (onItemChanged) onItemChanged(valueExtractor(item));
                    toggleShowItems();
                  }}
                >
                  {renderItem({ index, separators, item })}
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      )}
    </>
  );
};

export default ItemPicker;

const styles = StyleSheet.create({
  itemsContainer: {
    flex: 1,
    padding: 10,
  },
});
