import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, Card, Avatar, Text } from "react-native-paper";
import RatingBar from "../ratingbar/RatingBar";

const AccomodationCard = ({
  title = "Title card",
  description,
  rating = 1,
  uri,
}) => {
  return (
    <Card>
      <Card.Cover source={{ uri }} />
      <Card.Content>
        <Text variant="titleLarge">{title}</Text>
        <Text variant="bodyMedium" numberOfLines={2}>
          {description}
        </Text>
      </Card.Content>
      <Card.Actions>
        <RatingBar starSize={15} defaultRating={rating} />
        <Text>({rating})</Text>
      </Card.Actions>
    </Card>
  );
};

export default AccomodationCard;

const styles = StyleSheet.create({});
