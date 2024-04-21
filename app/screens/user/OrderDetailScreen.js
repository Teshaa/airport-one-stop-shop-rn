import { StyleSheet, View, Dimensions, Alert } from "react-native";
import React, { useState } from "react";
import { Button, List, Text, TextInput } from "react-native-paper";
import moment from "moment/moment";
import useLocation from "../../hooks/useLocation";
import { openGoogleMapsDirections } from "../../utils/helpers";
import { useUser } from "../../api/hooks";
import { useUserContext } from "../../context/hooks";
import { Dialog } from "../../components/dialog";

const OrderDetailScreen = ({ navigation, route }) => {
  const location = useLocation();

  const { makeOrderPayment } = useUser();
  const { token } = useUserContext();

  const {
    id,
    food_item: {
      name,
      type: { name: type },
      image,
      restaurant: { name: restaurant, address, longitude, latitude },
    },
    quantity,
    price,
    status,
    created_at,
  } = route.params;
  const [mpesaPrompt, setMpesPropmt] = useState({
    show: false,
    phoneNumber: "",
    code: id,
    loading: false,
  });
  return (
    <View>
      <List.Item
        title={name}
        description={`${quantity} items | @Ksh. ${price}`}
        left={(props) => <List.Image {...props} source={{ uri: image }} />}
        style={{ backgroundColor: "white", marginVertical: 5 }}
      />
      <List.Item
        title={"Date"}
        description={`${moment(created_at).format("Do MMM YYYY, h:mm a")}`}
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
        title={status}
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
        title={restaurant}
        description={address}
        left={(props) => <List.Icon {...props} icon="office-building-marker" />}
        style={{ backgroundColor: "white", marginVertical: 5 }}
      />
      <Button
        mode="contained"
        icon="bank"
        disabled={status !== "pending"}
        style={{ margin: 5 }}
        onPress={() => {
          setMpesPropmt({ ...mpesaPrompt, show: true });
        }}
      >
        Make payment
      </Button>
      <Button
        mode="contained"
        icon="google"
        disabled={Boolean(location) === false}
        style={{ margin: 5 }}
        onPress={() => {
          if (location) {
            openGoogleMapsDirections(location, { latitude, longitude });
          }
        }}
      >
        Open Restaurant in Google maps
      </Button>
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
                  navigation.goBack();
                }, 3000);
              } else console.log(response.data);
            }}
          >
            Make payment
          </Button>
        </View>
      </Dialog>
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({});
