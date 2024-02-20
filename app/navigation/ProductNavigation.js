import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import routes from "./routes";
import ProductDetailScreen from "../screens/product/ProductDetailScreen";
import ReviewsScreen from "../screens/product/ReviewsScreen";

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
        name={routes.PRODUCT_REVIEW_SCREEN}
        component={ReviewsScreen}
        options={({ route }) => ({ title: `${route.params.name} reviews` })}
      />
    </Navigator>
  );
};

export default ProductNavigation;
