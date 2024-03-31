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
    food_item: {
      name,
      type: { name: type },
      image,
    },
    quantity,

    price,
    status,
    created_at,
  } = route.params;
  return (
    <View>
      <View style={styles.logo}>
        <Logo variant="black" />
      </View>
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({});
