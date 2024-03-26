import { StyleSheet, View, Dimensions } from "react-native";
import React from "react";
import { Card, Text } from "react-native-paper";
import colors from "../../utils/colors";
import moment from "moment";
import RatingBar from "../ratingbar/RatingBar";
import { useNavigation } from "@react-navigation/native";
import routes from "../../navigation/routes";

const itemWidth = Dimensions.get("window").width / 2 - 10; // subtracting margin
const itemHeight = Dimensions.get("window").height / 3 - 10; // subtracting margin

const Product = ({ product: item }) => {
  const navigation = useNavigation();
  const {
    name,
    image,
    description,
    price,
    rating,
    tags,
    images,
    updated,
    type: { name: categry },
    // reviews: { count: reviews },
  } = item;
  return (
    <Card
      onPress={() => {
        navigation.navigate(routes.PRODUCT_NAVIGATION, {
          screen: routes.PRODUCT_SCREEN,
          params: item,
        });
      }}
      style={[
        {
          width: itemWidth,
          /*height: itemHeight,*/ margin: 5,
        },
      ]}
    >
      <Card.Content>
        <Text variant="titleMedium">{name}</Text>
        <Text variant="bodyMedium" style={{ color: colors.medium }}>
          {categry}
        </Text>
      </Card.Content>
      <Card.Cover source={{ uri: image }} resizeMode="cover" />
      <Card.Actions>
        <Text style={{ color: colors.medium }}>
          {`${moment(updated).format("Do MMM YYYY")} | `}
        </Text>
        <RatingBar starSize={15} defaultRating={rating} disabled />
        <Text>({rating})</Text>
      </Card.Actions>
      <Card.Actions
        style={{
          flexDirection: "row-reverse",
        }}
      >
        <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
          Ksh. {price}
        </Text>
      </Card.Actions>
    </Card>
  );
};

export default Product;

const styles = StyleSheet.create({});
