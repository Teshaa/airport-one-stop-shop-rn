import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import routes from "./routes";

const Stack = createStackNavigator();

const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const AuthNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.WELCOME_SCREEN}
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name={routes.REGISTER_SCREEN}
        component={RegisterScreen}
        options={{ headerTitle: "Register" }}
      />
      <Screen
        name={routes.LOGIN_SCREEN}
        component={LoginScreen}
        options={{ headerTitle: "Login" }}
      />
    </Navigator>
  );
};

export default AuthNavigation;
