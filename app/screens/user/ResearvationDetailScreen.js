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

const ResearvationDetailScreen = ({ route }) => {
  const location = useLocation();
  const {
    room: {
      number,
      type: { name: type },
      images,
      hotel: { name, longitude, latitude, address },
    },
    nights: quantity,
    price_per_night: price,
    status,
    checkin_date,
    created_at,
  } = route.params;
  return (
    <View>
      <List.Item
        title={`${name}-${number}`}
        description={`${quantity} items | @Ksh. ${price}`}
        left={(props) => (
          <List.Image {...props} source={{ uri: images[0].image }} />
        )}
        style={{ backgroundColor: "white", marginVertical: 5 }}
      />
      <List.Item
        title={"Date reserved"}
        description={`${moment(created_at).format("Do MMM YYYY, h:mm a")}`}
        left={(props) => <List.Icon {...props} icon="calendar" />}
        style={{ backgroundColor: "white", marginVertical: 5 }}
      />
      <List.Item
        title={"Checkin date"}
        description={`${moment(checkin_date).format("Do MMM YYYY, h:mm a")}`}
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
        title={`${status || "Pending"}`}
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
        title={name}
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
        Open Hotel in Google maps
      </Button>
    </View>
  );
};

export default ResearvationDetailScreen;

const styles = StyleSheet.create({});
