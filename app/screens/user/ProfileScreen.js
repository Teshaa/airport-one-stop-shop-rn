import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Card, Avatar, List, Button } from "react-native-paper";
import colors from "../../utils/colors";
import ProfileForm from "../../components/user/forms/ProfileForm";

const ProfileScreen = ({ navigation, route }) => {
  const {
    first_name,
    last_name,
    email,
    profile: { gender, image, phone_number },
    username,
  } = route.params;

  return (
    <View>
      <ProfileForm
        initial={{ first_name, last_name, gender, phone_number, image }}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  icon: {
    color: colors.medium,
  },
  avatarContainer: {
    alignSelf: "center",
  },
  card: {
    margin: 20,
  },
  avatar: {
    backgroundColor: colors.light,
  },
});
