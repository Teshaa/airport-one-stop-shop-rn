import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import Logo from "../../components/Logo";
import { Avatar, Card, Text } from "react-native-paper";
import moment from "moment";
import colors from "../../utils/colors";

const PaymentDetailScreen = ({ navigation, route }) => {
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
            <Text>Payment Id: </Text>
            <Text style={styles.value}>{payment_id}</Text>
          </View>
          <View style={styles.valuesRow}>
            <Text>Order Id: </Text>
            <Text style={styles.value}>{order}</Text>
          </View>
          <View style={styles.valuesRow}>
            <Text>Date:</Text>
            <Text style={styles.value}>
              {moment(created).format("Do MMM YYYY, h:mm a")}
            </Text>
          </View>
          <View style={styles.valuesRow}>
            <Text>Transactions: </Text>
            <Text style={styles.value}>{transactions.length}</Text>
          </View>
        </View>
        {/* Col 2 */}
        <View>
          <View style={styles.valuesRow}>
            <Text>Cost:</Text>
            <Text style={styles.value}>Ksh. {total_cost}</Text>
          </View>
          <View style={styles.valuesRow}>
            <Text>Amount Paid: </Text>
            <Text style={styles.value}>Ksh. {amount_paid}</Text>
          </View>
          <View style={styles.valuesRow}>
            <Text>Balance: </Text>
            <Text style={styles.value}>Ksh. {balance}</Text>
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
        data={transactions}
        keyExtractor={({ url }) => url}
        renderItem={({ item }) => {
          const { transaction_id, created, amount } = item;
          return (
            <Card.Title
              style={styles.trnCard}
              title={transaction_id}
              subtitle={moment(created).format("Do MMM YYYY, h:mm a")}
              subtitleStyle={{ color: colors.medium }}
              subtitleVariant="bodySmall"
              left={(props) => (
                <Avatar.Icon
                  icon="bank"
                  {...props}
                  style={{ backgroundColor: colors.light }}
                  color={completed ? colors.success : colors.danger}
                />
              )}
              right={(props) => (
                <Text
                  style={{
                    fontWeight: "bold",
                    color: colors.medium,
                    paddingHorizontal: 10,
                  }}
                >
                  Ksh. {amount}
                </Text>
              )}
            />
          );
        }}
      />
    </View>
  );
};

export default PaymentDetailScreen;

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
  trnCard: {
    backgroundColor: colors.white,
    marginHorizontal: 5,
    marginTop: 5,
    borderRadius: 20,
  },
});
