import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";
import { Avatar, Card, Text } from "react-native-paper";
import moment from "moment/moment";
import routes from "../../navigation/routes";
import colors from "../../utils/colors";

const OrdersScreen = ({ navigation }) => {
  const { token } = useUserContext();
  const { getOrders } = useUser();
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleFetch = async () => {
    setRefreshing(true);
    const response = await getOrders(token, { page_size: 100 });
    setRefreshing(false);
    if (!response.ok) {
      return console.log("OrderScreen: ", response.problem, response.data);
    }
    const {
      data: { results },
    } = response;
    setOrders(results);
  };

  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <View>
      <FlatList
        data={orders}
        refreshing={refreshing}
        onRefresh={handleFetch}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => {
          const {
            food_item: {
              name,
              type: { name: type },
              image,
            },
            quantity,
            price,
            status,
            created_at,
          } = item;
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.ORDER_SCREEN, item)}
            >
              <Card.Title
                style={styles.orderCard}
                title={`${name} | ${status}`}
                subtitle={`${moment(created_at).format(
                  "Do MMM YYYY, h:mm a"
                )} | ${quantity} items | @Ksh. ${price}`}
                subtitleVariant="bodySmall"
                subtitleStyle={{ color: colors.medium }}
                left={(props) => (
                  <Avatar.Image
                    source={{ uri: image }}
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

export default OrdersScreen;

const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: colors.white,
    marginHorizontal: 5,
    marginTop: 5,
    borderRadius: 20,
  },
});
