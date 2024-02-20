import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Logo from "../../components/Logo";
import TextInputField from "../../components/input/TextInputField";
import PasswordInputField from "../../components/input/PasswordInputField";
import colors from "../../utils/colors";
import AppButton from "../../components/input/AppButton";
import routes from "../../navigation/routes";
import * as Yup from "yup";
import {
  AppForm,
  AppFormField,
  AppFormSubmitButton,
} from "../../components/forms";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";

const validationSchemer = Yup.object().shape({
  username: Yup.string().label("Username").required(),
  email: Yup.string().label("Email").required(),
  password: Yup.string().label("Password").required(),
  confirm_password: Yup.string().label("Confirm Password").required(),
});

const RegisterScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { setToken, setUser } = useUserContext();
  const { register } = useUser();

  const handleRegister = async (values, { setFieldError }) => {
    setLoading(true);
    const response = await register(values);
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
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirm_password: "",
          }}
          validationSchema={validationSchemer}
          onSubmit={handleRegister}
        >
          <AppFormField
            icon="account"
            placeholder="Enter username"
            name="username"
          />
          <AppFormField
            icon="email"
            placeholder="Enter email"
            name="email"
            keyboardType="email-address"
          />
          <AppFormField
            password
            name="password"
            icon="lock"
            placeholder="Enter Password"
          />
          <AppFormField
            password
            name="confirm_password"
            icon="lock"
            placeholder="Confirm Password"
          />

          <AppFormSubmitButton title="Register" loading={loading} />
        </AppForm>

        <View style={{ flexDirection: "row", padding: 10 }}>
          <Text>Already have and account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(routes.LOGIN_SCREEN);
            }}
          >
            <Text style={{ color: colors.medium }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

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
