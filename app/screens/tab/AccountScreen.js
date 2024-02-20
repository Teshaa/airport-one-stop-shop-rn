import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import AppSafeArea from "../../components/AppSafeArea";
import ListItem from "../../components/ListItem";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";
import routes from "../../navigation/routes";
import { Avatar, Card, IconButton } from "react-native-paper";
import colors from "../../utils/colors";

const AccountScreen = ({ navigation }) => {
  const { user } = useUserContext();
  const { getUser, logout } = useUser();
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);
  return (
    <AppSafeArea>
      {user && (
        <ListItem
          image={user.profile.image ? { uri: user.profile.image } : null}
          title={`${user.first_name} ${user.last_name}`}
          subTitle={user.email}
          icon="account"
          onPress={() =>
            navigation.navigate(routes.USER_NAVIGATION, {
              screen: routes.PROFILE_SCREEN,
              params: user,
            })
          }
        />
      )}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(routes.USER_NAVIGATION, {
            screen: routes.ORDERS_SCREEN,
          })
        }
      >
        <Card.Title
          style={styles.listItem}
          subtitle="Order History"
          subtitleVariant="bodyLarge"
          left={(props) => (
            <Avatar.Icon style={styles.icon} {...props} icon="history" />
          )}
          right={(props) => (
            <IconButton {...props} icon="chevron-right" disabled />
          )}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(routes.USER_NAVIGATION, {
            screen: routes.PAYMENTS_SCREEN,
          })
        }
      >
        <Card.Title
          style={styles.listItem}
          subtitle="Payment"
          subtitleVariant="bodyLarge"
          left={(props) => (
            <Avatar.Icon style={styles.icon} {...props} icon="wallet" />
          )}
          right={(props) => (
            <IconButton {...props} icon="chevron-right" disabled />
          )}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Alert.alert("Logout", "Are you sure you want to sign out", [
            { text: "Logout", onPress: logout },
            { text: "Cancel" },
          ]);
        }}
      >
        <Card.Title
          style={styles.listItem}
          subtitle="Logout"
          subtitleVariant="bodyLarge"
          left={(props) => (
            <Avatar.Icon style={styles.icon} {...props} icon="logout" />
          )}
          right={(props) => (
            <IconButton {...props} icon="chevron-right" disabled />
          )}
        />
      </TouchableOpacity>
    </AppSafeArea>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: colors.white,
    marginTop: 10,
  },
  icon: {
    backgroundColor: colors.light,
  },
});
