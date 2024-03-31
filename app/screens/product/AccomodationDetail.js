import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Text,
  Snackbar,
} from "react-native-paper";
import ScrollableThumbnails from "../../components/ScrollableThumbnails";
import colors from "../../utils/colors";
import RatingBar from "../../components/ratingbar/RatingBar";
import Quantorsizer from "../../components/input/Quantorsizer";
import ExpandableText from "../../components/display/ExpandableText";
import { useCartContext, useUserContext } from "../../context/hooks";
import routes from "../../navigation/routes";
import DateTimePicker from "../../components/input/DatePicker";
import moment from "moment/moment";
import { useAccomodation, useShop } from "../../api/hooks";

const AccomodationDetail = ({ navigation, route }) => {
  const [visible, setVisible] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState("");
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  const [nights, setNights] = useState(1);
  const [checkin_date, setCheckinDate] = useState(new Date());
  const {
    id: room,
    name,
    description,
    price_per_night: price,
    rating,
    images,
    type: { name: categry },
    // reviews: { count: reviews },
  } = route.params;
  const { postOrder } = useAccomodation();
  const { token } = useUserContext();
  const imageHeight = Dimensions.get("window").height * 0.4;
  const [currHeroImage, setcurrHeroImage] = useState(
    images[0].image ?? "https://placehold.co/600x400"
  );
  const handleOrder = async () => {
    const data = {
      nights,
      checkin_date: moment(checkin_date).format("yyy-MM-DD"),
      room,
    };
    console.log(data);
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
            onPress={() => {
              // navigation.navigate(routes.PRODUCT_REVIEW_SCREEN, route.params);
            }}
          >
            <RatingBar starSize={20} defaultRating={rating} disabled />
            <Text variant="bodyMedium">({rating})</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.text} variant="headlineLarge">
            Ksh. {parseFloat(price) * nights}
          </Text>
          <DateTimePicker
            label="Reservation Date"
            date={checkin_date}
            onDateChanged={setCheckinDate}
            prefixIcon={"calendar"}
            formater={(date) => moment(date).format("Do dd MM yyy")}
            surfixIcon={"chevron-down"}
            mode="date"
            variant="outlined"
          />
          <Text>Nights</Text>
          <View style={styles.cart}>
            <Quantorsizer
              value={nights}
              onIncreament={() => setNights(nights + 1)}
              onDecrement={() => (nights > 1 ? setNights(nights - 1) : null)}
            />
            <View style={{ flex: 1, padding: 10 }}>
              <Button
                style={styles.button}
                mode="outlined"
                icon="cart"
                textColor={colors.primary}
                onPress={handleOrder}
              >
                Reserve Now
              </Button>
            </View>
          </View>
        </View>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "View Resevations",
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
