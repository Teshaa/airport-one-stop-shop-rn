import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Logo from "../../components/Logo";
import TextInputField from "../../components/input/TextInputField";
import PasswordInputField from "../../components/input/PasswordInputField";
import colors from "../../utils/colors";
import AppButton from "../../components/input/AppButton";
import routes from "../../navigation/routes";
import { useUser } from "../../api/hooks";
import { useUserContext } from "../../context/hooks";
import * as Yup from "yup";
import {
  AppForm,
  AppFormField,
  AppFormSubmitButton,
} from "../../components/forms";

const validationSchemer = Yup.object().shape({
  username: Yup.string().label("Username").required(),
  password: Yup.string().label("Password").required(),
});

const LoginScreen = ({ navigation }) => {
  const { setToken, setUser } = useUserContext();
  const { login } = useUser();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values, { setFieldError }) => {
    setLoading(true);
    const response = await login(values);
    setLoading(false);
    if (!response.ok) {
      if (response.problem === "CLIENT_ERROR") {
        for (const key in response.data) {
          const element = response.data[key];
          if (element instanceof Array) {
            setFieldError(key, element.join(";"));
          } else if (element instanceof Object) {
            for (const key1 in element) {
              const element1 = element[key1];
              setFieldError(key1, element1.join(";"));
            }
          }
        }
        return console.log("LoginScreen: ", response.problem, response.data);
      }
    }

    const { data: user } = response;
    const token = user.token;
    delete user.token;
    setUser(user);
    setToken(token);
  };

  return (
    <View style={styles.container}>
      <Logo size={150} variant="black" />
      <View style={styles.form}>
        <AppForm
          validationSchema={validationSchemer}
          initialValues={{ username: "", password: "" }}
          onSubmit={handleLogin}
        >
          <AppFormField
            icon="account"
            name="username"
            placeholder="Enter username"
          />
          <AppFormField
            icon="lock"
            password
            name="password"
            placeholder="Enter Password"
          />
          <AppFormSubmitButton title="Login" loading={loading} />
        </AppForm>

        <View style={{ flexDirection: "row", padding: 10 }}>
          <Text>Don't have and account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(routes.REGISTER_SCREEN);
            }}
          >
            <Text style={{ color: colors.medium }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.background,
    paddingTop: 50,
    flex: 1,
  },
  form: {
    width: "90%",
    paddingTop: 20,
  },
});
