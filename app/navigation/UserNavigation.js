import { createStackNavigator } from "@react-navigation/stack";
import OrderDetailScreen from "../screens/user/OrderDetailScreen";
import OrdersScreen from "../screens/user/OrdersScreen";
import PaymentsScreen from "../screens/user/PaymentsScreen";
import ProfileScreen from "../screens/user/ProfileScreen";
import routes from "./routes";
import PaymentDetailScreen from "../screens/user/PaymentDetailScreen";
import AccomodationDetail from "../screens/product/AccomodationDetail";
import ReservationsScreen from "../screens/user/ReservationsScreen";
import ResearvationDetailScreen from "../screens/user/ResearvationDetailScreen";

const Stack = createStackNavigator();

const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const UserNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
      <Screen
        name={routes.PAYMENTS_SCREEN}
        component={PaymentsScreen}
        options={{ title: "Payments" }}
      />
      <Screen
        name={routes.PAYMENT_SCREEN}
        component={PaymentDetailScreen}
        options={({ route }) => ({
          title: route.params.payment_id,
        })}
      />
      <Screen
        name={routes.ORDERS_SCREEN}
        component={OrdersScreen}
        options={{ title: "Orders" }}
      />
      <Screen
        name={routes.RESERVATIONS_SCREEN}
        component={ReservationsScreen}
        options={{ title: "Reservations" }}
      />
      <Screen
        name={routes.ORDER_SCREEN}
        component={OrderDetailScreen}
        options={({ route }) => ({
          title: route.params.food_item.name,
        })}
      />
      <Screen
        name={routes.RESERVATION_SCREEN}
        component={ResearvationDetailScreen}
        options={({ route }) => ({
          title: `${route.params.room.hotel.name}-${route.params.room.number}`,
        })}
      />
    </Navigator>
  );
};

export default UserNavigation;
