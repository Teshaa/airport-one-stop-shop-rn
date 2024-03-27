import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Avatar, Button, Card, IconButton, Text } from "react-native-paper";
import ScrollableThumbnails from "../../components/ScrollableThumbnails";
import colors from "../../utils/colors";
import RatingBar from "../../components/ratingbar/RatingBar";
import Quantorsizer from "../../components/input/Quantorsizer";
import ExpandableText from "../../components/display/ExpandableText";
import { useCartContext } from "../../context/hooks";
import routes from "../../navigation/routes";

const AccomodationDetail = ({ navigation, route }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartContext();
  const {
    name,
    image,
    description,
    additional_info,
    price_per_night: price,
    rating,
    tags,
    images,
    updated_at,
    type: { name: categry },
    // reviews: { count: reviews },
  } = route.params;
  const imageHeight = Dimensions.get("window").height * 0.4;
  const [currHeroImage, setcurrHeroImage] = useState(
    images[0].image ?? "https://placehold.co/600x400"
  );
  return (
    <View style={styles.screen}>
      <ScrollView>
        <Card elevation={0}>
          <Card.Cover
            style={{ width: "100%", height: imageHeight }}
            source={{ uri: currHeroImage }}
            resizeMode="cover"
          />
          <ScrollableThumbnails
            uris={[...images.map(({ image: img }) => img)]}
            onPress={(uri) => setcurrHeroImage(uri)}
          />
          <ExpandableText
            text={description}
            threshHold={300}
            title="Description"
          />
        </Card>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 10,
          }}
        >
          <View>
            <Text style={styles.text} variant="titleLarge">
              {name}
            </Text>
            <Text style={styles.text} variant="bodyMedium">
              {`${categry} | Ksh. ${price}`}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routes.PRODUCT_REVIEW_SCREEN, route.params)
            }
          >
            <RatingBar starSize={20} defaultRating={rating} disabled />
            <Text variant="bodyMedium">({rating})</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.text} variant="headlineLarge">
            Ksh. {parseFloat(price) * quantity}
          </Text>
          <View style={styles.cart}>
            <Quantorsizer
              value={quantity}
              onIncreament={() => setQuantity(quantity + 1)}
              onDecrement={() =>
                quantity > 1 ? setQuantity(quantity - 1) : null
              }
            />
            <View style={{ flex: 1, padding: 10 }}>
              <Button
                style={styles.button}
                mode="outlined"
                icon="cart"
                textColor={colors.primary}
                onPress={() => {
                  addToCart({
                    product: { ...route.params, productType: "accomodation" },
                    quantity,
                  });
                  navigation.goBack();
                }}
              >
                AddToCart
              </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AccomodationDetail;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  bottomContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
  },
  button: {
    padding: 10,
  },
  cart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  text: {
    paddingVertical: 5,
  },
});
