import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { useCartContext, useUserContext } from "../../context/hooks";
import AppSafeArea from "../../components/AppSafeArea";
import {
  Avatar,
  Card,
  FAB,
  IconButton,
  List,
  Text,
  Portal,
  Provider,
  Snackbar,
} from "react-native-paper";
import colors from "../../utils/colors";
import RatingBar from "../../components/ratingbar/RatingBar";
import QuanterSizer from "../../components/input/QuanterSizer";
import routes from "../../navigation/routes";
import { useShop } from "../../api/hooks";
import Logo from "../../components/Logo";

const CartScreen = ({ navigation }) => {
  const {
    cartItems,
    addToCart,
    deleteFromCart,
    clearAll,
    postItems,
    totalCost,
    getPostItemsFormData,
  } = useCartContext();
  const [state, setState] = React.useState({ open: false });
  const [visible, setVisible] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState("");
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  const onStateChange = ({ open }) => setState({ open });
  const { token } = useUserContext();
  const { postOrder } = useShop();
  const handleAddOrder = async () => {
    // return console.log(getPostItemsFormData());
    const response = await postOrder(token, postItems);
    if (!response.ok) {
      setSnackMessage(response.data.items.join(";"));
      onToggleSnackBar();
      return console.log("CartScreen: ", response.problem, response.data);
    }
    setSnackMessage(" Your order was received successfully");
    onToggleSnackBar();
    clearAll();
  };

  const { open } = state;
  return (
    <AppSafeArea>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={({ product: { url } }) => url}
          renderItem={({ item }) => {
            const {
              quantity,
              product: {
                name,
                number,
                image,
                hotel,
                description,
                price,
                price_per_night,
                rating,
                tags,
                images,
                updated,
                type: { name: category },
              },
            } = item;
            const proImage =
              (images ?? [])[0]?.image ??
              image ??
              "https://placehold.co/600x400";
            // console.log(item);
            return (
              <List.Item
                style={styles.item}
                title={() => (
                  <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
                    {name ?? `${hotel?.name}-${number}`}
                  </Text>
                )}
                description={() => (
                  <List.Item
                    title={() => (
                      <Text>{`${category} | ${price ?? price_per_night}`}</Text>
                    )}
                    description={() => (
                      <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                        Ksh.{" "}
                        {parseFloat(price ?? price_per_night) *
                          parseFloat(quantity)}
                      </Text>
                    )}
                  />
                )}
                left={(props) => (
                  <Avatar.Image
                    {...props}
                    source={{ uri: proImage }}
                    size={70}
                  />
                )}
                right={(props) => (
                  <Card.Actions
                    style={{
                      flexDirection: "column",
                      padding: 0,
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                    }}
                  >
                    <QuanterSizer
                      value={quantity}
                      onIncrement={() => {
                        addToCart({ ...item, quantity: quantity + 1 });
                      }}
                      onDecrement={() => {
                        if (quantity > 1)
                          addToCart({ ...item, quantity: quantity - 1 });
                      }}
                    />
                    <IconButton
                      {...props}
                      icon="delete"
                      style={{ marginRight: 0 }}
                      iconColor={colors.danger}
                      onPress={() => {
                        deleteFromCart(item.product);
                      }}
                    />
                  </Card.Actions>
                )}
              />
            );
          }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View>
            <Logo variant="black" />
          </View>
          <Text variant="headlineMedium" style={{ padding: 20 }}>
            There are not items in your cart yet
          </Text>
        </View>
      )}
      {cartItems.length > 0 && (
        <Provider>
          <Portal>
            <FAB.Group
              open={open}
              fabStyle={styles.fab}
              label={`Ksh. ${totalCost}`}
              backdropColor={colors.transparent}
              visible
              icon={open ? "close" : "dots-vertical"}
              actions={[
                {
                  icon: "plus",
                  onPress: () => navigation.navigate(routes.HOME_SCREEN),
                },
                {
                  icon: "notification-clear-all",
                  label: "Clear",
                  onPress: clearAll,
                },
                {
                  icon: "share-all",
                  label: "Order now",
                  onPress: handleAddOrder,
                },
              ]}
              onStateChange={onStateChange}
              onPress={() => {
                if (open) {
                  // do something if the speed dial is open
                }
              }}
            />
          </Portal>
        </Provider>
      )}
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
    </AppSafeArea>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.white,
    marginTop: 5,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  fab: {
    backgroundColor: colors.white,
    marginVertical: 3,
  },
  fabContainer: {
    margin: 5,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  emptyContainer: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    opacity: 0.4,
  },
});
