import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";
import {
  Avatar,
  Card,
  Checkbox,
  DataTable,
  List,
  Text,
} from "react-native-paper";
import moment from "moment/moment";
import QuanterSizer from "../../components/input/QuanterSizer";
import routes from "../../navigation/routes";
import colors from "../../utils/colors";

const Header = DataTable.Header;
const Title = DataTable.Title;
const Row = DataTable.Row;
const Cell = DataTable.Cell;

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
        keyExtractor={({ url }) => url}
        renderItem={({ item }) => {
          const {
            order_id,
            updated,
            items,
            total_cost,
            amount_paid,
            balance,
            paid,
          } = item;
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.ORDER_SCREEN, item)}
            >
              <Card.Title
                style={styles.orderCard}
                title={order_id}
                subtitle={`${moment(updated).format("Do MMM YYYY, h:mm a")} | ${
                  items.length
                } items`}
                subtitleVariant="bodySmall"
                subtitleStyle={{ color: colors.medium }}
                left={(props) => (
                  <Avatar.Icon
                    icon="shopping"
                    {...props}
                    style={{ backgroundColor: colors.light }}
                    color={paid ? colors.success : colors.danger}
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
                    Ksh. {total_cost}
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
