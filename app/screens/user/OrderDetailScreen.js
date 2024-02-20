import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import {
  Avatar,
  Badge,
  Card,
  IconButton,
  List,
  Text,
} from "react-native-paper";
import colors from "../../utils/colors";
import moment from "moment";
import Logo from "../../components/Logo";

const OrderDetailScreen = ({ navigation, route }) => {
  const {
    order_id,
    updated,
    items,
    total_cost,
    amount_paid,
    balance,
    paid: completed,
  } = route.params;
  return (
    <View>
      <View style={styles.logo}>
        <Logo variant="black" />
      </View>
      <View style={styles.detailsRow}>
        {/* col1 */}
        <View>
          <View style={styles.valuesRow}>
            <Text>Order Id: </Text>
            <Text style={styles.value}>{order_id}</Text>
          </View>
          <View style={styles.valuesRow}>
            <Text>Date:</Text>
            <Text style={styles.value}>
              {moment(updated).format("Do MMM YYYY, h:mm a")}
            </Text>
          </View>
          <View style={styles.valuesRow}>
            <Text>Items: </Text>
            <Text style={styles.value}>{items.length}</Text>
          </View>
        </View>
        {/* Col 2 */}
        <View>
          <View style={styles.valuesRow}>
            <Text>Cost: </Text>
            <Text style={styles.value}>Ksh. {total_cost}</Text>
          </View>
          <View style={styles.valuesRow}>
            <Text>Amount Paid: </Text>
            <Text style={styles.value}>Ksh. {amount_paid}</Text>
          </View>

          <View style={styles.valuesRow}>
            <Text>Status: </Text>
            <Text
              style={[
                { borderRadius: 5, padding: 2, color: colors.white },
                completed
                  ? { backgroundColor: colors.success }
                  : { backgroundColor: colors.danger },
              ]}
            >
              {completed ? "paid" : "pending"}
            </Text>
          </View>
        </View>
      </View>
      <FlatList
        data={items}
        keyExtractor={({ url }) => url}
        renderItem={({ item }) => {
          const {
            product: { name, image, category },
            total_cost,
            price,
            quantity,
          } = item;
          return (
            <Card.Title
              style={styles.orderCard}
              title={name}
              subtitle={`${category} | ${quantity} * ${price}`}
              subtitleStyle={{ color: colors.medium }}
              subtitleVariant="bodySmall"
              left={(props) =>
                image ? (
                  <Avatar.Image
                    source={{ uri: image }}
                    {...props}
                    style={{ backgroundColor: colors.light }}
                  />
                ) : (
                  <Avatar.Icon
                    icon="shopping"
                    {...props}
                    style={{ backgroundColor: colors.light }}
                    color={completed ? colors.success : colors.danger}
                  />
                )
              }
              right={(props) => (
                <Text
                  style={{
                    fontWeight: "bold",
                    color: colors.medium,
                    paddingHorizontal: 10,
                  }}
                >
                  Ksh. {total_cost}
                </Text>
              )}
            />
          );
        }}
      />
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  logo: {
    alignItems: "center",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: colors.white,
    margin: 5,
    borderRadius: 10,
  },
  valuesRow: {
    flexDirection: "row",
    padding: 5,
  },
  value: {
    fontWeight: "bold",
  },
  orderCard: {
    backgroundColor: colors.white,
    marginHorizontal: 5,
    marginTop: 5,
    borderRadius: 20,
  },
});
