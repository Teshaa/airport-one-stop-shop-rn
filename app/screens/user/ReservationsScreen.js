import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";
import { Avatar, Card, Text } from "react-native-paper";
import moment from "moment/moment";
import routes from "../../navigation/routes";
import colors from "../../utils/colors";

const ReservationsScreen = ({ navigation }) => {
  const { token } = useUserContext();
  const { getReservations } = useUser();
  const [reservations, serReservatons] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleFetch = async () => {
    setRefreshing(true);
    const response = await getReservations(token, { page_size: 100 });
    setRefreshing(false);
    if (!response.ok) {
      return console.log("OrderScreen: ", response.problem, response.data);
    }
    const {
      data: { results },
    } = response;
    serReservatons(results);
  };

  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <View>
      <FlatList
        data={reservations}
        refreshing={refreshing}
        onRefresh={handleFetch}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => {
          const {
            room: {
              number,
              type: { name: type },
              images,
              hotel: { name },
            },
            nights: quantity,
            price_per_night: price,
            status,
            checkin_date,
            created_at,
          } = item;
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(routes.RESERVATION_SCREEN, item)
              }
            >
              <Card.Title
                style={styles.orderCard}
                title={`${name}-${number}`}
                subtitle={`${moment(created_at).format(
                  "Do MMM YYYY, h:mm a"
                )} | ${quantity} items | @Ksh. ${price}`}
                subtitleVariant="bodySmall"
                subtitleStyle={{ color: colors.medium }}
                left={(props) => (
                  <Avatar.Image
                    source={{
                      uri: images[0].image ?? "https://placehold.co/600x400",
                    }}
                    {...props}
                    style={{ backgroundColor: colors.light }}
                  />
                )}
                right={(props) => (
                  <Text
                    {...props}
                    style={{
                      paddingHorizontal: 10,
                      fontWeight: "bold",
                      color: colors.medium,
                    }}
                  >
                    Ksh. {parseFloat(quantity) * parseFloat(price)}
                  </Text>
                )}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ReservationsScreen;

const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: colors.white,
    marginHorizontal: 5,
    marginTop: 5,
    borderRadius: 20,
  },
});
