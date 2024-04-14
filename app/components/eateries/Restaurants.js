import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { List, Text } from "react-native-paper";
import { useShop } from "../../api/hooks";

const Restaurants = () => {
  const { getRestaurants } = useShop();
  const [restaurants, setRestaurant] = useState([]);

  useEffect(() => {
    (async () => {
      const restaurantResponse = await getRestaurants();
      if (!restaurantResponse.ok) {
        console.log(
          "Home screen: ",
          restaurantResponse.problem,
          restaurantResponse.data
        );
      } else {
        setRestaurant(restaurantResponse.data.results);
      }
    })();
  }, []);

  return (
    <View>
      <View style={styles.header}>
        <Text variant="titleMedium">Restaurants</Text>
        <List.Icon icon="chevron-right" />
      </View>
      <FlatList
        data={restaurants}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={({ id }) => id}
        renderItem={({ item: { logo, name }, index }) => (
          <TouchableOpacity
            style={{ marginHorizontal: 10, alignItems: "center" }}
          >
            <Image
              source={{ uri: logo }}
              style={{
                width: 200,
                height: 100,
                borderRadius: 10,
                backgroundColor: "white",
              }}
            />
            <Text variant="bodyLarge">{name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Restaurants;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
  },
});
