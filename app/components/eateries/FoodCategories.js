import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import React from "react";
import { Text, List } from "react-native-paper";
import { useShopContext } from "../../context/hooks";
import colors from "../../utils/colors";

const FoodCategories = () => {
  const { categories } = useShopContext();
  return (
    <View>
      <View style={styles.header}>
        <Text variant="titleLarge">Meals</Text>
        <List.Icon icon="chevron-right" />
      </View>
      <FlatList
        nestedScrollEnabled={false}
        numColumns={2}
        data={categories}
        keyExtractor={({ id }) => id}
        renderItem={({ item: { id, image, name, description } }) => (
          <List.Item
            style={{
              backgroundColor: colors.white,
              marginBottom: 5,
              marginHorizontal: 5,
              borderRadius: 10,
              width: Dimensions.get("screen").width * 0.475 
            }}
            title={name}
            description={description}
            left={(props) => <List.Image {...props} source={{ uri: image }} />}
            // right={(props) => <List.Icon {...props} icon={"chevron-right"} />}
          />
        )}
      />
    </View>
  );
};

export default FoodCategories;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
  },
});
