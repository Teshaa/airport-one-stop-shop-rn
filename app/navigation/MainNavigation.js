import { createStackNavigator } from "@react-navigation/stack";
import { useUserContext } from "../context/hooks";
import RegisterScreen from "../screens/auth/RegisterScreen";
import AuthNavigation from "./AuthNavigation";
import BottomTabNavigation from "./BottomTabNavigation";
import routes from "./routes";
import UserNavigation from "./UserNavigation";
import ProductNavigation from "./ProductNavigation";

const Stack = createStackNavigator();

const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const MainNavigation = () => {
  const { token } = useUserContext();
  const isLoggedIn = Boolean(token);
  return (
    <Navigator>
      {isLoggedIn ? (
        <Screen
          name={routes.TAB_NAVIGATION}
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />
      ) : (
        <Screen
          name={routes.AUTH_NAVIGATION}
          component={AuthNavigation}
          options={{ headerShown: false }}
        />
      )}
      <Screen
        name={routes.REGISTER_SCREEN}
        component={RegisterScreen}
        options={{ headerTitle: "Register" }}
      />
      <Screen
        name={routes.USER_NAVIGATION}
        component={UserNavigation}
        options={{ headerShown: false }}
      />
      <Screen
        name={routes.PRODUCT_NAVIGATION}
        component={ProductNavigation}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};

export default MainNavigation;
