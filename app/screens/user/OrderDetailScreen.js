import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  IconButton,
  List,
  Text,
} from "react-native-paper";
import colors from "../../utils/colors";
import moment from "moment/moment";
import Logo from "../../components/Logo";
import useLocation from "../../hooks/useLocation";
import { openGoogleMapsDirections } from "../../utils/helpers";

const OrderDetailScreen = ({ navigation, route }) => {
  const location = useLocation();

  const {
    food_item: {
      name,
      type: { name: type },
      image,
      restaurant: { name: restaurant, address, longitude, latitude },
    },
    quantity,
    price,
    status,
    created_at,
  } = route.params;
  return (
    <View>
      <List.Item
        title={name}
        description={`${quantity} items | @Ksh. ${price}`}
        left={(props) => <List.Image {...props} source={{ uri: image }} />}
        style={{ backgroundColor: "white", marginVertical: 5 }}
      />
      <List.Item
        title={"Date"}
        description={`${moment(created_at).format("Do MMM YYYY, h:mm a")}`}
        left={(props) => <List.Icon {...props} icon="calendar" />}
        style={{ backgroundColor: "white", marginVertical: 5 }}
      />
      <List.Item
        title={`Ksh. ${parseFloat(quantity) * parseFloat(price)}`}
        description={`Total price`}
        left={(props) => <List.Icon {...props} icon="cash" />}
        style={{ backgroundColor: "white", marginVertical: 5 }}
      />
      <List.Item
        title={status}
        description={`Status`}
        left={(props) => <List.Icon {...props} icon="progress-clock" />}
        style={{ backgroundColor: "white", marginVertical: 5 }}
      />
      <List.Item
        title={type}
        description={`Type`}
        left={(props) => <List.Icon {...props} icon="food" />}
        style={{ backgroundColor: "white", marginVertical: 5 }}
      />
      <List.Item
        title={restaurant}
        description={address}
        left={(props) => <List.Icon {...props} icon="office-building-marker" />}
        style={{ backgroundColor: "white", marginVertical: 5 }}
      />

      <Button
        mode="contained"
        icon="google"
        disabled={Boolean(location) === false}
        style={{ marginTop: 5 }}
        onPress={() => {
          if (location) {
            openGoogleMapsDirections(location, { latitude, longitude });
          }
        }}
      >
        Open Restaurant in Google maps
      </Button>
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({});
