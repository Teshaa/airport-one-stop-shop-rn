import {
  Alert,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppSafeArea from "../../components/AppSafeArea";
import ListItem from "../../components/ListItem";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";
import routes from "../../navigation/routes";
import {
  Text,
  Avatar,
  Button,
  Card,
  IconButton,
  TextInput,
} from "react-native-paper";
import colors from "../../utils/colors";
import { ScannerWrapper } from "../../components/scanner";
import { Dialog } from "../../components/dialog";

const AccountScreen = ({ navigation }) => {
  const { user, token } = useUserContext();
  const { getUser, logout, makeOrderPayment } = useUser();
  const handleOrderPayment = async () => {};
  const [mpesaPrompt, setMpesPropmt] = useState({
    show: false,
    phoneNumber: "",
    code: "",
    loading: false,
  });
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
            screen: routes.RESERVATIONS_SCREEN,
          })
        }
      >
        <Card.Title
          style={styles.listItem}
          subtitle="Reservation History"
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
      <ScannerWrapper
        onScaned={(scanned) => {
          setMpesPropmt((state) => ({ ...state, show: true, code: scanned }));
        }}
      >
        <Card.Title
          style={styles.listItem}
          subtitle="Confirm Receipt"
          subtitleVariant="bodyLarge"
          left={(props) => (
            <Avatar.Icon style={styles.icon} {...props} icon="qrcode-scan" />
          )}
          right={(props) => (
            <IconButton {...props} icon="chevron-right" disabled />
          )}
        />
      </ScannerWrapper>
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
      <Dialog
        visible={mpesaPrompt.show}
        onRequestClose={() =>
          setMpesPropmt((state) => ({ ...state, show: false }))
        }
      >
        <View style={{ width: Dimensions.get("screen").width * 0.75 }}>
          <Text variant="headlineLarge">Mpesa Number</Text>
          <TextInput
            value={mpesaPrompt.phoneNumber}
            label={"Phone number"}
            placeholder="e.g 0712345678"
            onChangeText={(value) =>
              setMpesPropmt((state) => ({ ...state, phoneNumber: value }))
            }
          />
          <Button
            style={{ marginTop: 10 }}
            loading={mpesaPrompt.loading}
            mode="contained"
            onPress={async () => {
              setMpesPropmt({ ...mpesaPrompt, loading: true });
              const response = await makeOrderPayment(token, mpesaPrompt.code, {
                phoneNumber: mpesaPrompt.phoneNumber,
              });
              setMpesPropmt({ ...mpesaPrompt, loading: false });
              if (response.ok) {
                console.log("Success!");
                setTimeout(() => {
                  setMpesPropmt({ ...mpesaPrompt, show: false });
                }, 3000);
              } else console.log(response.data);
            }}
          >
            Make payment
          </Button>
        </View>
      </Dialog>
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
