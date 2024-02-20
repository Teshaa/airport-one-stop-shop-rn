import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../../api/hooks";
import { useUserContext } from "../../context/hooks";
import { Avatar, Card, List, Text } from "react-native-paper";
import colors from "../../utils/colors";
import moment from "moment";
import routes from "../../navigation/routes";

const PaymentsScreen = ({ navigation }) => {
  const [payments, setPayments] = useState();
  const { getPayments } = useUser();
  const { token } = useUserContext();
  const [refreshing, setRefreshing] = useState(false);

  const handleFetch = async () => {
    setRefreshing(true);
    const response = await getPayments(token, { page_size: 100 });
    setRefreshing(false);
    if (!response.ok) {
      return console.log("OrderScreen: ", response.problem, response.data);
    }
    const {
      data: { results },
    } = response;
    setPayments(results);
  };

  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <View>
      <FlatList
        data={payments}
        keyExtractor={({ url }) => url}
        refreshing={refreshing}
        onRefresh={handleFetch}
        renderItem={({ item }) => {
          const {
            url,
            payment_id,
            transactions,
            total_cost,
            amount_paid,
            balance,
            completed,
            created,
            order: { order },
          } = item;
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.PAYMENT_SCREEN, item)}
            >
              <Card.Title
                style={styles.card}
                title={payment_id}
                titleVariant="bodyLarge"
                subtitleVariant="bodySmall"
                subtitle={`${moment(created).format("Do MMM YYYY, h:mm a")} | ${
                  transactions.length
                } Transactions`}
                subtitleStyle={{ color: colors.medium }}
                left={(props) => (
                  <Avatar.Icon
                    {...props}
                    icon="wallet"
                    style={styles.icon}
                    color={completed ? colors.success : colors.danger}
                  />
                )}
                right={(props) => (
                  <Text {...props} style={styles.price} variant="bodyMedium">
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

export default PaymentsScreen;

const styles = StyleSheet.create({
  price: {
    color: colors.medium,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  icon: {
    backgroundColor: colors.light,
  },
  card: {
    backgroundColor: colors.white,
    marginHorizontal: 5,
    marginTop: 5,
    borderRadius: 20,
  },
});
