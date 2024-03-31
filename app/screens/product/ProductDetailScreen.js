import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Card, List, Text, Snackbar } from "react-native-paper";
import colors from "../../utils/colors";
import RatingBar from "../../components/ratingbar/RatingBar";
import Quantorsizer from "../../components/input/Quantorsizer";
import ExpandableText from "../../components/display/ExpandableText";
import { useCartContext, useUserContext } from "../../context/hooks";
import routes from "../../navigation/routes";
import { useAirpot, useShop } from "../../api/hooks";
import ItemPicker from "../../components/input/ItemPicker";

const ProductDetailScreen = ({ navigation, route }) => {
  const [visible, setVisible] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState("");
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  const [quantity, setQuantity] = useState(1);
  const { postOrder } = useShop();
  const { token } = useUserContext();
  const { getTerminal } = useAirpot();
  const [terminals, setTerminals] = useState([]);
  const [terminal, setTerminal] = useState();
  const {
    id: food_item,
    name,
    image,
    description,
    price,
    rating,
    preparation_time,
    readily_available,
    type: { name: categry },
  } = route.params;
  const imageHeight = Dimensions.get("window").height * 0.4;
  const [currHeroImage, setcurrHeroImage] = useState(image);

  useEffect(() => {
    (async () => {
      const response = await getTerminal();
      if (response.ok) {
        setTerminals(response.data.results);
      }
    })();
  }, []);

  const handleOrder = async () => {
    const data = { quantity, food_item, terminal };
    const response = await postOrder(token, data);
    if (!response.ok) {
      setSnackMessage(JSON.stringify(response.data));
      onToggleSnackBar();
      return console.log("CartScreen: ", response.problem, response.data);
    }
    setSnackMessage(" Your order was received successfully");
    onToggleSnackBar();
    // navigation.goBack();
  };
  return (
    <View style={styles.screen}>
      <ScrollView>
        <Card elevation={0}>
          <Card.Cover
            style={{ width: "100%", height: imageHeight }}
            source={{ uri: currHeroImage }}
            resizeMode="cover"
          />
          <List.Item
            title={"Prepairation time"}
            left={(props) => <List.Icon {...props} icon={"timeline-clock"} />}
            description={
              readily_available
                ? "ReadilyAvailable"
                : `${preparation_time} minutes`
            }
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
          <ItemPicker
            item={terminal}
            onItemChanged={setTerminal}
            label={"Terminal"}
            data={terminals}
            valueExtractor={(item) => item.id}
            labelExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <List.Item
                left={(props) => <List.Icon {...props} icon={"logout"} />}
                title={item.name}
                style={{ marginVertical: 5 }}
              />
            )}
            prefixIcon={"logout"}
            searchable
            surfixIcon={"chevron-down"}
          />
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
                onPress={handleOrder}
              >
                Buy now
              </Button>
            </View>
          </View>
        </View>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "View Orders",
          onPress: () => {
            navigation.navigate(routes.USER_NAVIGATION, {
              screen: routes.ORDERS_SCREEN,
            });
          },
        }}
      >
        {snackMessage}
      </Snackbar>
    </View>
  );
};

export default ProductDetailScreen;

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
