import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { List, Text } from "react-native-paper";
import { useAccomodation } from "../../api/hooks";

const Hotels = () => {
  const { getHotels } = useAccomodation();
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    (async () => {
      const hotelsResponse = await getHotels();
      if (!hotelsResponse.ok) {
        console.log(
          "Home screen: ",
          hotelsResponse.problem,
          hotelsResponse.data
        );
      } else {
        setHotels(hotelsResponse.data.results);
      }
    })();
  }, []);
  return (
    <View>
      <View style={styles.header}>
        <Text variant="titleMedium">Hotels</Text>
        <List.Icon icon="chevron-right" />
      </View>
      <FlatList
        data={hotels}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={({ id }) => id}
        renderItem={({ item: { logo, name }, index }) => (
          <TouchableOpacity style={{ marginHorizontal: 10 }}>
            <Image source={{ uri: logo }} style={{ width: 100, height: 100 }} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Hotels;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
  },
});
