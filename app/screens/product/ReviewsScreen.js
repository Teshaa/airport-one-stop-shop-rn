import { FlatList, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useShop } from "../../api/hooks";
import {
  Snackbar,
  Text,
  Card,
  List,
  Avatar,
  IconButton,
} from "react-native-paper";
import { useShopContext, useUserContext } from "../../context/hooks";
import RatingBar from "../../components/ratingbar/RatingBar";
import moment from "moment/moment";
import colors from "../../utils/colors";
import TextInputField from "../../components/input/TextInputField";

const ReviewsScreen = ({ navigation, route }) => {
  const [reviews, setReviews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { token } = useUserContext();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState({ review: "", rating: 3 });
  const { getReviews, addReview, getProducts } = useShop();
  const { setProducts } = useShopContext();
  const handleFetch = async () => {
    setRefreshing(true);
    const revResponse = await getReviews({ product: route.params.name });
    setRefreshing(false);
    if (!revResponse.ok) {
      console.log("ReviewsScreen: ", revResponse.problem, revResponse.data);
    } else {
      setReviews(revResponse.data.results);
    }
    const productResponse = await getProducts();
    if (!productResponse.ok) {
      console.log(
        "ReviewsScreen: ",
        productResponse.problem,
        productResponse.data
      );
    }
    const {
      data: { results: productResult },
    } = productResponse;
    setProducts(productResult);
  };

  const handleSubmit = async () => {
    setVisible(false);
    const response = await addReview(token, {
      ...formState,
      product: route.params.url,
    });
    if (!response.ok) {
      setMessage("Please provide both rating and review");
      setVisible(true);
      return console.log("ReviewScreen: ", response.problem, response.data);
    }
    setMessage("Review added successfully.Thank you!");
    setVisible(true);
    await handleFetch();
    setFormState({ review: "", rating: 3 });
  };
  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <View style={styles.screen}>
      <View style={styles.reviewsContainer}>
        <FlatList
          data={reviews}
          contentContainerStyle={{ padding: 5 }}
          refreshing={refreshing}
          onRefresh={handleFetch}
          renderItem={({ item: review }) => {
            const {
              rating,
              review: message,
              created,
              author: { name, image },
            } = review;
            return (
              <Card style={styles.review}>
                <Card.Title
                  left={(props) =>
                    image ? (
                      <Avatar.Image source={{ uri: image }} {...props} />
                    ) : (
                      <Avatar.Icon
                        icon="account"
                        {...props}
                        style={{ backgroundColor: colors.light }}
                      />
                    )
                  }
                  subtitle={name}
                />
                <Card.Content>
                  <View style={styles.reviewRatingRow}>
                    <RatingBar starSize={15} defaultRating={rating} />
                    <Text style={{ color: colors.medium, paddingLeft: 10 }}>
                      {moment(created).format("Do MMMM YYYY")}
                    </Text>
                  </View>
                  <Text style={{ paddingVertical: 10 }}>{message}</Text>
                </Card.Content>
              </Card>
            );
          }}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Rating:</Text>
        <RatingBar
          align="flex-start"
          defaultRating={formState.rating}
          onRatingChange={(rating) => setFormState({ ...formState, rating })}
        />
        <Text style={styles.label}>Review:</Text>
        <View style={styles.input}>
          <TextInputField
            placeholder="Leave your review here ..."
            width="85%"
            onChangeText={(review) => setFormState({ ...formState, review })}
            value={formState.review}
            backgroundColor={colors.light}
          />
          <IconButton icon="send" mode="outlined" onPress={handleSubmit} />
        </View>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: "Dismiss",
          onPress: () => {
            // setVisible(false);
          },
        }}
      >
        {message}
      </Snackbar>
    </View>
  );
};

export default ReviewsScreen;

const styles = StyleSheet.create({
  reviewRatingRow: {
    flexDirection: "row",
  },
  reviewsContainer: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  form: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 30,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
  },
  review: {
    marginBottom: 5,
  },
});
