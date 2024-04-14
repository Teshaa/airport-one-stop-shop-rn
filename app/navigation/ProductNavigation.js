import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import routes from "./routes";
import ProductDetailScreen from "../screens/product/ProductDetailScreen";
import ReviewsScreen from "../screens/product/ReviewsScreen";
import AccomodationDetail from "../screens/product/AccomodationDetail";
import RestaurantDetail from "../screens/product/RestaurantDetail";
import HotelDetailScreen from "../screens/product/HotelDetailScreen";

const Stack = createStackNavigator();

const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const ProductNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.PRODUCT_SCREEN}
        component={ProductDetailScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Screen
        name={routes.ACCOMODATION_SCREEN}
        component={AccomodationDetail}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Screen
        name={routes.PRODUCT_REVIEW_SCREEN}
        component={ReviewsScreen}
        options={({ route }) => ({ title: `${route.params.name} reviews` })}
      />
      <Screen
        name={routes.RESTAURANT_DETAIL_SCREEN}
        component={RestaurantDetail}
        options={({ route }) => ({ title: `${route.params.name} potfolio` })}
      />
      <Screen
        name={routes.HOTEL_DETAIL_SCREEN}
        component={HotelDetailScreen}
        options={({ route }) => ({ title: `${route.params.name} potfolio` })}
      />
    </Navigator>
  );
};

export default ProductNavigation;
