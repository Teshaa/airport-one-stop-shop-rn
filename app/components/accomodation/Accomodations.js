import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import AccomodationCard from "./AccomodationCard";
import { Text, List } from "react-native-paper";
import { useShopContext } from "../../context/hooks";
import { FlatList } from "react-native-gesture-handler";
import { useAccomodation } from "../../api/hooks";

const Accomodations = () => {
  const [accomodations, setAccomodations] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleFectch = async () => {
    setLoading(true);
    const response = await getRooms();
    if (!response.ok) {
      console.log("Accomodations", response.problem);
      return false;
    }
    setAccomodations(response.data.results);
    setLoading(false);
  };
  const { getRooms } = useAccomodation();
  useEffect(() => {
    handleFectch();
  }, []);
  if (loading) return false;
  return (
    <View>
      <View style={styles.header}>
        <Text variant="titleLarge">Accomodation</Text>
        <List.Icon icon="chevron-right" />
      </View>
      <FlatList
        data={accomodations}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={({ id }) => id}
        renderItem={({ item: { images, title, description }, index }) => (
          <View style={{ marginHorizontal: 10, width: 300 }}>
            <AccomodationCard
              title={title}
              description={description}
              rating={4}
              uri={images[0].image ?? "https://placehold.co/600x400"}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Accomodations;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
  },
});
